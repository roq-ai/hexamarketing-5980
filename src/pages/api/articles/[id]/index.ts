import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { articleValidationSchema } from 'validationSchema/articles';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.article
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getArticleById();
    case 'PUT':
      return updateArticleById();
    case 'DELETE':
      return deleteArticleById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getArticleById() {
    const data = await prisma.article.findFirst(convertQueryToPrismaUtil(req.query, 'article'));
    return res.status(200).json(data);
  }

  async function updateArticleById() {
    await articleValidationSchema.validate(req.body);
    const data = await prisma.article.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteArticleById() {
    const data = await prisma.article.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

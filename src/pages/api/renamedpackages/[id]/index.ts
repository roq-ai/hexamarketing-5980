import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { renamedpackageValidationSchema } from 'validationSchema/renamedpackages';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.renamedpackage
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getRenamedpackageById();
    case 'PUT':
      return updateRenamedpackageById();
    case 'DELETE':
      return deleteRenamedpackageById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRenamedpackageById() {
    const data = await prisma.renamedpackage.findFirst(convertQueryToPrismaUtil(req.query, 'renamedpackage'));
    return res.status(200).json(data);
  }

  async function updateRenamedpackageById() {
    await renamedpackageValidationSchema.validate(req.body);
    const data = await prisma.renamedpackage.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteRenamedpackageById() {
    const data = await prisma.renamedpackage.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

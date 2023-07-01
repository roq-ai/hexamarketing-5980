import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { landingPageValidationSchema } from 'validationSchema/landing-pages';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.landing_page
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getLandingPageById();
    case 'PUT':
      return updateLandingPageById();
    case 'DELETE':
      return deleteLandingPageById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLandingPageById() {
    const data = await prisma.landing_page.findFirst(convertQueryToPrismaUtil(req.query, 'landing_page'));
    return res.status(200).json(data);
  }

  async function updateLandingPageById() {
    await landingPageValidationSchema.validate(req.body);
    const data = await prisma.landing_page.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteLandingPageById() {
    const data = await prisma.landing_page.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

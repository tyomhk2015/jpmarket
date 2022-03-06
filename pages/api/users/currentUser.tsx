import { withIronSessionApiRoute } from 'iron-session/next';
import client from 'libs/server/client';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import withApiSession from 'libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function CurrentUser(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session.user);
  const currentUserProfile = await client.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });
  res.json({
    ok: true,
    currentUserProfile,
  });
}

export default withApiSession(
  withHandler({
    method: 'GET',
    handler: CurrentUser,
  })
);

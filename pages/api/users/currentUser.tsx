import { withIronSessionApiRoute } from 'iron-session/next';
import client from 'libs/server/client';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

declare module "iron-session" {
  interface IronSessionData {
    user? : {
      id: number
    }
  }
}

async function CurrentUser(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session.user);
  const currentUserProfile = await client.user.findUnique({
    where: {
      id: req.session.user?.id
    },
  });
  res.json({
    ok: true,
    currentUserProfile,
  });
}

export default withIronSessionApiRoute( // Attaching cookie session to withHandler function.
  withHandler('GET', CurrentUser),
  {
    cookieName: 'jpmarketSession',
    password: '12345679012345678901234567890122',
  }
);

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

async function VerifyTokenAPIhandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const tokenFromDB = await client.token.findUnique({
    where: {
      payload: token,
    },
    // include: { // @relation in prisma.schema is mandatory.
    //   user: true,
    // }
  });
  if (!tokenFromDB) return res.status(404).end();
  console.log('tokenFromDB', tokenFromDB);

  // Make a cookie session with verfied user's id, and save it.
  req.session.user = {
    id: tokenFromDB.userId
  }
  await req.session.save(); // Save the cookie session to the browser.

  res.status(201).end();
}

export default withIronSessionApiRoute( // Attaching cookie session to withHandler function.
  withHandler('POST', VerifyTokenAPIhandler),
  {
    cookieName: 'jpmarketSession',
    password: '12345679012345678901234567890122',
  }
);

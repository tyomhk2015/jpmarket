import client from 'libs/server/client';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import withApiSession from 'libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

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
    id: tokenFromDB.userId,
  };

  // Save the cookie session to the browser.
  await req.session.save();

  // Once the token has been verified, delete it.
  // For preventing token table getting unnecessarily big.
  await client.token.deleteMany({
    where: {
      userId: tokenFromDB.userId,
    },
  });

  res.status(200).json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ['POST'], handler: VerifyTokenAPIhandler })
);

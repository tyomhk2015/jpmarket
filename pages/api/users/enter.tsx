import client from 'libs/server/client';
import withHandler from 'libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function EnterAPIhandler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };
  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: 'anon',
      ...payload,
    },
    update: {},
  });
  console.log(user);
  res.status(201).json({
    ok: true,
  });
}

export default withHandler('POST', EnterAPIhandler);

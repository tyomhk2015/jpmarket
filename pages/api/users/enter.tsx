import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../libs/server/client';

export default async function EnterAPIhandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  const userData = await client.user.findUnique({
    where: {
      id: 1,
    },
  });
  res.json({
    ok: true,
    data: userData,
  });
}

import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../libs/client';

export default async function APIhandler(req: NextApiRequest, res: NextApiResponse) {
  const userData = await client.user.findUnique({where: {
    id: 1
  }});
  res.json({
    ok: true,
    data: userData
  })
}

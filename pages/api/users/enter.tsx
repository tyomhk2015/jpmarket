import client from 'libs/server/client';
import withHandler from 'libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function EnterAPIhandler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  res.status(201).json({
    ok: true,
  });
}

export default withHandler('POST', EnterAPIhandler);

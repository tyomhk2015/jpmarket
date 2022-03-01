import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export default function withHandler(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  // The part that next.js will use eventually, when API is called.
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      res.status(405).end();
    }
    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({error});
    };
  };
}

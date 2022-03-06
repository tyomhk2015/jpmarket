import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface ConfigType {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: ConfigType) {
  // The part that next.js will use eventually, when API is called.
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: 'Please Login' });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  };
}

import { withIronSessionApiRoute } from 'iron-session/next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: 'jpmarket',
  password: process.env.SESSION_PASSWORD!,
};

export default function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

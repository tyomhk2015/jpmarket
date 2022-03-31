import client from 'libs/server/client';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import withApiSession from 'libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function CurrentUser(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const currentUserProfile = await client.user.findUnique({
      where: {
        id: req.session.user?.id,
      },
    });
    res.json({
      ok: true,
      currentUserProfile,
    });
  }
  if (req.method === 'POST') {
    const {
      session: { user },
      body: { email, phone, name },
    } = req;
    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (email && email !== currentUser?.email) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        })
      );
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: 'The given email already being used.\n Try a different email.',
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      });
    }
    if (phone && phone.toString() !== currentUser?.phone) {
      const phoneString = phone.toString();
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            phone: phoneString
          },
          select: {
            id: true,
          },
        })
      );
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: 'The given phone number is already in use.',
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          phone: phoneString
        },
      });
    }
    if (name) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name,
        },
      });
    }
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler: CurrentUser,
    isPrivate: true,
  })
);

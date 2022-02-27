import client from 'libs/server/client';
import withHandler from 'libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function EnterAPIhandler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const userContact = phone ? { phone: +phone } : { email };
  const payload = Date.now().toString(32);
  const token = await client.token.create({
    data: {
      payload, // Token number.
      user: {
        connectOrCreate: {
          // If there is a user with specified email/phone number,
          // then connect the user to the token above.
          where: {
            ...userContact,
          },
          // If there is no user with specified email/phone number,
          // create a user and connect the user to the token above.
          create: {
            name: 'anon',
            ...userContact,
          },
        }
      }
    }
  });
  console.log(token);
  res.status(201).json({
    ok: true,
  });
}

export default withHandler('POST', EnterAPIhandler);

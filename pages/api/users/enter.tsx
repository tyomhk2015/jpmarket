import twilio from 'twilio';
import mail from '@sendgrid/mail';
import client from 'libs/server/client';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import withApiSession from 'libs/server/withSession';

mail.setApiKey(process.env.SENDGRID_API!);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function EnterAPIhandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const userContact = phone ? { phone } : email ? { email } : null;
  if (!userContact) return res.status(400).json({ ok: false });

  // Generate token.
  const payload =
    Date.now().toString(32) +
    Math.floor(256 + Math.random() * 256).toString(32);

  // Create a token for a user.
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
        },
      },
    },
  });

  // Send the token via SMS or email.
  if (phone) {
    // const msg = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_SMS_ID,
    //   to: process.env.PHONE_NUMBER!,
    //   body: `Your Login Token Is \n${payload}`,
    // });
    // console.log(msg);
  } else if (email) {
    // const email = await mail.send({
    //   from: process.env.EMAIL!,
    //   to: process.env.EMAIL,
    //   subject: 'JPmarket verification',
    //   text: `Your Login Token Is \n${payload}`,
    //   html: `Your Login Token Is <br><strong>${payload}</strong>`,
    // });
    // console.log(email);
  }

  res.status(201).json({
    ok: true,
  });
}

export default withApiSession(withHandler('POST', EnterAPIhandler));


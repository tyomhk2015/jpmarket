import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "libs/server/withHandler";
import client from "libs/server/client";
import withApiSession from "libs/server/withSession";

async function AnswerCreateHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = req;

  const newAnswer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: +id,
        },
      },
      answer,
    },
  });
  res.json({
    ok: true,
    answer: newAnswer,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler: AnswerCreateHandler,
    isPrivate: true,
  })
);
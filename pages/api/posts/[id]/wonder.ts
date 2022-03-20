import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "libs/server/withHandler";
import client from "libs/server/client";
import withApiSession from "libs/server/withSession";

async function WonderingHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const wondering = await client.wondering.findFirst({
    where: {
      userId: user?.id,
      postId: +id,
    },
    select: {
      id: true,
    },
  });

  if (wondering) {
    await client.wondering.delete({
      where: {
        id: wondering.id,
      },
    });
  } else {
    await client.wondering.create({
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
      },
    });
  }
  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler: WonderingHandler,
  })
);
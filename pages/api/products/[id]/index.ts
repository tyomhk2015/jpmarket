import client from 'libs/server/client';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import withApiSession from 'libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function ProductDetail(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const product = await client.product.findUnique({
    where: {
      id: +id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  const relatedWords = product?.title.split(' ').map((word) => ({
    title: {
      contains: word,
    },
  }));

  const relatedProducts = await client.product.findMany({
    where: {
      OR: relatedWords,
      AND: {
        id: {
          not: +id,
        },
      },
    },
  });

  const isFav = Boolean(
    await client.fav.findFirst({
      where: {
        productId: product?.id,
        userId: user?.id,
      },
      select : {
        id: true,
      }
    })
  );

  res.json({
    ok: true,
    product,
    relatedProducts,
    isFav,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler: ProductDetail,
    isPrivate: true,
  })
);

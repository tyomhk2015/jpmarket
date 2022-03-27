import client from 'libs/server/client';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import withApiSession from 'libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function ProductHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const products = await client.product.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        _count: {
          select : {
            fav: true,
          }
        }
      }
    });

    res.json({
      ok: true,
      products,
    });
  }
  if (req.method === 'POST') {
    const {
      body: { title, price, description },
      session: { user },
    } = req;

    const product = await client.product.create({
      data: {
        title,
        price: +price,
        description,
        image: 'temp',
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      product,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler: ProductHandler,
    isPrivate: false,
  })
);

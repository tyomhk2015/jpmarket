import client from 'libs/server/client';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import withApiSession from 'libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function UploadProduct(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { title, price, description },
    session: { user },
  } = req;

  const productData = await client.product.create({
    data: {
      title,
      price: +price,
      description,
      image: "temp",
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({
    ok: true,
    productData,
  });
}

export default withApiSession(
  withHandler({
    method: 'POST',
    handler: UploadProduct,
  })
);

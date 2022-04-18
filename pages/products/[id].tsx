import type { NextPage } from 'next';
import Button from 'components/button';
import Layout from 'components/layout';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import { useEffect } from 'react';
import Link from 'next/link';
import { Product, User } from '@prisma/client';
import useMutation from 'libs/client/useMutation';
import Image from 'next/image';

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isFav: boolean;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const { mutate: unboundMutate } = useSWRConfig();
  const [toggleFav, { loading: favLoading, data: favData }] = useMutation(
    `/api/products/${router.query.id}/fav`
  );
  const onFavClick = async () => {
    if (!data) return;
    boundMutate({ ...data, isFav: !data.isFav }, false);
    toggleFav({});
  };
  useEffect(() => {
    // TODO: When there is no data or if the data is being loaded, show loading effect.
    // product === null
  }, [data, router]);
  return (
    <Layout canGoBack>
      <div className='px-4  py-4'>
        <div className='mb-8'>
          <div className="relative p-40">
            <Image
              src={`https://imagedelivery.net/_wo6jvg8GW1hy3HwUY-d5w/${data?.product?.image}/public`}
              className='mx-auto rounded-lg object-contain'
              layout='fill'
              // blurDataURL='' // A property for blurring out the image with a remote image.
            />
          </div>
          <div className='flex cursor-pointer py-3 border-t border-b items-center space-x-3'>
            <Image
              width={48}
              height={48}
              src={`https://imagedelivery.net/_wo6jvg8GW1hy3HwUY-d5w/${data?.product?.user?.avatar}/avatar`}
              className='w-12 h-12 bg-slate-300 rounded-full'
            />
            <div>
              <p className='text-sm font-medium text-gray-700'>
                {data?.product?.user?.name}
              </p>
              <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                <a className='text-sm font-medium text-gray-700'>
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className='mt-5'>
            <h1 className='text-3xl font-bold text-gray-900'>
              {data?.product?.title}
            </h1>
            <span className='text-2xl block mt-3 text-gray-900'>
              ￦ {data?.product?.price}
            </span>
            <p className=' my-6 text-gray-700'>{data?.product?.description}</p>
            <div className='flex items-center justify-between space-x-2'>
              <Button large text='Talk to seller' />
              <button
                onClick={onFavClick}
                className='p-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500'
              >
                <svg
                  className='h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill={data?.isFav ? '#ff0076' : 'none'}
                  viewBox='0 0 24 24'
                  stroke={data?.isFav ? '#ff0076' : 'currentColor'}
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Similar items</h2>
          <div className=' mt-6 grid grid-cols-2 gap-4'>
            {data?.relatedProducts.map((product) => (
              <div key={product.id}>
                <div className='h-56 w-full mb-4 bg-slate-300'>
                  <Link href={`/products/${product.id}`}>
                    <a className='block'>
                      {
                        //Todo: Fill with image.
                      }
                    </a>
                  </Link>
                </div>
                <h3 className='text-gray-700 -mb-1'>
                  <Link href={`/products/${product.id}`}>
                    {
                      //Todo: Expand clickable area.
                    }
                    <a className='block'>{product.title}</a>
                  </Link>
                </h3>
                <p className='text-sm font-medium text-gray-900'>
                  ￦ {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;

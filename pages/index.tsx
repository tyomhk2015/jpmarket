import type { NextPage } from 'next';
import FloatingButton from 'components/floating-button';
import Item from 'components/item';
import Layout from 'components/layout';
import useSWR from 'swr';
import { Product, User } from '@prisma/client';
import { useEffect } from 'react';

interface ProductResponse {
  ok: boolean;
  products: ProductResponseWithFav[];
  user: number;
}

interface ProductResponseWithFav extends Product {
  _count: {
    fav: number;
  };
}

const Home: NextPage = () => {
  const { data: productData } = useSWR<ProductResponse>('/api/products');

  useEffect(() => {
    // When user is not logged in or in valid session, redirect the user to login the page.
  }, [productData]);
  return (
    <Layout title='홈' hasTabBar>
      <div className='flex flex-col space-y-5 divide-y'>
        {productData?.products?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            title={product.title}
            price={product.price}
            comments={1}
            hearts={product._count.fav}
          />
        ))}
        <FloatingButton href='/products/upload'>
          <svg
            className='h-6 w-6'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Home;

import type { NextPage } from 'next';
import Image from 'next/image';

const orders: NextPage = () => {
  const imgLoader = ({ src }: {src: string}) => {
    return `https://avatars.githubusercontent.com${src}`;
  }

  return (
    <div className='bg-slate-400 py-20 px-10 grid gap-10'>
      <div className='bg-white p-6 rounded-2xl shadow-xl'>
        <h2 className='font-semibold text-3xl mb-3'>Select Time</h2>
        <div className='flex justify-between'>
          <span className='text-gray-400'>Egros Chair</span>
          <span className='font-semibold'>$5,000</span>
        </div>
        <div className='flex justify-between mt-3'>
          <span className='text-gray-400'>Wooden Chair</span>
          <span className='font-semibold'>$5,000</span>
        </div>
        <div className='flex justify-between mt-3 pt-3 border-t-2 border-dashed'>
          <span>Total</span>
          <span className='font-semibold'>$10,000</span>
        </div>
        <div className='flex justify-center font-bold mt-5 bg-blue-600 text-white py-3 rounded-xl w-1/2 mx-auto'>
          Checkout
        </div>
      </div>
      <div className='bg-white overflow-hidden rounded-2xl shadow-xl'>
        <div className='bg-blue-600 p-6 pb-14'>
          <span className='text-white text-2xl font-semibold'>Profile</span>
        </div>
        <div className='rounded-3xl p-6 bg-white relative -top-5'>
          <div className='flex items-end justify-between relative -top-16'>
            <div className='flex flex-col items-center'>
              <span className='text-sm text-gray-400'>Orders</span>
              <span className='font-semibold'>333</span>
            </div>
            <div className='h-24 w-24 bg-teal-400 rounded-full overflow-hidden'>
              <Image loader={imgLoader} src="/u/35278730?v=4" width="100%" height="100%" alt="Profile image" />
            </div>
            <div className='flex flex-col items-center'>
              <span className='text-sm text-gray-400'>Spent</span>
              <span className='font-semibold'>$2,222</span>
            </div>
          </div>
          <div className='relative -mt-14 -mb-5 flex flex-col items-center'>
            <span className='font-bold'>TYO MHK</span>
            <span>Japan</span>
          </div>
        </div>
      </div>
      <div className='bg-white p-10 rounded-2xl shadow-xl'></div>
      <div className='bg-white p-10 rounded-2xl shadow-xl'></div>
    </div>
  );
};

export default orders;

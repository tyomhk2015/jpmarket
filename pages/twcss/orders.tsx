import type { NextPage } from 'next';
import Image from 'next/image';

const orders: NextPage = () => {
  const imgLoader = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <div className='bg-slate-400 min-h-screen flex items-center place-content-center dark:bg-slate-900'>
    <div className='py-20 px-10'>
      <div className=' grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mx-auto'>
        <div className='bg-white p-6 rounded-2xl shadow-xl dark:border-4 dark:border-dashed dark:border-fuchsia-900'>
          <h2 className='font-semibold text-3xl mb-3'>Select Time</h2>
          <div className='flex justify-between'>
            <span className='text-gray-400'>Egros Chair</span>
            <span className='font-semibold'>$5,000</span>
          </div>
          {['a', 'b', 'c', ''].map((item, index) => {
            return (
              <div key={index} className='flex justify-between mt-3 pt-4 bg-amber-500 empty:bg-teal-400'>
                {item}
              </div>
            );
          })}
          <div className='flex justify-between mt-3'>
            <span className='text-gray-400'>Wooden Chair</span>
            <span className='font-semibold'>$5,000</span>
          </div>
          <div className='flex justify-between mt-3 pt-3 border-t-2 border-dashed'>
            <span>Total</span>
            <span className='font-semibold'>$10,000</span>
          </div>
          <button className='flex justify-center font-bold mt-5 bg-blue-600 text-white py-3 rounded-xl w-1/2 mx-auto hover:bg-blue-200 hover:text-black active:bg-teal-200 transition-colors'>
            Checkout
          </button>
        </div>
        <div className='bg-white overflow-hidden rounded-2xl shadow-xl group dark:border-4 dark:border-dashed dark:border-fuchsia-900'>
          <div className='p-6 pb-14 lg:pt-14 lg:pb-20 group-hover:bg-teal-400 transition-colors landscape:bg-indigo-700 portrait:bg-emerald-600'>
            <span className='text-white text-2xl font-semibold'>Profile</span>
          </div>
          <div className='rounded-3xl p-6 bg-white relative -top-5'>
            <div className='flex items-end justify-between relative -top-16'>
              <div className='flex flex-col items-center'>
                <span className='text-sm text-gray-400'>Orders</span>
                <span className='font-semibold'>333</span>
              </div>
              <div className='h-24 w-24 bg-teal-400 rounded-full relative overflow-hidden'>
                <Image
                  loader={imgLoader}
                  src='https://avatars.githubusercontent.com/u/35278730?v=4'
                  layout='fill'
                  objectFit='cover'
                  alt='Profile image'
                />
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
        <div className='bg-white p-10 rounded-2xl shadow-xl sm:col-span-2 lg:col-span-1 dark:border-4 dark:border-dashed dark:border-fuchsia-900'>
          <div className='flex justify-between items-center mb-5'>
            <span className='shadow-xl p-2 rounded-xl'>???</span>
            <div className='space-x-3'>
              <span>??? 4.5</span>
              <span className='shadow-xl p-2 rounded-xl'>??????</span>
            </div>
          </div>
          <div className='bg-zinc-500 h-60 rounded-3xl mb-5 relative overflow-hidden shadow-lg'>
            <Image
              loader={imgLoader}
              src='https://www.nxp.com/assets/images/en/photography/HOMEPAGE-JP-NXP-SKYLINE.jpeg'
              alt='Profile image'
              layout='fill'
              objectFit='cover'
            />
          </div>
          <div className='flex flex-col'>
            <p className='font-semibold text-lg'>Egros Chair</p>
            <span className='text-xs text-gray-400'>Chair</span>
            <div className='flex justify-between items-center mb-5 mt-3'>
              <div className='space-x-2'>
                <button className='w-5 h-5 rounded-full bg-yellow-500 focus:ring-2 ring-yellow-500 ring-offset-2 transition' />
                <button className='w-5 h-5 rounded-full bg-teal-600 focus:ring-2 ring-teal-600 ring-offset-2 transition' />
                <button className='w-5 h-5 rounded-full bg-red-700 focus:ring-2 ring-red-700 ring-offset-2 transition' />
              </div>
              <div className='flex items-center space-x-4'>
                <button className='bg-blue-200 flex justify-center items-center rounded-xl aspect-square w-8 font-semibold text-gray-400'>
                  -
                </button>
                <span>7</span>
                <button className='bg-blue-200 flex justify-center items-center rounded-xl aspect-square w-8 font-semibold text-gray-400'>
                  +
                </button>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <span className='font-semibold text-2xl'>$777</span>
            <button className='bg-blue-600 text-center rounded-lg p-3 font-semibold text-white text-sm'>
              Add to card
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default orders;

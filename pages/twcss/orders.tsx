import type { NextPage } from 'next';

const orders: NextPage = () => {
  return (
    <div className='bg-slate-400 py-20 px-10 grid gap-10'>
      <div className='bg-white p-6 rounded-2xl shadow-xl'>
        <h2 className='font-semibold text-3xl mb-3'>Select Time</h2>
        <div className='flex justify-between'>
          <span className='text-gray-500'>Egros Chair</span>
          <span className='font-semibold'>$5,000</span>
        </div>
        <div className='flex justify-between mt-3'>
          <span className='text-gray-500'>Wooden Chair</span>
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
      <div className='bg-white p-10 rounded-2xl shadow-xl'></div>
      <div className='bg-white p-10 rounded-2xl shadow-xl'></div>
      <div className='bg-white p-10 rounded-2xl shadow-xl'></div>
    </div>
  );
};

export default orders;

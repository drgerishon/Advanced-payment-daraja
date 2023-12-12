import { useState } from 'react';

const Hero = () => {
  const [email, setEmail] = useState('');
  return (
    <main className='p-5'>
     <div className='flex flex-col items-center mt-16'>
      <h1 className='text-4xl text-center'>Welcome to ghsonplace learning</h1>
      <button className='bg-black text-white p-2.5 w-fit mt-9'>Get Started</button>
    <div className='bg-gray-400 mt-10 w-full h-20 flex justify-between items-center p-5'>
     <div className='h-8 w-8 rounded-full bg-blue-500'></div>
     <div className='h-8 w-8 rounded-full bg-blue-500'></div>
     <div className='h-8 w-8 rounded-full bg-blue-500'></div>
    </div>

    <div className='grid grid-cols-3 gap-2 mt-5 w-full'>
      <div className='bg-violet-500 h-12'>
        
      </div>
      <div className='bg-violet-500 h-12'></div>
      <div className='bg-violet-500 h-12'></div>
      <div className='bg-violet-500 h-12'></div>
      <div className='bg-violet-500 h-12'></div>
    </div>
     </div>
     </main>
  );
};

export default Hero;

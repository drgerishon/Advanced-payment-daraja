import ErrorBoundary from '../utils/ErrorBoundary';

const Header = () => {
    
  const links = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Transaction',
      url: '/payment',
    },
    {
      name: 'About',
      url: '/about',
    },
    {
      name: 'Contact',
      url: '/contact',
    },
  ];
  return (
    <ErrorBoundary>
    <div className="bg-black py-4 flex w-full">
      <span className="text-white font-extrabold text-2xl mx-4">Mpesa Payment</span>
     <div className='flex gap-5 items-center mx-auto'>
     {links.map((item, index) => (
        <div key={index} className='flex items-center text-white'>
            <a href={item.url} className='space-x-4 active:bg-[crimson] hover:underline'>{item.name}</a>
        </div>
      ))}
     </div>
    </div>
    </ErrorBoundary>
  );
};

export default Header;

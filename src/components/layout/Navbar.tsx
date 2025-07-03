'use client';

// import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
// import { Badge } from '../ui/badge';
// import CartButton from '../ui/cart-button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  //   SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Link } from 'react-router';

export default function Navbar() {
  const siteName = 'Redux Library';
  const mobileMenuOpts = [
    { title: 'All Books', url: '/books' },
    { title: 'Create Book', url: '/create-book' },
    { title: 'Borrow Summary', url: '/borrow-summary' },
  ];
  return (
    <nav className='bg-background shadow-sm px-3 py-6 w-full'>
      <div className='flex flex-row justify-between items-center mx-auto w-full container'>
        <div className='flex flex-row gap-5'>
          <Link to={'/'} className='font-bold text-primary text-2xl'>
            {siteName}
          </Link>
        </div>
        <ul className='hidden md:flex flex-row gap-10 font-medium'>
          {mobileMenuOpts.map((item, index) => (
            <li key={index}>
              <Link
                key={index}
                to={item.url}
                className='hover:opacity-85 transition-opacity'
              >
                {item.title}
              </Link>
            </li>
          ))}
          {/* <li>
            <Link to={''} className='hover:opacity-85 transition-opacity'>
              All Books
            </Link>
          </li>
          <li>
            <Link to={''} className='hover:opacity-85 transition-opacity'>
              Sign In
            </Link>
          </li> */}
        </ul>

        <div className='md:hidden flex flex-row justify-center items-center gap-3'>
          <Sheet>
            <SheetTrigger asChild>
              <Button className='md:hidden block' variant='ghost'>
                <Menu className='scale-125' />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className='text-center'>Menu</SheetTitle>

                <ul className='flex flex-col justify-around items-center mx-10 pt-10 h-[400px] text-xl'>
                  {mobileMenuOpts.map((item, index) => (
                    <li key={index}>
                      <SheetClose asChild>
                        <Link to={item.url} className='capitalize'>
                          {item.title}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

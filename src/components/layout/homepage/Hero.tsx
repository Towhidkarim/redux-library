import { Button } from '../../ui/button';
import { siteName } from '@/lib/constants';
import { Link } from 'react-router';
import heroImg from '@/assets/hero.svg';

export default function Hero() {
  return (
    <section className='bg-muted/40 mx-auto px-5 py-10'>
      <div className='flex md:flex-row flex-col-reverse justify-center items-center gap-0 mx-auto container'>
        <div className='flex flex-col justify-center items-center gap-2 my-8 md:w-1/2'>
          <h3 className='font-semibold text-lg'>Want to borrow books?</h3>
          <h1 className='font-bold text-4xl md:text-5xl text-center'>
            Find them on{' '}
            <span className='font-extrabold text-primary'> {siteName}</span>{' '}
          </h1>
          <h4 className='text-lg'>A Library Management Solution</h4>
          <br />
          <Button className='rounded-3xl' size='lg' asChild>
            <Link to='/books'>{`See Books`}</Link>
          </Button>
        </div>
        <div className='relative border w-2/5'>
          <img src={heroImg} alt='' className='w-auto max-h-[400px]' />
        </div>
      </div>
    </section>
  );
}

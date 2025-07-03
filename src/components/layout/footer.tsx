import { siteName } from '@/lib/constants';
export default function Footer() {
  return (
    <footer className='bg-black/90 py-10 text-muted'>
      <div className='mx-auto px-6 md:px-10 container'>
        <div className='gap-8 grid grid-cols-1 md:grid-cols-4'>
          <div className='col-span-2'>
            <h2 className='mb-4 font-bold text-2xl'>{siteName}</h2>
            <p className='text-gray-400'>
              Discover your next great read with us. WE have books for every
              kind of reader.
            </p>
          </div>

          <div>
            <h3 className='mb-4 font-semibold text-xl'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <a href='/books' className='hover:text-gray-300'>
                  All Books
                </a>
              </li>
              <li>
                <a href='/create-book' className='hover:text-gray-300'>
                  Create Book
                </a>
              </li>
              <li>
                <a href='/borrow-summary' className='hover:text-gray-300'>
                  Borrow Summary
                </a>
              </li>
              <li>
                <a href='/' className='hover:text-gray-300'>
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='mb-4 font-semibold text-xl'>Follow Us</h3>
            <div className='flex space-x-4'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-gray-300'
              >
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <path d='M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24H12v-9.293H9.293v-3.707H12V8.707c0-2.879 1.756-4.536 4.321-4.536 1.229 0 2.286.093 2.593.134v3.007h-1.782c-1.4 0-1.671.668-1.671 1.646v2.158h3.342l-.436 3.707h-2.906V24h5.676C23.406 24 24 23.406 24 22.675V1.325C24 .593 23.406 0 22.675 0z' />
                </svg>
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-gray-300'
              >
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.611 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.722 0-4.928 2.206-4.928 4.928 0 .386.043.762.127 1.122C7.691 8.094 4.067 6.13 1.64 3.161c-.423.724-.666 1.562-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.229-.616v.062c0 2.386 1.693 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.317 0-.625-.031-.927-.088.625 1.953 2.444 3.376 4.6 3.415-1.68 1.316-3.809 2.101-6.102 2.101-.396 0-.787-.023-1.175-.069 2.179 1.396 4.768 2.21 7.548 2.21 9.057 0 14.01-7.506 14.01-14.01 0-.213-.005-.426-.014-.637.961-.694 1.796-1.562 2.457-2.549z' />
                </svg>
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-gray-300'
              >
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.33 3.608 1.305.975.975 1.244 2.242 1.305 3.608.059 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.33 2.633-1.305 3.608-.975.975-2.242 1.244-3.608 1.305-1.265.059-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.33-3.608-1.305-.975-.975-1.244-2.242-1.305-3.608-.059-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.33-2.633 1.305-3.608.975-.975 2.242-1.244 3.608-1.305 1.265-.059 1.645-.07 4.849-.07m0-2.163C8.756 0 8.329.012 7.052.07 5.775.129 4.63.38 3.635 1.375c-.996.996-1.247 2.141-1.306 3.418C2.012 6.671 2 7.097 2 12c0 4.903.012 5.329.07 6.606.059 1.276.31 2.422 1.306 3.417.996.996 2.141 1.247 3.418 1.306 1.277.058 1.703.07 6.606.07 4.903 0 5.329-.012 6.606-.07 1.276-.059 2.422-.31 3.417-1.306.996-.996 1.247-2.141 1.306-3.418.058-1.277.07-1.703.07-6.606 0-4.903-.012-5.329-.07-6.606-.059-1.276-.31-2.422-1.306-3.417-.996-.996-2.141-1.247-3.418-1.306C16.329.012 15.903 0 12 0z' />
                  <circle cx='12' cy='12' r='3.516' />
                  <path d='M18.406 4.594a1.44 1.44 0 11-2.879-.001 1.44 1.44 0 012.879.001z' />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className='mt-8 text-gray-500 text-center'>
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

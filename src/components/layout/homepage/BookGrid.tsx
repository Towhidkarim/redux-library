import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Edit, MoveUpRight } from 'lucide-react';
import { useGetAllBooksQuery } from '@/redux/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router';
import BookDeleteButton from '../BookDeleteButton';

export default function BookGrid() {
  const { data, isLoading, isFetching } = useGetAllBooksQuery(undefined);

  if (isLoading || isFetching)
    return <Skeleton className='w-full h-96'></Skeleton>;
  if (data === undefined)
    return <h1 className='mx-auto my-5 font-3xl'>No Data Found</h1>;
  return (
    <div className='mx-auto mb-20 px-4 py-8 container'>
      <div className='mb-8'>
        <h1 className='mx-auto my-5 mt-20 mb-2 font-semibold text-gray-900 text-3xl text-center'>
          Available Books
        </h1>
        <Button
          className='block mx-auto w-44 text-center'
          variant='outline'
          asChild
        >
          <Link to='/books'>View All Books</Link>
        </Button>
        {/* <p className='text-gray-600 text-sm'>Manage your book collection</p> */}
      </div>

      <div className='gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {data.data.map((book) => (
          <Card
            key={book._id}
            className='hover:shadow-md transition-shadow duration-200'
          >
            <CardContent className='group p-4'>
              <Link to={`books/${book._id}`}>
                <div className='relative flex justify-center items-center bg-gray-50 mb-3 p-4 border-2 border-gray-200 rounded-lg hover:outline-2 min-h-[120px] transition-shadow'>
                  <MoveUpRight
                    className='hidden group-hover:visible top-2 right-2 absolute'
                    size={16}
                  />
                  <div className='text-center'>
                    <BookOpen className='mx-auto mb-2 w-8 h-8 text-gray-400' />
                    <h3 className='font-medium text-gray-900 text-sm line-clamp-3 leading-tight'>
                      {book.title}
                    </h3>
                  </div>
                </div>
              </Link>

              <div className='space-y-2 mb-4'>
                <p className='text-gray-600 text-sm line-clamp-1'>
                  by {book.author}
                </p>

                <div className='flex justify-between items-center'>
                  <Badge variant='secondary' className='px-2 py-1 text-xs'>
                    {book.genre}
                  </Badge>
                  <span className='text-gray-500 text-xs'>
                    {book.copies} copies
                  </span>
                </div>

                <div className='flex items-center'>
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      book.available && book.copies > 0
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      book.available && book.copies > 0
                        ? 'text-green-700'
                        : 'text-red-700'
                    }`}
                  >
                    {book.available && book.copies > 0
                      ? 'Available'
                      : 'Not Available'}
                  </span>
                </div>
              </div>

              <div className='flex gap-2'>
                <Button
                  size='sm'
                  className='flex-1 h-8 text-xs'
                  disabled={!(book.available && book.copies > 0)}
                  asChild={book.available && book.copies > 0}
                >
                  <Link to={`/borrow/${book._id}`}>Borrow</Link>
                </Button>
                <Button
                  size='sm'
                  variant='outline'
                  className='bg-transparent px-2 h-8'
                  asChild
                >
                  <Link to={`/edit-book/${book._id}`}>
                    <Edit className='w-3 h-3' />
                  </Link>
                </Button>
                {/* <Button
                  size='sm'
                  variant='outline'
                  className='bg-transparent hover:bg-red-50 px-2 h-8 text-red-600 hover:text-red-700'
                >
                  <Trash2 className='w-3 h-3' />
                </Button> */}
                <BookDeleteButton
                  bookId={book._id!}
                  bookAuthor={book.author}
                  bookTitle={book.title}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { useGetBookByIdQuery } from '@/redux/api';
import { Link, useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Edit } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import BookDeleteButton from '@/components/layout/BookDeleteButton';

export default function ViewBook() {
  const params = useParams();
  const bookID = params.bookId;
  const { data, isLoading } = useGetBookByIdQuery(String(bookID));
  console.log(bookID);

  const ErrorComponent = ({ message }: { message: string }) => (
    <>
      <h1 className='my-10 font-bold text-4xl text-center'>
        Error 404 Not Found
      </h1>
      <h4 className='text-muted-foreground text-sm text-center'>{message}</h4>
    </>
  );

  if (isLoading) return <Skeleton className='w-2xl h-[400px]'></Skeleton>;
  if (!bookID) return <ErrorComponent message='Invalid Book ID' />;

  if (!data) return <ErrorComponent message='Something Went Wrong' />;
  if (data.success == false)
    return (
      <ErrorComponent
        message={`Invalid Book ID: ${bookID} / Book with such ID not found `}
      />
    );

  return (
    <div className='my-10'>
      <h1 className='my-5 font-bold text-4xl text-center'>Book Information</h1>
      <Card className='mx-auto w-full max-w-2xl'>
        <CardHeader>
          <div className='flex justify-between items-start'>
            <div>
              <CardTitle className='mb-2 text-xl'>{data.data.title}</CardTitle>
              <p className='text-muted-foreground'>by {data.data.author}</p>
            </div>
            <Badge variant='outline'>{data.data.genre}</Badge>
          </div>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div>
            <h4 className='mb-2 font-semibold'>Description</h4>
            <p className='text-muted-foreground text-sm leading-relaxed'>
              {data.data.description}
            </p>
          </div>

          <Separator />
          <div className='gap-4 grid grid-cols-2'>
            <div>
              <h4 className='mb-1 font-semibold text-sm'>Book ID</h4>
              <p className='font-mono text-muted-foreground text-sm'>
                {data.data._id}
              </p>
            </div>
            <div>
              <h4 className='mb-1 font-semibold text-sm'>ISBN</h4>
              <p className='font-mono text-muted-foreground text-sm'>
                {data.data.isbn}
              </p>
            </div>
            <div>
              <h4 className='mb-1 font-semibold text-sm'>Copies Available</h4>
              <p
                className={`text-sm font-semibold ${
                  data.data.copies === 0 ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {data.data.copies}
              </p>
            </div>
            <div>
              <h4 className='mb-1 font-semibold text-sm'>Availability</h4>
              <div className='flex items-center'>
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    data.data.available ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    data.data.available ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {data.data.available ? 'Available' : 'Not Available'}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          <div className='flex gap-2 pt-2'>
            <Button
              className='flex-1'
              disabled={!(data.data.available && data.data.copies > 0)}
              asChild={data.data.available && data.data.copies > 0}
            >
              <Link
                to={`/borrow/${data.data._id}`}
                className='flex flex-row flex-1 justify-center items-center gap-2'
              >
                <BookOpen className='mr-2 w-4 h-4' />
                Borrow
              </Link>
            </Button>
            <Button variant='outline' className='' asChild>
              <Link
                to={`/edit-book/${data.data._id}`}
                className='flex flex-row justify-center items-center gap-2'
              >
                <Edit className='mr-2 w-4 h-4' />
                <span>Edit</span>
              </Link>
            </Button>
            {/* <Button
              variant='outline'
              className='bg-transparent hover:bg-red-50 text-red-600 hover:text-red-700'
            >
              <Trash2 className='mr-2 w-4 h-4' />
              Delete
            </Button> */}
            <BookDeleteButton
              bookId={data.data._id!}
              bookAuthor={data.data.author}
              bookTitle={data.data.title}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

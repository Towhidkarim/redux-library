import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, BookOpen, ArrowUpRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllBooksQuery } from '@/redux/api';
import BookDeleteButton from '../BookDeleteButton';
import { Link } from 'react-router';

export default function BooksTable() {
  const { data, isLoading, isFetching } = useGetAllBooksQuery(undefined);

  if (isLoading || isFetching)
    return <Skeleton className='w-full h-96'></Skeleton>;
  if (data === undefined)
    return <h1 className='mx-auto my-5 font-3xl'>No Data Found</h1>;
  return (
    <div className='mx-auto p-6 container'>
      <div className='mb-6'>
        <h1 className='font-bold text-3xl text-center'>All Books</h1>
      </div>

      <div className='border rounded-md'>
        <Table className='border-spacing-4'>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead className='text-center'>Copies</TableHead>
              <TableHead className='text-center'>Availability</TableHead>
              <TableHead className='text-center'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((book) => (
              <TableRow key={book._id} className='group'>
                <TableCell className='font-medium'>
                  <Link
                    to={`${book._id}`}
                    className='flex flex-row gap-1 group-hover:underline'
                  >
                    {book.title}
                    <ArrowUpRight
                      className='opacity-0 group-hover:opacity-100 transition-opacity'
                      size={14}
                    />
                  </Link>
                </TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  <Badge variant='outline'>{book.genre}</Badge>
                </TableCell>
                <TableCell className='font-mono text-sm'>{book.isbn}</TableCell>
                <TableCell className='text-center'>{book.copies}</TableCell>
                <TableCell className='text-center'>
                  {book.available && book.copies > 0 ? (
                    <Badge
                      variant='default'
                      className='bg-green-100 hover:bg-green-100 text-green-800'
                    >
                      Available
                    </Badge>
                  ) : (
                    <Badge variant='destructive'>Not Available</Badge>
                  )}
                </TableCell>
                <TableCell className='text-center'>
                  <div className='flex justify-center gap-2'>
                    <Button
                      size='sm'
                      disabled={!(book.available && book.copies > 0)}
                      asChild={book.available && book.copies > 0}
                    >
                      <Link
                        to={`/borrow/${book._id}`}
                        className='flex flex-row justify-between items-center gap-2'
                      >
                        <BookOpen className='mr-1 w-4 h-4' />
                        Borrow
                      </Link>
                    </Button>
                    <Button size='sm' variant='outline' asChild>
                      <Link to={`/edit-book/${book._id}`}>
                        <Edit className='w-4 h-4' />
                      </Link>
                    </Button>
                    <BookDeleteButton
                      bookAuthor={book.author}
                      bookId={book._id!}
                      bookTitle={book.title}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

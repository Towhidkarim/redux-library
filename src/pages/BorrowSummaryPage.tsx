import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { useGetBorrowSummaryQuery } from '@/redux/api';
import { BookOpen } from 'lucide-react';

export default function BorrowSummary() {
  const { data, isLoading } = useGetBorrowSummaryQuery(undefined);
  if (isLoading) return <Skeleton className='mx-5 w-full h-96'></Skeleton>;
  if (!data || !data.success)
    return <h1 className='font-bold text-4xl'>Borrow Data Not Found</h1>;
  return (
    <div>
      <h1 className='my-10 font-bold text-3xl text-center'>
        Borrowed Books Summary
      </h1>
      <div className='gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 px-4'>
        {data.data.map((item, index) => (
          <Card
            key={index}
            className='hover:shadow-md transition-shadow duration-200'
          >
            <CardContent className='p-4'>
              <div className='flex justify-center items-center bg-gray-50 mb-3 p-4 border-2 border-gray-200 rounded-lg min-h-[100px] transition-shadow'>
                <div className='text-center'>
                  <BookOpen className='mx-auto mb-2 w-8 h-8 text-gray-400' />
                  <h3 className='font-medium text-gray-900 text-sm line-clamp-3 leading-tight'>
                    {item.book.title}
                  </h3>
                </div>
              </div>

              <div className='space-y-2 mb-4'>
                <p className='text-gray-600'>
                  <b className='pr-3'>ISBN Number:</b>
                  {item.book.isbn}
                </p>

                <div className='flex justify-center items-center translate-y-5'>
                  <span className='font-medium'>
                    {item.totalQuantity} copies borrowed
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

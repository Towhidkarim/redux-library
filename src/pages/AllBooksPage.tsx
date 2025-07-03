import BooksTable from '@/components/layout/allbookspage/BooksTable';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllBooksQuery } from '@/redux/api';

export default function AllBooksPage() {
  const { data, isLoading, isFetching } = useGetAllBooksQuery(undefined);

  if (isLoading || isFetching)
    return <Skeleton className='w-full h-96'></Skeleton>;
  if (data === undefined)
    return <h1 className='mx-auto my-5 font-3xl'>No Data Found</h1>;
  return (
    <div className='mt-10 mb-20'>
      <BooksTable />
    </div>
  );
}

import { Skeleton } from '@/components/ui/skeleton';
import { useCreateBorrowBookMutation, useGetBookByIdQuery } from '@/redux/api';
import { useNavigate, useParams } from 'react-router';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function BorrowPage() {
  const params = useParams();
  const navigate = useNavigate();
  const bookID = params.bookId;
  const { data, isLoading } = useGetBookByIdQuery(String(bookID));
  const [createBorrowBook, { isLoading: borrowLoading }] =
    useCreateBorrowBookMutation();

  const formSchema = z.object({
    quantity: z.coerce.number().min(1),
    dueDate: z.date(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
      dueDate: new Date(),
    },
  });

  const formOnSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    const res = await createBorrowBook({
      book: data?.data._id ?? '',
      quantity: values.quantity,
      dueDate: values.dueDate,
    });
    if (res.data?.success) {
      navigate('/');
      toast(`Succesfully borrowed ${values.quantity} book(s)`);
    }
  };

  const onReset = () => {
    form.reset();
    form.clearErrors();
  };

  if (isLoading) return <Skeleton className='w-full h-[400px]'></Skeleton>;
  if (!data || data.data == null)
    return (
      <h1 className='my-10 font-bold text-3xl text-center'>
        Something Went Wrong
      </h1>
    );
  return (
    <div className='mx-auto my-20 px-4 max-w-2xl'>
      <h1 className='mt-10 mb-2 font-bold text-3xl text-center'>
        Borrow Book: {data.data.title}
      </h1>
      <h4 className='mb-10 text-muted-foreground text-base text-center'>
        by <b>{data.data.author}</b> <br />
        <span className='text-sm'>Available Copies: {data.data.copies}</span>
      </h4>
      <h2 className='my-4 font-semibold text-center'>
        {data.data.copies === 0 ? 'No copies available to Borrow' : ''}
      </h2>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formOnSubmit)}
            onReset={onReset}
            className='@container space-y-8'
          >
            <div className='gap-4 grid grid-cols-12'>
              <FormField
                control={form.control}
                name='quantity'
                render={({ field }) => (
                  <FormItem className='flex flex-col items-start self-end gap-2 space-y-0 col-span-12 col-start-auto'>
                    <FormLabel className='flex shrink-0'>
                      Number of Book to borrow
                    </FormLabel>

                    <div className='w-full'>
                      <FormControl>
                        <div className='relative w-full'>
                          <Input
                            placeholder='1'
                            required
                            min={1}
                            max={data.data.copies}
                            type='number'
                            id='quantity'
                            className=' '
                            {...field}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='dueDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col items-start self-end gap-2 space-y-0 col-span-12 col-start-auto'>
                    <FormLabel className='flex shrink-0'>Due Date</FormLabel>

                    <div className='w-full'>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={'outline'}
                              className='justify-start w-full font-normal text-left'
                              id='dueDate'
                              name=''
                            >
                              <CalendarIcon className='mr-2 w-4 h-4' />
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span className='text-muted-foreground'>
                                  Due Date
                                </span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className='p-0 w-auto'>
                            <Calendar
                              mode='single'
                              initialFocus
                              disabled={(date) =>
                                date < new Date() ||
                                date < new Date('1900-01-01')
                              }
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={isLoading || borrowLoading || data.data.copies == 0}
              className='w-full'
              type='submit'
              variant='default'
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

import { Skeleton } from '@/components/ui/skeleton';
import { useGetBookByIdQuery, useUpdateBookByIdMutation } from '@/redux/api';
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { bookSchema } from '@/typeschema/book';

import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

export default function EditBookPage() {
  const navigate = useNavigate();
  const param = useParams();
  const bookID = String(param.bookId);
  const { data, isLoading } = useGetBookByIdQuery(bookID);
  const [updateBook, { isLoading: updateLoading }] =
    useUpdateBookByIdMutation();
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      author: '',
      available: true,
      copies: 0,
      genre: 'FICTION',
      description: '',
      isbn: '',
      title: '',
    },
  });

  useEffect(() => {
    if (data) form.reset(data.data);
  }, [data, form]);

  if (isLoading) return <Skeleton className='w-full h-[400px]'></Skeleton>;
  if (!data?.data)
    return <h1 className='my-10 font-bold text-3xl'>Something Went Wrong!</h1>;

  const bookGenres = [
    'FICTION',
    'NON_FICTION',
    'SCIENCE',
    'HISTORY',
    'BIOGRAPHY',
    'FANTASY',
  ] as const;

  const formOnSubmit = async (values: z.infer<typeof bookSchema>) => {
    const formValues = values;
    if (values.copies > 0) formValues.available = true;
    else formValues.available = false;
    const res = await updateBook({ id: data.data._id!, bookData: formValues });
    if (res.data?.success) {
      navigate('/books');
      toast('Book Updated Succesfully!', {
        description: 'Redirecting to Homepage',
      });
    } else toast('Something Went Wrong');
  };
  const formOnReset = () => {
    form.reset();
    form.clearErrors();
  };

  return (
    <div>
      <h1 className='my-8 font-bold text-3xl text-center'>Modify Book Data</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(formOnSubmit)}
          onReset={formOnReset}
          className='@container space-y-8 mx-auto my-10 px-3 max-w-xl'
        >
          <div className='gap-4 grid grid-cols-12'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='flex flex-col items-start self-end gap-2 space-y-0 col-span-12 col-start-auto'>
                  <FormLabel className='flex shrink-0'>Book Title</FormLabel>

                  <div className='w-full'>
                    <FormControl>
                      <div className='relative w-full'>
                        <Input
                          key='title'
                          placeholder='New Book Title'
                          type='text'
                          id='title'
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
              name='author'
              render={({ field }) => (
                <FormItem className='flex flex-col items-start self-end gap-2 space-y-0 col-span-12 col-start-auto'>
                  <FormLabel className='flex shrink-0'>Author</FormLabel>

                  <div className='w-full'>
                    <FormControl>
                      <div className='relative w-full'>
                        <Input
                          key='author'
                          placeholder='Author Name'
                          type='text'
                          id='author'
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
              name='copies'
              render={({ field: { onChange, ...field } }) => (
                <FormItem className='flex flex-col items-start self-end gap-2 space-y-0 col-span-12 col-start-auto'>
                  <FormLabel className='flex shrink-0'>
                    Available Copies
                  </FormLabel>

                  <div className='w-full'>
                    <FormControl>
                      <div className='relative w-full'>
                        <Input
                          key='copies'
                          min={0}
                          placeholder=''
                          type='number'
                          id='copies'
                          className=' '
                          {...field}
                          required
                          onChange={(e) => onChange(Number(e.target.value))}
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
              name='genre'
              render={({ field }) => (
                <FormItem className='flex flex-col items-start self-end gap-2 space-y-0 col-span-12 col-start-auto'>
                  <FormLabel className='flex shrink-0'>Book Genre</FormLabel>

                  <div className='w-full'>
                    <FormControl>
                      <Select
                        key='genre'
                        // id="genre"
                        // className=""
                        {...field}
                        value={data.data.genre}
                        defaultValue={data.data.genre}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue
                            placeholder={data.data.genre}
                            defaultValue={data.data.genre}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {bookGenres.map((value) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isbn'
              render={({ field }) => (
                <FormItem className='flex flex-col items-start self-end gap-2 space-y-0 col-span-12 col-start-auto'>
                  <FormLabel className='flex shrink-0'>ISBN</FormLabel>

                  <div className='w-full'>
                    <FormControl>
                      <div className='relative w-full'>
                        <Input
                          key='isbn'
                          placeholder='ISBN number'
                          type='text'
                          id='isbn'
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
              name='description'
              render={({ field }) => (
                <FormItem className='flex flex-col items-start self-end gap-2 space-y-0 col-span-12 col-start-auto'>
                  <FormLabel className='flex shrink-0'>Description</FormLabel>

                  <div className='w-full'>
                    <FormControl>
                      <Textarea
                        key='description'
                        id='description'
                        placeholder='Book description here.....'
                        className=''
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className='w-full'>
            <Button
              id='submit'
              disabled={isLoading}
              name='submit'
              className='rounded-xl w-full'
              type='submit'
              variant='default'
            >
              {updateLoading ? (
                <Loader2 className='animate-spin' />
              ) : (
                'Edit Book'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

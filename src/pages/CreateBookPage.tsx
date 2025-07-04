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
import { useCreateBookMutation } from '@/redux/api';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function CreateBook() {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();

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
  const bookGenres = [
    'FICTION',
    'NON_FICTION',
    'SCIENCE',
    'HISTORY',
    'BIOGRAPHY',
    'FANTASY',
  ] as const;

  const formOnSubmit = async (values: z.infer<typeof bookSchema>) => {
    console.log(values);
    const formValues = values;
    if (values.copies > 0) formValues.available = true;
    else formValues.available = false;
    const res = await createBook(formValues);
    if (res.data?.success) {
      toast('Book Created Succesfully!', {
        description: 'Redirecting to All Books Page',
      });
      setTimeout(() => navigate('/books'), 500);
    } else toast('Something Went Wrong');
  };
  const formOnReset = () => {
    form.reset();
    form.clearErrors();
  };

  return (
    <div>
      <h1 className='my-8 font-bold text-3xl text-center'>Add New Book</h1>
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
                          placeholder=''
                          min={0}
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
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='' />
                        </SelectTrigger>
                        <SelectContent>
                          {bookGenres.map((value) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}

                          {/* <SelectItem key='NON_FICTION' value='NON_FICTION'>
                            NON_FICTION
                          </SelectItem>

                          <SelectItem key='SCIENCE' value='SCIENCE'>
                            SCIENCE
                          </SelectItem>

                          <SelectItem key='HISTORY' value='HISTORY'>
                            HISTORY
                          </SelectItem>

                          <SelectItem key='BIOGRAPHY' value='BIOGRAPHY'>
                            BIOGRAPHY
                          </SelectItem>

                          <SelectItem key='FANTASY' value='FANTASY'>
                            FANTASY
                          </SelectItem> */}
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
              {isLoading ? <Loader2 className='animate-spin' /> : 'Create Book'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

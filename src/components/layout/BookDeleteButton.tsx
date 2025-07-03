import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteBookByIdMutation } from '@/redux/api';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function BookDeleteButton({
  bookId,
  bookTitle,
  bookAuthor,
}: {
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
}) {
  const [open, setOpen] = useState(false);
  const [deleteBookAction, { isLoading }] = useDeleteBookByIdMutation();
  const deleteBook = async () => {
    const res = await deleteBookAction(bookId);
    if (res.data?.success === true) {
      toast('Book Deleted Succesfully!');
      setOpen(false);
    } else {
      toast('Invalid ID! or something went wrong');
      setOpen(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size='sm'
          variant='outline'
          className='bg-transparent hover:bg-red-50 px-2 h-8 text-red-600 hover:text-red-700'
        >
          <Trash2 className='w-3 h-3' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the book:{' '}
            <br />
            <span className='my-5'>
              <b className='text-base'>{bookTitle}</b> <br />
              with author <b>{bookAuthor}</b>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          <Button
            className='bg-destructive'
            disabled={isLoading}
            onClick={async () => deleteBook()}
          >
            {isLoading ? <Loader2 className='animate-spin' /> : 'Delete Book'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

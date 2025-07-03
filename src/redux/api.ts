import type { TBookSchema } from '@/typeschema/book';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type allBookResponse = {
  success: boolean;
  message: string;
  data: TBookSchema[];
};
type singleBookResponse = {
  success: boolean;
  message: string;
  data: TBookSchema;
};
type createBookresponse = {
  success: boolean;
  message: string;
  data: TBookSchema;
};
type borrowSummaryResponse = {
  success: boolean;
  message: string;
  data: {
    totalQuantity: number;
    book: {
      title: string;
      isbn: string;
    };
  }[];
};
type updateBookResponse = singleBookResponse;

type borrowResponse = {
  success: boolean;
  message: string;
};

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['all-books', 'borrow'],
  endpoints: (builder) => ({
    getAllBooks: builder.query<allBookResponse, undefined>({
      query: () => `books`,
      providesTags: ['all-books'],
    }),
    getBookById: builder.query<singleBookResponse, string>({
      query: (id) => `books/${id}`,
      providesTags: ['all-books'],
    }),
    getBorrowSummary: builder.query<borrowSummaryResponse, undefined>({
      query: () => `borrow`,
      providesTags: ['borrow'],
    }),
    updateBookById: builder.mutation<
      updateBookResponse,
      { id: string; bookData: Partial<TBookSchema> }
    >({
      query: ({ id, bookData }) => ({
        url: `books/${id}`,
        method: 'PUT',
        body: bookData,
      }),
      invalidatesTags: ['all-books'],
    }),
    deleteBookById: builder.mutation<
      { success: boolean; message: string; data: null },
      string
    >({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['all-books'],
    }),
    createBook: builder.mutation<createBookresponse, TBookSchema>({
      query: (bookData) => ({
        url: `books`,
        method: 'POST',
        body: bookData,
      }),
      invalidatesTags: ['all-books'],
    }),
    createBorrowBook: builder.mutation<
      borrowResponse,
      { book: string; quantity: number; dueDate: Date }
    >({
      query: ({ book, quantity, dueDate }) => ({
        url: `borrow`,
        method: 'POST',
        body: { book, quantity, dueDate },
      }),
      invalidatesTags: ['borrow', 'all-books'],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useDeleteBookByIdMutation,
  useCreateBookMutation,
  useUpdateBookByIdMutation,
  useGetBorrowSummaryQuery,
  useCreateBorrowBookMutation,
} = bookApi;

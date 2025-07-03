import { createBrowserRouter } from 'react-router';
import App from './App';
import Homepage from './pages/Homepage';
import AllBooksPage from './pages/AllBooksPage';
import CreateBook from './pages/CreateBookPage';
import ViewBook from './pages/ViewBookPage';
import BorrowSummary from './pages/BorrowSummaryPage';
import EditBookPage from './pages/EditBookPage';
import BorrowPage from './pages/BorrowPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Homepage },
      { path: '/books', Component: AllBooksPage },
      { path: '/create-book', Component: CreateBook },
      { path: '/books/:bookId', Component: ViewBook },
      { path: '/borrow-summary', Component: BorrowSummary },
      { path: '/edit-book/:bookId', Component: EditBookPage },
      { path: '/borrow/:bookId', Component: BorrowPage },
    ],
  },
]);

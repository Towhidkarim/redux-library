import { Outlet } from 'react-router';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/footer';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <>
      <Navbar />
      <Toaster position='top-center' />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

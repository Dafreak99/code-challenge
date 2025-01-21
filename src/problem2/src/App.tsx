import { CurrencySwapForm } from './components/CurrencySwapForm';
import { Toaster } from './components/ui/toaster';

const App = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <div className='w-full max-w-md'>
        <h1 className='text-4xl font-bold mb-8 text-center'>Currency Swap</h1>
        <CurrencySwapForm />
      </div>
      <Toaster />
    </main>
  );
};

export default App;

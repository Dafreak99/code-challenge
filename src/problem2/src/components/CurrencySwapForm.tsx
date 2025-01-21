'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ArrowDownUp, CircleCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency, calculateExchangeRate } from '@/lib/utils';
import { useTokenPrices } from '@/hooks/useTokenPrices';
import TokenSelector, { Token } from './TokenSelector';
import { AlertDialog } from './AlertDialog';
import { useToast } from '@/hooks/useToast';

interface SwapFormData {
  fromAmount: string;
  toAmount: string;
}

export const CurrencySwapForm = () => {
  const { data: tokenPrices, isLoading, error } = useTokenPrices();
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);

  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<SwapFormData>({
    defaultValues: {
      fromAmount: '',
      toAmount: '',
    },
  });

  const fromAmount = watch('fromAmount');
  const toAmount = watch('toAmount');

  useEffect(() => {
    if (fromToken && toToken) {
      const rate = calculateExchangeRate(fromToken.price, toToken.price);
      setExchangeRate(rate);
    }
  }, [fromToken, toToken]);

  useEffect(() => {
    if (fromAmount && exchangeRate) {
      setValue('toAmount', (parseFloat(fromAmount) * exchangeRate).toFixed(6));
    }
  }, [fromAmount, exchangeRate, setValue]);

  const onSubmit = (data: SwapFormData) => {
    console.log('Swap submitted:', data);

    setIsSwapping(true);

    setTimeout(() => {
      // Reset loading
      setIsSwapping(false);

      // Show success toast
      toast({
        action: (
          <div className='w-full flex items-center'>
            <CircleCheck className='h-6 w-6 text-green-500 mr-2' />
            <span className='first-letter:capitalize'>
              Swapped {fromToken?.currency} to {toToken?.currency} successfully!
            </span>
          </div>
        ),
      });

      // Reset state
      setFromToken(null);
      setToToken(null);
      setExchangeRate(null);
      setValue('fromAmount', '');
      setValue('toAmount', '');
    }, 3000);
    // Here you would typically send the swap request to your backend
  };

  const handleFromTokenSelect = (token: Token) => {
    setFromToken(token);
    if (toToken) {
      const rate = calculateExchangeRate(token.price, toToken.price);
      setExchangeRate(rate);
    }
  };

  const handleToTokenSelect = (token: Token) => {
    setToToken(token);
    if (fromToken) {
      const rate = calculateExchangeRate(fromToken.price, token.price);
      setExchangeRate(rate);
    }
  };

  const swapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setValue('fromAmount', toAmount);
    setValue('toAmount', fromAmount);
  };

  if (isLoading) return <div>Loading token prices...</div>;
  if (error) return <div>Error loading token prices</div>;

  const tokens = tokenPrices?.filter((token) => token.price) || [];

  const cancelFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const triggerSubmit = async () => {
    // Optionally trigger validation before submission
    const isValid = await trigger(); // Returns true if form is valid
    if (isValid) {
      // Manually trigger form submission if valid
      handleSubmit(onSubmit)();
    } else {
      console.log('Form has errors!');
    }
  };

  return (
    <form onSubmit={cancelFormSubmit} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='fromAmount'>From</Label>
        <div className='flex space-x-2'>
          <div className='w-2/3'>
            <Controller
              name='fromAmount'
              control={control}
              rules={{
                required: 'Amount is required',
                pattern: { value: /^\d*\.?\d*$/, message: 'Invalid number' },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type='number'
                  placeholder='0.00'
                  className={errors.fromAmount ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.fromAmount && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.fromAmount.message}
              </p>
            )}
          </div>
          <div className='w-1/3'>
            <TokenSelector
              tokens={tokens}
              selectedToken={fromToken}
              onSelect={handleFromTokenSelect}
            />
          </div>
        </div>
      </div>

      <div className='flex justify-center'>
        <Button
          type='button'
          variant='outline'
          size='icon'
          onClick={swapTokens}
          className='transition duration-300 ease-in-out transform hover:scale-105'
        >
          <ArrowDownUp className='h-4 w-4' />
        </Button>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='toAmount'>To</Label>
        <div className='flex space-x-2'>
          <div className='w-2/3'>
            <Controller
              name='toAmount'
              control={control}
              rules={{
                required: 'Amount is required',
                pattern: { value: /^\d*\.?\d*$/, message: 'Invalid number' },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type='number'
                  placeholder='0.00'
                  className={
                    errors.toAmount ? 'border-red-500' : 'cursor-not-allowed'
                  }
                  readOnly
                />
              )}
            />
            {errors.toAmount && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.toAmount.message}
              </p>
            )}
          </div>
          <div className='w-1/3'>
            <TokenSelector
              tokens={tokens}
              selectedToken={toToken}
              onSelect={handleToTokenSelect}
            />
          </div>
        </div>
      </div>

      {exchangeRate && (
        <div className='text-sm text-gray-500'>
          Exchange Rate: 1 {fromToken?.currency} ={' '}
          {formatCurrency(exchangeRate)} {toToken?.currency}
        </div>
      )}

      <AlertDialog onConfirm={triggerSubmit}>
        <Button
          type='submit'
          className='w-full'
          disabled={
            !fromToken ||
            !toToken ||
            !fromAmount ||
            isSwapping ||
            Object.keys(errors).length > 0
          }
        >
          {isSwapping ? (
            <>
              <Loader2 className='animate-spin' />
              Processing
            </>
          ) : (
            'Swap'
          )}
        </Button>
      </AlertDialog>
    </form>
  );
};

export default CurrencySwapForm;

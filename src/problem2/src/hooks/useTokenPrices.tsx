import { Token } from '@/components/TokenSelector';
import { useQuery } from '@tanstack/react-query';

interface TokenPrice {
  currency: string;
  price: number;
  date: string;
}

export function useTokenPrices() {
  return useQuery<TokenPrice[]>({
    queryKey: ['tokenPrices'],
    queryFn: async () => {
      const response = await fetch(
        'https://interview.switcheo.com/prices.json',
      );

      if (!response.ok) {
        throw new Error('Failed to fetch token prices');
      }

      const map: Record<string, boolean> = {};
      let tokens = await response.json();

      tokens = tokens.filter((token: Token) => {
        if (token.currency in map) {
          return false;
        } else {
          map[token.currency] = true;
          return true;
        }
      });

      console.log('tokens', tokens);

      return tokens;
    },

    refetchInterval: 60000, // Refetch every minute
  });
}

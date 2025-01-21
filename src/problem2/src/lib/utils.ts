import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names into a single string, merging Tailwind CSS classes.
 *
 * @param inputs - A list of class names to combine.
 * @returns A single string containing the combined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as currency using the US locale.
 *
 * @param amount - The amount of money to format.
 * @returns A string representing the formatted currency.
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(amount);
};

/**
 * Calculates the exchange rate between two prices.
 *
 * @param fromPrice - The price of the currency being exchanged from.
 * @param toPrice - The price of the currency being exchanged to.
 * @returns The exchange rate as a number.
 */
export const calculateExchangeRate = (
  fromPrice: number,
  toPrice: number,
): number => {
  return fromPrice / toPrice;
};

/**
 * Handles special cases for token icons when its currency name is different from the icon name.
 *
 * @param currency - The currency name to format.
 * @returns The formatted token icon name.
 */
export const formatTokenIconName = (currency: string) => {
  const map: Record<string, string> = {
    STEVMOS: 'stEVMOS',
    RATOM: 'rATOM',
    STOSMO: 'stOSMO',
    STLUNA: 'stLUNA',
    STATOM: 'stATOM',
  };

  return currency in map ? map[currency] : currency;
};

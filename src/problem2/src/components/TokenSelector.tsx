import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import TokenIcon from './TokenIcon';

export interface Token {
  currency: string;
  price: number;
}

interface TokenSelectorProps {
  tokens: Token[];
  selectedToken: Token | null;
  onSelect: (token: Token) => void;
}

const TokenSelector = ({
  tokens,
  selectedToken,
  onSelect,
}: TokenSelectorProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
        >
          {selectedToken ? (
            <div className='flex items-center'>
              <TokenIcon
                currency={selectedToken.currency}
                width={24}
                height={24}
                className='mr-2'
              />

              {selectedToken.currency}
            </div>
          ) : (
            'Select token'
          )}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0 h-[300px] overflow-auto'>
        <Command>
          <CommandInput placeholder='Search token...' />
          <CommandEmpty>No token found.</CommandEmpty>
          <CommandGroup className='overflow-scroll'>
            {tokens.map((token) => (
              <CommandItem
                key={token.currency}
                onSelect={() => {
                  onSelect(token);
                  setOpen(false);
                }}
              >
                <div className='flex items-center'>
                  <TokenIcon
                    currency={token.currency}
                    width={24}
                    height={24}
                    className='mr-2'
                  />

                  {token.currency}
                </div>
                <Check
                  className={cn(
                    'ml-auto h-4 w-4',
                    selectedToken?.currency === token.currency
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TokenSelector;

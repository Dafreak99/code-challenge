import { cn, formatTokenIconName } from '@/lib/utils';

interface TokenIconProps {
  currency: string;
  width: number;
  height: number;
  className: string;
}

const TokenIcon = ({ currency, width, height, className }: TokenIconProps) => {
  return (
    <img
      src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${formatTokenIconName(
        currency,
      )}.svg`}
      alt={currency}
      width={width}
      height={height}
      className={cn('mr-2', className)}
    />
  );
};

export default TokenIcon;

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

const priorityMap = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    return priorityMap[blockchain] || -99;
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        // Filter balances that have a non-positive amount and a valid blockchain priority
        const priority = getPriority(balance.blockchain);
        return priority > -99 && balance.amount <= 0;
      })
      .sort((leftBalance: WalletBalance, rightBalance: WalletBalance) => {
        // Sort based on the priority of the blockchain (descending order)
        return (
          getPriority(rightBalance.blockchain) -
          getPriority(leftBalance.blockchain)
        );
      });
  }, [balances, prices]);

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      const formattedValue = balance.amount.toFixed();
      const key = `${balance.currency}-${balance.amount}-${index}`;

      return (
        <WalletRow
          className={classes.row}
          key={key}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={formattedValue}
        />
      );
    },
  );

  return <div {...rest}>{rows}</div>;
};

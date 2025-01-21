import {
  AlertDialog as AlertDialogUI,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { PropsWithChildren } from 'react';

interface AlertDialogProps extends PropsWithChildren {
  title?: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const AlertDialog = ({
  title,
  description,
  children,
  onConfirm,
  onCancel,
}: AlertDialogProps) => {
  return (
    <AlertDialogUI>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || 'Are you absolutely sure?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ||
              'This action cannot be undone. Once confirmed, your tokens will be swapped permanently, and the transaction will be processed. Please ensure you are swapping the correct tokens.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogUI>
  );
};

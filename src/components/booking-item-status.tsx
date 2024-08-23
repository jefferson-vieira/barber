import { Badge, type BadgeProps } from '@/components/ui/badge';
import { isFuture } from 'date-fns';

enum Status {
  BOOKED = 'Confirmado',
  DONE = 'Finalizado',
}

const STATUS_VARIANT_MAP: Record<Status, BadgeProps['variant']> = {
  [Status.BOOKED]: 'default',
  [Status.DONE]: 'secondary',
};

interface Props {
  date: Date;
}

export default function BookingItemStatus({ date }: Props) {
  const status = isFuture(date) ? Status.BOOKED : Status.DONE;

  return (
    <Badge className="w-fit" variant={STATUS_VARIANT_MAP[status]}>
      {status}
    </Badge>
  );
}

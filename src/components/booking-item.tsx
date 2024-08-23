import BookingItemStatus from '@/components/booking-item-status';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Prisma } from '@prisma/client';

interface Props {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>;
}

export default function BookingItem({ booking }: Props) {
  const { date, service } = booking;

  const month = date.toLocaleString('pt-br', { month: 'long' });

  const day = date.toLocaleString('pt-br', { day: '2-digit' });

  const time = date.toLocaleTimeString('pt-br', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const { barbershop } = service;

  return (
    <Card>
      <CardContent className="flex justify-between p-0 px-5">
        <div className="flex flex-col gap-2 py-5">
          <BookingItemStatus date={date} />

          <h3 className="font-semibold">{service.name}</h3>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={barbershop.imageUrl} />
            </Avatar>

            <p className="text-sm">{barbershop.name}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-l-2 border-solid pl-5">
          <p className="text-sm capitalize">{month}</p>

          <p className="text-2xl">{day}</p>

          <p className="text-sm">{time}</p>
        </div>
      </CardContent>
    </Card>
  );
}

import BookingItemStatus from '@/components/booking-item-status';
import BookingSummary from '@/components/booking-summary';
import PhoneItem from '@/components/phone-item';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Prisma } from '@prisma/client';
import Image from 'next/image';

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

  const bookingItemStatus = <BookingItemStatus date={date} />;

  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card>
          <CardContent className="flex justify-between p-0 px-5">
            <div className="flex flex-col gap-2 py-5">
              {bookingItemStatus}

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
      </SheetTrigger>

      <SheetContent className="w-11/12 overflow-y-auto">
        <div className="space-y-6">
          <SheetHeader>
            <SheetTitle className="text-left">
              Informações da reserva
            </SheetTitle>
          </SheetHeader>

          <hr />

          <div className="relative w-full pt-[55%]">
            <Image
              alt={`Mapa da barbearia ${barbershop.name}`}
              src="/map.png"
              fill
              className="object-cover"
            />

            <Card className="absolute inset-x-3 bottom-5 rounded-xl">
              <CardContent className="flex gap-3 px-5 py-3">
                <Avatar>
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>

                <div>
                  <h3 className="font-bold">{barbershop.name}</h3>

                  <p className="text-xs">{barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {bookingItemStatus}

          <BookingSummary barbershopService={service} date={date} time={time} />

          <div className="space-y-3">
            {barbershop.phones.map((phone, i) => (
              <PhoneItem key={i} phone={phone} />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

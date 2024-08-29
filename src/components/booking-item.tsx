'use client';

import { Time } from '@/@types/time';
import deleteBooking from '@/actions/booking/delete';
import BookingItemStatus from '@/components/booking-item-status';
import BookingSummary from '@/components/booking-summary';
import PhoneItem from '@/components/phone-item';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { toast } from '@/components/ui/use-toast';
import { Prisma } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';

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
  defaultOpen?: boolean;
}

export default function BookingItem({ booking, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const handleBookingCancelClick = async () => {
    try {
      await deleteBooking(booking.id);

      toast({
        description: 'Reserva cancelada com sucesso!',
      });

      setOpen(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: 'Erro ao cancelar reserva.',
      });

      console.error(error);
    }
  };

  const { date, service } = booking;

  const month = date.toLocaleString('pt-br', { month: 'long' });

  const day = date.toLocaleString('pt-br', { day: '2-digit' });

  const time = date.toLocaleTimeString('pt-br', {
    hour: '2-digit',
    minute: '2-digit',
  }) as Time;

  const { barbershop } = service;

  const bookingItemStatus = <BookingItemStatus date={date} />;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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

          <SheetFooter className="grid grid-cols-2 gap-3">
            <SheetClose asChild>
              <Button variant="outline">Voltar</Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Cancelar reserva</Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="w-11/12 rounded-xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancelar Reserva</AlertDialogTitle>

                  <AlertDialogDescription>
                    Tem certeza que deseja cancelar esse agendamento?
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="grid grid-cols-2 items-end gap-3">
                  <AlertDialogCancel>Voltar</AlertDialogCancel>

                  <AlertDialogAction
                    className={buttonVariants({ variant: 'destructive' })}
                    onClick={handleBookingCancelClick}
                  >
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

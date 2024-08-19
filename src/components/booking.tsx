'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';
import { Card, CardContent } from '@/components/ui/card';
import { TIME_SLOTS } from '@/constants';
import { Prisma } from '@prisma/client';
import { format, set } from 'date-fns';
import createBooking from '@/actions/booking/create';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import getFreeBookingTimes from '@/actions/booking/get-free-booking-times';

interface Props {
  barbershopService: Prisma.BarbershopServiceGetPayload<{
    include: { barbershop: true };
  }>;
}

export default function Booking({ barbershopService }: Props) {
  const { data } = useSession();

  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  const [selectedDay, setSelectedDay] = useState<Date>();
  const [selectedTime, setSelectedTime] =
    useState<(typeof TIME_SLOTS)[number]>();

  const [freeTimes, setFreeTimes] = useState<
    Awaited<ReturnType<typeof getFreeBookingTimes>>
  >([]);

  useEffect(() => {
    async function fetchFreeBookingSlots() {
      if (!selectedDay) {
        return;
      }

      const bookings = await getFreeBookingTimes({
        date: selectedDay,
      });

      setFreeTimes(bookings);
    }

    fetchFreeBookingSlots();

    // TODO Abort query (in future), see https://github.com/prisma/prisma/issues/15594
  }, [selectedDay]);

  const handleDaySelect: SelectSingleEventHandler = (day) => {
    setSelectedDay(day);
  };

  const handleTimeSelect = (time: (typeof TIME_SLOTS)[number]) => {
    setSelectedTime(time);
  };

  const handleCreateBookingClick = async () => {
    const [hours, minutes] = selectedTime!.split(':').map(Number);

    try {
      await createBooking({
        serviceId: barbershopService.id,
        // TODO: ensure user sign-in
        // @ts-ignore
        userId: data.user.id,
        date: set(selectedDay!, { hours, minutes }),
      });

      toast({
        description: 'Reserva criada com sucesso!',
      });

      handleClose();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: 'Erro ao criar reserva.',
      });

      console.error(error);
    }
  };

  const handleClose = () => {
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setFreeTimes([]);
    setOpen(false);
  };

  const { name, barbershop } = barbershopService;

  const price = Number(barbershopService.price).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        Reservar
      </Button>

      <SheetContent className="w-full overflow-y-auto">
        <div className="space-y-6">
          <SheetHeader>
            <SheetTitle className="text-left">Fazer reserva</SheetTitle>
          </SheetHeader>

          <hr />

          <Calendar
            mode="single"
            locale={ptBR}
            selected={selectedDay}
            onSelect={handleDaySelect}
            styles={{
              head_cell: {
                width: '100%',
                textTransform: 'capitalize',
              },
              cell: {
                width: '100%',
              },
              button: {
                width: '100%',
              },
              nav_button_previous: {
                width: '2rem',
                height: '2rem',
              },
              nav_button_next: {
                width: '2rem',
                height: '2rem',
              },
              caption: {
                textTransform: 'capitalize',
              },
            }}
          />

          {selectedDay && (
            <>
              <hr />

              <div className="no-scrollbar flex gap-3 overflow-x-auto">
                {freeTimes.map((timeSlot, i) => {
                  const isSelected = timeSlot === selectedTime;

                  return (
                    <Button
                      key={i}
                      variant={isSelected ? 'default' : 'outline'}
                      className="rounded-full"
                      onClick={() => handleTimeSelect(timeSlot)}
                    >
                      {timeSlot}
                    </Button>
                  );
                })}
              </div>
            </>
          )}

          {selectedTime && (
            <>
              <hr />

              <Card>
                <CardContent className="p-3">
                  <table className="w-full border-separate border-spacing-y-3">
                    <thead>
                      <tr>
                        <th align="left" className="font-bold">
                          {name}
                        </th>

                        <th align="right" className="text-sm font-bold">
                          {price}
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-sm">
                      <tr>
                        <td className="text-gray-400" align="left">
                          Data
                        </td>

                        <td align="right">
                          {format(selectedDay!, "d 'de' MMMM", {
                            locale: ptBR,
                          })}
                        </td>
                      </tr>

                      <tr>
                        <td className="text-gray-400" align="left">
                          Horário
                        </td>

                        <td align="right">{selectedTime}</td>
                      </tr>

                      <tr>
                        <td className="text-gray-400" align="left">
                          Barbearia
                        </td>

                        <td align="right">{barbershop.name}</td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </>
          )}

          <SheetFooter>
            <Button disabled={!selectedTime} onClick={handleCreateBookingClick}>
              Confirmar
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

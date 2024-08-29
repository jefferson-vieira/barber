import BookingItem from '@/components/booking-item';
import db from '@/config/db';
import { auth } from '@/helpers/auth';

interface Props {
  searchParams: {
    bookingId?: string;
  };
}

export default async function BookingsPage({ searchParams }: Props) {
  const session = await auth();

  if (!session?.user) {
    // TODO sign-in
    return null;
  }

  const now = new Date();

  const [booked, done] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: session.user.id,
        date: {
          gt: now,
        },
      },
      include: {
        service: {
          include: {
            barbershop: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    }),
    db.booking.findMany({
      where: {
        userId: session.user.id,
        date: {
          lte: now,
        },
      },
      include: {
        service: {
          include: {
            barbershop: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    }),
  ]);

  const hasBookings = booked.length || done.length;

  const { bookingId } = searchParams;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Agendamentos</h1>

      {hasBookings ? (
        <>
          {booked.length ? (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase text-gray-400">
                Confirmados
              </h2>

              <div className="space-y-3">
                {booked.map((booking) => (
                  <BookingItem
                    key={booking.id}
                    booking={booking}
                    defaultOpen={booking.id === bookingId}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {done.length ? (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase text-gray-400">
                Finalizados
              </h2>

              <div className="space-y-3">
                {done.map((booking) => (
                  <BookingItem
                    key={booking.id}
                    booking={booking}
                    defaultOpen={booking.id === bookingId}
                  />
                ))}
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <p className="text-gray-400">Você não tem agendamentos.</p>
      )}
    </div>
  );
}

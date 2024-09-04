import BarbershopItem from '@/components/barbershop-item';
import BookingItem from '@/components/booking-item';
import QuickSearchLink from '@/components/quick-search-link';
import Search from '@/components/search';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { QUICK_SEARCH_OPTIONS } from '@/constants';
import { getBarbershops, getPopularBarbershops } from '@/data/barbershop';
import { auth } from '@/helpers/auth';
import { SearchIcon } from 'lucide-react';
import { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBookings } from '@/data/bookings';

export default async function Home() {
  const session = await auth();

  const now = new Date();

  const today = now.toLocaleString('pt-br', { dateStyle: 'full' });

  const [bookings, barbershops, popularBarbershops] = await Promise.all([
    session?.user ? getBookings() : [],
    getBarbershops(),
    getPopularBarbershops(),
  ]);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl">
          Olá,{' '}
          {session?.user ? (
            <span className="font-bold">{session.user.name}</span>
          ) : (
            <Link
              className="hover:underline"
              href={'/login?callbackUrl=/' as Route}
            >
              Faça seu Login
            </Link>
          )}
          !
        </h2>

        <p>{today}</p>
      </section>

      <Search />

      <section className="no-scrollbar flex gap-3 overflow-auto">
        {QUICK_SEARCH_OPTIONS.map((option, i) => (
          <QuickSearchLink
            key={i}
            className="gap-2"
            variant="secondary"
            option={option}
          />
        ))}
      </section>

      <div className="relative h-[calc(100vw/7*3)] w-full">
        <Image
          alt="Agende nos melhores com FSW Barber"
          src="home-banner.svg"
          fill
          className="rounded-xl object-cover"
        />
      </div>

      {bookings.length ? (
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Agendamentos
          </h2>

          <div className="space-y-3">
            {bookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <div className="no-scrollbar flex gap-4 overflow-auto">
          {barbershops.map((barbershop) => (
            <BarbershopItem
              key={barbershop.id}
              barbershop={barbershop}
              className="min-w-[calc(100vw/3*2)]"
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase text-gray-400">Populares</h2>

        <div className="no-scrollbar flex gap-4 overflow-auto">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem
              key={barbershop.id}
              barbershop={barbershop}
              className="min-w-[calc(100vw/3*2)]"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

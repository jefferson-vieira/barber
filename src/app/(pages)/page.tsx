import BarbershopItem from '@/components/barbershop-item';
import BookingItem from '@/components/booking-item';
import QuickSearchLink from '@/components/quick-search-link';
import Search from '@/components/search';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import db from '@/config/db';
import { QUICK_SEARCH_OPTIONS } from '@/constants';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const today = new Date().toLocaleString('pt-br', { dateStyle: 'full' });

  const barbershops = await db.barbershop.findMany();

  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  });

  return (
    <div className="flex flex-col gap-6 p-5">
      <section>
        <h2 className="text-xl font-bold">Hello world</h2>

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

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>

        <BookingItem />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <div className="no-scrollbar flex gap-4 overflow-auto">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-bold uppercase text-gray-400">Populares</h2>

        <div className="no-scrollbar flex gap-4 overflow-auto">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </section>
    </div>
  );
}

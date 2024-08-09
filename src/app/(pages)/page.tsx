import BookingItem from '@/components/booking-item';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const today = new Date().toLocaleString('pt-br', { dateStyle: 'full' });

  return (
    <div className="flex flex-col gap-6 p-5">
      <section>
        <h2 className="text-xl font-bold">Hello world</h2>

        <p>{today}</p>
      </section>

      <section className="flex items-center gap-2">
        <Input placeholder="Buscar..." />

        <Button size="icon">
          <SearchIcon />
        </Button>
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
    </div>
  );
}

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Barbershop } from '@prisma/client';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';

interface Props {
  barbershop: Barbershop;
  className?: ComponentProps<typeof Card>['className'];
}

const RATING = (5).toLocaleString('pt-br', {
  minimumFractionDigits: 1,
});

export default function BarbershopItem({ barbershop, className }: Props) {
  const { id, name, imageUrl, address } = barbershop;

  return (
    <Card className={cn('rounded-2xl', className)}>
      <CardContent className="p-1">
        <div className="relative">
          <div className="w-full pt-[100%]">
            <Image
              alt={name}
              fill
              className="rounded-2xl object-cover"
              src={imageUrl}
            />
          </div>

          <Badge
            className="absolute left-2 top-2 space-x-1"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />

            <p className="text-xs font-semibold">{RATING}</p>
          </Badge>
        </div>

        <div className="flex flex-col gap-3 p-2">
          <div className="flex flex-col gap-1">
            <h3 className="truncate font-semibold">{name}</h3>

            <p className="truncate text-sm text-gray-400">{address}</p>
          </div>

          <Button variant="secondary" className="w-full" asChild>
            <Link href={`/barbershops/${id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

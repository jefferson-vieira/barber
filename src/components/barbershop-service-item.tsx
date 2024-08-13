import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarbershopService } from '@prisma/client';
import Image from 'next/image';

interface Props {
  barbershopService: BarbershopService;
}

export default function BarbershopServiceItem({ barbershopService }: Props) {
  const { imageUrl, name, description } = barbershopService;

  const price = barbershopService.price.toNumber().toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        <div className="relative min-h-[calc(100vw/3)] min-w-[calc(100vw/3)]">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex h-[calc(100vw/3)] flex-col gap-2 overflow-hidden">
          <h3 className="text-sm font-semibold">{name}</h3>

          <p className="no-scrollbar overflow-y-auto text-sm text-gray-400">
            {description}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <p className="text-sm font-bold text-primary">{price}</p>

            <Button variant="secondary" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

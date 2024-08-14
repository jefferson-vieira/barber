import BarbershopServiceItem from '@/components/barbershop-service-item';
import PhoneItem from '@/components/phone-item';
import Text from '@/components/text';
import { Button } from '@/components/ui/button';
import db from '@/config/db';
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

const RATING = (5).toLocaleString('pt-br', {
  minimumFractionDigits: 1,
});

const RATINGS = Math.random();

export default async function BarbershopPage({ params }: Props) {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return notFound();
  }

  const { imageUrl, name, address, description, services, phones } = barbershop;

  return (
    <>
      <section className="relative">
        <div className="h-[calc(100vw/39*25)] w-full">
          <Image src={imageUrl} fill alt={name} className="object-cover" />
        </div>

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/" title="Voltar">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </section>

      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">{name}</h1>

        <div className="space-y-2">
          <Text
            startDecorator={<MapPinIcon className="text-primary" size={18} />}
          >
            {address}
          </Text>

          <Text
            startDecorator={
              <StarIcon className="fill-primary text-primary" size={18} />
            }
          >
            {RATING} ({RATINGS} avaliações)
          </Text>
        </div>
      </div>

      <hr />

      <section className="space-y-3 p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>

        <p className="text-justify text-sm">{description}</p>
      </section>

      <hr />

      <section className="space-y-3 p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>

        <div className="space-y-3">
          {services.map((barbershopService) => (
            <BarbershopServiceItem
              key={barbershopService.id}
              barbershopService={barbershopService}
            />
          ))}
        </div>
      </section>

      <hr />

      <section className="space-y-3 p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Contato</h2>

        <div className="space-y-3">
          {phones.map((phone) => (
            <PhoneItem key={phone} phone={phone} />
          ))}
        </div>
      </section>
    </>
  );
}

import BarbershopItem from '@/components/barbershop-item';
import Search from '@/components/search';
import { getBarbershops } from '@/data/barbershop';

interface Props {
  searchParams: {
    name?: string;
    service?: string;
  };
}

export default async function BarbershopsPage({ searchParams }: Props) {
  const { name, service } = searchParams;

  const barbershops = await getBarbershops({
    name,
    service,
  });

  const search = name ?? service;

  return (
    <div className="space-y-6">
      <Search />

      <section className="space-y-6">
        <h2 className="text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{search}&quot;
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </section>
    </div>
  );
}

import BarbershopItem from '@/components/barbershop-item';
import Search from '@/components/search';
import db from '@/config/db';

interface Props {
  searchParams: {
    search?: string;
  };
}

export default async function BarbershopsPage({ searchParams }: Props) {
  const { search } = searchParams;

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
  });

  return (
    <div className="space-y-6 px-5 py-5">
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

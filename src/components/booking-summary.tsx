import { Time } from '@/@types/time';
import { Card, CardContent } from '@/components/ui/card';
import { Prisma } from '@prisma/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Props {
  barbershopService: Prisma.BarbershopServiceGetPayload<{
    include: { barbershop: true };
  }>;
  date: Date;
  time: Time;
}

export default function BookingSummary({
  barbershopService,
  date,
  time,
}: Props) {
  const { barbershop } = barbershopService;

  const price = Number(barbershopService.price).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Card>
      <CardContent className="p-3">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr>
              <th align="left" className="font-bold">
                {barbershopService.name}
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
                {format(date, "d 'de' MMMM", { locale: ptBR })}
              </td>
            </tr>

            <tr>
              <td className="text-gray-400" align="left">
                Horário
              </td>

              <td align="right">{time}</td>
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
  );
}

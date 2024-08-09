import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Barbershop } from '@prisma/client';

export default function BookingItem() {
  const now = new Date();

  const month = now.toLocaleString('pt-br', { month: 'long' });

  const day = now.toLocaleString('pt-br', { day: '2-digit' });

  const time = now.toLocaleTimeString();

  return (
    <Card>
      <CardContent className="flex justify-between p-0 px-5">
        <div className="flex flex-col gap-2 py-5">
          <Badge className="w-fit">Confirmado</Badge>

          <h3 className="font-semibold">Corte de cabelo</h3>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
            </Avatar>

            <p className="text-sm">Barbearia</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-l-2 border-solid pl-5">
          <p className="text-sm capitalize">{month}</p>

          <p className="text-2xl">{day}</p>

          <p className="text-sm">{time}</p>
        </div>
      </CardContent>
    </Card>
  );
}

import 'server-only';

import db from '@/config/db';
import { auth } from '@/helpers/auth';

export async function getBookings() {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized!');
  }

  return db.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        gt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  });
}

export async function getDoneBookings() {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized!');
  }

  return db.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        lte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: 'desc',
    },
  });
}

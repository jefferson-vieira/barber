'use server';

import db from '@/config/db';
import { auth } from '@/helpers/auth';
import { Prisma } from '@prisma/client';

export default async function createBooking(
  data: Omit<Prisma.BookingUncheckedCreateInput, 'userId'>,
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized!');
  }

  await db.booking.create({
    data: {
      ...data,
      userId: session.user.id,
    },
  });
}

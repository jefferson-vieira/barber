'use server';

import db from '@/config/db';
import { auth } from '@/helpers/auth';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export default async function createBooking(
  data: Omit<Prisma.BookingUncheckedCreateInput, 'userId'>,
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized!');
  }

  const booking = await db.booking.create({
    data: {
      ...data,
      userId: session.user.id,
    },
  });

  revalidatePath('/bookings');

  return booking.id;
}

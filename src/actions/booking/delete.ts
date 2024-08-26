'use server';

import db from '@/config/db';
import { auth } from '@/helpers/auth';
import { Booking } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export default async function deleteBooking(id: Booking['id']) {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized!');
  }

  await db.booking.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });

  revalidatePath('/bookings');
}

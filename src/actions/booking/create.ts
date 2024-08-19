'use server';

import db from '@/config/db';
import { Prisma } from '@prisma/client';

export default async function createBooking(
  data: Prisma.BookingUncheckedCreateInput,
) {
  await db.booking.create({
    data,
  });
}

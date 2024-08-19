'use server';

import db from '@/config/db';
import { TIME_SLOTS } from '@/constants';
import { endOfDay, startOfDay, format } from 'date-fns';

interface GetBookingsParameters {
  date: Date;
}

export default async function getBookings({ date }: GetBookingsParameters) {
  const bookings = await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });

  const freeTimes: (typeof TIME_SLOTS)[number][] = [];

  for (
    let currentTimeIndex = 0;
    currentTimeIndex < TIME_SLOTS.length;
    currentTimeIndex++
  ) {
    const timeSlot = TIME_SLOTS[currentTimeIndex];

    const isTimeBusy = bookings.some(
      (booking) => timeSlot === format(booking.date, 'HH:mm'),
    );

    if (isTimeBusy) {
      // mark next time as busy too
      // TODO persist service duration to block times dynamic
      currentTimeIndex++;

      continue;
    }

    freeTimes.push(timeSlot);
  }

  return freeTimes;
}

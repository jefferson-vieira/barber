import 'server-only';

import db from '@/config/db';
import { Barbershop, Prisma } from '@prisma/client';

export function getBarbershop(id: Barbershop['id']) {
  return db.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: {
        include: {
          barbershop: true,
        },
      },
    },
  });
}

export function getBarbershops({
  name,
  service,
}: {
  name?: string;
  service?: string;
} = {}) {
  return db.barbershop.findMany({
    where: {
      ...(name
        ? {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          }
        : {}),
      ...(service
        ? {
            services: {
              some: {
                name: {
                  contains: service,
                  mode: 'insensitive',
                },
              },
            },
          }
        : {}),
    },
  });
}

export function getPopularBarbershops() {
  return db.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  });
}

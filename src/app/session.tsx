'use client';

import { LogInIcon, LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import Link from 'next/link';

interface Props {
  children: ReactNode;
}

export default function Session({ children }: Props) {
  const { data } = useSession();

  const handleSignOutClick = () => {
    signOut();
  };

  if (!data?.user) {
    return (
      <>
        <div className="mt-6 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold">Olá. Faça seu login!</h2>

          <Button size="icon" asChild>
            <Link href="/login">
              <LogInIcon />
            </Link>
          </Button>
        </div>

        {children}
      </>
    );
  }

  const {
    user: { image, name, email },
  } = data;

  const avatarFallback = ((name || email) as string)[0].toUpperCase();

  return (
    <>
      <div className="mt-6 flex items-center gap-3">
        <Avatar className="border-2 border-primary">
          <AvatarImage src={image ?? ''} />

          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>

        <div>
          <p className="font-bold">{name}</p>

          <p className="text-xs">{email}</p>
        </div>
      </div>

      {children}

      <hr className="my-6" />

      <div className="flex flex-col gap-1">
        <Button
          className="justify-start gap-3"
          variant="ghost"
          onClick={handleSignOutClick}
        >
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </>
  );
}

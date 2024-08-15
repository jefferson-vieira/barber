'use client';

import { LogInIcon, LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { SiGoogle } from '@icons-pack/react-simple-icons';

interface Props {
  children: ReactNode;
}

export default function Session({ children }: Props) {
  const { data } = useSession();

  const handleSignInWithGoogleClick = () => {
    signIn('google');
  };

  const handleSignOutClick = () => {
    signOut();
  };

  if (!data?.user) {
    return (
      <>
        <div className="mt-6 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold">Olá. Faça seu login!</h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon">
                <LogInIcon />
              </Button>
            </DialogTrigger>

            <DialogContent className="w-[calc(100vw-4.5rem)]">
              <DialogHeader>
                <DialogTitle>Faça login na plataforma</DialogTitle>

                <DialogDescription>
                  Conecte-se usando sua conta do Google
                </DialogDescription>
              </DialogHeader>

              <Button
                className="gap-2 font-bold"
                variant="outline"
                onClick={handleSignInWithGoogleClick}
              >
                <SiGoogle size={18} />
                Google
              </Button>
            </DialogContent>
          </Dialog>
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

'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { SiGoogle } from '@icons-pack/react-simple-icons';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

export default function AuthLoginDialog({ searchParams }: Props) {
  const router = useRouter();

  const handleSignInWithGoogleClick = () => {
    const { callbackUrl } = searchParams;

    signIn('google', {
      callbackUrl,
    });
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog open onOpenChange={handleClose}>
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
  );
}

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MenuIcon } from 'lucide-react';
import Image from 'next/image';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <nav>
          <Card>
            <CardContent className="flex flex-row items-center justify-between p-5">
              <Image
                src="logo.svg"
                alt="Logo - FSW Barber"
                width={120}
                height={18}
              />

              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </CardContent>
          </Card>
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <Card>
          <CardContent className="px-5 py-6 text-center">
            <p className="text-sm text-gray-400">
              Feito com{' '}
              <Heart
                className="inline"
                size="1rem"
                strokeWidth={0}
                fill="red"
              />{' '}
              por <span className="font-bold">Jefferson Vieira da Silva</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </>
  );
}

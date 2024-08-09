import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MenuIcon } from 'lucide-react';
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
    </>
  );
}

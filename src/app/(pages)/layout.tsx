import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

import Menu from '../menu';

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

              <Menu variant="outline" />
            </CardContent>
          </Card>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}

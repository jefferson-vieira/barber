import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

import Menu from '../menu';
import Link from 'next/link';

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
              <Link href="/">
                <Image
                  src="logo.svg"
                  alt="Logo - FSW Barber"
                  width={120}
                  height={18}
                />
              </Link>

              <Menu variant="outline" />
            </CardContent>
          </Card>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}

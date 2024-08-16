import { Button, ButtonProps } from '@/components/ui/button';
import { CalendarIcon, HomeIcon, MenuIcon } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { QUICK_SEARCH_OPTIONS } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

import Session from './session';

interface Props extends ButtonProps {}

export default function Menu(props: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" {...props}>
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <Session>
          <hr className="my-6" />

          <div className="flex flex-col gap-1">
            <SheetClose asChild>
              <Button className="justify-start gap-3" variant="ghost" asChild>
                <Link href="/">
                  <HomeIcon size={18} />
                  Início
                </Link>
              </Button>
            </SheetClose>

            <Button className="justify-start gap-3" variant="ghost">
              <CalendarIcon size={18} />
              Agendamentos
            </Button>
          </div>

          <hr className="my-6" />

          <div className="flex flex-col gap-1">
            {QUICK_SEARCH_OPTIONS.map(({ imageUrl, title }, i) => (
              <SheetClose key={i} asChild>
                <Button className="justify-start gap-3" variant="ghost" asChild>
                  <Link href={`/barbershops?service=${title}`}>
                    <Image alt={title} src={imageUrl} width={18} height={18} />

                    <span className="capitalize">{title}</span>
                  </Link>
                </Button>
              </SheetClose>
            ))}
          </div>
        </Session>
      </SheetContent>
    </Sheet>
  );
}

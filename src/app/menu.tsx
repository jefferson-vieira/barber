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
import MenuLink from '@/components/menu-link';
import QuickSearchLink from '@/components/quick-search-link';

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
            <MenuLink href="/" icon={<HomeIcon size={18} />} title="Início" />

            <MenuLink
              href="/bookings"
              icon={<CalendarIcon size={18} />}
              title="Agendamentos"
            />
          </div>

          <hr className="my-6" />

          <div className="flex flex-col gap-1">
            {QUICK_SEARCH_OPTIONS.map((option, i) => (
              <SheetClose key={i} asChild>
                <QuickSearchLink
                  option={option}
                  className="justify-start gap-3"
                  variant="ghost"
                />
              </SheetClose>
            ))}
          </div>
        </Session>
      </SheetContent>
    </Sheet>
  );
}

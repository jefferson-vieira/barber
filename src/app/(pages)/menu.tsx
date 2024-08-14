import { Button } from '@/components/ui/button';
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from 'lucide-react';
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
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <hr className="my-6" />

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
          </Avatar>

          <div>
            <p className="font-bold">Jefferson Silva</p>

            <p className="text-xs">github.com/jefferson-vieira</p>
          </div>
        </div>

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
            <Button className="justify-start gap-3" key={i} variant="ghost">
              <Image alt={title} src={imageUrl} width={18} height={18} />

              <span className="capitalize">{title}</span>
            </Button>
          ))}
        </div>

        <hr className="my-6" />

        <div className="flex flex-col gap-1">
          <Button className="justify-start gap-3" variant="ghost">
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

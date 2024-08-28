import { Button, type ButtonProps } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import type { Route } from 'next';
import Image, { type ImageProps } from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import type { LucideProps } from 'lucide-react';

interface Props<T extends string> extends Omit<ButtonProps, 'children'> {
  children?: never;
  href: Route<T>;
  title: string;
  icon: ReactElement<LucideProps>;
}

export default function MenuLink<T extends string>({
  href,
  title,
  icon,
  ...props
}: Props<T>) {
  return (
    <SheetClose asChild>
      <Button
        className="justify-start gap-3"
        variant="ghost"
        asChild
        {...props}
      >
        <Link href={href}>
          {icon}

          <span className="capitalize">{title}</span>
        </Link>
      </Button>
    </SheetClose>
  );
}

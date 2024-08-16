import { Button, type ButtonProps } from '@/components/ui/button';
import { QUICK_SEARCH_OPTIONS } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

interface Props extends ButtonProps {
  option: (typeof QUICK_SEARCH_OPTIONS)[number];
}

export default function QuickSearchLink({
  option: { title, imageUrl },
  ...props
}: Props) {
  return (
    <Button asChild {...props}>
      <Link href={`/barbershops?service=${title}`}>
        <Image alt={title} src={imageUrl} width={16} height={16} />

        <span className="capitalize">{title}</span>
      </Link>
    </Button>
  );
}

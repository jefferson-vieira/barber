import { ComponentProps, ReactNode } from 'react';

interface Props {
  children: ComponentProps<'p'>['children'];
  startDecorator?: ReactNode;
}

export default function Text({ children, startDecorator }: Props) {
  return (
    <div className="flex items-center gap-2">
      {startDecorator}

      <p className="text-sm">{children}</p>
    </div>
  );
}

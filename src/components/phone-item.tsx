'use client';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { SmartphoneIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
  phone: string;
}

export default function PhoneItem({ phone }: Props) {
  const [showFeedback, setShowFeedback] = useState(false);

  const handleCopyPhoneClick = () => {
    navigator.clipboard.writeText(phone);

    setShowFeedback(true);
  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon />

        <p className="text-sm">{phone}</p>
      </div>

      <TooltipProvider>
        <Tooltip open={showFeedback}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyPhoneClick}
              onMouseLeave={() => setShowFeedback(false)}
              title="Copiar telefone para a área de transferência"
            >
              Copiar
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>Telefone copiado!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

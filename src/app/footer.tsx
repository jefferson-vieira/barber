import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer>
      <Card>
        <CardContent className="px-5 py-6 text-center">
          <p className="text-sm text-gray-400">
            Feito com{' '}
            <Heart className="inline" size="1rem" strokeWidth={0} fill="red" />{' '}
            por <span className="font-bold">Jefferson Vieira da Silva</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  );
}

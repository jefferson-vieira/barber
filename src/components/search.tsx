'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  search: z.string().trim().min(1, {
    message: 'Digite algo para buscar',
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Search() {
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
    },
  });

  function onSubmit({ search }: FormSchema) {
    router.push(`/barbershops?name=${search}`);
  }

  return (
    <section className="flex w-full items-center gap-2">
      <Form {...form}>
        <form
          className="flex w-full gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Buscar" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button size="icon" type="submit">
            <SearchIcon />
          </Button>
        </form>
      </Form>
    </section>
  );
}

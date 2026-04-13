import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './button/button.js';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form.js';
import { Input } from './input/input.js';

const schema = z.object({
  username: z.string().min(2, 'Mínimo de 2 caracteres.'),
});

const meta: Meta<typeof Form> = {
  title: 'Primitives/Form',
  component: Form,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => {
    const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: { username: '' },
    });
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => console.log(values))}
          className="w-80 space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário Uranus</FormLabel>
                <FormControl>
                  <Input placeholder="astro" {...field} />
                </FormControl>
                <FormDescription>Nome público na plataforma.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Salvar</Button>
        </form>
      </Form>
    );
  },
};

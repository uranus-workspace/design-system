'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@uranus-workspace/design-system';

const produtos = [
  {
    title: 'Design System',
    href: '#design-system',
    description: 'Biblioteca oficial de componentes da Uranus para web.',
  },
  {
    title: 'Insights',
    href: '#insights',
    description: 'Dashboards e relatórios em tempo real para times de produto.',
  },
  {
    title: 'Automações',
    href: '#automacoes',
    description: 'Fluxos sem código para conectar ferramentas internas.',
  },
];

const recursos = [
  {
    title: 'Documentação',
    href: '#docs',
    description: 'Guias, referências e exemplos prontos para copiar.',
  },
  {
    title: 'Changelog',
    href: '#changelog',
    description: 'Todas as novidades, correções e releases recentes.',
  },
];

export default function NavigationMenuDefault() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[320px] gap-2 p-3">
              {produtos.map((item) => (
                <li key={item.href}>
                  <NavigationMenuLink asChild>
                    <a
                      className="block rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
                      href={item.href}
                    >
                      <div className="font-medium">{item.title}</div>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[320px] gap-2 p-3">
              {recursos.map((item) => (
                <li key={item.href}>
                  <NavigationMenuLink asChild>
                    <a
                      className="block rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
                      href={item.href}
                    >
                      <div className="font-medium">{item.title}</div>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#precos">
            Preços
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

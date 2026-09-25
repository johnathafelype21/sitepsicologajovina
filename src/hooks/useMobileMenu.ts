import { useState } from 'react';

export interface UseMobileMenuProps {
  readonly initialOpen?: boolean;
}

export function useMobileMenu({ initialOpen = false }: Readonly<UseMobileMenuProps> = {}) {
  const [open, setOpen] = useState(initialOpen);
  return { open, toggle: () => setOpen((value) => !value), close: () => setOpen(false) };
}

"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = { id: string; name: string; price: number; image: string; slug: string; quantity: number };
type CartContextType = { items: CartItem[]; count: number; add: (item: Omit<CartItem, "quantity">) => void; change: (id: string, quantity: number) => void; remove: (id: string) => void; clear: () => void };
const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const raw = localStorage.getItem("mobileshop-cart"); if (raw) setItems(JSON.parse(raw)); } catch { localStorage.removeItem("mobileshop-cart"); }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("mobileshop-cart", JSON.stringify(items)); }, [items, ready]);
  const value = useMemo<CartContextType>(() => ({
    items, count: items.reduce((sum, item) => sum + item.quantity, 0),
    add: (item) => setItems(current => {
      const found = current.find(x => x.id === item.id);
      return found ? current.map(x => x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x) : [...current, { ...item, quantity: 1 }];
    }),
    change: (id, quantity) => setItems(current => quantity <= 0 ? current.filter(x => x.id !== id) : current.map(x => x.id === id ? { ...x, quantity: Math.min(quantity, 99) } : x)),
    remove: id => setItems(current => current.filter(x => x.id !== id)),
    clear: () => setItems([])
  }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

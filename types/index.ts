import { CATEGORIAS_GASTOS } from "@/lib/schemas";

// src/types/index.ts
export type CategoriaGasto = (typeof CATEGORIAS_GASTOS)[number];
export interface Gasto {
  id: string;
  descripcion: string;
  monto: number;
  categoria: CategoriaGasto;
  fecha: string;
}

import { CATEGORIAS_TRANSACCIONES } from "@/lib/schemas";

// src/types/index.ts
export type CategoriaTransaccion = (typeof CATEGORIAS_TRANSACCIONES)[number];

export enum TipoTransaccion {
  INGRESO = "INGRESO",
  EGRESO = "EGRESO"
}
export interface Transaccion {
  id: string;
  descripcion: string;
  monto: number;
  categoria: CategoriaTransaccion;
  tipo: TipoTransaccion;
  fecha: string;
}

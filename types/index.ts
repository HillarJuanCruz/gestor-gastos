// src/types/index.ts
export interface Gasto {
  id: string;
  descripcion: string;
  monto: number;
  categoria: 'comida' | 'transporte' | 'ocio' | 'fijo';
  fecha: string;
}

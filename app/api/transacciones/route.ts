import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

// GET /api/gastos - Obtener todas las transacciones
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const gastos = await prisma.transaccion.findMany({
      where: { user_id: user.id },
      orderBy: { fecha: 'desc' },
    });

    return NextResponse.json(gastos);
  } catch (error) {
    console.error("Error en GET /api/transacciones:", error);
    return NextResponse.json({ error: "Error al obtener transacciones" }, { status: 500 });
  }
}

// POST /api/transacciones - Crear una nueva transaccion
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const body = await request.json();


    const { descripcion, monto, categoria, tipo, fecha } = body;

    if (!descripcion || !monto || !categoria || !tipo) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const nuevoGasto = await prisma.transaccion.create({
      data: {
        descripcion,
        monto: parseFloat(monto),
        categoria,
        tipo: tipo as "INGRESO" | "EGRESO",
        user_id: user.id,
        fecha: fecha ? new Date(fecha) : new Date(),
      },
    });

    return NextResponse.json(nuevoGasto);
  } catch (error) {
    console.error("Error en POST /api/transacciones:", error);
    return NextResponse.json({ error: "Error al crear la transaccion" }, { status: 500 });
  }
}

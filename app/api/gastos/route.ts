import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

// GET /api/gastos - Obtener todos los gastos
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const gastos = await prisma.gasto.findMany({
      where: { user_id: user.id },
      orderBy: { fecha: 'desc' },
    });

    return NextResponse.json(gastos);
  } catch (error) {
    console.error("Error en GET /api/gastos:", error);
    return NextResponse.json({ error: "Error al obtener gastos" }, { status: 500 });
  }
}

// POST /api/gastos - Crear un nuevo gasto
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const body = await request.json();

    const { descripcion, monto, categoria, fecha } = body;

    const nuevoGasto = await prisma.gasto.create({
      data: {
        descripcion,
        monto: parseFloat(monto),
        categoria,
        user_id: user.id,
        fecha: fecha ? new Date(fecha) : new Date(),
      },
    });

    return NextResponse.json(nuevoGasto);
  } catch (error) {
    console.error("Error en POST /api/gastos:", error);
    return NextResponse.json({ error: "Error al crear" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET - List approved testimonies (public)
export async function GET() {
  try {
    const testimonies = await db.testimony.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json(testimonies);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

// POST - Submit a new testimony (public)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.name || !data.message) {
      return NextResponse.json(
        { error: "Nombre y mensaje son requeridos" },
        { status: 400 }
      );
    }

    if (data.name.length > 100) {
      return NextResponse.json(
        { error: "El nombre es muy largo" },
        { status: 400 }
      );
    }

    if (data.message.length > 1000) {
      return NextResponse.json(
        { error: "El mensaje es muy largo (máximo 1000 caracteres)" },
        { status: 400 }
      );
    }

    const testimony = await db.testimony.create({
      data: {
        name: data.name.trim(),
        message: data.message.trim(),
        approved: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "¡Gracias por tu testimonio! Será publicado después de ser revisado.",
    });
  } catch {
    return NextResponse.json(
      { error: "Error al enviar el testimonio" },
      { status: 500 }
    );
  }
}

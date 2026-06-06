import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession, verifyPassword, hashPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = getSession(request);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Ambas contraseñas son requeridas" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "La nueva contraseña debe tener al menos 6 caracteres" }, { status: 400 });
    }

    // Buscar al administrador actual en base de datos
    const admin = await db.adminUser.findFirst();
    if (!admin) {
      return NextResponse.json({ error: "Administrador no encontrado" }, { status: 404 });
    }

    // Verificar contraseña actual
    const isValid = verifyPassword(currentPassword, admin.password);
    if (!isValid) {
      return NextResponse.json({ error: "La contraseña actual es incorrecta" }, { status: 401 });
    }

    // Actualizar con la nueva contraseña encriptada
    await db.adminUser.update({
      where: { id: admin.id },
      data: {
        password: hashPassword(newPassword),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Change Password API Error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

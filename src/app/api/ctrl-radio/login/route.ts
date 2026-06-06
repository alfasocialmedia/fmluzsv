import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, hashPassword, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, rememberMe } = body;

    if (!password) {
      return NextResponse.json({ error: "La contraseña es requerida" }, { status: 400 });
    }

    // Buscar si existe algún usuario admin en la base de datos
    let admin = await db.adminUser.findFirst();
    const defaultPassword = "FMLuz107.5!";

    if (!admin) {
      // Base de datos vacía: Validar con la contraseña por defecto
      if (password === defaultPassword) {
        // Crear el usuario administrador por defecto
        admin = await db.adminUser.create({
          data: {
            password: hashPassword(defaultPassword),
          },
        });
      } else {
        return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
      }
    } else {
      // El administrador existe: Verificar contraseña
      const isValid = verifyPassword(password, admin.password);
      if (!isValid) {
        return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
      }
    }

    // Inicio de sesión exitoso. Generar token de sesión.
    // Guardar acceso (Remember me): 30 días (720 horas), de lo contrario 2 horas.
    const durationHours = rememberMe ? 720 : 2;
    const token = generateToken({ adminId: admin.id }, durationHours);

    const response = NextResponse.json({ success: true });

    // Guardar token en cookie HttpOnly segura
    response.cookies.set({
      name: "admin_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: durationHours * 60 * 60, // En segundos
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

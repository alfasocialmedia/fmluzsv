import crypto from "crypto";
import { NextRequest } from "next/server";

// Clave secreta para firmar sesiones (se recomienda configurar JWT_SECRET en el .env)
const JWT_SECRET = process.env.JWT_SECRET || "fmluz_super_secret_session_key_2026_107.5_mhz";

/**
 * Genera un hash seguro con sal aleatoria usando PBKDF2
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verifica si una contraseña coincide con el hash almacenado
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const parts = storedHash.split(":");
    if (parts.length !== 2) return false;
    const [salt, hash] = parts;
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return hash === verifyHash;
  } catch {
    return false;
  }
}

/**
 * Genera un token firmado digitalmente con tiempo de expiración
 */
export function generateToken(payload: object, expiresInHours: number = 2): string {
  const expiresAt = Date.now() + expiresInHours * 60 * 60 * 1000;
  const dataString = JSON.stringify({ ...payload, expiresAt });
  
  const hmac = crypto.createHmac("sha256", JWT_SECRET);
  hmac.update(dataString);
  const signature = hmac.digest("hex");
  
  const tokenPayload = {
    data: dataString,
    signature: signature
  };
  
  return Buffer.from(JSON.stringify(tokenPayload)).toString("base64");
}

/**
 * Verifica un token firmado y retorna el payload si es válido y no ha expirado
 */
export function verifyToken(token: string): any | null {
  try {
    const raw = Buffer.from(token, "base64").toString("utf-8");
    const { data, signature } = JSON.parse(raw);
    
    const hmac = crypto.createHmac("sha256", JWT_SECRET);
    hmac.update(data);
    const verifySignature = hmac.digest("hex");
    
    if (signature !== verifySignature) {
      return null; // Firma inválida (token alterado)
    }
    
    const payload = JSON.parse(data);
    if (Date.now() > payload.expiresAt) {
      return null; // Token expirado
    }
    
    return payload;
  } catch {
    return null;
  }
}

/**
 * Obtiene la sesión actual de la petición
 */
export function getSession(request: NextRequest): any | null {
  const cookie = request.cookies.get("admin_session");
  if (!cookie?.value) return null;
  return verifyToken(cookie.value);
}

/**
 * Verifica si la petición está autenticada
 */
export function isAuthenticated(request: NextRequest): boolean {
  return getSession(request) !== null;
}

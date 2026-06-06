const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('🚀 Iniciando copia de recursos estáticos a standalone...');
try {
  if (fs.existsSync('.next/static')) {
    copyDir('.next/static', '.next/standalone/.next/static');
    console.log('✅ Copiado .next/static a .next/standalone/.next/static');
  } else {
    console.log('⚠️ No se encontró .next/static');
  }

  if (fs.existsSync('public')) {
    copyDir('public', '.next/standalone/public');
    console.log('✅ Copiado public a .next/standalone/public');
  } else {
    console.log('⚠️ No se encontró la carpeta public');
  }

  console.log('🎉 Todos los recursos fueron copiados exitosamente.');
} catch (err) {
  console.error('❌ Error al copiar recursos:', err);
  process.exit(1);
}

import prisma from "./src/app/lib/prisma";

async function testConnection() {
  try {
    console.log("Conectando a la base de datos...");
    const resultado = await prisma.$queryRaw`SELECT 1`; // Consulta simple para verificar conexión
    console.log("Conexión exitosa:", resultado);
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  } finally {
    await prisma.$disconnect(); // Asegúrate de cerrar la conexión
  }
}

testConnection();

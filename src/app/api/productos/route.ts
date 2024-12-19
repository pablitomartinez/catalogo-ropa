//rutas genericas de GET y POST
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// crear productos

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const producto = await prisma.productos.create({
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion,
        descripcionCorta: body.descripcionCorta, // Actualizado
        precio: body.precio,
        enStock: body.en_stock, // Actualizado
        cantidadStock: body.cantidad_stock, // Actualizado
        categoria: body.categoria,
      },
    });
    return NextResponse.json(producto, { status: 201 });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return NextResponse.json(
      { error: "Hubo un problema al crear el producto." },
      { status: 500 }
    );
  }
}

// leer productos

export async function GET() {
  try {
    const productos = await prisma.productos.findMany();
    return NextResponse.json(productos, { status: 200 });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json(
      { error: "Hubo un problema al obtener los productos." },
      { status: 500 }
    );
  }
}

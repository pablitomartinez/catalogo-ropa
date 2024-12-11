//ACTUALIZAR PRODUCTOS

import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma"; // Importa la instancia de Prisma


// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     // const { id } = params;
//     const { id } = await params;


//     // Validación previa: Verificar si el producto existe
//     const productoExistente = await prisma.producto.findUnique({
//       where: { id: parseInt(id) },
//     });
//     // Si el producto no existe, retornar un error 404
//     if (!productoExistente) {
//       return NextResponse.json(
//         { error: "Producto no encontrado" },
//         { status: 404 }
//       );
//     }

//     //obtengo los datos del cuerpo de la solicitud
//     const body = await request.json();
//     const productoActualizado = await prisma.producto.update({
//       where: { id: parseInt(id) },
//       data: {
//         nombre: body.nombre,
//         descripcion: body.descripcion,
//         descripcionCorta: body.descripcion_corta, // Actualizado
//         precio: body.precio,
//         enStock: body.en_stock, // Actualizado
//         cantidadStock: body.cantidad_stock, // Actualizado
//         categoria: body.categoria,
//       },
//     });
//     return NextResponse.json(productoActualizado, { status: 200 });
//   } catch (error) {
//     console.error("Error al actualizar producto:", error);
//     return NextResponse.json(
//       { error: "Hubo un problema al actualizar el producto." },
//       { status: 500 }
//     );
//   }
// }

// ELIMINAR PRODUCTOS


export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Asegúrate de que los parámetros sean obtenidos de forma asíncrona
    const { id } = await params; // Espera a que `params` esté disponible

    // Validar si el producto existe
    const productoExistente = await prisma.producto.findUnique({
      where: { id: parseInt(id) },
    });

    if (!productoExistente) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Obtener el cuerpo de la solicitud
    const body = await request.json();

    // Actualizar el producto
    const productoActualizado = await prisma.producto.update({
      where: { id: parseInt(id) },
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion,
        descripcionCorta: body.descripcion_corta,
        precio: body.precio,
        enStock: body.en_stock,
        cantidadStock: body.cantidad_stock,
        categoria: body.categoria,
      },
    });

    // Retornar la respuesta exitosa con el producto actualizado
    return NextResponse.json(productoActualizado, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return NextResponse.json(
      { error: "Hubo un problema al actualizar el producto." },
      { status: 500 }
    );
  }
}


export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verificar si el producto existe
    const producto = await prisma.producto.findUnique({
      where: { id: parseInt(id) },
    });

    if (!producto) {
      return NextResponse.json(
        { error: `El producto con ID ${id} no existe.` },
        { status: 404 }
      );
    }

    await prisma.producto.delete({ where: { id: parseInt(id) } });
    return NextResponse.json(
      { message: `Producto ${id} eliminado con éxito.` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return NextResponse.json(
      { error: "Hubo un problema al eliminar el producto." },
      { status: 500 }
    );
  }
}

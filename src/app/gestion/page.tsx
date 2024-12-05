// src/app/gestion/page.tsx
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import ClothingForm from "@/components/Form";
import { ClothingFormData, Clothing } from "../lib/types";

// Lista de correos autorizados
const AUTHORIZED_EMAILS = [
  "pablitoemartinez666@gmail.com", // Reemplazar con correo real del cliente
];

export default function ManagementPage() {
  const { data: session, status } = useSession();
  const [clothing, setClothing] = useState<Clothing[]>([]);

  // Verificar autorización
  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  // Verificar si el correo está autorizado
  const isAuthorized = session?.user?.email
    ? AUTHORIZED_EMAILS.includes(session.user.email)
    : false;

  if (!isAuthorized) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl text-red-600">
          No tienes autorización para acceder
        </h2>
      </div>
    );
  }

  const handleAddClothing = (newClothing: ClothingFormData) => {
    const clothingWithId: Clothing = {
      ...newClothing,
      id: Date.now().toString(), // Temporal ID generation
    };
    setClothing((prev) => [...prev, clothingWithId]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-pink-600">
        Gestión de Prendas
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulario para añadir prendas */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Añadir Nueva Prenda</h2>
          <ClothingForm onSubmit={handleAddClothing} />
        </div>

        {/* Lista de prendas */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Prendas Actuales</h2>
          {clothing.length === 0 ? (
            <p className="text-gray-500">No hay prendas añadidas aún</p>
          ) : (
            <ul className="space-y-4">
              {clothing.map((item) => (
                <li
                  key={item.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Stock: {item.stockQuantity} | Precio: $
                      {item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      // Implementar edición
                    >
                      Editar
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      // Implementar eliminación
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

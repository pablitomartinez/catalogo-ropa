// src/app/prenda/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import StockBadge from "../../../components/StockBadge";
import { Clothing } from "../../lib/types";

// Mock de datos - reemplazar con fetching real
const getClothingDetails = (id: string): Clothing | null => {
  const mockClothingData: Clothing[] = [
    {
      id: "1",
      name: "Blusa Romántica",
      description:
        "Blusa de gasa suave con volantes delicados y escote V. Perfecta para looks casuales o eventos especiales. Tela transpirable y con detalles elegantes que se adaptan a diferentes estilos.",
      shortDescription: "Blusa delicada para ocasiones especiales",
      images: [
        "/images/blusa1.jpg",
        "/images/blusa1-2.jpg",
        "/images/blusa1-3.jpg",
      ],
      sizes: ["XS", "S", "M", "L"],
      inStock: true,
      stockQuantity: 15,
      price: 29.99,
      category: "tops",
    },
  ];

  return mockClothingData.find((item) => item.id === id) || null;
};

export default function ClothingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const clothing = getClothingDetails(params.id);

  if (!clothing) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      {/* Galería de imágenes */}
      <div className="space-y-4">
        <div className="relative w-full aspect-[3/4]">
          <Image
            src={clothing.images[0]}
            alt={clothing.name}
            fill
            className="object-cover rounded-lg shadow-md"
            priority
          />
          <StockBadge inStock={clothing.inStock} />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {clothing.images.slice(1).map((image, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={image}
                alt={`${clothing.name} - Imagen ${index + 2}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Detalles de la prenda */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {clothing.name}
        </h1>

        <p className="text-gray-600 mb-6">{clothing.description}</p>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Talles Disponibles:</h3>
          <div className="flex gap-2">
            {clothing.sizes.map((size) => (
              <span
                key={size}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="text-2xl font-bold text-pink-600">
            ${clothing.price.toFixed(2)}
          </span>
          <div className="flex items-center space-x-2">
            <span>Stock:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                clothing.inStock
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {clothing.inStock
                ? `Disponibles: ${clothing.stockQuantity}`
                : "Sin Stock"}
            </span>
          </div>
        </div>

        {clothing.inStock && (
          <button
            disabled={!clothing.inStock}
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50"
          >
            Agregar al Carrito
          </button>
        )}
      </div>
    </div>
  );
}

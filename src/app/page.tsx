// src/app/page.tsx
import ClothingCard from "../components/Card";
import { Clothing } from "./lib/types";

// Mock data - en producción reemplazar con datos reales
const mockClothingData: Clothing[] = [
  {
    id: "1",
    name: "Blusa Romántica",
    description: "Blusa de gasa con volantes y escote V",
    shortDescription: "Blusa delicada para ocasiones especiales",
    images: ["/images/blusa1.jpg", "/images/blusa1-2.jpg"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
    stockQuantity: 15,
    price: 29.99,
    category: "tops",
  },
  {
    id: "2",
    name: "Blusa Romántica",
    description: "Blusa de gasa con volantes y escote V",
    shortDescription: "Blusa delicada para ocasiones especiales",
    images: ["/images/blusa1.jpg", "/images/blusa1-2.jpg"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
    stockQuantity: 15,
    price: 29.99,
    category: "tops",
  },
  {
    id: "3",
    name: "Blusa Romántica",
    description: "Blusa de gasa con volantes y escote V",
    shortDescription: "Blusa delicada para ocasiones especiales",
    images: ["/images/blusa1.jpg", "/images/blusa1-2.jpg"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
    stockQuantity: 15,
    price: 29.99,
    category: "tops",
  },
  {
    id: "4",
    name: "Blusa Romántica",
    description: "Blusa de gasa con volantes y escote V",
    shortDescription: "Blusa delicada para ocasiones especiales",
    images: ["/images/blusa1.jpg", "/images/blusa1-2.jpg"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
    stockQuantity: 15,
    price: 29.99,
    category: "tops",
  },
  {
    id: "5",
    name: "Blusa Romántica",
    description: "Blusa de gasa con volantes y escote V",
    shortDescription: "Blusa delicada para ocasiones especiales",
    images: ["/images/blusa1.jpg", "/images/blusa1-2.jpg"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
    stockQuantity: 15,
    price: 29.99,
    category: "tops",
  },
  // Más prendas...
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-pink-600">
        Catálogo de Moda
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockClothingData.map((clothing) => (
          <ClothingCard key={clothing.id} clothing={clothing} />
        ))}
      </div>
    </main>
  );
}

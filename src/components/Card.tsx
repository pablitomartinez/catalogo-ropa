//componente de prenda

// src/components/Card.tsx
import Image from "next/image";
import Link from "next/link";
import { Clothing } from "../app/lib/types";
import StockBadge from "./StockBadge";

interface ClothingCardProps {
  clothing: Clothing;
}

const ClothingCard: React.FC<ClothingCardProps> = ({ clothing }) => {
  return (
    <Link
      href={`/prenda/${clothing.id}`}
      className="block rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative bg-slate-800">
        <Image
          src={clothing.images[0]}
          alt={clothing.name}
          width={300}
          height={400}
          className="w-full h-80 object-cover rounded-t-lg"
        />
        <StockBadge inStock={clothing.inStock} />
      </div>

      <div className="p-4 bg-white rounded-b-lg">
        <h3 className="text-lg font-semibold text-gray-800">{clothing.name}</h3>
        <p className="text-sm text-gray-600 mt-2">
          {clothing.shortDescription}
        </p>
        <div className="mt-3 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Talles: {clothing.sizes.join(", ")}
          </div>
          <span className="text-base font-bold text-pink-600">
            ${clothing.price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ClothingCard;

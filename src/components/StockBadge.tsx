// src/components/StockBadge.tsx
interface StockBadgeProps {
  inStock: boolean;
}

const StockBadge: React.FC<StockBadgeProps> = ({ inStock }) => {
  return (
    <div
      className={`absolute top-2 right-2 px-3 py-1 text-white rounded-full 
        ${inStock ? "bg-green-500" : "bg-red-500"}`}
    >
      {inStock ? "En Stock" : "Sin Stock"}
    </div>
  );
};

export default StockBadge;

"use client";

import { useState } from "react";
import { ClothingFormData } from "../app/lib/types";

interface ClothingFormProps {
  initialData?: ClothingFormData; // Datos iniciales del formulario, opcionales.
  onSubmit: (data: ClothingFormData) => void; // Función para manejar el envío del formulario.
}

const ClothingForm: React.FC<ClothingFormProps> = ({
  initialData,
  onSubmit,
}) => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState<ClothingFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    shortDescription: initialData?.shortDescription || "",
    images: initialData?.images || [],
    sizes: initialData?.sizes || [],
    inStock: initialData?.inStock || true,
    stockQuantity: initialData?.stockQuantity || 0,
    price: initialData?.price || 0,
    category: initialData?.category || "tops",
  });

  // Estado para el input de agregar imágenes
  const [imageInput, setImageInput] = useState("");

  /**
   * Maneja los cambios en los inputs del formulario.
   */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Agrega una nueva imagen al listado de imágenes.
   */
  const handleAddImage = () => {
    if (imageInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageInput.trim()],
      }));
      setImageInput(""); // Resetea el input.
    }
  };

  /**
   * Elimina una imagen específica por índice.
   */
  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  /**
   * Maneja el envío del formulario, llamando al callback `onSubmit`.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {/* Input para el nombre de la prenda */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre de la Prenda
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
      </div>

      {/* Input para descripción corta */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción Corta
        </label>
        <input
          type="text"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
      </div>

      {/* Textarea para descripción completa */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción Completa
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
        />
      </div>

      {/* Gestión de imágenes */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Imágenes
        </label>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            placeholder="URL de imagen"
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
          >
            Añadir
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {formData.images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Imagen ${index + 1}`}
                className="w-full h-24 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Selectores para talles y categoría */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Talles
          </label>
          <select
            multiple
            name="sizes"
            value={formData.sizes}
            onChange={(e) => {
              const selectedSizes = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              setFormData((prev) => ({ ...prev, sizes: selectedSizes }));
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          >
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          >
            <option value="tops">Tops</option>
            <option value="bottoms">Bottoms</option>
            <option value="dresses">Vestidos</option>
            <option value="accessories">Accesorios</option>
          </select>
        </div>
      </div>

      {/* Inputs para precio y cantidad en stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Precio
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cantidad en Stock
          </label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            min="0"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* Checkbox para estado de stock */}
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, inStock: e.target.checked }))
            }
            className="rounded border-gray-300 text-pink-600 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          />
          <span className="ml-2">¿Está en stock?</span>
        </label>
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700"
      >
        Guardar Prenda
      </button>
    </form>
  );
};

export default ClothingForm;

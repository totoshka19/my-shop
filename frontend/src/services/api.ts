// --- НАЧАЛО ФАЙЛА: "frontend/src/services/api.ts" ---
import type { Product } from '../types/types';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Загружает все продукты с сервера.
 * В случае ошибки сети или ответа сервера с кодом, отличным от 2xx, выбрасывает исключение.
 */
export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/api/products`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

/**
 * Загружает один продукт по его ID.
 * В случае ошибки сети или ответа сервера с кодом, отличным от 2xx, выбрасывает исключение.
 * @param id - ID продукта для загрузки.
 */
export const fetchProductById = async (id: string): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/api/products/${id}`);
    if (!response.ok) {
        throw new Error('Product not found');
    }
    return response.json();
};
// --- КОНЕЦ ФАЙЛА: "frontend/src/services/api.ts" ---

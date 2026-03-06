import { useState, useCallback } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api/productsApi";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  //  fetchProducts як функція для ручного оновлення списку
  const fetchProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      setProducts(Array.isArray(data?.products) ? data.products : []);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setProducts([]);
    }
  }, []);

  const addProduct = async (product) => {
    const saved = await createProduct(product);
    //  після створення — робимо fetch з бекенду
    await fetchProducts();
    return saved;
  };

  const editProduct = async (id, updated) => {
    const saved = await updateProduct(id, updated);
    //  після редагування — синхронізуємо зі списком з бекенду
    await fetchProducts();
    return saved;
  };

  const removeProduct = async (id) => {
    await deleteProduct(Number(id)); //  конвертуємо id у Number
    await fetchProducts();           //  оновлюємо список продуктів
  };

  return { products, fetchProducts, addProduct, editProduct, removeProduct };
};
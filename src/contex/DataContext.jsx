import { createContext, useContext, useState, useMemo } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // Fetch products from API
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Extract unique categories
  const getUniqueCategory = (list = [], property = "category") => {
    if (!Array.isArray(list)) return [];
    const values = list.map((item) => item[property]).filter(Boolean);
    return Array.from(new Set(values));
  };

  // Memoized category list
  const categoryOnlyData = useMemo(
    () => getUniqueCategory(data, "category"),
    [data]
  );

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchAllProducts,
        categoryOnlyData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to consume context
export const getData = () => useContext(DataContext);

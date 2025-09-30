import { createContext, useContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState();

  // Fetching products from api
  const fetchAllProducts = async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setData(response.data);
        console.log(response)

    } catch (error) {
        console.error('Error fetching products:', error)
    }
  };
  return <DataContext.Provider value={{ data, setData, fetchAllProducts }}>
      {children}
    </DataContext.Provider>
}

export const getData = () => useContext(DataContext)



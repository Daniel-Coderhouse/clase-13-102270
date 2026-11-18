import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import styles from "./styles.module.css";

import CardProduct from "../CardProduct/CardProduct";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const producstCollection = collection(db, "products");

        const snapshot = await getDocs(producstCollection);

        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);
      } catch (error) {
        console.log(error.code, error.message);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>

      <div className={styles.grid}>
        {products.map((product) => (
          <CardProduct key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;

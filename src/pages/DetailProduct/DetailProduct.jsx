import { useEffect, useState } from "react";
import { useParams } from "react-router"; // Usa "react-router-dom" si tu versión lo requiere
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const DetailProduct = () => {
  // Asegúrate de que el nombre del parámetro coincida con tu ruta (ej. /detail/:id)
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductById = async () => {
      try {
        // 1. Crear la referencia al documento específico usando su ID
        const docRef = doc(db, "products", id);

        // 2. Obtener el documento
        const docSnap = await getDoc(docRef);

        // 3. Verificar si existe y guardar los datos junto con su id
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No se encontró el producto");
        }
      } catch (error) {
        console.log(error.code, error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getProductById();
    }
  }, [id]);

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (!product) {
    return <p>El producto no existe.</p>;
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <p>ID: {product.id}</p>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
    </div>
  );
};

export default DetailProduct;

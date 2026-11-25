import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Navigate } from "react-router";

import { auth } from "./firebase/firebaseConfig";
import Auth from "./components/Auth/Auth";
import ProductsList from "./components/ProductsList/ProductsList";
import Nav from "./components/Nav/Nav";
import { Routes, Route } from "react-router";

import Home from "./pages/Home/Home";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import CategoryProduct from "./pages/CategoryProduct/CategoryProduct";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("user", user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Cargando sesión...</p>;
  }

  return (
    <div className="container">
      <Nav />
      <h1>Mi tienda</h1>

      {user && <button onClick={() => signOut(auth)}>Cerrar sesión</button>}

      <Routes>
        <Route path="/" element={<ProductsList />} />

        <Route path="/category/:categoryId" element={<CategoryProduct />} />

        <Route path="/detail/:id" element={<DetailProduct />} />

        <Route path="/login" element={user ? <Navigate to="/" /> : <Auth />} />

        <Route path="*" element={<h2>Página no encontrada</h2>} />
      </Routes>
    </div>
  );
}

export default App;

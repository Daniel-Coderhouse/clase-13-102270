import "./App.css";
// components
import ProductsList from "./components/ProductsList/ProductsList";
import SeedProducts from "./components/SeedProducts.jsx/SeedProducts";

/*

Rules dentro de firestore

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if true
    }
  }
} */

const App = () => {
  return (
    <div className="container">
      <h1>Firebase</h1>
      <SeedProducts />
      <ProductsList />
    </div>
  );
};

export default App;

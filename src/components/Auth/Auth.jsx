import { useState } from "react";
import {
  createUserWithEmailAndPassword, // crear un nuevo usuario en firebase
  signInWithEmailAndPassword, // hacer sign in en nuestra con nuestro user y passworword
} from "firebase/auth";

import { auth } from "../../firebase/firebaseConfig";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async (isRegister) => {
    setError("");

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Firebase Authentication</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={() => handleAuth(false)}>
          Iniciar sesión
        </button>

        <button type="button" onClick={() => handleAuth(true)}>
          Registrarse
        </button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Auth;

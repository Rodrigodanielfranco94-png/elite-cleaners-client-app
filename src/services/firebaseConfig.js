// Configuración de Firebase para Élite Cleaners
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Estos datos los obtendremos cuando creemos el proyecto en la consola de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "elite-cleaners.firebaseapp.com",
  projectId: "elite-cleaners",
  storageBucket: "elite-cleaners.appspot.com",
  messagingSenderId: "TU_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

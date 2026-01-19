// Configuración de Firebase para CleanCloud-Pro
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Estos son tus datos reales de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAh_F9Hu95plTiVF0tQHielc5nyozhLRY4",
  authDomain: "cleancloud-pro.firebaseapp.com",
  projectId: "cleancloud-pro",
  storageBucket: "cleancloud-pro.firebasestorage.app",
  messagingSenderId: "402397794840",
  appId: "1:402397794840:web:47d3f98fd7e234c18fe96d",
  measurementId: "G-4797SC4YNT"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar las herramientas para usarlas en las pantallas (Screens)
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

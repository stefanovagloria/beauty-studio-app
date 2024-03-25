import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCWQ7rikgUK2EOXSim2J34u00FHsXSZxAI",
  authDomain: "nefertiti-studio-e396a.firebaseapp.com",
  projectId: "nefertiti-studio-e396a",
  storageBucket: "nefertiti-studio-e396a.appspot.com",
  messagingSenderId: "143383684970",
  appId: "1:143383684970:web:348e300742f35c76336713",
  measurementId: "G-529MHYQ14P",
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

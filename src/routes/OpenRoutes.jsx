import { Navigate } from "react-router-dom";
import Transition from "../components/Transition";

export const OpenRoutes = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"));
  return getTokenFromLocalStorage?.token === undefined ? (
    children
  ) : (
    <Transition>
      <Navigate to="/" replace={true} />
    </Transition>
  );
};


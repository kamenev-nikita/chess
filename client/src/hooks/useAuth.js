import { useEffect } from "react";

export const useAuth = () => {
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      return true;
    } else {
      return false;
    }
  }, []);
};

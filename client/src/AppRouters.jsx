import { publicRouters, privateRouters } from "./routers/index.js";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/index.js";

const AppRoutes = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      {auth
        ? privateRouters.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={route.element()}
              ></Route>
            );
          })
        : publicRouters.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={route.element()}
              ></Route>
            );
          })}
    </Routes>
  );
};

export default AppRoutes;

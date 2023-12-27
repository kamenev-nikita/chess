import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRouters";
import { AuthContext } from "./context";
import { useState } from "react";
import Header from "./components/header/Header";
import { io } from "socket.io-client";

function App() {
  const authFunc = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return true;
    }
    return false;
  };
  const [auth, setAuth] = useState(authFunc());
  const [socket, setSocket] = useState(io("ws://localhost:3001"));
  const [isMat, setIsMat] = useState(false);
  const [isFirstBlackMove, setIsFirstBlackMove] = useState(false);
  const [historyPositions, setHistoryPositions] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        socket,
        setSocket,
        isMat,
        setIsMat,
        isFirstBlackMove,
        setIsFirstBlackMove,
        historyPositions,
        setHistoryPositions,
      }}
    >
      <BrowserRouter>
        {auth && <Header />}
        <AppRoutes />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

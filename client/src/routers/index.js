import FormRegistration from "../components/FormRegistration";
import Home from "../components/Home";
import CreateRoom from "../components/createRoom/CreateRoom";
import SearchRooms from "../components/searchRooms/SearchRooms";
import FastGame from "../components/fastGame/FastGame";
import Chess from "../components/chess/Chess";
import Test from "../components/TEST/TestComponent";

export const publicRouters = [{ path: "*", element: FormRegistration }];

export const privateRouters = [
  { path: "/", element: Home },
  { path: "/create", element: CreateRoom },
  { path: "/search", element: SearchRooms },
  { path: "/fast-game", element: FastGame },
  { path: "/room/:id", element: Chess },
  { path: "/test", element: Test },
];

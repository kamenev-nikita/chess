// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import userRoute from "./routes/UserRoute.js";
// import roomsRouter from "./routes/RoomsRouter.js";
// import socketStart from "./socketIndex.js";

// const app = express();
// const PORT = 5000;
// mongoose.connect("mongodb+srv://nikita:Pass123@cluster0.bwjnks0.mongodb.net/", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// app.use(cors());
// app.use(express.json());
// app.use(userRoute);
// app.use(roomsRouter);

// socketStart();

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// db.on("error", console.error.bind(console, "Ошибка подключения: "));
// db.once("open", () => {
//   console.log("успешное подключение к db");
// });

// app.listen(PORT, () => {
//   console.log("сервер стартовал на порту: " + PORT);
// });

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routes/UserRoute.js";
import roomsRouter from "./routes/RoomsRouter.js";
import socketStart from "./socketIndex.js";
import { Server } from "socket.io";
import http from "http";

const app = express();
const PORT = 5000;
const server = http.createServer(app);

mongoose.connect("mongodb+srv://nikita:Pass123@cluster0.bwjnks0.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(roomsRouter);

socketStart();

db.on("error", console.error.bind(console, "Ошибка подключения: "));
db.once("open", () => {
  console.log("успешное подключение к db");
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(PORT, () => {
  console.log("listening on *:" + PORT);
});

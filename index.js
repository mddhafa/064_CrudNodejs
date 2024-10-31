import express from 'express';
import bodyParser from 'body-parser';
import mobilRoute from "./router/mobil.js";
import motorRoute from "./router/motor.js";

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(express.json());

app.use("/motor", motorRoute);
app.use("/mobil", mobilRoute);
app.get("/", (req, res) => {
    console.log(["GET ROUTE"]);
    res.send("Selamat Pagi");
});

app.use(bodyParser.json())
app.listen(PORT, () =>
console.log (
    `Server berjalan di port : http://localhost:${PORT}`))

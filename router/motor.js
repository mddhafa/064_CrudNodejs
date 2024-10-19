import express, { Router } from "express";

const router = express.Router();
const motor = [
    {
        Merk : "Yamaha",
        Model : "Vixion",
        Pajak : "Hidup",
        Tahun : 2010,
    },
    {
        Merk : "Honda",
        Model : "Astrea",
        Pajak : "Mati",
        Tahun : 2005,
    }
];

router.get ("/", (req, res)=>{
    res.send(motor);
})

export default router;
import express, { Router } from "express"; 

const router = express.Router(); 
const mobil = [ 
    { 
        id : 1,
        merk : "Toyota", 
        model : "Avanza", 
        warna : "Hitam", 
        tahun : 2021, 
    }, 
    { 
        id : 2,
        merk : "Porche", 
        model : "Sport", 
        warna : "Kuning", 
        tahun : 2024, 
    }, 
]; 

router.get("/", (req, res) => { 
    res.send(mobil); 
}); 

router.post("/", (req, res) => { 
    const {merk, model, warna, tahun} = req.body;

    if (!merk || !model || !warna || !tahun){
        return res.status(404).json({message : "semua field harus diisi"});
    }

    const newMobil = {
        id: mobil.length + 1, 
        merk,
        model,
        warna,
        tahun
    }

    mobil.push(newMobil);
    res.status(201).json(newMobil);
}); 
 
router.delete("/:id", (req, res) => {
    const mobilIndex = mobil.findIndex (t => t.id === parseInt(req.params.id));
    if (mobilIndex ===-1) 
        return res.status(404).json({message: 'Mobil tidak ditemukan'});

    const deletedMobil = mobil.splice(mobilIndex, 1) [0];
    return res.status(202).json({message:`Mobil '${deletedMobil.model}'berhasil di hapus`})
});

router.put("/:id", (req, res) => {
    const mobilId = parseInt(req.params.id);
    const mobilIndex = mobil.findIndex(t => t.id === mobilId);
    if (mobilIndex === -1) res.status(404).json({message: `'${mobilId}'Mobil tidak ditemukan`});

    const {merk, model, warna, tahun } = req.body;

    if (merk) mobil[mobilIndex].merk = merk;
    if (model) mobil[mobilIndex].model = model;
    if (warna) mobil[mobilIndex].warna = warna;
    if (tahun) mobil[mobilIndex].tahun = tahun;

    res.status(202).json({
        message:`Mobil '${mobilIndex}'berhasil di update`,
        UpdateMobil : mobil[mobilIndex]
    });

});
export default router;

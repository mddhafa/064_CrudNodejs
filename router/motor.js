import express, { Router } from "express";

const router = express.Router();
const motor = [
    {
        id : 1,
        Merk : "Yamaha",
        Model : "Vixion",
        Pajak : "Hidup",
        Tahun : 2010,
    },
    {
        id : 2,
        Merk : "Honda",
        Model : "Astrea",
        Pajak : "Mati",
        Tahun : 2005,
    }
];

router.get ("/", (req, res)=>{
    res.send(motor);
})

router.post('/',(req, res)=>{
    const { Merk, Model, Pajak, Tahun } = req.body; 

    if (!Merk || !Model || !Pajak || !Tahun) {
        return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    const newMotor = {
        id: motor.length + 1, 
        Merk, 
        Model,
        Pajak,
        Tahun,
    };

    motor.push(newMotor); 
    res.status(201).json(newMotor); 
});

router.delete('/:id', (req, res) => {
    const motorIndex = motor.findIndex(t => t.id === parseInt(req.params.id));
    if (motorIndex === -1) return res.status(404).json({ message: 'Motor tidak ditemukan' });

    const deletedMotor = motor.splice(motorIndex, 1)[0];
    res.status(200).json({ message: `Motor '${deletedMotor.Model}' telah dihapus` });
});

router.put('/:id', (req, res) => {
    const motorId = parseInt(req.params.id);
    const motorIndex = motor.findIndex(t => t.id === motorId);
    if (motorIndex === -1) res.status(404).json({message: `'${motorId}'Motor tidak ditemukan`});

    const {Merk, Model, Pajak, Tahun } = req.body;

    if (Merk) motor[motorIndex].Merk = Merk;
    if (Model) motor[motorIndex].Model = Model;
    if (Pajak) motor[motorIndex].Pajak = Pajak;
    if (Tahun) motor[motorIndex].Tahun = Tahun;

    res.status(200).json({
        message: `Motor dengan '${motorIndex}' telah diperbarui`, 
        updateMotor:motor[motorIndex]
    });
});
export default router;
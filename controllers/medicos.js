const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {


    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre ');


    res.json({
        ok: true,
        medicos
    });
}

const crearMedico = async(req, res = response) => {


    const uid = req.uid;
    const medico = new Medico({ usuario: uid, ...req.body });


    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medido: medicoDB
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    try {
        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'medico no encontrado'
            });
        }

        const cambioMedico = {
            ...req.body,
            usuario: uid
        }
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambioMedico, { new: true });
        res.json({
            ok: true,
            medicoActualizado
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarMedico = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(400).json({
                ok: false,
                msg: 'medico no encontrado'
            });
        }

        const medicoBorrado = await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            medicoBorrado
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico

}
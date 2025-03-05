import Paslon from "../models/PaslonModel.js";
import path from "path";
import fs from "fs";

export const getPaslon = async(req,res) => {
    try {
        const response = await Paslon.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getPaslonById = async(req,res) => {
    try {
        const response = await Paslon.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const savePaslon = (req,res) => {
    if(req.files === null) return res.status(400).json({msg: "File Foto Kosong"});
    const nomor_urut = req.body.nomor_urut;
    const periode = req.body.periode;
    const nama_calon_ketua = req.body.nama_calon_ketua;
    const nama_calon_wakil = req.body.nama_calon_wakil;
    const kelas_calon_ketua = req.body.kelas_calon_ketua;
    const kelas_calon_wakil = req.body.kelas_calon_wakil; 
    const program_kerja = req.body.program_kerja;

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];
 
    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Format File tidak Valid"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Ukuran Maksimal File Foto 5 MB"});
 
    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Paslon.create({
                nomor_urut: nomor_urut,
                periode: periode,
                nama_calon_ketua: nama_calon_ketua,
                nama_calon_wakil: nama_calon_wakil,
                kelas_calon_ketua: kelas_calon_ketua,
                kelas_calon_wakil: kelas_calon_wakil,
                program_kerja: program_kerja, 
                image: fileName,
                url: url
            });
            res.status(201).json({msg: "Data Paslon Berhasil Disimpan"});
        } catch (error) {
            console.log(error.message);
        }
    })
 
}

export const updatePaslon = async(req,res) => {
    const data = await Paslon.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!data) return res.status(404).json({msg: "Data Paslon tidak Ditemukan"});
     
    let fileName = "";
    if(req.files === null){
        fileName = data.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];
 
        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Format File tidak Valid"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Ukuran maksimal File Foto 5 MB"});
 
        const filepath = `./public/images/${data.image}`;
        fs.unlinkSync(filepath);
 
        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const nomor_urut = req.body.nomor_urut;
    const periode = req.body.periode;
    const nama_calon_ketua = req.body.nama_calon_ketua;
    const nama_calon_wakil = req.body.nama_calon_wakil;
    const kelas_calon_ketua = req.body.kelas_calon_ketua;
    const kelas_calon_wakil = req.body.kelas_calon_wakil;
    const program_kerja = req.body.program_kerja;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
     
    try {
        await Paslon.update({
            nomor_urut: nomor_urut,
            periode: periode,
            nama_calon_ketua: nama_calon_ketua,
            nama_calon_wakil: nama_calon_wakil,
            kelas_calon_ketua: kelas_calon_ketua,
            kelas_calon_wakil: kelas_calon_wakil,
            program_kerja: program_kerja,
            image: fileName,
            url: url
        },{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Data Paslon Berhasil Diperbarui"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePaslon = async(req,res) => {
    const data = await Paslon.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!data) return res.status(404).json({msg: "Data Paslon tidak Ditemukan"});
 
    try {
        const filepath = `./public/images/${data.image}`;
        fs.unlinkSync(filepath);
        await Paslon.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Data Paslon Berhasil Dihapus"});
    } catch (error) {
        console.log(error.message);
    }
}

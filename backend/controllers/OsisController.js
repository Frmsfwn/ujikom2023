import Osis from "../models/OsisModel.js";
 
export const getOsis = async(req,res) => {
    try {
        const response = await Osis.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}
 
export const getOsisById = async(req,res) => {
    try {
        const response = await Osis.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}
 
export const saveOsis = async(req,res) => {
    const nama = req.body.nama;    
    const kelas = req.body.kelas;
    const nomor_urut = req.body.nomor_urut;
    const jabatan = req.body.jabatan;
 
    try {
        await Osis.create({
            nama: nama,
            kelas: kelas,
            nomor_urut: nomor_urut,
            jabatan: jabatan
        });
        res.status(201).json({msg: "Data Calon Berhasil Disimpan"});
    } catch (error) {
        console.log(error.message);
    }
 
}
 
export const updateOsis = async(req,res) => {
    const data = await Osis.findOne({
        where:{
            id : req.params.id
        }
    });

    if(!data) return res.status(404).json({msg: "Data Calon tidak Ditemukan"});
     
    const nama = req.body.nama;    
    const kelas = req.body.kelas;
    const nomor_urut = req.body.nomor_urut;
    const jabatan = req.body.jabatan;
     
    try {
        await Osis.update({
            nama: nama,
            kelas: kelas,
            nomor_urut: nomor_urut,
            jabatan: jabatan,
        },{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Data Calon Berhasil Diperbarui"});
    } catch (error) {
        console.log(error.message);
    }
}
 
export const deleteOsis = async(req,res) => {
    const data = await Osis.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!data) return res.status(404).json({msg: "Data Calon tidak Ditemukan"});
 
    try {
        await Osis.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Data Calon Berhasil Dihapus"});
    } catch (error) {
        console.log(error.message);
    }
}

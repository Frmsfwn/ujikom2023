import Admin from "../models/AdminModel.js";

export const Register = async(req, res) => {
    const { username, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Konfirmasi Password tidak sesuai"});
    try {
        await Admin.create({
            username: username,
            email: email,
            password: password
        });
        res.status(200).json({msg: "Registrasi Berhasil"});
    } catch (error) {
        console.log(error);
    }
}
 
export const Login = async(req, res) => {
    try {
        const user = await Admin.findOne({
            where:{
                email: req.body.email
            },
            attributes: ["password"]
        });
        const input_password = req.body.password;
        const user_password = user.password;

        console.log(user.password);
        
        
        if (input_password === user.password) {
            res.status(200).json({msg:"Login Berhasil"});
            console.log("Berhasil", [input_password,user_password]);
        } else {
            res.status(401).json({msg:"Login Gagal"});
            console.log("Gagal", [input_password,user_password]);
        }
    } catch (error) {
        console.log(error);
    }
}

export const getAdmin = async(req, res) =>{
    try {
        const response = await Admin.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
 
export const getAdminById = async(req, res) =>{
    try {
        const response = await Admin.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
 
export const createAdmin = async(req, res) =>{
    try {
        await Admin.create(req.body);
        res.status(201).json({msg: "Admin telah Ditambahkan"});
    } catch (error) {
        console.log(error.message);
    }
}
 
export const updateAdmin = async(req, res) =>{
    try {
        await Admin.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Admin telah Diperbarui"});
    } catch (error) {
        console.log(error.message);
    }
}
 
export const deleteAdmin = async(req, res) =>{
    try {
        await Admin.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Admin telah Dihapus"});
    } catch (error) {
        console.log(error.message);
    }
}

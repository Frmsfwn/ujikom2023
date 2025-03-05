import Admin from "../models/AdminModel.js";

export const Register = async(req, res) => {
    const { username, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Konfirmasi Password tidak sesuai"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Admin.create({
            username: username,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Registrasi Berhasil"});
    } catch (error) {
        console.log(error);
    }
}
 
export const Login = async(req, res) => {
    try {
        const user = await Admin.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, username, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, username, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Admin.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email tidak ditemukan"});
    }
}
 
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Admin.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Admin.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
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

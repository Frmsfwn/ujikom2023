import {Sequelize} from "sequelize";
import db from "../config/Database.js";
 
const {DataTypes} = Sequelize;
 
const Paslon = db.define('paslon',{
    nomor_urut: DataTypes.INTEGER,
    periode: DataTypes.STRING,
    nama_calon_ketua: DataTypes.STRING,
    nama_calon_wakil: DataTypes.STRING,
    kelas_calon_ketua: DataTypes.STRING,
    kelas_calon_wakil: DataTypes.STRING,
    program_kerja: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});
 
export default Paslon ;
 
(async()=>{
    await db.sync();
})();

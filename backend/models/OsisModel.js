import {Sequelize} from "sequelize";
import db from "../config/Database.js";
 
const {DataTypes} = Sequelize;
 
const Osis = db.define('osis',{
    nama: DataTypes.STRING,
    kelas: DataTypes.STRING,
    nomor_urut: DataTypes.INTEGER,
    jabatan: DataTypes.STRING
},{
    freezeTableName: true
});
 
export default Osis;
 
// (async()=>{
//     await db.sync();
// })();

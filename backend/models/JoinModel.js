import Paslon from "./PaslonModel.js";
import Osis from "./OsisModel.js";
// import db from "../config/Database.js";

const joinModel=()=>{
    Paslon.hasMany(Osis,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE",
        foreignKey:"nomor_urut",
        as:"osis"
    });

    Osis.belongsTo(Paslon,{
        foreignKey:"nomor_urut",
        as:"paslon"
    });
}

export default joinModel;

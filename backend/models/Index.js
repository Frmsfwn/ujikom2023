import db from "../config/Database.js";
import joinModel from "./JoinModel.js";
import Paslon from "./PaslonModel.js";
import Osis from "./OsisModel.js";

const syncData=async()=>{
    try {
        joinModel();
        await db.sync({alter:true,force:true});
        console.log("Synced..");     
    } catch (error) {
        console.log(error.message);
    }
}

export{Paslon, Osis, syncData};

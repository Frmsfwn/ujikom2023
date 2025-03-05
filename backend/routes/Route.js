import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
    getPaslon,
    getPaslonById,
    savePaslon,
    updatePaslon,
    deletePaslon
} from "../controllers/PaslonController.js"
import {
    getOsis,
    getOsisById,
    saveOsis,
    updateOsis,
    deleteOsis
} from "../controllers/OsisController.js";
import {
    Register,
    Login,
    Logout,
    getAdmin,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
} from "../controllers/AdminController.js";
 
const router = express.Router();

//Data Paslon Router
router.get('/data/paslon', verifyToken, getPaslon);
router.get('/data/paslon/:id', getPaslonById);
router.post('/data/paslon/create', savePaslon);
router.patch('/data/paslon/update/:id', updatePaslon);
router.delete('/data/paslon/delete/:id', deletePaslon);

//Data Osis Router
router.get('/data/osis', getOsis);
router.get('/data/osis/:id', getOsisById);
router.post('/data/osis/create', saveOsis);
router.patch('/data/osis/update/:id', updateOsis);
router.delete('/data/osis/delete/:id', deleteOsis);

//Data Admin Router
router.get('/data/admin', getAdmin);
router.get('/data/admin/:id', getAdminById);
router.post('/data/admin/create', createAdmin);
router.patch('/data/admin/update/:id', updateAdmin);
router.delete('/data/admin/delete/:id', deleteAdmin);
 
export default router;

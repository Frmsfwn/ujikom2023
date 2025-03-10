import express from "express";
import {
    getPaslon,
    getPaslonById,
    savePaslon,
    updatePaslon,
    deletePaslon
} from "../controllers/PaslonController.js"
import {
    Register,
    Login,
    getAdmin,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
} from "../controllers/AdminController.js";
 
const router = express.Router();

//Data Paslon Router
router.get('/data/paslon', getPaslon);
router.get('/data/paslon/:id', getPaslonById);
router.post('/data/paslon/create', savePaslon);
router.patch('/data/paslon/update/:id', updatePaslon);
router.delete('/data/paslon/delete/:id', deletePaslon);

//Data Admin Router
router.post("/register", Register);
router.post("/login", Login);

router.get('/data/admin', getAdmin);
router.get('/data/admin/:id', getAdminById);
router.post('/data/admin/create', createAdmin);
router.patch('/data/admin/update/:id', updateAdmin);
router.delete('/data/admin/delete/:id', deleteAdmin);
 
export default router;

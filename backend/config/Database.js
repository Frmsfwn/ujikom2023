import { Sequelize } from "sequelize";

const db = new Sequelize('tugas_ujikom_db','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaslonList = () => {
    const [paslon, setPaslon] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPaslon();
    }, []);

    const Logout = async () => {
        try {
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const getPaslon = async () => {
        const response = await axios.get("http://localhost:5000/data/paslon");
        setPaslon(response.data);
    };

    const deletePaslon = async (paslonId) => {
        try {
            await axios.delete(`http://localhost:5000/data/paslon/delete/${paslonId}`);
            getPaslon();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section class="bg-light">
            <div class="container py-5 h-100">
                <button type="button" class="btn btn-primary" onClick={Logout}>
                    Logout
                </button>
                <button type="button" class="btn btn-primary" onClick={() => navigate("/data/paslon/create")}>
                    Tambah
                </button>

                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nomor Urut</th>
                            <th>Foto</th>
                            <th>Periode</th>
                            <th>Calon Ketua</th>
                            <th>Calon Wakil</th>
                            <th>Program Kerja</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        {paslon.map((paslon) => (
                            <tr>
                                <td>{paslon.nomor_urut}</td>
                                <td><img src={paslon.url} alt="" style={{ width:'100px' }}/></td>
                                <td>{paslon.periode}</td>
                                <td>{paslon.nama_calon_ketua}</td>
                                <td>{paslon.nama_calon_wakil}</td>
                                <td>{paslon.program_kerja}</td>
                                <td>
                                    <button type="button" class="btn btn-primary" onClick={() => navigate(`/data/paslon/edit/${paslon.id}`)}>
                                        Ubah
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-danger"
                                        onClick={() => deletePaslon(paslon.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))};
                    </tbody>
                </table>
            </div>
        </section>
    );
};
   
export default PaslonList;

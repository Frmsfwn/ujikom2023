import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaslonList = () => {
    const [paslon, setPaslon] = useState([]);
    const [nomor_urut, setNorut] = useState("");
    const [periode, setPeriode] = useState("");
    const [program_kerja, setProker] = useState("");
    const [file, setFile] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getPaslon();
    }, []);

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

    const savePaslon = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nomor_urut", nomor_urut);
        formData.append("periode", periode);
        formData.append("program_kerja", program_kerja);
        formData.append("file", file);
  
        try {
          await axios.post("http://localhost:5000/data/paslon/create", formData, {
              headers: {
                  "Content-type": "multipart/form-data",
              },
          });
          navigate(0);
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <div className="container mt-5">
            <button type="button" class="btn btn-primary" onClick={() => navigate("/data/paslon/create")}>
                Tambah
            </button>
            <div className="columns is-multiline mt-2">
                {paslon.map((paslon) => (
                    <div className="column is-one-quarter" key={paslon.id}>
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                <img src={paslon.url} alt="" />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">{paslon.nama}</p>
                                    </div>
                                </div>
                            </div>

                            <footer className="card-footer">
                                <button type="button" class="btn btn-primary" onClick={() => navigate(`/data/paslon/edit/${paslon.id}`)}>
                                    Ubah
                                </button>
                                <button
                                    onClick={() => deletePaslon(paslon.id)}
                                    className="card-footer-item"
                                >
                                    Delete
                                </button>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Tambah Data Paslon */}
            <form onSubmit={savePaslon}>
                <div class="modal fade" id="modalTambahPaslon" tabindex="-1" aria-labelledby="modalTambahPaslonLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                    <div class="form-group row">
                                        <label for="norut" class="col-4 col-form-label">Nomor  Urut</label> 
                                        <div class="col-8">
                                            <input id="norut" name="norut" placeholder="masukkan nomor urut" type="text" class="form-control" required="required" onChange={(e) => setNorut(e.target.value)}></input>
                                            <span id="norutHelpBlock" class="form-text text-muted">*format penulisan (01/02/02)</span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="periode" class="col-4 col-form-label">Periode</label> 
                                        <div class="col-8">
                                            <input id="periode" name="periode" placeholder="masukkan periode" type="text" class="form-control" required="required" onChange={(e) => setPeriode(e.target.value)}></input>
                                            <span id="periodeHelpBlock" class="form-text text-muted">*format penulisan: (2000-2001)</span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label for="proker" class="col-4 col-form-label">Program Kerja</label> 
                                        <div class="col-8">
                                            <textarea id="proker" name="proker" cols="40" rows="5" class="form-control" required="required" onChange={(e) => setProker(e.target.value)}></textarea>
                                        </div>
                                    </div> 
                                    <div class="form-group row">
                                        <label for="image" class="col-4 col-form-label">Foto Paslon</label>
                                        <div class="mb-3">
                                            <div class="col-8">
                                                <input id="image" name="image" type="file" class="form-control" required="required" onChange={(e) => setFile(e.target.files[0])}></input>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                                <button type="submit" name="submit" class="btn btn-primary">Simpan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    );
};
   
export default PaslonList;

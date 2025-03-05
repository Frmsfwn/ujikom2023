import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const AddPaslon = () => {
    const [nomor_urut, setNorut] = useState("");
    const [periode, setPeriode] = useState("");
    const [nama_calon_ketua, setNamaKetua] = useState("");
    const [nama_calon_wakil, setNamaWakil] = useState("");
    const [kelas_calon_ketua, setKelasKetua] = useState("");
    const [kelas_calon_wakil, setKelasWakil] = useState("");
    const [program_kerja, setProker] = useState("");
    const [file, setFile] = useState("");
    const navigate = useNavigate();
  
  const savePaslon = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("nomor_urut", nomor_urut);
      formData.append("periode", periode);
      formData.append("nama_calon_ketua", nama_calon_ketua);
      formData.append("nama_calon_wakil", nama_calon_wakil);
      formData.append("kelas_calon_ketua", kelas_calon_ketua);
      formData.append("kelas_calon_wakil", kelas_calon_wakil);
      formData.append("program_kerja", program_kerja);
      formData.append("file", file);

      try {
        await axios.post("http://localhost:5000/data/paslon/create", formData, {
            headers: {
                "Content-type": "multipart/form-data",
            },
        });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
  };
 
  return (
    <form onSubmit={savePaslon}>
        <div class="form-group row">
            <label for="norut" class="col-4 col-form-label">Nomor Urut</label> 
            <div class="col-8">
                <input id="norut" name="norut" placeholder="masukkan nomor urut" type="text" class="form-control" required="required" onChange={(e) => setNorut(e.target.value)}></input>
                <span id="norutHelpBlock" class="form-text text-muted">*format penulisan (01/02/02)</span>
            </div>
        </div>
        <br></br>
        <div class="form-group row">
            <label for="periode" class="col-4 col-form-label">Periode</label> 
            <div class="col-8">
                <input id="periode" name="periode" placeholder="masukkan periode" type="text" class="form-control" required="required" onChange={(e) => setPeriode(e.target.value)}></input>
                <span id="periodeHelpBlock" class="form-text text-muted">*format penulisan: (2000-2001)</span>
            </div>
        </div>
        <br></br>
        <div class="form-group row">
            <label for="nama_ketua" class="col-4 col-form-label">Nama Calon Ketua</label> 
            <div class="col-8">
                <input id="nama_ketua" name="nama_ketua" placeholder="masukkan nama calon ketua" type="text" class="form-control" required="required" onChange={(e) => setNamaKetua(e.target.value)}></input>
            </div>
        </div>
        <br></br>
        <div class="form-group row">
            <label for="kelas_ketua" class="col-4 col-form-label">Kelas</label> 
            <div class="col-8">
                <input id="kelas_ketua" name="kelas_ketua" placeholder="masukkan kelas calon ketua" type="text" class="form-control" required="required" onChange={(e) => setKelasKetua(e.target.value)}></input>
            </div>
        </div>
        <br></br>
        <div class="form-group row">
            <label for="nama_wakil" class="col-4 col-form-label">Nama Calon Wakil</label> 
            <div class="col-8">
                <input id="nama_wakil" name="nama_wakil" placeholder="masukkan nama calon wakil" type="text" class="form-control" required="required" onChange={(e) => setNamaWakil(e.target.value)}></input>
            </div>
        </div>
        <br></br>
        <div class="form-group row">
            <label for="kelas_wakil" class="col-4 col-form-label">Kelas</label> 
            <div class="col-8">
                <input id="kelas_wakil" name="kelas_wakil" placeholder="masukkan kelas calon wakil" type="text" class="form-control" required="required" onChange={(e) => setKelasWakil(e.target.value)}></input>
            </div>
        </div>
        <br></br>
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
        <button type="submit" name="submit" class="btn btn-primary">Simpan</button>
    </form>
  );
};
 
export default AddPaslon;

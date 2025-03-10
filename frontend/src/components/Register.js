import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const navigate = useNavigate();
 
    const Register = async (e) => {
        e.preventDefault();
        try {
            if (confPassword === password) {
                await axios.post('http://localhost:5000/data/admin/create', {
                    username: username,
                    email: email,
                    password: password,
                    confPassword: confPassword
                });
                navigate("/login");
            } else {
                navigate(0);
            }            
        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <section class="vh-100 bg-dark">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card shadow-2-strong rounded">
                            <div class="card-body p-5 text-center">
                                <h3 class="mb-5">Register</h3>
                                <form onSubmit={Register}>
                                    <div class="form-group row">
                                        <label for="username" class="col-4 col-form-label">Username</label> 
                                        <div class="col-8">
                                            <input id="username" name="username" placeholder="masukkan username" type="text" class="form-control" required="required" onChange={(e) => setUsername(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div class="form-group row">
                                        <label for="email" class="col-4 col-form-label">Email</label> 
                                        <div class="col-8">
                                            <input id="email" name="email" placeholder="masukkan email" type="email" class="form-control" required="required" onChange={(e) => setEmail(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div class="form-group row">
                                        <label for="password" class="col-4 col-form-label">Password</label> 
                                        <div class="col-8">
                                            <input id="password" name="password" placeholder="********" type="password" class="form-control" required="required" onChange={(e) => setPassword(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div class="form-group row">
                                        <label for="konfirmasi_password" class="col-4 col-form-label">Konfirmasi Password</label> 
                                        <div class="col-8">
                                            <input id="konfirmasi_password" name="konfirmasi_password" placeholder="********" type="password" class="form-control" required="required" onChange={(e) => setConfPassword(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <button type="submit" name="submit" class="btn btn-primary">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 
export default Register

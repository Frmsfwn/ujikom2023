import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [statusLogin, setStatus] = useState('');
    const navigate = useNavigate();
 
    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            }).then(response => {
                if (response.status === 200) {
                    setStatus("Berhasil");
                    navigate("/data/paslon");
                } else {
                    setStatus("Gagal");
                    navigate(0);
                }
            })
            .catch(error => {
                if (error.response) {
                  console.error("Error Status:", error.response.status); // Error status code
                  console.error("Error Data:", error.response.data); // Error response data
                } else {
                  console.error("Request Failed:", error.message);
                }
            });
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
                                <h3 class="mb-5">Login</h3>
                                <form onSubmit={Auth}>
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
                                    <hr class="my-4"/>
                                    <button type="submit" name="submit" class="btn btn-primary">Login</button>
                                    <button type="button" class="btn btn-secondary" onClick={() => navigate("/register")}>Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
 
export default Login

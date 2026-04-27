import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios.post("http://127.0.0.1:8000/api/login/", {
      username,
      password
    })
    .then(res => {
      localStorage.setItem("token", res.data.access);
      alert("Login Success");
    })
    .catch(() => alert("Invalid credentials"));
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
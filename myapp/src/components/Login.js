import React from "react";
import { useState,useEffect } from "react";
import {Form, Modal,Card, Button} from 'react-bootstrap'
import axios from "axios"; 
import { useNavigate, useLocation,useParams} from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setloginStatus] = useState(true)
  
  const nav = useNavigate();
  const {reset}=useParams()
  const fetchToken = async () => {
    try {
      const token = await axios.post("http://localhost:8081/auth/login", {
        userName: username,
        password: password,
      });
      console.log(token);
      localStorage.setItem("token", JSON.stringify(token.data));
      const saveUser=await axios.post(
        `http://localhost:8089/save/${username}/${password}`
      );
      console.log(saveUser)
      return token;
    } catch (e) {
      console.log(e);
      return e;
    }
    // console.log(token.status);
    return false;
    // }
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    const req = fetchToken();
    req.then((res) => {
      if ("data" in res) {
        localStorage.setItem("uname",username);

        nav(`/home?username=${username}`);
      } else {
       setloginStatus(false)
        
      }
    });

    // e.reset()
  };
  return (
    <Card className="container bg-orange-400  p-10 max-w-2xl m-auto mt-5">
      <Card.Body className="bg-orange-300 p-5 rounded">
        <Form className="form form-control text-center" onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            className="p-2 rounded-lg text-zinc-900 cursor-auto font-sans  font-medium mt-3"
            value={username}
            placeholder="User Name"
            onChange={(e) => setUsername(e.target.value)}
            />
          <br />

          <input
            type="password"
            name="password"
            placeholder="password"
            className="p-2 placeholder-base-400  rounded-lg cursor-auto  text-zinc-900  font-mono font-medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <br />
          <Button
            type="submit"
            className="mt-2 btn animated animate__tada bg-orange-900 hover-bordered"
            >
            Login
          </Button>
        </Form>
      </Card.Body>
            {!loginStatus && <h2 className="text-center pt-5 animated animate__heartBeat shadow-error-content text-lg">Invalid Crendentials!!!</h2>}
    </Card>
  );
}

export default Login;

import React from "react";
import { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Input } from "@mui/material";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setloginStatus] = useState(true);
  const [passwordType, setPasswordType] = useState(false)
  const nav = useNavigate();
  const { reset } = useParams();
  const fetchToken = async () => {
    try {
      const token = await axios.post("http://localhost:8081/auth/login", {
        userName: username,
        password: password,
      });
      localStorage.setItem("token", JSON.stringify(token.data));
      const saveUser = await axios.post(
        `http://localhost:8089/save/${username}/${password}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return token;
    } catch (e) {
      return e;
    }
    return false;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const req = fetchToken();
    req.then((res) => {
      if ("data" in res) {
        localStorage.setItem("uname", username);

        nav(`/home?username=${username}`);
      } else {
        setloginStatus(false);
      }
    });

    // e.reset()
  };

  return (
    <Card id="show-item" className="contacainer w-2/4 p-10  m-auto mt-5">
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

          <div className="inline-flex">
            <Input
              type={passwordType? "text":"password"}
              
              name="password"
              placeholder="password"
              className=" p-2 placeholder-base-400  rounded-lg cursor-auto  text-zinc-900  font-mono font-medium"
              value={password}
              endAdornment={<label className="swap swap-rotate">
              <input type="checkbox" onClick={
                (e)=>{
                  setPasswordType(e.target.checked)
                }
              } />
              <svg
                name="on"
                className="swap-on"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
              </svg>
              
              <svg
              name="off"
                className="swap-off"
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.318 1.83c.967.943 1.804 2.013 2.475 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.298 0-2.553-.313-3.73-.849l2.624-2.307c.352.102.724.156 1.108.156 2.208 0 4-1.792 4-4 0-.206-.016-.408-.046-.606zm-4.932.467c-.678-.528-1.53-.843-2.455-.843-2.208 0-4 1.792-4 4 0 .741.202 1.435.553 2.03l1.16-1.019c-.137-.31-.213-.651-.213-1.011 0-1.38 1.12-2.5 2.5-2.5.474 0 .918.132 1.296.362z"
                  fillRule="nonzero"
                />
              </svg>
            </label>}
              onChange={(e) => setPassword(e.target.value)}
            />
            
          </div>
          <br />
          <Button
            type="submit"
            className="mt-2 btn animated animate__tada bg-orange-900 hover-bordered"
          >
            Login
          </Button>
        </Form>
      </Card.Body>
      {!loginStatus && (
        <h2 className="text-center pt-5 animated animate__heartBeat shadow-error-content text-lg">
          Invalid Crendentials!!!
        </h2>
      )}
    </Card>
  );
}

export default Login;

import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

const Form = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    // await api.post(route, { username, password }, async (req, res) => {
    //   try {
    //     if (name === "Login") {
    //       localStorage.setItem(ACCESS_TOKEN, res.data.access);
    //       localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
    //       console.log("accesstoken is ",localStorage.getItem(ACCESS_TOKEN)  )
    //       navigate("/");
    //     } else {
    //       console.log("aaaa")
    //       navigate("/login");
    //     }
    //   } catch (err) {
    //     console.log(`err is ${res.data}`);
    //     alert(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // });

    // try {
    //   const res = await api.post(route, { username, password });
    //   if (name === "Login") {
    //     localStorage.setItem(ACCESS_TOKEN, res.data.access);
    //     localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

    //     navigate("/");
    //   } else {
    //     navigate("/login");
    //   }
    // } catch (err) {
    //   console.log(`err is ${err.request}`);
    //   console.log(`err is ${err.response.data}`);
    //   alert(err);
    // } finally {
    //   setLoading(false);
    // }

    try {
      const res = await api.post(route, { username, password });
      if (name === "Login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        console.log(`err is ${JSON.stringify(err.response.data, null, 2)}`);
      } else {
        console.log(`err is ${err}`);
      }
      alert(err.response.data.detail, null, 2);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        type="text"
        className="form-input"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        className="form-input"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {loading && <LoadingIndicator />}
      <button className="'form-button" type="submit">
        {name}
      </button>
    </form>
  );
};

export default Form;

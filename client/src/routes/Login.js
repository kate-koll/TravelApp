import { useState } from "react";
import {LoginForm} from "../components/Login/LoginForm";

export default function Login() {
  const [token, setToken] = useState();

  return (
      <div><LoginForm setToken={setToken}/></div>
    );
  }
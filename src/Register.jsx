import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import Logo from "./Clothes.png";
import axios from "axios";
import { context } from "./ContextFun";
function Register() {
    let navigate = useNavigate()
  let [step, setStep] = useState(1);
  let [signup, setSignup] = useState({
    username: "",
    email: "",
    address: "",
    password: "",
    cart: [],
  });

  let {users, setUsers,signin, setSignin} = useContext(context)

  let getUsers = async () => {
    let res = await fetch("https://clothes-backend.herokuapp.com/getUsers");
    let json = await res.json();
    return json;
  };
  useEffect(() => {
    getUsers().then((res) => setUsers(res));
  }, []);
  console.log(users);
  // =========================== Signin ==================================

  let handleChangeSignin = (e) => {
    setSignin({ ...signin, [e.target.name]: e.target.value });
  };
    let handleSubmitSignin = (e) => {
        e.preventDefault()
        if (users.some(item => item.email === signin.email && item.password === signin.password)) {
            navigate("/main")
        } else if (signin.email === "admin@admin.admin" && signin.password === "admin") {
          navigate("/admin")
        } else {
            alert("Username or Password is not correct !")
        }
    }

  // ======================= Sign up =============================================
  let handleChangeSignup = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  let handleSubmitSignup = (e) => {
    e.preventDefault();
    axios.post("https://clothes-backend.herokuapp.com/users", signup);
      alert("Successfuly Registered");
      //! Have to ask why its not signin untill refresh page
      setSignin({
          email: signup.email,
          password:signup.password
      })
    setSignup({
      username: "",
      email: "",
      address: "",
      password: "",
    });
    setStep(1)
    getUsers().then(res => setUsers(res))
    
  };

  return (
    <div className="register">
      <header>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmitSignin}>
          <input
            placeholder="E-Mail..."
            type="email"
            name="email"
            id=""
            onChange={handleChangeSignin}
            value={signin.email}
          />
          <input
            placeholder="Password..."
            type="password"
            name="password"
            id=""
            onChange={handleChangeSignin}
            value={signin.password}
          />
          <button>Sign in</button>
        </form>
      </header>

      <div className="signup">
        <a>
          <img src={Logo} alt="" />
        </a>
        <form onSubmit={handleSubmitSignup}>
          {/* ========================================= Step 1 ============================= */}
          {step === 1 && (
            <>
              <input
                placeholder="Username..."
                type="text"
                name="username"
                id=""
                onChange={handleChangeSignup}
                value={signup.username}
              />
              <button onClick={() => setStep(2)}>Next</button>
            </>
          )}
          {/* ========================================= Step 2 ============================= */}

          {step === 2 && (
            <>
              <input
                placeholder="Address..."
                type="text"
                name="address"
                id=""
                onChange={handleChangeSignup}
                value={signup.address}
              />
              <button onClick={() => setStep(3)}>Next</button>
            </>
          )}
          {/* ========================================= Step 3 ============================= */}

          {step === 3 && (
            <>
              <input
                placeholder="E-Mail..."
                type="email"
                name="email"
                id=""
                onChange={handleChangeSignup}
                value={signup.email}
              />
              <button onClick={() => setStep(4)}>Next</button>
            </>
          )}
          {/* ========================================= Step 4 ============================= */}

          {step === 4 && (
            <>
              <input
                placeholder="Password..."
                type="password"
                name="password"
                id=""
                onChange={handleChangeSignup}
                value={signup.password}
              />
              <button>Sign up</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;

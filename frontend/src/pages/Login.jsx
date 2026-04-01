import { useState } from "react"; // usestate means used to store a component value,when value change automatically update
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom"; // used to navigate signup page,products

import { useLoginMutation } from "../services/authApi";







function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitCount, setSubmitCount] = useState(0);

   const navigate = useNavigate()
const [loginUser] = useLoginMutation();


//when the form submitted this function to be run
const handleLogin = async (e) => {

  e.preventDefault(); //avoid page refresh from submit

  setSubmitCount((prev) => prev + 1); //each submit count +1

  let newErrors = {}; // empty error object

  if (email === "") {
    newErrors.email = "! Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "! Enter a valid email address";
  }

  if (password === "") {
    newErrors.password = "! Password is required";
  } else if (password.length < 6) {
    newErrors.password = "! Password must be 6 characters";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {

  try {
//RTK query call
  const response = await loginUser({
  email,
  password
}).unwrap();

console.log("LOGIN RESPONSE:", response);
localStorage.setItem("token", response.token);
//response=backend response ,data = actual data part ,token = backend given token

    alert("Login Successful");
    navigate("/products");


  } catch (error) {
    alert(error?.data?.message || "Login failed");
  }
}

};


  return (
    
     <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-500 to-slate-800">
    
      <div
        className="
          w-full max-w-md
          bg-white/5
          backdrop-blur-sm
          border border-white/20
          p-10
          rounded-2xl
          shadow-md
          bg-no-repeat bg-center
        "
        
      >
        <form onSubmit={handleLogin}>
          <h2 className="mb-6 text-center text-2xl font-bold">
            Login
          </h2>

          <InputField
  label="Email"
  type="text"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  submitCount={submitCount}
/>
          <InputField
  label="Password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  error={errors.password}
  submitCount={submitCount}
/>


          <div className="flex justify-center">
        <Button text="Login" type="submit" />
          </div>
          <p className="mt-4 text-center text-sm text-white/80">
  Don’t have an account?{" "}
  <Link
    to="/signup"
    className="font-semibold text-indigo-400 hover:text-indigo-300 underline transition"
  >
    Sign up
  </Link>
</p>

        </form>
      </div>
    </div>
  );
}

export default Login;

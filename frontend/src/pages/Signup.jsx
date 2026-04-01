import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { validateEmail, validatePassword } from "../utils/Validate";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../services/authApi";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitCount, setSubmitCount] = useState(0);

  const navigate = useNavigate();
  const [signupUser] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitCount((prev) => prev + 1);

    let newErrors = {};

    if (name === "") newErrors.name = "! Name is required";
    if (!validateEmail(email)) newErrors.email = "! Invalid email";
    if (!validatePassword(password)) {
      newErrors.password = "! Password must be 6 characters";
    }

    setErrors(newErrors);

    // ✅ MISSING BRACE FIXED
    if (Object.keys(newErrors).length === 0) {
      try {

        const response = await signupUser({
          name,
          email,
          password
        }).unwrap();

        console.log("SIGNUP RESPONSE:", response);

        alert("Signup Success");
        navigate("/login");

      } catch (error) {
        console.log("SIGNUP ERROR FULL:", error);
        alert(error?.data?.message || "Signup Failed");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-500 to-slate-800">
      <div className="
          w-full max-w-md
          bg-white/10
          backdrop-blur-sm
          border border-white/20
          p-20
          rounded-2xl
          shadow-md
        ">

        <form onSubmit={handleSubmit}>

          <h2 className="mb-4 text-center text-2xl font-bold p-1">
            SIGN IN
          </h2>

          <InputField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            submitCount={submitCount}
          />

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
            <Button text="Sign Up" />
          </div>

          <p className="mt-4 text-center text-sm text-slate-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold underline text-indigo-300 hover:text-indigo-300 transition"
            >
              Login
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Signup;

import { signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { auth } from "../../firebase";
import React,{ useState } from 'react'
import { Link } from "react-router-dom";
const provider = new GoogleAuthProvider();

const LoginForm=()=>{
    const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
    const [showPassword, setShowPassword] = useState(false)
    const { email, password } = formData

    const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      const additionalUserInfo =result.additionalUserInfo;
      if(additionalUserInfo && additionalUserInfo.isNewUser){
        toast.success("Account Created Successfully")
      }
      else{
        toast.success("Welcome Back "+user.displayName)
      }
    }).catch((error) => {
      toast.error(error.message)
    }
    );
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth,formData.email,formData.password).then(value=>toast.success("Logged In Successfully")).catch(err=>toast.error(err.message));
  }

   

  return (

    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-11/12 max-w-[450px] p-6 rounded-lg flex-col gap-y-4 shadow-md bg-richblack-800"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type="text"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder=" Enter email address"
          className="form-style w-full"
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder=" Enter Password"
          className="form-style w-full !pr-10"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-2 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-4 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
      <div className="text-center text-pure-greys-200 mt-2 flex justify-center items-center gap-x-2">
        <div className="ml-10">- - - - - - - - -</div>OR<div className="mr-10">- - - - - - - - -</div>
      </div>
          <button onClick={signInWithGoogle} type="button"
          className="w-full rounded-lg bg-blue-50 font-medium text-black flex justify-center items-center gap-x-2 py-2 mt-1">
               <FaGoogle fontSize={24}/> Sign in with Google
          </button>
          <div className="text-center text-richblack-5 mt-4">
      Don't have an account?{" "}
      <Link to="/signup">
        <span className="text-blue-100 cursor-pointer">Sign Up</span>
      </Link>
    </div>
    </form>
  
  );
}

export default LoginForm;
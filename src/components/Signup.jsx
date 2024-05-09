import { useContext } from "react"
import { Authentication } from "../context/Authentication"
import { FcGoogle } from "react-icons/fc";
import { ThreeDots } from "react-loader-spinner";

function Signup() {
    const {formData,setFormData,setSignup,signup,handleSignup,setSignin,loading} = useContext(Authentication);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  return (
    <div className="w-full h-full flex justify-center bg-slate-200">
    <div className="flex flex-row justify-center items-center w-full h-full ">
      
      <div className="w-full h-full bg-white flex flex-col gap-5 justify-center items-center">
      <h1 className="text-3xl font-bold text-center">Sign Up</h1>
        <div className={` mb-2 w-3/4 flex flex-col ${!signup ? 'opacity-0 duration-700 ease-in-out' : ''}`}>
          <form  onSubmit={(e)=>{handleSignup(e)}} className=" h-3/4 flex flex-col gap-4  w-full shadow-none bg-transparent">
            <input
            className="w-full h-10 bg-blue-50 p-4"
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              autoComplete="name"
              required
            />
            <input
            className="w-full h-10 bg-blue-50 p-4"
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              autoComplete="name"
              required
            />
            <input
            className="w-full h-10 bg-blue-50 p-4"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
            <input
            className="w-full h-10 bg-blue-50 p-4"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            <input
            className="w-full h-10 bg-blue-50 p-4"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />

            <button className="w-full bg-red-400 h-10 flex justify-center items-center" type="submit">{
            loading ? (<ThreeDots width='38' color="#ffffff"/>): 'Sign up'
            }</button>
          </form>
          <div className="flex justify-between items-center w-full mt-5">
            <div className="w-2/5 bg-slate-200 h-[1px]"></div>
            <span className=" font-semibold">OR</span>
            <div className="w-2/5 bg-slate-200 h-[1px]"></div>
          </div>
          <div className="w-full mt-2 md:mt-5 flex bg-yellow-400 ">
            <button  className="w-full flex justify-center items-center h-10">
              <span className="mr-3">
                <FcGoogle className="text-2xl" />
              </span>
              Sign Up with Google
            </button>
          </div>
          <div className="w-full flex justify-center mt-5">
            <p>Already have an account?</p>
            <button onClick={()=>{setSignup(false); setSignin(true)}} className="text-lime-500 text-bold text-base ml-2">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Signup
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, userLogin } from "../features/auth/authActions";
import Loading from "../components/Loading.jsx";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput.jsx";
import PropTypes from "prop-types";

const Auth = ({initialIsRegister}) => {
  const [isRegister, setIsRegister] = useState(initialIsRegister);
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      setIsRegister(false);
    }
    if (userInfo) {
      navigate("/feed");
      window.location.reload(); // Reload the page on success
    }
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    if (isRegister) {
      if (data.password !== data.confirmPassword) {
        alert("Password mismatch");
        return;
      }
      data.email = data.email.toLowerCase();
      dispatch(registerUser(data));
    } else {
      data.username = data.username.toLowerCase();
      dispatch(userLogin(data));
    }
  };

  return (
    <div className=" px-20 mt-4">
      <h1 className="text-[31px] font-bold">
        {isRegister ? "Create your account" : "Sign in to SeafoodChat"}
      </h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col justify-between gap-4 h-full">
          {isRegister ? (
            <div className="flex flex-col justify-center gap-4 mt-12">
              <TextInput
                type="text"
                register={register}
                placeholder="Username"
                id="username"
                field="username"
              />
              <TextInput
                type="text"
                register={register}
                placeholder="Email"
                id="email"
                field="email"
              />
              <TextInput
                type="password"
                register={register}
                placeholder="Password"
                id="password"
                field="password"
              />
              <TextInput
                type="password"
                register={register}
                placeholder="Confirm password"
                id="confirmPassword"
                field="confirmPassword"
              />
            </div>
          ) : (
            <div className="flex flex-col justify-center gap-4 mt-12 mb-36">
              <TextInput
                type="text"
                register={register}
                placeholder="Username or email"
                id="username"
                field="username"
              />
              <TextInput
                type="password"
                register={register}
                placeholder="Password"
                id="password"
                field="password"
              />
            </div>
          )}
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="button bg-white rounded-full w-full h-12
             text-black mt-8 font-bold text-[17px]"
            disabled={loading}
          >
            {loading ? <Loading /> : isRegister ? "Register" : "Login"}
          </button>
          <div className="font-normal flex justify-center">
            <span className="text-gray-500">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </span>
            &nbsp;
            <div
              className="text-color-1 hover:cursor-pointer"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Log In" : "Sign Up"}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

Auth.propTypes = {
  initialIsRegister: PropTypes.bool,
}

export default Auth;

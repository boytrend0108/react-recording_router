import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../store/AuthContext";
import { useLocation, useNavigate } from 'react-router-dom'

type Inputs = {
  username: string,
  password: string,
};
export const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();

  const onSubmit: SubmitHandler<Inputs> = data => {
    login(data)
      .then(() => navigate(state.pathname, { replace: true }))
      .catch(err => setErrorMessage(err.message))
  };

  return (
    <div className="container is-max-desktop">
      <div className="notification is-primary">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                {...register("username", { required: "Enter username" })}
                name='username'
                autoComplete="username"
                className="input"
                type="text"
                placeholder="e.g Alex Smith"
              />
              {errors.username && <span>This field is required</span>}
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                {...register("password", { required: 'Enter password' })}
                name='password'
                className="input"
                type="password"
                autoComplete="current-password"
                placeholder="e.g. alexsmith@gmail.com"
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
          </div>

          <input
            className="button"
            type="submit"
            value="Login"
          />
        </form>
      </div>

      {errorMessage && (
        <div className="notification is-danger">
          <h2>{errorMessage}</h2>
        </div>
      )}
    </div>
  )
}
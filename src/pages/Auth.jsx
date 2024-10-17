import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {registerUser, userLogin} from '../features/auth/authActions';
import Loading from '../components/Loading.jsx';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);
  const { loading, userInfo, error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      setIsRegister(false);
    }
    if (userInfo) {
      navigate('/feed');
    }
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    if (isRegister) {
      if (data.password !== data.confirmPassword) {
        alert('Password mismatch');
        return;
      }
      data.email = data.email.toLowerCase();
      dispatch(registerUser(data));
    } else {
      data.email = data.email.toLowerCase();
      dispatch(userLogin(data));
    }
  };

  return (
    <div>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Switch to Login' : 'Switch to Register'}
      </button>
      <form onSubmit={handleSubmit(submitForm)}>
        {error && <p>{error}</p>}
        {isRegister ? (
          <>
            <div className='form-group'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                className='form-input'
                {...register('username')}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                className='form-input'
                {...register('email')}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                className='form-input'
                {...register('password')}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                type='password'
                className='form-input'
                {...register('confirmPassword')}
                required
              />
            </div>
          </>
        ) : (
          <>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                className='form-input'
                {...register('email')}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                className='form-input'
                {...register('password')}
                required
              />
            </div>
          </>
        )}
        <button type='submit' className='button' disabled={loading}>
          {loading ? <Loading /> : isRegister ? 'Register' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Auth;
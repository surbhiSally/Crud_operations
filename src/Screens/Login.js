import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../Style/App.css';
import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Spinner from '../Components/Spinner';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  let navigate = useNavigate()

  const postData = async () => {
    setLoading(true)
    const response = await axios.post(`http://13.127.84.143:8080/INTMockTestPortal/api/v1/loginUser`, {
      email,
      password
    })
      .then(function (response) {
        localStorage.setItem('token', response.data.result.token);
      })
      
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (email === "mohiniupadhyay05@gmail.com" && password === '12345'){
      setLoading(false)
     const nav = () => navigate('/questionslist')
      nav();
      postData()
    } else {
      setError('Details do not match')
      setTimeout(() => {
        setError('')
      }, 3000)
      setEmail('')
      setPassword('')
    }
  }

  return (
    <>
      <div className='App'>
      {loading && <Spinner/>}
  {!loading &&
          <form className="container col-xs-6 col-md-4">
            <h3>Sign In</h3>
            {(error !== '') ? (<div>{error}</div>) : ''}
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block" onClick={(e) => submitHandler(e)} disabled={loading}>Login</button>
            <p className="forgot-password text-right">Forgot <a href="#">password?</a></p>
          </form>
}
      </div>
    </>
  );
}

export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/loginUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        })
      });

      const json = await response.json();
      console.log("Response JSON:", json);

      if (response.ok && json.success) {
        console.log("User logged in successfully!");
        localStorage.setItem("authToken", json.authToken);
        console.log("Stored authToken:", localStorage.getItem("authToken"));
        navigate("/"); // Redirect to home page after successful login
      } else {
        console.error('Login failed:', json.errors || response.statusText);
        alert('Login failed: ' + (json.errors ? json.errors[0].msg : response.statusText));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred: ' + error.message);
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
        </div>
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/createuser" className='m-3 btn btn-danger'>I'm a new user</Link>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Cart from '../screens/Cart'; // Ensure the path to Cart component is correct

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">FoodieZone</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {authToken && (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/my-orders">My Orders</Link>
                </li>
              )}
            </ul>
            {!authToken ? (
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                  My Cart{" "}
                  <Badge pill bg="danger">2</Badge>
                </div>
                <Modal show={cartView} onHide={() => setCartView(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>My Cart</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Cart />
                  </Modal.Body>
                </Modal>
                <button className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

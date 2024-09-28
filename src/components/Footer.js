import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          {/* Optional content for the Link */}
        </Link>
        <span className="text-muted">© 2024 FoodieZone, Inc</span>
      </div>
    </footer>
  );
}

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        {/* Your main content goes here */}
      </main>
      <Footer />
    </div>
  );
};

export default App;


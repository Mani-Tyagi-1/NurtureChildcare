import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "./Components/Auth/LoginPage"
import HomePage from "./Components/Home/HomePage"
import Testimonials from "./Components/Home/Testimonials";
import ViewAdmin from "./Components/Home/ViewAdmin";
import Newsletter from "./Components/Home/Newsletter";
import Blogs from "./Components/Home/Blogs";
import BlogDetails from "./Components/Home/BlogsDetails";
import Gallery from "./Components/Home/Gallery";
import AlbumDetails from "./Components/Home/AlbumDetails";
import Founder from "./Components/Home/Founder";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage

  // If the token does not exist, navigate to login page, else render the element
  if (!token) {
    return <Navigate to="/" />; // Redirect to /login if the user is not authenticated
  }

  return <>{element}</>; // If authenticated, render the protected component
};

const App = () => {

  const token = localStorage.getItem('token');

  return (
    <Routes>
      {/* Login - Landing + Default */}
      <Route path="/" element={<LoginPage />} />

      {/* Home - Dashboard */}
      <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
      <Route
        path="/testimonials"
        element={<ProtectedRoute element={<Testimonials />} />}
      />
      <Route
        path="/all-admins"
        element={<ProtectedRoute element={<ViewAdmin />} />}
      />
      <Route
        path="/newsletter"
        element={<ProtectedRoute element={<Newsletter />} />}
      />
      <Route path="/blogs" element={<ProtectedRoute element={<Blogs />} />} />
      <Route
        path="/blogs/:id"
        element={<ProtectedRoute element={<BlogDetails />} />}
      />
      <Route
        path="/gallery"
        element={<ProtectedRoute element={<Gallery />} />}
      />
      <Route path="/gallery/:id" element={<AlbumDetails />} />
      <Route
        path="/founder"
        element={<ProtectedRoute element={<Founder />} />}
      />

      {/* Redirect to home if authenticated */}

      {/* PNF later */}
      {/* <Route path="*" element={token ? <Navigate to="/home" /> : <Navigate to="/" />} /> */}
    </Routes>
  );
}

export default App
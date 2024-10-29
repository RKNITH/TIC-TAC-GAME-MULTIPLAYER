// React-Router-Dom Imports
import { 
  useLocation, 
  Navigate, 
  Outlet 
} from "react-router-dom";

const ProtectedRoute = () => {
  const auth = localStorage.getItem('auth');
  const location = useLocation()
  return (
      auth
          ? <Outlet />
          : <Navigate to='/' state={{ from : location }} replace />
  );
}

export default ProtectedRoute; 
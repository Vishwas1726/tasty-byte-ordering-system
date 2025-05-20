
import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";

interface RequireAuthProps {
  children: ReactNode;
  allowedRoles?: ('admin' | 'customer')[];
}

const RequireAuth = ({ children, allowedRoles }: RequireAuthProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        toast.error("Please log in to access this page");
        navigate("/login", { state: { from: location.pathname } });
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        toast.error("You don't have permission to access this page");
        navigate("/");
      }
    }
  }, [user, isLoading, navigate, location.pathname, allowedRoles]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-food"></div>
      </div>
    );
  }

  // Only render children if user is authenticated and has required role
  if (!user) return null;
  if (allowedRoles && !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
};

export default RequireAuth;

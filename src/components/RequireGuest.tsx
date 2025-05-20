
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface RequireGuestProps {
  children: ReactNode;
}

const RequireGuest = ({ children }: RequireGuestProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-food"></div>
      </div>
    );
  }

  // Only render children if user is not authenticated
  if (user) return null;

  return <>{children}</>;
};

export default RequireGuest;

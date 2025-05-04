import { useNavigate,  } from "react-router-dom";
import { logout } from '../firebase';
import { LogOut } from 'lucide-react';

interface SignOutButtonProps {
  onLogout: (loggedIn: boolean) => void;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({onLogout}) => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
        await logout();
        onLogout(false)
        navigate("/");

    } catch (error) {
      
      console.error('Error signing out:', error);
    }
  };

  return (    
    <button
    onClick={handleSignOut}
    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300"
    >
        <LogOut className="w-4 h-4" />
    </button>
  );
};

export default SignOutButton;
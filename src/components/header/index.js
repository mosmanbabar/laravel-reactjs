import React from 'react'
import {  useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'
import {  toast } from 'react-toastify';
const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()

    const handleLogout = async () => {
        try {
            await doSignOut(); 
            localStorage.removeItem("userData"); 
            navigate('/login'); 
            toast.success("logout successfully");
        } catch (error) {
            console.error('Logout Error:', error);
           
        }
    };

    return (<>
        <nav className='d-flex justify-content-end'>
            {userLoggedIn ? (
                <button onClick={handleLogout} className='text-sm text-blue-600 underline'>Logout</button>
            ) : (
                <>
                    {/* <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                    <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link> */}
                </>
            )}
        </nav>
          </>
    )
}

export default Header;

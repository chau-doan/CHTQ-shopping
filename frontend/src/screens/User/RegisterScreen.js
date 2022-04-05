import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { register } from '../../actions/userAction';
import LoadingBox from '../../components/Loading/LoadingBox';
import MessageBox from '../../components/Support/MessageBox';
import { useNavigate } from 'react-router-dom';

export default function RegisterScreen(props) {
    const navigate = useNavigate();
    const [name, setName]                       = useState('');
    const [email, setEmail]                     = useState('');
    const [password, setPassword]               = useState('');    
    const [conirmpassword, setConfirmPassword]  = useState('');

    
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/' ;
    


    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;
    
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        // Todo: signin option
        if(password !== conirmpassword){
            alert('Password and confirm password are not match');
        }
        else{            
            dispatch(register(name, email, password));
        }
    }

    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo])

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Create Account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor='name'>Name</label>
                    <input 
                        type="name" 
                        id="name" 
                        placeholder='Enter name' 
                        required 
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email address</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder='Enter email' 
                        required 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder='Enter password' 
                        required 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        placeholder='Enter confirm password' 
                        required 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label />
                    <button className='primary' type='submit'>
                        Register
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

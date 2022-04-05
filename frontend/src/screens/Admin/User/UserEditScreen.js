import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../../../actions/userAction';
import LoadingBox from '../../../components/Loading/LoadingBox'
import MessageBox from '../../../components/Support/MessageBox'
import { USER_DETAILS_RESET, USER_UPDATE_RESET } from '../../../constants/userConstant';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserEditScreen(props) {
    const params = useParams();
    const navigate = useNavigate();
    const {id: userId} = params;
    const [name, setName]           = useState('');
    const [email, setEmail]         = useState('');
    const [isAdmin, setIsAdmin]     = useState(false);

    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if(successUpdate){
            dispatch({
                type: USER_UPDATE_RESET,
            });
            navigate('/userlist');
        }
        if(!user){
            dispatch(detailsUser(userId));
            dispatch({
                type: USER_DETAILS_RESET,
            })
        }
        else{
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, user, userId, successUpdate, navigate, props.history])

    const submitHandler = (e) => {
        e.preventDefault()
        // dispatch update user
        dispatch(updateUser({_id:userId, name, email, isAdmin}))
    }

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Edit User {name}</h1>
                    {loadingUpdate && (<LoadingBox />)}
                    {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                </div>
                {loading ? (<LoadingBox />) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                (
                    <>
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input 
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input 
                                id="email"
                                type="text"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {email !== 'admin@example.com' &&
                        <div>
                            <label htmlFor='isAdmin'>Is Admin</label>
                            <input
                                id="isAdmin"
                                type="checkbox"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                        </div>
                        }
                        <div>
                            <button
                                type='submit'
                                className='primary'
                            >
                                Update
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}

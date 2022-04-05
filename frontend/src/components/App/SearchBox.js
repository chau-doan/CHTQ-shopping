import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./App.css"

export default function SearchBox() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        navigate(`/search/name/${name}`);
    }
    return (
        <form className='search' onSubmit={submitHandler}>
            <div className='row'>
                <input 
                    type='text'
                    name='q'
                    id='q'
                    onChange={(e) => setName(e.target.value)}
                />
                <button className='primary' type='submit'>
                    <i className='fa fa-search' />
                </button>
            </div>
        </form>
    )
}

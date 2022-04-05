import React from 'react';
import "./Loading.css"

function SkeletonCard(props) {
    return (
        <div className={'row center'}>
            {
                Array(12).fill().map(() => (
                    <div className='card card-fixed'>
                        <div className='skeleton-img-medium skeleton' />
                        <div className='cart-body'>
                            <div className='skeleton skeleton-text' />
                            <div className='skeleton skeleton-text' />
                            <div className='skeleton skeleton-text' />
                        </div>
                    </div>
                ))
            }
        </div>

    );
}

export default SkeletonCard;

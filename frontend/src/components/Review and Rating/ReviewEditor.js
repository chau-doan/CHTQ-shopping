import React from 'react';
import Fab from '@mui/material/Fab';

export default function ReviewEditor(props) {
    return (
        <form className='form-review' onSubmit={props.submitHandler}>
            <div>
                <h2>{props.title}</h2>
            </div>
            <div>
                <label htmlFor="rating">Rating         </label>{'   '}
                <select
                    id="rating"
                    value={props.rating}
                    onChange={(e) => props.updateRating(e.target.value)}
                >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very good</option>
                    <option value="5">5 - Excellent</option>
                </select>
            </div>
            <div>
                <label htmlFor='comment'>Comment</label>
                <textarea
                    id="comment"
                    value={props.comment}
                    onChange={(e) => props.updateComment(e.target.value)}
                />
            </div>
            <div>
                <label />
                <Fab
                    className='primary'
                    size='medium'
                    type='submit'
                >
                    {props.button}
                </Fab>
            </div>
        </form>
    );
}

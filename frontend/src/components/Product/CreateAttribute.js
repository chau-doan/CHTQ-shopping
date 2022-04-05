import React, {useState} from 'react';

function CreateAttribute(props) {
    const [name, setName] = useState("");
    const [option, setOption] = useState("");
    const [options, setOptions] = useState([]);

    const submitHandler = () => {
        if(option === ""){
            alert("Option cannot be empty!");
            return;
        }
        setOptions(prevOptions => {
            return [...prevOptions, option];
        });
        setOption("");
    }

    const addAttribute = () => {
        props.onAdd({name, options});
        setOption("");
        setName("");
        setOptions([]);
    }

    return (
        <div className="card card-body">
            <label htmlFor="attribute-name">Attribute Name</label>
            <input
                id="attribute-name"
                value={name}
                onChange={event => {setName(event.target.value)}}
                placeholder="Enter Attribute Name"
            />
            <label htmlFor='option'>Option: {options.map(opt => {return `${opt} `})}</label>
            <div className="row">
                <input
                    id="option"
                    value={option}
                    className="col-1"
                    onChange={event => {setOption(event.target.value)}}
                    placeholder="Enter Option Name"
                />
                <button type='button' onClick={submitHandler}>Add</button>
            </div>
            <label/>
            <button type='button' className="primary" onClick={addAttribute}>Add</button>

        </div>
    );
}

export default CreateAttribute;
import * as React from 'react';
import { useState, useRef } from 'react';


const GuGuDan = () => {
    const [first, setFirst] = useState(Math.random() * 9);
    const [second, setSecond] = useState(Math.random() * 9);
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    const inputEl = useRef<HTMLInputElement>(null);

    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        const input = inputEl.current;

        if (parseInt(value) === first * second) {
            setResult('correct1');
            setFirst(Math.random() * 9);
            setSecond(Math.random() * 9);
        } else {
            setResult('incorrect');
        }
        setValue('');
        if (input) {
            input.focus();
        }

    }
    return (
        <>
            <div>{first} x {second}?</div>
            <form onSubmit={onSubmitForm}>
                <input
                    ref={inputEl}
                    type="number"
                    value={value}
                    onChange={e => setValue(e.target.value)}></input>
            </form>
        </>
    )
}

export default GuGuDan;
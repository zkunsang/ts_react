import * as React from 'react';

import { useState, useRef, useEffect } from 'react';

const rspCoords = {
    rock: '0',
    scissors: '-142px',
    paper: '-284px'
} as const

const scores = {
    scissors: 1,
    rock: 0,
    paper: -1
} as const

type ImgCoords = typeof rspCoords[keyof typeof rspCoords];

const computerChoice = (imgCoords: ImgCoords) => {
    // keys의 return값이 string[]인데 이걸 줄여줘야 한다
    // 그리고 undefined 값이 있어서 !표로 확신을 준다.
    return (Object.keys(rspCoords) as ['rock', 'scissors', 'paper']).find((k) => {
        return rspCoords[k] === imgCoords
    })!
}

const RSP = () => {

    const [score, setScore] = useState(0);
    const [imgCoord, setImgCoord] = useState<ImgCoords>(rspCoords.rock);
    const [result, setResult] = useState('');
    const interval = useRef<number>();

    useEffect(() => {
        // componentDidMount, componentDidUpdate 역할(not 1 on 1)
        console.log('re start');

        interval.current = window.setInterval(changeHand, 100);

        return () => { // componentWillUnmount
            console.log('end');
            clearInterval(interval.current);
        }
    }, [imgCoord]);

    const changeHand = () => {
        if (imgCoord === rspCoords.rock) {
            setImgCoord(rspCoords.scissors);
        } else if (imgCoord === rspCoords.scissors) {
            setImgCoord(rspCoords.paper);
        } else if (imgCoord === rspCoords.paper) {
            setImgCoord(rspCoords.rock);
        }
    };

    const onClickBtn = (choice: keyof typeof rspCoords) => () => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비겼습니다!');

        } else if ([-1, 2].includes(diff)) {// 배열 includes es2016
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('졌습니다!');
            setScore((prevScore) => prevScore - 1);
        }

        setTimeout(() => {
            interval.current = window.setInterval(changeHand, 100);
        }, 1000);

    }

    return (
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('rock')}>rock</button>
                <button id="scissors" className="btn" onClick={onClickBtn('scissors')}>scissors</button>
                <button id="paper" className="btn" onClick={onClickBtn('paper')}>paper</button>
            </div>
            <div>{result}</div>
            <div>score: {score}</div>

        </>
    )
}

export default RSP;
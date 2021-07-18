import * as React from 'react';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    const candidate = Array(45).fill(null).map((v, i) => i + 1);
    const shuffle = [];

    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }

    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

    console.log([...winNumbers, bonusNumber]);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    // useMemo를 하는이유? rerendering을 할때마다 getWinNumbers를 하게 되는데
    // 그 때마다 
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState<number[]>([]);
    const [bonus, setBonus] = useState<number | null>(null);
    const [redo, setRedo] = useState(false);

    const timeouts = useRef<number[]>([])

    const onClickRedo = useCallback(() => {
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);

    useEffect(() => {
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = window.setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]])
            }, (i + 1) * 1000);
        }

        timeouts.current[6] = window.setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);

        // component Will Unmount(항상 정리를 해 줘야 함 안그러면 기존에 도는게 꼬일 수가 있음)
        // useEffect의 정리
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            })
        }
    }, [timeouts.current])
    // 빈 배열이면 componentDidMount와 동일
    // 배열에 요소가 있으면 componenetDidMount랑 ComponentDidUpdate 둘 다 실행

    return (
        <>
            <div>lotto</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v}></Ball>)}
            </div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>one more!</button>}
        </>
    )
}
export default Lotto;
import * as React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import GameMatcher from './GameMatcher';

const Games = () => {
    return (
        <BrowserRouter>
            <div>
                <Link to="/game/number-baseball?limit=10&skip=5&page=3">숫자 야구</Link>&nbsp;
                <Link to="/game/rock-scissors-paper">가위 바위 보</Link>&nbsp;
                <Link to="/game/lotto-generator">로또 생성기</Link>&nbsp;
                <Link to="/game/index">게임 매쳐</Link>&nbsp;

            </div>
            <div>
                <Switch>
                    <Route exact path="/" component={GameMatcher} />
                    <Route path="/game/:name" component={GameMatcher} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default Games;
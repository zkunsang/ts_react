import * as React from 'react';
import MineSearch from './MineSearch';
import RSP from './RSP';
import Lotto from './Lotto';
import { RouteChildrenProps, RouteComponentProps, useHistory, useLocation, useRouteMatch, withRouter } from 'react-router';


interface Props extends RouteChildrenProps {
    hello: 'zerocho'
};

const GameMatcher = () => {
    const match = useRouteMatch<{ name: string }>();
    const location = useLocation();
    const history = useHistory();

    if (!match) {
        return (
            <div>
                일치하는 게임이 없습니다.
            </div>
        )
    }

    console.log(location.search);
    let urlSearchParams = new URLSearchParams(location.search.slice(1));
    console.log(urlSearchParams.get('skip'))
    console.log(urlSearchParams.get('limit'));
    if (match.params.name === "lotto") {
        return <Lotto />
    } else if (match.params.name === "rock-scissors-paper") {
        return <RSP />
    } else if (match.params.name === "mine-search") {
        return <MineSearch />
    } else {
        return (
            <div>
                일차히는 게임이 없습니다.
            </div>
        )
    }
}

export default withRouter(GameMatcher);
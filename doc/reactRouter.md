npm i react-router @types/react-router  
npm i react-router-dom @types/react-router-dom  

설치

```ts
        console.log(this.props.location.search);
        let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
        console.log(urlSearchParams.get('skip'))
        console.log(urlSearchParams.get('limit'));
```

```ts
export interface RouteChildrenProps<Params extends { [K in keyof Params]?: string } = {}, S = H.LocationState> {
    history: H.History;
    location: H.Location<S>;
    match: match<Params> | null;
}
```
```tsx
<Switch>
    // 요 props는 history, match, location을 가지고 있따.
    <Route exact path="/" render={(props) => <GameMatcher {...props} />} />
    <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
</Switch>
```
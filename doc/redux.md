```ts
export type RootState = ReturnType<typeof reducer>
```

```ts
interface StateToProps {
    user: UserState
}

interface DispatchToProps {
    
    dispatchLogIn: ({ id, password }: { id: string, password: string }) => void,
    dispatchLogOut: () => void
}

class App extends Component<DispatchToProps & StateToProps> {
```

useReducer 와 contextAPI로 대체가능하다  
리덕스를 사용하는이유는? middle ware를 사용하기 위해 thunk saga

```ts
const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(firstMiddleware, thunkMiddleware))
    : composeWithDevTools(applyMiddleware(firstMiddleware, thunkMiddleware))
```
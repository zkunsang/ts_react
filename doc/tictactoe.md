```ts
// 현재는 이 dispatch를 줄줄이 프롭스로 던지지만
// mobx?를 이용해서 context api를 이용해서 처리

// const [state, dispatch] = useReducer(reducer, initialState);
    const [state, dispatch] = useReducer<React.Reducer<ReducerState, ReducerActions>>(reducer, initialState);

// useReducer 
// redux를 간단히 만들어 놓은것
// 

// 리듀서란 상태와 액션을 받고 상태를 뱉어내는 함수
// 이전 스테이터스를 새로운 스테이터스를 만드는 함수

// Props에는 children이라는게 있다. <Td>'heello'</Td>

// 요 구조를 눈여겨 보자
//(state: ReducerState, action: ReducerActions): ReducerState

useMemo, memo
```
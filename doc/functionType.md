```ts
const Ball2 = ({ number }) => {
    number = 3;
    console.log(3);
});
```

위와 같이 하면 number가 implicit 에러가 발생하게 된다. 함수에 객체 구조 분해를 상요할때 함수에 대한 타입 정의 가 필요한데 아래와 같이 하면 된다.


```ts
type ballType = ({ number }: { number: number }) => any;
const Ball2: ballType = ({ number }) => {
    number = 3;
    console.log(3);
});
```

타입 스크립트에서 props를 받기 위해서는 아래와 같이 제너릭으로 처리해준다?
```ts
const Ball: FunctionComponent<{ number: number }> = ({ number }) => {

}
```

FunctionComponent를 보면 예전에는 StatelessFunctionComponent를 사용했는데 deprecated가 되었다 왜? 함수형은 더이상 statelss하지 않기 때문 훅스 로 관리하기 때문?
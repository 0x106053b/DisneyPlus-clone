import { useEffect, useState } from 'react'

const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    // value, delay 값이 갱신되면 실행
    useEffect(() => {    
        // delay의 시간 후에 setDebouceValue(value)를 실행하는 handler 함수
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay);

        // useDebounce 컴포넌트가 언마운트되면 handler를 삭제
        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);

    return (debounceValue)
}

export default useDebounce

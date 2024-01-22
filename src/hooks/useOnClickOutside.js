import { useEffect } from "react";

export default function useOnClickOutside(ref, handler){
    useEffect(() => {
        const listener = (event) => {
            // ref.current.contains(event.target)
            // 이벤트 감지된 부분이 dom에서 modal component 내부라면 event 발생 X
            // 외부를 클릭했다면 handler를 작동시킨다.
            if(!ref.current || ref.current.contains(event.target)){return;}
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        }
    }, [ref, handler]);
}
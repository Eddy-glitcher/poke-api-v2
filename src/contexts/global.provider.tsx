import { useState, type JSX } from "react";
import { GlobalContext } from "./global.context";

interface Props {
    children : JSX.Element | JSX.Element[];
}

function GlobalContextProvider({children}: Props){

    const [blockScroll, setBlockScroll] = useState<boolean>(false);

    return (
        <GlobalContext.Provider value={{blockScroll, setBlockScroll}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider
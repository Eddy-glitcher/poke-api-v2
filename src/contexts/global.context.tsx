import { createContext } from "react";

type GlobalProviderProps = {
    blockScroll : boolean
    setBlockScroll : React.Dispatch<React.SetStateAction<boolean>>
}

export const GlobalContext = createContext<GlobalProviderProps>({} as GlobalProviderProps);

import { createContext, useState  } from "react"


export const NewuserContext = createContext()

const NewuserContextProvider = ( { children } ) => {
    const [ isnew , set_isnew ] = useState(false)

    return ( <NewuserContext.Provider value = { { isnew , set_isnew } }>
                { children }
        </NewuserContext.Provider>)
}

export default NewuserContextProvider
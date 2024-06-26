import { createContext, useState } from "react"

export const ColorState = createContext();

const ColorStateContextProvider = ({children})=>{
    const [colors,setColors] = useState([]);
    const[adjust,setAdjust] = useState(false)
    const [menu,setMenu] = useState(false)
    const [ismenuopen, setIsMenuOpen] = useState(false);
    const [showsavedcolors, setShowsavedcolors] = useState(true);
    const states = {
        colors,
        setColors,
        adjust,
        setAdjust,
        menu,
        setMenu,
        ismenuopen,
        setIsMenuOpen,
        showsavedcolors,
        setShowsavedcolors
    }

    return <ColorState.Provider value={states}>{children}</ColorState.Provider>
}

export default ColorStateContextProvider;
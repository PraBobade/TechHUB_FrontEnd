import { createContext, useEffect, useState } from "react";


const ViewContext = createContext();

export function ViewState(props) {
    const [pageWidth, setPageWidth] = useState(window.innerWidth);
    const [View, setView] = useState(false);

    const handleResize = () => {
        setPageWidth(window.innerWidth);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function CheckWindowSize() {
        if (pageWidth >= 1100) {
            setView(true);
        } else {
            setView(false);
        }
    }
    useEffect(() => {
        CheckWindowSize();
    }, [pageWidth]);


    return (
        <ViewContext.Provider value={{ View }}>
            {props.children}
        </ViewContext.Provider>
    )
}

export default ViewContext
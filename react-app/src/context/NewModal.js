import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const NewModalContext = React.createContext();

export function NewModalProvider({ children }) {
    const newModalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(newModalRef.current);
    }, []);

    return (
        <>
            <NewModalContext.Provider value={ value }>
                { children }
            </NewModalContext.Provider>
            <div ref={ newModalRef } />
        </>
    );
}

export function NewModal({ onClose, children }) {
    const newModalNode = useContext(NewModalContext);
    if (!newModalNode) return null;

    return ReactDOM.createPortal(
        <div id="modal-new">
            <div id="modal-background-new" onClick={ onClose } />
            <div id="modal-content-new">{ children }</div>
        </div>,
        newModalNode
    );
}

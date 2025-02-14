import { useState, useEffect } from "react";

export default function LoaderReport() {
    const messages = [
        "Caricando i report ...",
        "Leggendo le dichiarazioni dei report ...",
        "Indicizzando i file ...",
        "Verificando i dati ...",
        "Quasi pronto ..."
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index === messages.length - 1) return;

        const interval = setInterval(() => {
            setIndex((prevIndex) => prevIndex + 1);
        }, 1500); // Cambia messaggio ogni secondo

        return () => clearInterval(interval); 
    }, [index, messages.length]);

    return (
        <div className="bg_white height100vh width100 flex-center-column">
            {messages[index]}
            <div className="loaderReport"></div>
        </div>
    );
}

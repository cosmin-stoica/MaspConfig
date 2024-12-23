/**
 * @namespace ItodoImg
 * @description Namespace che contiene funzioni per il rendering delle immagini.
 */
import { publicUrlFor } from "../globals/constants";

/**
 * Componente per il rendering di un'immagine con un URL pubblico dinamico.
 * Aggiunge l'attributo `src` con il percorso pubblico generato tramite `publicUrlFor`.
 * 
 * @component
 * @param {Object} props - Le proprietà passate al componente.
 * @param {string} props.src - Il percorso dell'immagine.
 * @param {string} props.alt - Il testo alternativo per l'immagine.
 * @returns {React.Element} Il componente che rende l'immagine con i parametri passati.
 */
function ItodoImage(props) {
    return (
        <>
            <img {...props} src={publicUrlFor(props.src)} alt={props.alt} />
        </>
    );
}

export default ItodoImage;

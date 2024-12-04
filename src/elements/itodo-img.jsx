import { publicUrlFor } from "../globals/constants";

function ItodoImage(props) {
    return(
        <>
            <img {...props} src={publicUrlFor(props.src)} alt={props.alt}/>
        </>
    )
}

export default ItodoImage;
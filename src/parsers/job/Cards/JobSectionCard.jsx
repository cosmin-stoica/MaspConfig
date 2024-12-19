import iconMap from "../iconMap"

export default function JobSectionCard({ section, params, toggleSection }) {

    
    const capitalize = (str) => {
        if (typeof str !== "string") return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };



    return (
        <div className="HardwareParserViewer_Section_Div" onClick={() => toggleSection(section)}>
            <div className="HardwareParserViewer_Section_Div_Icon">
                {iconMap(capitalize(params["Tipo job"]) || "Sezione") || ""}
            </div>
            {section === "SEZIONE GENERALE" ? "SEZIONE GENERALE" : (
                <>
                    <div className="Section_Job_Number">{section.replace("JOB", "")}</div>
                    {capitalize(params["Tipo job"] || "")}
                </>
            )}
        </div>
    );
}

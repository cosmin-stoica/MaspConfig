import { useState } from "react";

const ConfigCreator = ({ isHal, array, title, isJobConfig, onJobConfigString }) => {
    const initialState = array.reduce((acc, item) => {
        if (item.tipo === "boolean") {
            acc[item.nome] = '1';
        } else if (item.tipo === "intero") {
            acc[item.nome] = 0;
        } else if (item.tipo === "string") {
            acc[item.nome] = '';
        } else if (item.tipo === "double") {
            acc[item.nome] = 0.0;
        }
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialState);

    const handleChange = (event, nome, tipo) => {
        const value = tipo === "boolean" ? event.target.value
            : tipo === "intero" ? parseInt(event.target.value, 10)
                : tipo === "double" ? parseFloat(event.target.value)
                    : event.target.value;
        setFormData({
            ...formData,
            [nome]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let iniContent = "null";

        if (isHal) {
            const divisoreGrosso = ";===========================================================";
            const halHeader = `[HAL ${title}]`;
            const iniContentArray = array.map(item =>
                `${item.nome}= ${formData[item.nome]}`
            );
            iniContent = divisoreGrosso + "\n" + halHeader + "\n" + divisoreGrosso + "\n" + iniContentArray.join('\n');
        } else {
            const divisoreGrosso = ";===========================================================";
            const jobHeader = "[JOB 1]";
            const jobDeclaration = `Tipo Job = ${title}`;
            const iniContentArray = array.map(item =>
                item.tipo === "divisore" ? ';-----------------------------------------------------------' : `${item.nome}= ${formData[item.nome]}`
            );
            iniContent = divisoreGrosso + "\n" + jobHeader + "\n" + divisoreGrosso + "\n" + jobDeclaration + "\n" + iniContentArray.join('\n');
        }

        if (isJobConfig && onJobConfigString) {
            iniContent = iniContent + "\n" + ';-----------------------------------------------------------' + "\n";
            onJobConfigString(iniContent);
        } else {
            const blob = new Blob([iniContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            if (isHal) {
                a.download = `HAL Config ${title}.ini`;
            } else {
                a.download = `Job Config ${title}.ini`;
            }
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        console.log(formData);
    };

    return (
        <div className="halconfigprova-div">
            <form onSubmit={handleSubmit}>
                {array.map(item => (
                    item.tipo !== "divisore" && (
                        <div key={item.nome}>
                            <label>
                                <div>
                                    {item.nome}:
                                </div>
                                {item.tipo === "boolean" ? (
                                    <select
                                        value={formData[item.nome]}
                                        onChange={(e) => handleChange(e, item.nome, item.tipo)}
                                    >
                                        <option value="1">Sì</option>
                                        <option value="0">No</option>
                                    </select>
                                ) : item.tipo === "intero" ? (
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData[item.nome]}
                                        onChange={(e) => handleChange(e, item.nome, item.tipo)}
                                    />
                                ) : item.tipo === "double" ? (
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData[item.nome]}
                                        onChange={(e) => handleChange(e, item.nome, item.tipo)}
                                    />
                                ) : item.tipo === "string" ? (
                                    <input
                                        type="text"
                                        value={formData[item.nome]}
                                        onChange={(e) => handleChange(e, item.nome, item.tipo)}
                                    />
                                ) : null}
                            </label>
                            <div className="tooltipHalConfig">
                                <div className="iconHalConfig">i</div>
                                <div className="tooltiptextHalConfig">{item.tooltip}</div>
                            </div>
                        </div>
                    )
                ))}

                <div className="width100 perflex margin-top50">
                    {isHal ? <button className="creahal-btn" type="submit">Crea Hal</button>
                        : isJobConfig ?
                            <button className="creahal-btn" type="submit">Aggiungi Job</button>
                            :
                            <button className="creahal-btn" type="submit">Crea Job</button>}
                </div>
            </form>
        </div>
    );
};

export default ConfigCreator;

import React, { useState, useEffect } from "react";
import CommentModal from './CommentModal'; // Importa il componente Modal

const ReviewerCreator = ({ array, title, existingHal, onHalChange }) => {
    const parseExistingHal = (halString) => {
        const lines = halString.split('\n');
        const result = {};
        lines.forEach(line => {
            const [key, value] = line.split('=').map(item => item.trim());
            if (key && value !== undefined) {
                result[key] = value;
            }
        });
        return result;
    };

    const [arrayDoc, setArray] = useState(array);
    const [formData, setFormData] = useState(() => 
        array.reduce((acc, item) => {
            if (item.tipo === "boolean") acc[item.nome] = '1';
            else if (item.tipo === "intero") acc[item.nome] = 0;
            else if (item.tipo === "string") acc[item.nome] = '';
            else if (item.tipo === "double") acc[item.nome] = 0.0;
            return acc;
        }, {})
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        setArray(array);
    }, [array]);

    useEffect(() => {
        if (existingHal) {
            const parsedData = parseExistingHal(existingHal);
            const updatedFormData = { ...formData };
            arrayDoc.forEach(item => {
                if (parsedData[item.nome] !== undefined) {
                    updatedFormData[item.nome] = parsedData[item.nome];
                }
            });
            setFormData(updatedFormData);
        }
    }, [existingHal, arrayDoc]);

    const generateHalContent = (formData, comment) => {
        const divisoreGrosso = ";===========================================================";
        const halHeader = `[HAL ${title}]`;
        const comments = comment 
            ? `;-----------------------------------------------------------\n;Commento:\n;${comment.split('\n').join('\n;')}`
            : '';
        const iniContentArray = arrayDoc.map(item => {
            const value = formData[item.nome];
            if (item.tipo === "divisore") {
                return ';-----------------------------------------------------------';
            }
            if (value !== undefined && !isNaN(value)) {
                return `${item.nome}= ${value}`;
            }
            return null;
        }).filter(line => line !== null);
    
        return `${divisoreGrosso}\n${halHeader}\n${divisoreGrosso}\n${iniContentArray.join('\n')}${comments ? `\n${comments}` : ''}`;
    };

    
    const handleChange = (event, nome, tipo) => {
        const value = tipo === "boolean" ? event.target.value
            : tipo === "intero" ? parseInt(event.target.value, 10)
                : tipo === "double" ? parseFloat(event.target.value)
                    : event.target.value;
        const updatedFormData = {
            ...formData,
            [nome]: value
        };
        setFormData(updatedFormData);
        onHalChange(generateHalContent(updatedFormData, commentText));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const iniContent = generateHalContent(formData, commentText); 
    
        const blob = new Blob([iniContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = url;
        a.download = `HAL Config ${title}.ini`;
    
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    
        console.log(formData);
    };

    const handleAddNewLine = (index) => {
        const newArray = [...arrayDoc];
        const newObject = {
            nome: `divisore${index}`,
            tipo: "divisore",
            tooltip: "desc"
        };
        newArray.splice(index + 1, 0, newObject);
        setArray(newArray);
        onHalChange(generateHalContent(formData));
    };

    const handleRemoveLine = (index) => {
        const newArray = [...arrayDoc];
        if (newArray[index + 1] && newArray[index + 1].tipo === "divisore") {
            newArray.splice(index + 1, 1);
            setArray(newArray);
            onHalChange(generateHalContent(formData));
        }
    };

    const handleAddComment = () => {
        setIsModalOpen(true);
    };

    const handleSaveComment = (comment) => {
        setCommentText(comment);
        onHalChange(generateHalContent(formData, comment));
    };

    useEffect(() => {
        if (Object.keys(formData).length > 0) {
            onHalChange(generateHalContent(formData, commentText));
        }
    }, [arrayDoc, formData, commentText]);
    return (
        <div className="halconfigprova-div">
            <form onSubmit={handleSubmit}>
                {arrayDoc.map((item, index) => (
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
                            <div style={{width: '50px', display: 'flex', gap: '3px'}}>
                                <div className="PlusLineHal" onClick={() => handleAddNewLine(index)}>+</div>
                                {arrayDoc[index + 1] && arrayDoc[index + 1].tipo === "divisore" && (
                                    <div className="PlusLineHal" onClick={() => handleRemoveLine(index)}>–</div>
                                )}
                            </div>
                        </div>
                    )
                ))}
                {arrayDoc.length > 0 && <button type="button" className="AggiungiCommentoBtn" onClick={handleAddComment}>Aggiungi commento</button>}
                {arrayDoc && arrayDoc.length > 0 && <div className="width100 perflex margin-top50">
                    <button className="creahal-btn" type="submit">Crea Hal</button>
                </div>}
            </form>
            <CommentModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleSaveComment}
                currentComment={commentText}
            />
        </div>
    );
};

export default ReviewerCreator;

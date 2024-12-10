export default function InputRenderer({ keyName, section, dummyValue, inputValues, setInputValues, realFile, isHal }) {
    const handleInputChange = (section, key, value) => {
        setInputValues((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value,
            },
        }));
    };

    const uniqueId = `${section}_${keyName}`;
    const inputValue = inputValues[section]?.[keyName] || "";

    if (isHal)
        dummyValue = keyName[0];

    switch (dummyValue) {
        case "b":
            return (
                <select
                    id={uniqueId}
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(section, keyName, e.target.value)}
                    className="HalParserViewer_Input"
                >
                    <option value=""></option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                </select>
            );
        case "n":
            return (
                <input
                    id={uniqueId}
                    type="number"
                    value={inputValue}
                    onChange={(e) => handleInputChange(section, keyName, e.target.value)}
                    className="HalParserViewer_Input"
                />
            );
        case "i":
            return (
                <input
                    id={uniqueId}
                    type="number"
                    value={inputValue}
                    onChange={(e) => handleInputChange(section, keyName, e.target.value)}
                    className="HalParserViewer_Input"
                />
            );
        case "d":
            return (
                <input
                    id={uniqueId}
                    type="number"
                    step="0.01"
                    value={inputValue}
                    onChange={(e) => handleInputChange(section, keyName, e.target.value)}
                    className="HalParserViewer_Input"
                />
            );
        case "str":
            return (
                <input
                    id={uniqueId}
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(section, keyName, e.target.value)}
                    className="HalParserViewer_Input"
                />
            );
        case "cstr":
            return (
                <input
                    id={uniqueId}
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(section, keyName, e.target.value)}
                    className="HalParserViewer_Input"
                />
            );
        default:
            return (
                <input
                    id={uniqueId}
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(section, keyName, e.target.value)}
                    className="HalParserViewer_Input"
                />
            );
    }
}

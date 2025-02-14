export default function JobInputRenderer({ currentValue, keyName, section, dummyValue, inputValues, setInputValues, disabled, modTablet }) {

    const handleInputChange = (section, key, value) => {
        setInputValues((prev) => ({
            ...prev,
            [section]: {
                ...prev[section] ?? {}, 
                [key]: value || "",
            },
        }));
    };
    
    const uniqueId = `${section}_${keyName}`;
    const inputValue = inputValues[section]?.[keyName] || "";
    //const inputValue = currentValue;
    //console.log(inputValues[1])

    const handleFocus = () => {
        if (modTablet)
            window.electron.openKeyboard();
    };


    switch (dummyValue) {
        case "b":
            return (
                <select
                    id={uniqueId}
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(section, keyName, e.target.value)}
                    className="HalParserViewer_Input"
                    disabled={!!disabled}
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
                    onClick={handleFocus}
                    disabled={!!disabled}
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
                    onClick={handleFocus}
                    disabled={!!disabled}
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
                    onClick={handleFocus}
                    disabled={!!disabled}
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
                    onClick={handleFocus}
                    disabled={!!disabled}
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
                    onClick={handleFocus}
                    disabled={!!disabled}
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
                    onClick={handleFocus}
                    disabled={!!disabled}
                />
            );
    }
}

function LogoutParams({ parsedLogin, dummyFile, handleInputChange, modTablet }) {
    const renderSection = (sectionName) => {

        const handleFocus = () => {
            if (modTablet)
                window.electron.openKeyboard();
        };

        return (
            <div key={sectionName}>
                {Object.entries(dummyFile[sectionName] || {}).map(([key, type]) => {
                    const value = parsedLogin?.[sectionName]?.[key] || "";
                    const uniqueId = `${sectionName}_${key}`;
                    const inputValue = value;

                    const renderInputField = (type) => {
                        switch (type) {
                            case "b":
                                return (
                                    <select
                                        id={uniqueId}
                                        value={inputValue}
                                        onChange={(e) => handleInputChange(sectionName, key, e.target.value)}
                                        className="HalParserViewer_Input Login"
                                    >
                                        <option value=""></option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                    </select>
                                );
                            case "n":
                            case "i":
                                return (
                                    <input
                                        id={uniqueId}
                                        type="number"
                                        value={inputValue}
                                        onChange={(e) => handleInputChange(sectionName, key, e.target.value)}
                                        className="HalParserViewer_Input Login"
                                        onClick={handleFocus}
                                    />
                                );
                            case "d":
                                return (
                                    <input
                                        id={uniqueId}
                                        type="number"
                                        step="0.01"
                                        value={inputValue}
                                        onChange={(e) => handleInputChange(sectionName, key, e.target.value)}
                                        className="HalParserViewer_Input Login"
                                        onClick={handleFocus}
                                    />
                                );
                            case "str":
                            case "cstr":
                                return (
                                    <input
                                        id={uniqueId}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => handleInputChange(sectionName, key, e.target.value)}
                                        className="HalParserViewer_Input Login"
                                        onClick={handleFocus}
                                    />
                                );
                            default:
                                return (
                                    <input
                                        id={uniqueId}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => handleInputChange(sectionName, key, e.target.value)}
                                        className="HalParserViewer_Input Login"
                                        onClick={handleFocus}
                                    />
                                );
                        }
                    };

                    return (
                        <div className={`LoginParser_LogoutDiv_Item`} key={key}>
                            <label>{key}:</label>
                            {renderInputField(type)}
                        </div>
                    );
                })}
            </div>
        );
    };



    return (
        <div className="LoginParser_LogoutDiv">
            <div className="LoginParser_UserDiv_Bar">
                <h2>Parametri</h2>
            </div>
            {dummyFile && renderSection("LOGOUT")}
            {dummyFile && renderSection("UTILIZZATORI")}
        </div>
    );
}

export default LogoutParams;

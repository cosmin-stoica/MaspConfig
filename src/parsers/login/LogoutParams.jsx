function LogoutParams({ parsedLogin, dummyFile, handleInputChange }) {
  const renderSection = (sectionName) => {
    return (
      <div key={sectionName}>
        {Object.entries(dummyFile[sectionName] || {}).map(([key, type]) => {
          const value = parsedLogin?.[sectionName]?.[key] || "";
          const isValid = type === "b" ? ["0", "1"].includes(value) : !isNaN(parseInt(value, 10));

          return (
            <div className={`LoginParser_LogoutDiv_Item ${isValid ? "" : "error"}`} key={key}>
              <label>{key}:</label>
              <textarea
                value={value}
                onChange={(e) => handleInputChange(sectionName, key, e.target.value)}
                rows="1"
              />
              {/* !isValid && <span className="error-message">Valore non valido</span> */}
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

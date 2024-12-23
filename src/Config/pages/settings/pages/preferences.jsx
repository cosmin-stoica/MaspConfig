import { usePath } from "../../../../MAIN/Config/PathContext";

export default function Preferences() {
  const { modTablet, setModTablet, lightMode, setLightMode } = usePath();

  const handleTabletChange = (e) => setModTablet(e.target.checked);
  const handleDarkModeChange = (e) => setLightMode(e.target.checked);

  return (
    <>
      <div className="Preferences">
        <div className="Preferences_ModTablet">
          <div className="Preferences_ModTablet_Title">Modalità tablet</div>
          <label className="General_switch">
            <input
              className="General_input"
              type="checkbox"
              checked={modTablet}
              onChange={handleTabletChange}
            />
            <span className="General_slider"></span>
          </label>
          <div className="Preferences_ModTablet_Desc">
            Fa comparire o meno la tastiera di Windows quando si deve digitare
          </div>
        </div>

        <div className="Preferences_ModTablet">
          <div className="Preferences_ModTablet_Title">Modalità chiara</div>
          <label className="General_switch">
            <input
              className="General_input"
              type="checkbox"
              checked={lightMode}
              onChange={handleDarkModeChange}
            />
            <span className="General_slider"></span>
          </label>
          <div className="Preferences_ModTablet_Desc">
            Regolazione fra modalità scura o chiara
          </div>
        </div>
      </div>
    </>
  );
}

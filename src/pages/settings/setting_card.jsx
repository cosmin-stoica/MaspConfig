
export default function SettingCard({Title, Icon, onClick}) {
    return (
        <>
            <div className="SettingCard" onClick={onClick}>
                <div className="SettingCard_Icon">
                    <Icon/>
                </div>
                <div className="SettingCard_Title">
                    {Title}
                </div>
            </div>
        </>
    );
};
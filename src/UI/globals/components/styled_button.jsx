export default function StyledButton({ Title, Confirm, onClick }) {
    return (
        <>
            <button
                className={`Main_Button ${Confirm ? "confirm" : ""}`}
                onClick={onClick}
            >
                {Title}
            </button>
        </>
    );
};
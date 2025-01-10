import { useState, useEffect } from "react";

export default function ColorPicker({ currentValue, onColorChange }) {
    const [color, setColor] = useState(currentValue || "#000000");

    useEffect(() => {
        if (typeof currentValue === "string" && currentValue.startsWith("#")) {
            setColor(currentValue);
        }
    }, [currentValue]);

    const handleColorChange = (e) => {
        const hexColor = e.target.value;
        setColor(hexColor);
        if (onColorChange) {
            onColorChange(hexColor);
        }
    };

    return (
        <div>
            <input
                type="color"
                value={color}
                onChange={handleColorChange}
                style={{ cursor: "pointer", width: "50px", height: "50px", border: "none" }}
            />
        </div>
    );
}

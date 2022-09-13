import React from "react";
import "./ToggleMenu.css";

type Props = {
    open: boolean;
    onClick: React.MouseEventHandler;
    controls: string;
    label: string;
}

export const ToggleButton: React.FC<Props> = ({ open, onClick, controls, label }) => {
    return (
        <button
            type="button"
            aria-controls={controls}
            aria-expanded={open}
            aria-label={label}
            onClick={onClick}
            className="toggleButton"
        >
            <span className="line-1"></span>
            <span className="line-2"></span>
        </button>
    )
}
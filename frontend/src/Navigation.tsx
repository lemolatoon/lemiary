import React from "react";
import "./ToggleMenu.css";

type Props = {
    open: boolean;
    id: string;
}

export const Navigation: React.FC<Props> = ({ open, id }) => {
    return (
        <nav id={id} aria-hidden={!open} className="navigation">
            <ul>
                <li>TODO</li>
            </ul>
        </nav>
    );
}
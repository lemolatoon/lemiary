import { useState } from "react";
import { ToggleButton } from "./ToggleButton";
import { Navigation } from "./Navigation";
import React from "react";


const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleFunction = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <header className="header">
            <ToggleButton
                open={isOpen}
                controls="navigation"
                label="メニューを開きます"
                onClick={toggleFunction}
            />
            <Navigation id="navigation" open={isOpen} />
        </header>
    )
}

export default Header;
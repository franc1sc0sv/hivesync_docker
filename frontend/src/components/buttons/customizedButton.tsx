import React, { useState } from 'react';
import { RiArrowRightSLine } from "react-icons/ri";

interface ButtonProps {
    text: string;
    color: string;
    displayIcon: boolean;
    onAction: () => void;
}

export const CustomizedButton: React.FC<ButtonProps> = ({ text, color, onAction, displayIcon }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <button
            style={{
                background: isHovered ? 'white' : color,
                color: isHovered ? '#overlay_1' : '#custom_white',
                transition: 'all 0.5s',
            }}
            onClick={onAction}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="flex items-center h-14 w-full p-3 font-bold rounded-xl font-almarai cursor-pointer hover:text-overlay_1 text-custom_white"
        >
            <div className={`flex ${displayIcon ? `justify-between` : `justify-center`} w-full flex-row`}>
                <p>{text}</p>
                {displayIcon && <RiArrowRightSLine size={28} />}
            </div>
        </button>
    );
};

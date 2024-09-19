import { useState, useEffect, useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";

import { ComponentsAnimator } from "../../../../components/animation/componentsAnimator";

export const RightButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClearNotifications = () => {};

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu}>
        <HiDotsVertical
          size={38}
          className="p-2 rotate-90 rounded-full fill-custom_white bg-overlay_2"
        />
      </button>
      {isMenuOpen && (
        <ComponentsAnimator>
          <div className="absolute right-0 w-48 mt-2 rounded-lg shadow-lg bg-overlay_2">
            <ul>
              <li
                onClick={handleClearNotifications}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                <p className="text-custom_white text-md">
                  Limpiar notificaciones
                </p>
              </li>
            </ul>
          </div>
        </ComponentsAnimator>
      )}
    </div>
  );
};

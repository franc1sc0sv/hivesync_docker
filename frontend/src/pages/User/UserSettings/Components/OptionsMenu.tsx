import { useState, useEffect } from "react";
import { useModal } from "../../../../store/useModal";

import { options } from "../optionsList";
import { SettingsProps } from "../optionsList";
import { useContext } from "react";
import { OptionsContext } from "../context/optionsContext";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export const MenuOptions: React.FC = () => {
  return (
    <div className="flex flex-row justify-between w-full overflow-hidden">
      <div className="w-full overflow-y-auto md:w-1/3">
        <SettingsTemplate settings={options} />
      </div>

      <div className="hidden w-3/5 max-h-fit md:block">
        <OptionSelected />
      </div>
    </div>
  );
};

const SettingsTemplate: React.FC<SettingsProps> = ({ settings }) => {
  const { setModalId } = useModal();

  const [settingsState, setSettingsState] = useState(settings);

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  const context = useContext(OptionsContext);
  const { setComponent } = context;

  //verificar resolución
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    // Limpieza para evitar fugas de memoria
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggle = (index: number) => {
    setSettingsState((prevState) => {
      const newSettings = prevState.map((setting, i) => {
        if (i === index) {
          return { ...setting, toggleOptions: !setting.toggleOptions };
        }
        return setting;
      });
      return newSettings;
    });
  };

  return (
    <div className="flex flex-col w-full gap-3 md:gap-8">
      {settingsState.map((option, index) => (
        <div
          key={index}
          className={`w-full relative gap-3 px-5 py-2 bg-overlay_2 hover:bg-gray-700 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform border-4 border-overlay_2 hover:border-primary`}
        >
          {/* card header */}
          <div
            onClick={() => handleToggle(index)}
            className="flex flex-row items-center justify-between w-full"
          >
            <div className="flex flex-row items-center justify-center gap-3">
              {option.icon}
              <p className="text-lg font-medium text-custom_white">
                {option.name}
              </p>
            </div>
            {option.toggleOptions ? (
              <IoIosArrowUp size={40} color="#fff" />
            ) : (
              <IoIosArrowDown size={40} color="#fff" />
            )}
          </div>

          {/* Cntenido expandible */}
          <div
            className={`w-full transition-all ease-in-out overflow-hidden`}
            style={{
              maxHeight: option.toggleOptions ? "500px" : "0",
              transition: "max-height 0.3s ease-in-out",
            }}
          >
            <div className="flex flex-col justify-start w-full gap-5 pt-3 bg-gray-800 rounded-lg text-custom_white">
              {option.options.map((opt, index) => (
                <button
                  onClick={() => {
                    if (!isLargeScreen) {
                      setModalId(opt.modal);
                    } else {
                      setComponent(opt.optionComponent);
                    }
                  }}
                  key={index}
                  className="w-full transition-all duration-200 text-start hover:bg-primary rounded-xl"
                >
                  {opt.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const OptionSelected: React.FC = () => {
  const context = useContext(OptionsContext);
  const { component } = context;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-5">
      {component}
    </div>
  );
};

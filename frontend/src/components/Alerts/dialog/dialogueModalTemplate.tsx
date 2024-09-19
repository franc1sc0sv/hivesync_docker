import { useModal } from "../../../store/useModal";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon } from "../../Icons/close";

import { CustomizedButton } from "../../buttons/customizedButton";

interface DialogueProps {
  identificator: string;
  children: React.ReactNode;
  onAccept: () => any,
}

export const DialogueTemplate: React.FC<DialogueProps> = ({
  identificator,
  children,
  onAccept,
}) => {
  const { modalId, setModalId } = useModal();

  const onClose = () => {
    setModalId("");
  };

  return (
    <AnimatePresence>
      {modalId === identificator && (
        <motion.div
          key={identificator}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen overflow-y-auto bg-opacity-50 bg-overlay_3"
        >
          <motion.div
            className="relative w-full max-w-md max-h-full p-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {/* Modal content */}
            <motion.div
              className="relative shadow bg-overlay_2 rounded-xl"
              initial={{
                opacity: 0,
                scale: 0.3,
                filter: "blur(20px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.3,
                filter: "blur(20px)",
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center ms-auto "
                >
                  <CloseIcon size={30} color="white" />
                </button>
              </div>
              {/* Modal body */}
              <div>
                {children}
                <div className="flex flex-row justify-between w-full gap-5 p-3">
                  <CustomizedButton
                    text="Confirmar"
                    color="#9333ea"
                    displayIcon={false}
                    onAction={onAccept}
                  />
                  <CustomizedButton
                    text="Cancelar"
                    color="#382C6C"
                    displayIcon={false}
                    onAction={onClose}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

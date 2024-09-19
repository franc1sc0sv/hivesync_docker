import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoBackTriangle } from "../Icons/goBackTriangle";
import { useSwipeHandler } from "../layouts/ServerLayout/hooks/useFakePageSwipeHandler";

import { useModal } from "../../store/useModal";

interface FakePageProps {
  onClose: () => void;
  isOpen: boolean;
  index: number;
  title?: string | React.ReactNode ;
  showArrow: boolean;
  children: React.ReactNode;
}

const FakePageTemplate: React.FC<FakePageProps> = ({
  onClose,
  isOpen,
  index,
  title,
  children,
  showArrow,
}) => {
  const { modalId } = useModal();

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const handler = useSwipeHandler({
    onSwipedRight: () => {
      if (modalId == "") {
        handleClose();
      }
    },
  });
  const hasContent = (typeof title === 'string')
  console.log(hasContent)
  return (
    <AnimatePresence>
      {isOpen && !isClosing && (
        <motion.div
          {...handler}
          className="fixed inset-0 z-50 flex justify-center bg-overlay_1"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1.2,
          }}
          style={{ zIndex: 100 + index }}
        >
          <div className="w-full h-screen text-center">
            <div  className={`flex flex-row ${!hasContent ? 'w-full' : 'h-[10%]'} items-center justify-between p-3 text-custom_white`}>
              {(showArrow) && (
                <div onClick={handleClose}>
                  <GoBackTriangle size={30} color="white" />
                </div>
              )}

              <span className="text-2xl font-bold w-full">{title}</span>
              <span></span>
            </div>

            <div className="flex items-center justify-center w-full h-[90%] overflow-y-auto">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FakePageTemplate;

import { ReactNode } from "react";
import useMeasure from "react-use-measure";
import { useModal } from "../../store/useModal";
import { CloseIcon } from "../Icons/close";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
  AnimatePresence,
} from "framer-motion";

interface ModalTemplateProps {
  identificator: string;
  children: ReactNode;
}

export const ModalTemplate: React.FC<ModalTemplateProps> = ({
  identificator,
  children,
}) => {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();
  const { modalId, setModalId } = useModal();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setModalId("");
  };

  return (
    <AnimatePresence mode="wait">
      {modalId === identificator && (
        <motion.div
          key={identificator}
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeOut",
            }}
            className="overflow-hidden absolute bottom-0 h-[85vh] w-full rounded-t-3xl bg-overlay_1"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center p-4 bg-overlay_1">
              <div className="w-full flex flex-row justify-between items-center">
                <div></div>
                {/* barra para cerrar */}
                <button
                  onClick={() => handleClose()}
                  onPointerDown={(e) => {
                    controls.start(e);
                  }}
                  className="h-2 rounded-full w-14 cursor-grab touch-none bg-custom_white active:cursor-grabbing lg:hidden"
                ></button>

                {/* botón x para cerrar */}
                <div>
                  <button
                    onClick={() => handleClose()}
                    onPointerDown={(e) => {
                      controls.start(e);
                    }}
                    className="h-2 rounded-full w-14 hidden lg:block"
                  >
                    <CloseIcon color="white" size={40} />
                  </button>
                </div>
              </div>

            </div>
            <div className="relative z-0 h-full p-4 pt-12 overflow-y-scroll">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import Alert from "@mui/material/Alert";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "../../store/useNotifications";

export const Notifications = () => {
  const { notifications, removeNotification } = useNotifications();
  return (
    <section className="absolute z-50 flex flex-col gap-2 mx-auto transform -translate-x-1/2 top-10 left-1/2 w-max ">
      <AnimatePresence initial={false}>
        {notifications.map((noti, i) => {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            >
              <Alert
                key={i}
                className="font-amiko! capitalize"
                onClose={() => {
                  removeNotification(i);
                }}
                variant="filled"
                severity={noti.severity}
              >
                {noti.message}
              </Alert>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </section>
  );
};

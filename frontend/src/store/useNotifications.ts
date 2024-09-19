import { create } from "zustand";
import { Notifications } from "../types/notifications";

const useNotifications = create<Notifications>((set) => ({
  notifications: [],
  setNotifications: (notification) => {
    set((state) => ({
      notifications:
        state.notifications.length < 2
          ? [...state.notifications, notification]
          : state.notifications,
    }))
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.slice(1)
      }))
    }, 2500)
  },
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((_, i) => i !== id),
    })),
    clearNotifications: () => 
      set(() => ({
        notifications: []
      }))
}));

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    useNotifications.getState().clearNotifications();
  });

  window.addEventListener('popstate', () => {
    useNotifications.getState().clearNotifications();
  });

  const originalPushState = window.history.pushState;
  window.history.pushState = function (state: any, title: string, url?: string | null) {
    originalPushState.apply(this, [state, title, url]);
    useNotifications.getState().clearNotifications();
  };
  
  const originalReplaceState = window.history.replaceState;
  window.history.replaceState = function (state: any, title: string, url?: string | null) {
    originalReplaceState.apply(this, [state, title, url]);
    useNotifications.getState().clearNotifications();
  };
  
}

export { useNotifications };

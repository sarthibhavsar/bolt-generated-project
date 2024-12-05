import {create} from 'zustand';
import { toast } from 'sonner';

export const useToastStore = create((set) => ({
  toasts: [],
  successToast: (message, options) => {
    const id = toast.success(message, options);
    set((state) => ({ toasts: [...state.toasts, id] }));
  },
  defaultToast: (message, options) => {
    const id = toast(message, options);
    set((state) => ({ toasts: [...state.toasts, id] }));
  },
  descriptionToast: (message, options) => {
    const id = toast(message, { ...options, description: options.description });
    set((state) => ({ toasts: [...state.toasts, id] }));
  },
  infoToast: (message, options) => {
    const id = toast.info(message, options);
    set((state) => ({ toasts: [...state.toasts, id] }));
  },
  warningToast: (message, options) => {
    const id = toast.warning(message, options);
    set((state) => ({ toasts: [...state.toasts, id] }));
  },
  errorToast: (message, options) => {
    const id = toast.error(message, options);
    set((state) => ({ toasts: [...state.toasts, id] }));
  },
  actionToast: (message, options) => {
    console.log(options)
    const id = toast(message, {
      ...options,
      action: {
        label: options.label,
        onClick: options.onClick,
      },
    });
    set((state) => ({ toasts: [...state.toasts, id] }));
  },
  promiseToast: (promise, options) => {
    const id = toast.promise(promise, options);
    set((state) => ({ toasts: [...state.toasts, id] }));
  },
  customToast: (message, options) => {
    const id = toast.custom(message, options);
    set((state) => ({ toasts: [...state.toasts, id] }));
  },
}));

// export default useToastStore;

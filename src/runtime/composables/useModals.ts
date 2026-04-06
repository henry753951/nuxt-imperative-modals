import { useState } from "nuxt/app";

interface ModalInstance<T extends ModalName = ModalName> {
  id: string;
  modalName: `Modals${T}`;
  isOpen: boolean;
  props: Partial<ModalsPropsTypeMap[T]> | Record<string, unknown>;
  resolve?: (value: unknown) => void;
}

interface ModalOpenOptions<T extends ModalName> {
  id?: string;
  props?: Partial<ModalsPropsTypeMap[T]>;
}

interface AlertPayload {
  key: string;
  message: string;
  details: string | null;
}

export const useModals = () => {
  const modals = useState<ModalInstance[]>("modals", () => []);

  const open = <T extends ModalName, R = Parameters<ModalsEmitTypeMap[T]>[1]>(
    modalName: T,
    options?: ModalOpenOptions<T>,
  ): Promise<R> => {
    return new Promise((resolve) => {
      const id = options?.id ?? `modal-${Math.random().toString(36).slice(2, 9)}`;
      const fullModalName = `Modals${modalName}` as const;
      const existingModal = modals.value.find((modal: ModalInstance) => modal.id === id);

      if (existingModal) {
        existingModal.isOpen = true;
        existingModal.props = options?.props ?? {};
        existingModal.resolve = resolve;
        return;
      }

      modals.value.push({
        id,
        modalName: fullModalName,
        isOpen: true,
        props: options?.props ?? {},
        resolve,
      });
    });
  };

  const close = (id: string, result: unknown = null) => {
    const modal = modals.value.find((entry: ModalInstance) => entry.id === id);
    if (!modal || !modal.isOpen) {
      return;
    }

    modal.isOpen = false;
    const safeResult = typeof structuredClone === "function" ? structuredClone(result) : result;

    if (modal.resolve) {
      modal.resolve(safeResult);
      modal.resolve = undefined;
    }

    setTimeout(() => {
      modals.value = modals.value.filter((entry: ModalInstance) => entry.id !== id);
    }, 100);
  };

  const alert = (title: string, description?: string, error?: AlertPayload) =>
    open("AlertModal" as ModalName, {
      props: { title, description, error } as Record<string, unknown>,
    }) as Promise<void>;

  const confirm = (title: string, description?: string) =>
    open("ConfirmModal" as ModalName, {
      props: { title, description } as Record<string, unknown>,
    }) as Promise<boolean>;

  return {
    modals,
    open,
    close,
    alert,
    confirm,
  };
};

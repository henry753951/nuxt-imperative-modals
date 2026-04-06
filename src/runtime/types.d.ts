declare global {
  type ModalName = string;

  // These are intentionally empty so consumer-generated declarations can merge into them.
  // oxlint-disable-next-line typescript-eslint/no-empty-interface
  interface ModalsPropsTypeMap extends Record<string, Record<string, unknown>> {}
  // oxlint-disable-next-line typescript-eslint/no-empty-interface
  interface ModalsEmitTypeMap extends Record<string, (...args: any[]) => void> {}
  // oxlint-disable-next-line typescript-eslint/no-empty-interface
  interface ModalsSlotsTypeMap extends Record<string, Record<string, unknown>> {}
}

export {};

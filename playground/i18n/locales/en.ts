export default {
  modals: {
    alert: {
      button: "Close alert",
      promiseBody: "alert() resolves after this modal emits close.",
      promiseTitle: "Promise",
      title: "Alert",
    },
    confirm: {
      body: "Confirm returns true, cancel returns false.",
      cancel: "Cancel",
      confirm: "Confirm",
      promiseTitle: "Promise",
      title: "Confirm",
    },
    customer: {
      close: "Close without saving",
      inputLabel: "Customer name",
      payloadPreview: "Resolved payload preview",
      propsText:
        'These values come from open("ManagementCustomerFormModal", { props }) and are type-checked against the modal props.',
      propsTitle: "Props passed in",
      resultText: "The second emit argument becomes the resolved value of open().",
      resultTitle: "Result payload",
      save: "Save and close",
    },
  },
  playground: {
    actions: {
      alertAction: "Open Alert Demo",
      alertCard: "Alert helper",
      alertDescription: "Good for one-way informational modals.",
      alertResult: "alert closed",
      alertText: "This is the simplest informational modal for one-way acknowledgement.",
      alertTitle: "Draft saved",
      confirmAction: "Open Confirm Demo",
      confirmCard: "Confirm helper",
      confirmDescription: "Useful when the caller expects a boolean decision.",
      confirmResultPrefix: "confirm:",
      confirmText: "Confirm returns true, cancel returns false.",
      confirmTitle: "Delete customer note",
      customAction: "Open Customer Form",
      customCard: "Custom open()",
      customDescription: "Shows props in, editing, and a structured payload out.",
      customLogOpen:
        "Opening ManagementCustomerFormModal and passing customerId / customerName as props.",
    },
    badge: "nuxt-imperative-modals playground",
    features: {
      flowBody:
        "Resolve values come from emit('close', payload), so the modal stays part of your async flow instead of becoming disconnected UI state.",
      flowEyebrow: "Promise flow",
      flowTitle: "Resolve modals like any other async task",
      scanBody:
        "Drop files into app/modals and nested folders automatically become part of the generated modal name and runtime registration.",
      scanEyebrow: "Filesystem scan",
      scanTitle: "Use the directory tree as your modal registry",
      typesBody:
        "Props, emits, and modal names stay derived from the component source, which removes the usual manual map between UI and caller.",
      typesEyebrow: "Generated types",
      typesTitle: "Keep callers and modals on the same type contract",
    },
    metrics: {
      resolve: "resolve path",
      scan: "scan source",
      types: "generated union",
    },
    docs: {
      apiReferenceEyebrow: "API reference",
      contractEyebrow: "Resolve contract",
      emitSnippetTitle: "How the modal returns a result",
      exampleFlowBody:
        "These live examples map directly to alert(), confirm(), and open(). The panel on the right mirrors the latest resolved value and keeps a compact event timeline.",
      exampleFlowTitle: "Interactive flow",
      helperAlertBody:
        "alert(title, description?, error?, extraProps?) is a convenience wrapper around AlertModal. It is useful when you want a simple informational modal and still need to pass extra props.",
      helperAlertTitle: "alert()",
      helperConfirmBody:
        "confirm(title, description?, extraProps?) expects ConfirmModal to resolve a boolean on close. Use it for delete, overwrite, or leave-page decisions.",
      helperConfirmTitle: "confirm()",
      helperOpenBody:
        "open(modalName, options) is the full entry point. modalName comes from the scan result, and both props and resolve types are inferred from the selected component.",
      helperOpenTitle: "open()",
      helperTitle: "Built-in helpers and open()",
      quickStartEyebrow: "Quick start",
      quickStartStep1Body:
        "Mount ModalsContainer in app.vue or a layout so the module always has a render target.",
      quickStartStep1Title: "1. Mount the container",
      quickStartStep2Body:
        "Place modal files under app/modals. Nested folders become part of ModalName.",
      quickStartStep2Title: "2. Add modal files",
      quickStartStep3Body:
        "Call useModals().open(), alert(), or confirm() from any page, component, or composable.",
      quickStartStep3Title: "3. Invoke from code",
      quickStartTitle: "Quick start",
      scanBody:
        "At startup the module scans app/modals and turns nested paths into ModalName entries. For example app/modals/Management/CustomerFormModal.vue becomes ManagementCustomerFormModal.",
      scanGeneratedBody:
        "The module also generates ModalName, ModalsPropsTypeMap, ModalsEmitTypeMap, and ModalsSlotsTypeMap so open() and the modal component stay in sync.",
      scanGeneratedEyebrow: "Generated map",
      scanGeneratedTitle: "Generated typings",
      scanRuntimeBody:
        "At runtime the rendered global component name gets the Modals prefix, for example ModalsManagementCustomerFormModal.",
      scanRuntimeEyebrow: "Runtime naming",
      scanRuntimeTitle: "Runtime component name",
      scanSectionTitle: "Type scanning and generated names",
      scanTitle: "Scan rules",
      systemEyebrow: "System behavior",
    },
    events: {
      actionAccent: "Call",
      actionInfo: "Observe",
      actionSuccess: "Resolved",
      alertCloseDetail:
        "When AlertModal closes, the alert() promise resolves. This is ideal for one-way informational flows.",
      alertCloseTitle: "Alert helper resolved",
      alertOpenDetail:
        "Internally this is equivalent to open('AlertModal', { props }), but trimmed for the common case.",
      alertOpenTitle: "Opening AlertModal",
      bootstrapDetail:
        "The playground is ready. Start with alert, then compare confirm and the custom payload flow.",
      bootstrapTitle: "Playground initialized",
      confirmOpenDetail:
        "Waiting for ConfirmModal to return a boolean through emit('close', accepted).",
      confirmOpenTitle: "Opening ConfirmModal",
      contractBody:
        "Every modal accepts an open prop and emits close when the flow is finished. The close payload becomes the resolved value of open().",
      contractTitle: "Modal contract",
      customResolveDetail:
        "The result comes directly from the close payload declared in defineEmits, without a separate manual map.",
      customResolveTitle: "Received custom payload",
    },
    hero: {
      docsIntro:
        "If you want modals to behave like part of your data flow instead of isolated UI state, this module handles naming, mounting, and type generation in one place.",
      docsTitle: "Interactive docs",
      eyebrow: "Package preview",
      heading: "Use modals like promises while keeping full type inference",
      intro:
        "This interactive doc demonstrates three core capabilities: scanning components from app/modals, passing props through open(), and receiving results from emit('close', result).",
      kicker: "Nuxt module playground",
      previewEyebrow: "What callers write",
      previewTitle: "The code path stays short even when the modal payload is typed",
      tryNow: "Run demo",
    },
    languageEnglish: "English",
    languageTraditionalChinese: "Traditional Chinese",
    panel: {
      description: "This panel shows live resolve results so you can compare them with the docs.",
      interactionTitle: "Interaction log",
      lastResultLabel: "Last resolved value",
      liveBadge: "Runtime ready",
      liveEyebrow: "Live playground",
      liveTitle: "Inspect the actual modal contract",
      noResult: "nothing yet",
      titleTypedName: "Inferred modal name",
      typedModalName: "ManagementCustomerFormModal",
    },
  },
};

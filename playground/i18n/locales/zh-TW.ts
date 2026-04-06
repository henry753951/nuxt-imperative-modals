export default {
  modals: {
    alert: {
      button: "關閉提示",
      promiseBody: "alert() 會在這個視窗 emit close 後完成。",
      promiseTitle: "Promise",
      title: "提示視窗",
    },
    confirm: {
      body: "按下確認會回傳 true，取消則回傳 false。",
      cancel: "取消",
      confirm: "確認",
      promiseTitle: "Promise",
      title: "確認視窗",
    },
    customer: {
      close: "關閉但不儲存",
      inputLabel: "客戶名稱",
      payloadPreview: "預計回傳的 payload",
      propsText:
        '這些值來自 open("ManagementCustomerFormModal", { props })，會自動依照元件 props 型別檢查。',
      propsTitle: "傳入的 props",
      resultText: "第二個 emit 參數會成為 open() promise 的 resolved value。",
      resultTitle: "回傳的結果",
      save: "儲存並關閉",
    },
  },
  playground: {
    actions: {
      alertAction: "開啟提示視窗",
      alertCard: "Alert helper",
      alertDescription: "適合單向提示。呼叫後只等待視窗被關閉。",
      alertResult: "alert closed",
      alertText: "這是一個最基本的提示視窗，適合只需要確認資訊的情境。",
      alertTitle: "草稿已儲存",
      confirmAction: "開啟確認視窗",
      confirmCard: "Confirm helper",
      confirmDescription: "適合刪除、送出、覆寫等需要 boolean 回應的場景。",
      confirmResultPrefix: "confirm:",
      confirmText: "使用者確認後回傳 true，取消時回傳 false。",
      confirmTitle: "刪除客戶備註",
      customAction: "開啟客戶表單",
      customCard: "Custom open()",
      customDescription: "示範 props 傳入、編輯、以及結構化 payload 回傳。",
      customLogOpen:
        "開啟 ManagementCustomerFormModal，並將 customerId / customerName 當成 props 傳入。",
    },
    badge: "nuxt-imperative-modals playground",
    features: {
      flowBody:
        "回傳值直接來自 emit('close', payload)，modal 會自然併入既有 async flow，而不是變成分離的 UI 狀態。",
      flowEyebrow: "Promise flow",
      flowTitle: "把 modal 當成一般非同步流程來 resolve",
      scanBody: "把檔案丟進 app/modals，巢狀資料夾就會自動成為 modal 名稱與 runtime 註冊的一部分。",
      scanEyebrow: "Filesystem scan",
      scanTitle: "直接把資料夾結構當成 modal registry",
      typesBody: "props、emits 與 modal 名稱都從元件來源推導，省掉 UI 端和呼叫端之間手寫對應表。",
      typesEyebrow: "Generated types",
      typesTitle: "讓呼叫端與 modal 共用同一份型別契約",
    },
    metrics: {
      resolve: "回傳路徑",
      scan: "掃描來源",
      types: "產生 union",
    },
    docs: {
      apiReferenceEyebrow: "API reference",
      contractEyebrow: "Resolve contract",
      emitSnippetTitle: "Modal 端如何回傳結果",
      exampleFlowBody:
        "這些 live demo 對應 alert()、confirm() 與 open() 三條 API。右側面板會同步顯示最近一次 resolve 的結果與精簡互動事件。",
      exampleFlowTitle: "互動流程",
      helperAlertBody:
        "alert(title, description?, error?, extraProps?) 是對 AlertModal 的快捷封裝。常見做法是把標題與說明交給 helper，由它幫你完成開啟與等待關閉。",
      helperAlertTitle: "alert()",
      helperConfirmBody:
        "confirm(title, description?, extraProps?) 期待 ConfirmModal 在 close 時回傳 boolean，適合刪除、覆寫、離開頁面等需要判斷的情境。",
      helperConfirmTitle: "confirm()",
      helperOpenBody:
        "open(modalName, options) 是最完整的入口。modalName 會從掃描結果推導，props 與 resolve 型別都直接來自該元件本身。",
      helperOpenTitle: "open()",
      helperTitle: "內建 helper 與 open()",
      quickStartEyebrow: "Quick start",
      quickStartStep1Body: "在 app.vue 或 layout 掛上 ModalsContainer，讓模組有固定的掛載點。",
      quickStartStep1Title: "1. 掛載容器",
      quickStartStep2Body: "把 modal 放進 app/modals。巢狀資料夾會被轉成 ModalName 的前綴。",
      quickStartStep2Title: "2. 放置檔案",
      quickStartStep3Body:
        "在任何頁面、元件或 composable 直接呼叫 useModals().open()、alert()、confirm()。",
      quickStartStep3Title: "3. 從程式呼叫",
      quickStartTitle: "開始使用",
      scanBody:
        "啟動時會掃描 app/modals 目錄，依照巢狀路徑組成 ModalName。例如 app/modals/Management/CustomerFormModal.vue 會變成 ManagementCustomerFormModal。",
      scanGeneratedBody:
        "模組會同步產生 ModalName、ModalsPropsTypeMap、ModalsEmitTypeMap、ModalsSlotsTypeMap，讓 open() 與元件端維持同一份型別來源。",
      scanGeneratedEyebrow: "Generated map",
      scanGeneratedTitle: "產生的型別",
      scanRuntimeBody:
        "執行時實際渲染的全域元件名稱會加上 Modals 前綴，例如 ModalsManagementCustomerFormModal。",
      scanRuntimeEyebrow: "Runtime naming",
      scanRuntimeTitle: "執行時元件名稱",
      scanSectionTitle: "型別掃描與命名生成",
      scanTitle: "掃描規則",
      systemEyebrow: "System behavior",
    },
    events: {
      actionAccent: "呼叫",
      actionInfo: "觀察",
      actionSuccess: "完成",
      alertCloseDetail: "AlertModal 關閉後，alert() 的 Promise 完成，適合單向提示流程。",
      alertCloseTitle: "Alert helper 已 resolve",
      alertOpenDetail:
        "內部等同 open('AlertModal', { props })，只是把最常見的提示流程整理成更短的呼叫。",
      alertOpenTitle: "開啟 AlertModal",
      bootstrapDetail: "系統已準備完成。你可以先試 alert，再比對 confirm 與自訂 payload 的差異。",
      bootstrapTitle: "Playground 已初始化",
      confirmOpenDetail: "等待 ConfirmModal 透過 emit('close', accepted) 回傳 boolean。",
      confirmOpenTitle: "開啟 ConfirmModal",
      contractBody:
        "每個 modal 都要接受 open prop，並在流程完成時 emit('close', result)。result 的型別會成為 open() Promise 的 resolved value。",
      contractTitle: "Modal contract",
      customResolveDetail:
        "回傳值直接來自 defineEmits 的 close payload，不需要額外手寫一層型別映射。",
      customResolveTitle: "收到自訂 payload",
    },
    hero: {
      docsIntro:
        "如果你要在 Nuxt 專案中把 modal 當成資料流程的一部分，而不是單純的 UI 控制，這個 module 的目標就是把命名、掛載與型別推導一次處理掉。",
      docsTitle: "互動式文件",
      eyebrow: "Package preview",
      heading: "把 modal 當成 Promise 使用，同時保留完整型別推導",
      intro:
        "這個互動式文件示範三件核心能力：從 app/modals 自動掃描元件、透過 open() 傳入 props，以及從 emit('close', result) 取得回傳值。",
      kicker: "Nuxt module playground",
      previewEyebrow: "呼叫端實際寫法",
      previewTitle: "就算 payload 有型別，呼叫路徑也可以維持很短",
      tryNow: "執行 demo",
    },
    languageEnglish: "English",
    languageTraditionalChinese: "繁體中文",
    panel: {
      description: "這裡會即時顯示 helper / custom modal 的 resolve 結果，方便對照文件說明。",
      interactionTitle: "互動紀錄",
      lastResultLabel: "最後回傳值",
      liveBadge: "Runtime ready",
      liveEyebrow: "Live playground",
      liveTitle: "直接觀察實際 modal contract",
      noResult: "尚未操作",
      titleTypedName: "推導出的 modal 名稱",
      typedModalName: "ManagementCustomerFormModal",
    },
  },
};

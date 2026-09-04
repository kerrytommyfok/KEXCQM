(function () {
  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbw8aIYEBfTfeJpRrYBY6zazZbtUdnc6lI89LQGvXdmryxde8l9PsCzM2iRIGPykhtZ6/exec";
  const ALLOWED_LETTERS = ["A", "B", "C", "D", "E", "F", "H", "K", "N", "S"];
  const LOCAL_RECORDS_KEY = "cqm_attendance_records";

  const initialQuestions = [
    { id: "q1", text: "銀行體系每個工作天的截數結算時間係幾點？", options: ["15:30", "17:30", "18:00", "16:00"], correctIndex: 1 },
    { id: "q2", text: "根據收票流程，同事開機收票前必須先做甚麼？", options: ["進入管理員模式", "開票箱", "關閉保安警報", "印收據"], correctIndex: 2 },
    { id: "q3", text: "關於Y票（結算日期），以下哪項描述係正確？", options: ["聽日或之後日期嘅票要收走", "今日或之前日期嘅票要收走", "所有票一律要收走", "只有港幣支票需要核對結算日期"], correctIndex: 1 },
    { id: "q4", text: "換票機紙前，同事必須注意甚麼？", options: ["確保票機已關閉電源", "先通知組長", "對清楚所屬銀行", "離開管理員模式"], correctIndex: 2 },
    { id: "q5", text: "收票時admin咭被票機食咗s，同事應如何處理？", options: ["自行用工具取回咭", "完成收票後通知主管", "唔可以離開，即時通知主管等候安排", "通知銀行職員處理"], correctIndex: 2 },
    { id: "q6", text: "以下哪種情況，同事必須留在現場並即時通知主管？", options: ["票機紙用完需要換紙", "功課紙資料填錯", "開機時出現鎖匙/咭斷裂", "票據不符"], correctIndex: 2 },
    { id: "q7", text: "如有突發事件影響收票程序，同事應點做？", options: ["按經驗自行處理", "不予理會，繼續收票工作", "通知保安員即可", "即時通知主管等候安排，唔應自行處理"], correctIndex: 3 },
    { id: "q8", text: "開機時出現橫bar/票箱門開唔到，正確做法係？", options: ["用工具自行強行開啟", "唔可以離開，即時通知主管等候安排", "通知保安員代為處理", "聯絡銀行維修部自行安排"], correctIndex: 1 },
    { id: "q9", text: "情境：同事收票時，如有客人要求取回票機內支票，以下哪項係正確？", options: ["幫忙尋找支票並交回客人", "通知主管並獲得確認後，可以交回客人", "如有銀行職員確認，可以交回客人", "有禮貌拒絕客人要求，請客人自行聯絡客戶服務熱線"], correctIndex: 3 },
    { id: "q10", text: "情境：收票時，遇到客人上前搭訕或查看收票工作，以下哪項係正確?", options: ["叫客人走開", "有禮貌請客人退後，留出安全空間進行收票工作", "一邊回應客人問題一邊收票", "不作任何回應"], correctIndex: 1 },
    { id: "q11", text: "情境：你需要裝入HSBC嘅支票，應選用哪種顏色嘅收票專用袋？", options: ["紅色", "綠色", "藍色", "橙色"], correctIndex: 0 },
    { id: "q12", text: "情境：收票完成準備離開票機前，同事必須確認甚麼？", options: ["確認票箱已上鎖即可離開", "等候組長到場點數後才離開", "確認所有物資及鎖匙數量正確，確保冇嘢遺留", "通知保安員可以離開"], correctIndex: 2 },
    { id: "q13", text: "以下哪項係收票時必須遵守的安全要點？", options: ["支票袋可暫放係票機旁邊", "收票後盡快順道購物節省時間", "支票、鎖匙和工作袋必須保管在視線範圍內", "收集支票後稍後才拉好拉鍊"], correctIndex: 2 },
    { id: "q14", text: "收集支票後，為避免支票外露，應立即做甚麼？", options: ["用橡筋捆綁後放係快遞袋外", "放入票箱上暫存", "放入支票袋後不用即時拉鍊", "放入快遞袋暫存"], correctIndex: 2 },
    { id: "q15", text: "完成所有收票工序後，同事應如何行動？", options: ["順道購物或吸煙後返回", "以最短時間安全返回集散點/目的地，避免閒逛及購物", "在附近等候主管確認", "自行決定下一步行動"], correctIndex: 1 }
  ];

  const icons = {
    play: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    brain: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M12 18v3"/></svg>',
    clipboard: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>',
    plus: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
    checkSquare: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    checkCircle: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    checkCircleSm: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    loader: '<svg class="spin" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>',
    loaderSm: '<svg class="spin" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>',
    lock: '<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    xCircle: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
    xCircleToast: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
    checkToast: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    copy: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    download: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    trash: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>',
    sheet: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    plusSm: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
    checkOrange: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    clipboardOrange: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>',
    brainSm: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>'
  };

  const kexLogo = `
    <svg viewBox="0 0 350 120" class="logo">
      <rect x="10" y="10" width="330" height="100" rx="20" fill="white" stroke="#f97316" stroke-width="12" />
      <g stroke="#f97316" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M 60 35 L 60 85" />
        <path d="M 120 35 L 60 60 L 120 85" />
        <path d="M 190 35 L 140 35 L 140 85 L 190 85" />
        <path d="M 140 60 L 175 60" />
        <path d="M 230 35 L 290 85" />
        <path d="M 290 35 L 230 85" />
      </g>
    </svg>`;

  const state = {
    currentView: "login",
    dbQuestions: JSON.parse(JSON.stringify(initialQuestions)),
    dbRecords: loadLocalRecords(),
    session: emptySession(),
    askedQuestionIds: [],
    activeInput: { index: 0, field: "machineNo" },
    currentQuestion: null,
    selectedOption: null,
    adminTab: "records",
    isAiAnalyzing: false,
    aiReport: "",
    isAdminAuth: false,
    adminPassword: "",
    isSubmitting: false,
    user: null
  };

  let firebaseReady = false;
  let firestoreDb = null;
  let appId = "default-app-id";
  let toastTimer = null;

  const viewRoot = document.getElementById("view-root");
  const mainEl = document.getElementById("main");
  const btnHome = document.getElementById("btn-home");
  const btnAdmin = document.getElementById("btn-admin");
  const toastEl = document.getElementById("toast");
  const toastInner = document.getElementById("toast-inner");
  const toastIcon = document.getElementById("toast-icon");
  const toastMsg = document.getElementById("toast-msg");

  function emptySession() {
    return {
      empNo: "",
      clockInTime: null,
      quizAttempts: 0,
      quizPassed: false,
      machineRecords: [{ machineNo: "", bagNo: "" }],
      clockOutTime: null
    };
  }

  function loadLocalRecords() {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_RECORDS_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveLocalRecords() {
    localStorage.setItem(LOCAL_RECORDS_KEY, JSON.stringify(state.dbRecords));
  }

  function formatCustomDateTime(dateInput) {
    const d = new Date(dateInput == null ? Date.now() : dateInput);
    if (isNaN(d.getTime())) return typeof dateInput === "string" ? dateInput : "";
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strHours = String(hours).padStart(2, "0");
    return `${day}/${month}/${year}, ${strHours}:${minutes}:${seconds} ${ampm}`;
  }

  function showToast(msg, type) {
    type = type || "success";
    toastMsg.textContent = msg;
    toastInner.className = "toast-inner " + (type === "error" ? "err" : "ok");
    toastIcon.innerHTML = type === "error" ? icons.xCircleToast : icons.checkToast;
    toastEl.hidden = false;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 3000);
  }

  function initFirebase() {
    let config = {};
    try {
      if (typeof window.__firebase_config !== "undefined" && window.__firebase_config) {
        config = typeof window.__firebase_config === "string"
          ? JSON.parse(window.__firebase_config)
          : window.__firebase_config;
      }
    } catch (e) {
      config = {};
    }
    if (typeof window.__app_id !== "undefined" && window.__app_id) {
      appId = window.__app_id;
    }
    if (!config || !config.apiKey || typeof firebase === "undefined") return;

    try {
      firebase.initializeApp(config);
      const auth = firebase.auth();
      firestoreDb = firebase.firestore();
      firebaseReady = true;

      const token = window.__initial_auth_token;
      const start = token
        ? auth.signInWithCustomToken(token)
        : auth.signInAnonymously();

      start.catch(function (err) {
        console.error(err);
      });

      auth.onAuthStateChanged(function (user) {
        state.user = user;
        if (!user) return;
        firestoreDb
          .collection("artifacts")
          .doc(appId)
          .collection("public")
          .doc("data")
          .collection("attendance_records")
          .onSnapshot(
            function (snapshot) {
              const data = snapshot.docs.map(function (doc) {
                return Object.assign({ id: doc.id }, doc.data());
              });
              data.sort(function (a, b) {
                return (a.timestamp || 0) - (b.timestamp || 0);
              });
              state.dbRecords = data;
              if (state.currentView === "admin" && state.adminTab === "records") render();
            },
            function (error) {
              console.error("Error fetching records:", error);
              showToast("無法讀取雲端紀錄", "error");
            }
          );
      });
    } catch (err) {
      console.error(err);
      firebaseReady = false;
    }
  }

  function pickRandomQuestion(alreadyAsked) {
    const remaining = state.dbQuestions.filter(function (q) {
      return alreadyAsked.indexOf(q.id) === -1;
    });
    if (remaining.length === 0) {
      showToast("已嘗試所有題目且全部答錯！請重新打卡", "error");
      state.currentView = "login";
      render();
      return;
    }
    const randomIndex = Math.floor(Math.random() * remaining.length);
    state.currentQuestion = remaining[randomIndex];
    state.selectedOption = null;
  }

  function handleClockIn() {
    if (!state.session.empNo.trim()) {
      showToast("請輸入員工編號", "error");
      return;
    }
    state.session.clockInTime = formatCustomDateTime(new Date());
    state.session.quizAttempts = 0;
    state.session.quizPassed = false;
    state.askedQuestionIds = [];
    pickRandomQuestion([]);
    state.currentView = "quiz";
    showToast("開工打卡成功！請完成測驗");
    render();
  }

  function updateMachineRecord(index, field, value) {
    state.session.machineRecords[index][field] = String(value).toUpperCase();
    render();
  }

  function handleKeypadPress(char) {
    const active = state.activeInput;
    if (!active || active.index >= state.session.machineRecords.length) return;
    const currentVal = state.session.machineRecords[active.index][active.field] || "";
    updateMachineRecord(active.index, active.field, currentVal + char);
  }

  function handleKeypadBackspace() {
    const active = state.activeInput;
    if (!active || active.index >= state.session.machineRecords.length) return;
    const currentVal = state.session.machineRecords[active.index][active.field] || "";
    updateMachineRecord(active.index, active.field, currentVal.slice(0, -1));
  }

  function handleKeypadClear() {
    const active = state.activeInput;
    if (!active || active.index >= state.session.machineRecords.length) return;
    updateMachineRecord(active.index, active.field, "");
  }

  function handleNextField() {
    if (!state.activeInput) {
      state.activeInput = { index: 0, field: "machineNo" };
      render();
      return;
    }
    if (state.activeInput.field === "machineNo") {
      state.activeInput = { index: state.activeInput.index, field: "bagNo" };
    } else if (state.activeInput.index < state.session.machineRecords.length - 1) {
      state.activeInput = { index: state.activeInput.index + 1, field: "machineNo" };
    } else {
      state.activeInput = { index: 0, field: "machineNo" };
    }
    render();
  }

  function handleAnswerSubmit() {
    if (state.selectedOption === null) {
      showToast("請選擇一個答案", "error");
      return;
    }
    state.session.quizAttempts += 1;
    if (state.selectedOption === state.currentQuestion.correctIndex) {
      showToast("答對了！進入下一步");
      state.session.quizPassed = true;
      state.currentView = "record";
      render();
    } else {
      const newAsked = state.askedQuestionIds.concat(state.currentQuestion.id);
      state.askedQuestionIds = newAsked;
      const remainingCount = state.dbQuestions.length - newAsked.length;
      if (remainingCount > 0) {
        showToast("答錯了！已自動更換下一題 (剩餘 " + remainingCount + " 題)", "error");
        setTimeout(function () {
          pickRandomQuestion(newAsked);
          render();
        }, 1200);
      } else {
        showToast("已連續答錯全部 15 題！請重新打卡進行測試", "error");
        setTimeout(function () {
          state.currentView = "login";
          render();
        }, 2000);
      }
    }
  }

  function handleRecordSubmit() {
    const validRecords = state.session.machineRecords.filter(function (r) {
      return r.machineNo.trim() || r.bagNo.trim();
    });
    const hasIncomplete = validRecords.some(function (r) {
      return !r.machineNo.trim() || !r.bagNo.trim();
    });
    if (validRecords.length === 0) {
      showToast("請最少填寫一組票機與票袋編號", "error");
      return;
    }
    if (hasIncomplete) {
      showToast("請完整填寫已新增的機具資訊", "error");
      return;
    }
    state.session.machineRecords = validRecords;
    state.currentView = "checkout";
    showToast("請確認紀錄");
    render();
  }

  async function handleClockOut() {
    if (state.isSubmitting) return;
    state.isSubmitting = true;
    render();

    const clockOutTime = formatCustomDateTime(new Date());
    const baseTimestamp = Date.now();
    let failCount = 0;

    for (let i = 0; i < state.session.machineRecords.length; i++) {
      const mr = state.session.machineRecords[i];
      const payloadData = {
        empNo: state.session.empNo,
        clockInTime: state.session.clockInTime,
        quizAttempts: state.session.quizAttempts,
        machineNo: mr.machineNo,
        bagNo: mr.bagNo,
        clockOutTime: clockOutTime
      };
      const finalRecord = {
        empNo: state.session.empNo,
        clockInTime: state.session.clockInTime,
        quizAttempts: state.session.quizAttempts,
        machineRecords: [{ machineNo: mr.machineNo, bagNo: mr.bagNo }],
        clockOutTime: clockOutTime,
        timestamp: baseTimestamp + i
      };

      try {
        await fetch(GAS_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payloadData)
        });
      } catch (err) {
        console.error("發送失敗:", err);
        failCount += 1;
      }

      if (firebaseReady && state.user && firestoreDb) {
        await firestoreDb
          .collection("artifacts")
          .doc(appId)
          .collection("public")
          .doc("data")
          .collection("attendance_records")
          .add(finalRecord);
      } else {
        state.dbRecords = state.dbRecords.concat([
          Object.assign({}, finalRecord, { id: String(baseTimestamp + i) })
        ]);
        saveLocalRecords();
      }
    }

    state.isSubmitting = false;
    if (failCount === 0) {
      showToast("完成！已成功將 " + state.session.machineRecords.length + " 筆獨立紀錄儲存！");
    } else {
      showToast("完成拆分紀錄 (有 " + failCount + " 筆同步失敗，但已儲存至系統)", "error");
    }
    state.session = emptySession();
    state.currentView = "login";
    render();
  }

  function handleAdminLoginSubmit() {
    if (state.adminPassword === "3333") {
      state.isAdminAuth = true;
      state.adminPassword = "";
      state.currentView = "admin";
      showToast("成功進入後台");
      render();
    } else {
      showToast("密碼錯誤，請重新輸入", "error");
    }
  }

  function exportToExcel() {
    if (!window.XLSX) {
      showToast("導出組件加載中，請稍後再試", "error");
      return;
    }
    const ws = window.XLSX.utils.json_to_sheet(
      state.dbRecords.map(function (r) {
        return {
          員工編號: r.empNo,
          開工時間: formatCustomDateTime(r.clockInTime),
          答題嘗試次數: r.quizAttempts,
          票機編號: (r.machineRecords || []).map(function (m) { return m.machineNo; }).join(", "),
          票袋編號: (r.machineRecords || []).map(function (m) { return m.bagNo; }).join(", "),
          完成時間: formatCustomDateTime(r.clockOutTime)
        };
      })
    );
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, "打卡紀錄");
    window.XLSX.writeFile(wb, "員工打卡紀錄_" + new Date().toLocaleDateString() + ".xlsx");
    showToast("Excel 下載成功");
  }

  function copyToTSV() {
    const headers = ["員工編號", "開工時間", "答題嘗試次數", "票機編號", "票袋編號", "完成時間"];
    const rows = state.dbRecords.map(function (r) {
      return [
        r.empNo,
        formatCustomDateTime(r.clockInTime),
        r.quizAttempts,
        (r.machineRecords || []).map(function (m) { return m.machineNo; }).join(", "),
        (r.machineRecords || []).map(function (m) { return m.bagNo; }).join(", "),
        formatCustomDateTime(r.clockOutTime)
      ].join("\t");
    });
    const tsvContent = [headers.join("\t")].concat(rows).join("\n");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(tsvContent).then(function () {
        showToast("已複製為 Google Sheets 格式 (TSV)");
      }).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }

    function fallbackCopy() {
      const textArea = document.createElement("textarea");
      textArea.value = tsvContent;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        showToast("已複製為 Google Sheets 格式 (TSV)");
      } catch (err) {
        showToast("複製失敗，請手動選取", "error");
      }
      document.body.removeChild(textArea);
    }
  }

  function runAiAnalysis() {
    state.isAiAnalyzing = true;
    render();
    setTimeout(function () {
      const total = state.dbRecords.length;
      if (total === 0) {
        state.aiReport = "目前無足夠數據進行分析。";
      } else {
        const avgAttempts = (
          state.dbRecords.reduce(function (acc, curr) {
            return acc + (curr.quizAttempts || 0);
          }, 0) / total
        ).toFixed(1);
        const errorProne =
          avgAttempts > 1.5 ? "偏高，建議加強 CQM 基礎操作培訓" : "良好，員工普遍熟悉操作";
        state.aiReport =
          "【AI 分析報告】\n總打卡人次: " +
          total +
          " 次。\n平均答題嘗試次數: " +
          avgAttempts +
          " 次。\n操作熟悉度評估: " +
          errorProne +
          "。\n建議: 針對答錯重試超過 2 次的員工進行針對性指導。";
      }
      state.isAiAnalyzing = false;
      showToast("AI 分析完成");
      render();
    }, 2000);
  }

  function renderLogin() {
    return `
      <div class="center-col fade-up">
        ${kexLogo}
        <h2>CQM員工打卡系統</h2>
        <p class="muted">請輸入您的員工編號以開始今日的工作流程</p>
        <input id="emp-no" class="full-input" type="text" placeholder="例如: EMP-001" value="${escapeAttr(state.session.empNo)}" />
        <button id="btn-clock-in" class="btn btn-orange" type="button">${icons.play} 開工打卡</button>
      </div>`;
  }

  function renderQuiz() {
    const q = state.currentQuestion;
    const options = (q && q.options ? q.options : []).map(function (opt, idx) {
      const selected = state.selectedOption === idx;
      return `
        <button class="option${selected ? " selected" : ""}" type="button" data-option="${idx}">
          <div class="option-row">
            <div class="radio-dot">${selected ? "<span></span>" : ""}</div>
            ${escapeHtml(opt)}
          </div>
        </button>`;
    }).join("");
    return `
      <div class="stack fade-up">
        <div class="section-head">
          <div class="icon-circle zinc">${icons.brain}</div>
          <div>
            <h2 class="section-title">CQM 隨機測驗</h2>
            <p class="muted-sm">答對才能繼續</p>
          </div>
        </div>
        <div class="quiz-box">
          <p class="quiz-text">${q ? escapeHtml(q.text) : ""}</p>
          <div class="options">${options}</div>
        </div>
        <button id="btn-submit-answer" class="btn btn-orange" type="button">提交答案</button>
      </div>`;
  }

  function renderRecord() {
    const records = state.session.machineRecords.map(function (mr, idx) {
      const isMachineActive = state.activeInput && state.activeInput.index === idx && state.activeInput.field === "machineNo";
      const isBagActive = state.activeInput && state.activeInput.index === idx && state.activeInput.field === "bagNo";
      const removeBtn = state.session.machineRecords.length > 1
        ? `<button class="remove-btn" type="button" data-remove="${idx}" title="移除此組紀錄">${icons.xCircle}</button>`
        : "";
      return `
        <div class="machine-card">
          ${removeBtn}
          <h4 class="machine-label">機具組 ${idx + 1}</h4>
          <div class="grid-2">
            <div>
              <label class="field-label">開票機 (CQM) 編號</label>
              <input class="field-input${isMachineActive ? " active" : ""}" data-idx="${idx}" data-field="machineNo" type="text" placeholder="例如 CQM-8821" value="${escapeAttr(mr.machineNo)}" />
            </div>
            <div>
              <label class="field-label">票袋編號</label>
              <input class="field-input${isBagActive ? " active" : ""}" data-idx="${idx}" data-field="bagNo" type="text" placeholder="例如 BAG-0943" value="${escapeAttr(mr.bagNo)}" />
            </div>
          </div>
        </div>`;
    }).join("");

    let fieldLabel = "未選擇輸入框 (請點擊上方欄位)";
    if (state.activeInput) {
      const targetName = state.activeInput.field === "machineNo" ? "CQM 機號" : "票袋編號";
      fieldLabel = "第 " + (state.activeInput.index + 1) + " 組 : " + targetName;
    }

    const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(function (num) {
      return `<button class="key" type="button" data-key="${num}">${num}</button>`;
    }).join("");

    const letters = ALLOWED_LETTERS.map(function (lettr) {
      return `<button class="letter" type="button" data-key="${lettr}">${lettr}</button>`;
    }).join("");

    const addBtn = state.session.machineRecords.length < 4
      ? `<button id="btn-add-machine" class="btn btn-dashed" type="button">${icons.plus} 新增一組機具</button>`
      : "";

    return `
      <div class="stack fade-up">
        <div class="section-head">
          <div class="icon-circle orange">${icons.clipboard}</div>
          <div>
            <h2 class="section-title">CQM紀錄</h2>
            <p class="muted-sm">請填寫目前處理的開票機資訊 (最多 4 組)</p>
          </div>
        </div>
        <div class="machine-list">${records}</div>
        ${addBtn}
        <div class="keypad">
          <div class="keypad-bar">
            <div class="keypad-bar-left">
              <span class="pulse-dot"></span>
              <span class="truncate">${escapeHtml(fieldLabel)}</span>
            </div>
            <button id="btn-next-field" class="next-field" type="button">下一欄 ➔</button>
          </div>
          <div class="keypad-grid">
            <div class="num-grid">
              ${nums}
              <button class="key" type="button" id="key-clear" title="清空"><span class="key-mini">✕</span></button>
              <button class="key" type="button" data-key="0">0</button>
              <button class="key" type="button" id="key-back" title="刪除"><span class="key-mini">←</span></button>
            </div>
            <div class="letters">
              <div class="letters-hint">▲</div>
              <div class="letter-grid">${letters}</div>
              <div class="letters-hint">▼</div>
            </div>
          </div>
        </div>
        <button id="btn-save-record" class="btn btn-orange" type="button">${icons.checkSquare} 儲存紀錄</button>
      </div>`;
  }

  function renderCheckout() {
    const rows = state.session.machineRecords.map(function (mr, idx) {
      return `
        <div class="summary-row">
          <div>
            <p class="tiny">票機 ${idx + 1}</p>
            <p class="break">${escapeHtml(mr.machineNo || "-")}</p>
          </div>
          <div>
            <p class="tiny">票袋 ${idx + 1}</p>
            <p class="break">${escapeHtml(mr.bagNo || "-")}</p>
          </div>
        </div>`;
    }).join("");

    return `
      <div class="center-col checkout fade-up">
        <div class="icon-circle green">${state.isSubmitting ? icons.loader : icons.checkCircle}</div>
        <h2>${state.isSubmitting ? "紀錄中..." : "確認紀錄"}</h2>
        <p class="muted">${state.isSubmitting ? "正在將您的打卡資料上傳至雲端，請稍候..." : "確認無誤後請點擊完成儲存紀錄"}</p>
        <div class="summary">
          <p class="label">目前員工</p>
          <p class="value">${escapeHtml(state.session.empNo)}</p>
          <div class="summary-rows">${rows}</div>
        </div>
        <button id="btn-clock-out" class="btn btn-dark" type="button" ${state.isSubmitting ? "disabled" : ""}>
          ${state.isSubmitting ? icons.loaderSm + "<span>紀錄中...</span>" : icons.checkCircleSm + "<span>完成</span>"}
        </button>
      </div>`;
  }

  function renderAdminLogin() {
    return `
      <div class="center-col fade-up">
        <div class="icon-circle lock">${icons.lock}</div>
        <h2>管理員登入</h2>
        <p class="muted">請輸入管理員密碼以進入一體化後台</p>
        <input id="admin-pass" class="full-input admin" type="password" placeholder="請輸入密碼" value="${escapeAttr(state.adminPassword)}" />
        <button id="btn-admin-login" class="btn btn-dark" type="button">進入後台</button>
      </div>`;
  }

  function renderAdmin() {
    const recordsTab = state.adminTab === "records";
    let body = "";
    if (recordsTab) {
      const table = state.dbRecords.length === 0
        ? `<div class="empty">${icons.sheet}<p>目前尚無任何打卡數據</p></div>`
        : `<table class="data-table">
            <thead>
              <tr>
                <th>員工編號</th><th>開工時間</th><th>嘗試次數</th><th>票機編號</th><th>票袋編號</th><th>完成時間</th>
              </tr>
            </thead>
            <tbody>
              ${state.dbRecords.map(function (record) {
                const machines = (record.machineRecords || []).map(function (mr) {
                  return `<div class="pill">${escapeHtml(mr.machineNo || "-")}</div>`;
                }).join("");
                const bags = (record.machineRecords || []).map(function (mr) {
                  return `<div class="pill">${escapeHtml(mr.bagNo || "-")}</div>`;
                }).join("");
                return `<tr>
                  <td>${escapeHtml(record.empNo)}</td>
                  <td>${escapeHtml(formatCustomDateTime(record.clockInTime))}</td>
                  <td style="text-align:center">${record.quizAttempts}</td>
                  <td>${machines}</td>
                  <td>${bags}</td>
                  <td>${escapeHtml(formatCustomDateTime(record.clockOutTime))}</td>
                </tr>`;
              }).join("")}
            </tbody>
          </table>`;

      body = `
        <div class="panel">
          <div class="panel-head">
            <h3 class="panel-title">${icons.clipboardOrange} 數據總覽</h3>
            <div class="actions">
              <button id="btn-ai" class="chip chip-purple" type="button" ${state.isAiAnalyzing ? "disabled" : ""}>${icons.brainSm} ${state.isAiAnalyzing ? "分析中..." : "AI 深度分析"}</button>
              <button id="btn-copy" class="chip chip-blue" type="button">${icons.copy} 複製 (Google Sheets)</button>
              <button id="btn-excel" class="chip chip-green" type="button">${icons.download} 匯出 Excel</button>
            </div>
          </div>
          ${state.aiReport ? `<div class="ai-report">${escapeHtml(state.aiReport)}</div>` : ""}
          <div class="table-wrap">${table}</div>
        </div>`;
    } else {
      const qs = state.dbQuestions.map(function (q, qIndex) {
        const opts = q.options.map(function (opt, oIndex) {
          return `
            <div class="opt-row">
              <input type="radio" name="correct-${escapeAttr(q.id)}" data-q="${qIndex}" data-o="${oIndex}" ${q.correctIndex === oIndex ? "checked" : ""} />
              <input class="opt-input${q.correctIndex === oIndex ? " correct" : ""}" data-qopt="${qIndex}" data-o="${oIndex}" value="${escapeAttr(opt)}" />
            </div>`;
        }).join("");
        return `
          <div class="q-card">
            <button class="remove-btn" type="button" data-del-q="${qIndex}">${icons.trash}</button>
            <div style="margin-bottom:1rem;padding-right:2rem">
              <label class="field-label">問題標題</label>
              <input class="q-title-input" data-qtitle="${qIndex}" value="${escapeAttr(q.text)}" />
            </div>
            <div class="opt-grid">${opts}</div>
          </div>`;
      }).join("");

      body = `
        <div class="panel q-panel">
          <div class="q-head">
            <h3 class="panel-title">${icons.checkOrange} 題庫設定</h3>
            <button id="btn-add-q" class="chip" style="background:#27272a;color:#fff" type="button">${icons.plusSm} 新增題目</button>
          </div>
          <div class="q-list">${qs}</div>
        </div>`;
    }

    return `
      <div class="admin-wrap fade-up">
        <div class="tabs">
          <button class="tab${recordsTab ? " active" : ""}" type="button" data-tab="records">打卡紀錄管理</button>
          <button class="tab${!recordsTab ? " active" : ""}" type="button" data-tab="questions">題庫資料庫</button>
        </div>
        ${body}
      </div>`;
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, "&#39;");
  }

  function render() {
    const view = state.currentView;
    mainEl.className = "main " + (view === "admin" ? "main-wide" : "main-narrow");
    btnHome.hidden = view === "login" || view === "admin" || view === "adminLogin";
    btnAdmin.classList.toggle("active", view === "admin" || view === "adminLogin");

    if (view === "login") viewRoot.innerHTML = renderLogin();
    else if (view === "quiz") viewRoot.innerHTML = renderQuiz();
    else if (view === "record") viewRoot.innerHTML = renderRecord();
    else if (view === "checkout") viewRoot.innerHTML = renderCheckout();
    else if (view === "adminLogin") viewRoot.innerHTML = renderAdminLogin();
    else if (view === "admin") viewRoot.innerHTML = renderAdmin();

    bindViewEvents();
  }

  function bindViewEvents() {
    const emp = document.getElementById("emp-no");
    if (emp) {
      emp.addEventListener("input", function (e) {
        state.session.empNo = e.target.value;
      });
      emp.addEventListener("keydown", function (e) {
        if (e.key === "Enter") handleClockIn();
      });
    }
    const clockIn = document.getElementById("btn-clock-in");
    if (clockIn) clockIn.addEventListener("click", handleClockIn);

    viewRoot.querySelectorAll("[data-option]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.selectedOption = Number(btn.getAttribute("data-option"));
        render();
      });
    });
    const submitAns = document.getElementById("btn-submit-answer");
    if (submitAns) submitAns.addEventListener("click", handleAnswerSubmit);

    viewRoot.querySelectorAll("[data-field]").forEach(function (input) {
      input.addEventListener("focus", function () {
        const index = Number(input.getAttribute("data-idx"));
        const field = input.getAttribute("data-field");
        if (state.activeInput && state.activeInput.index === index && state.activeInput.field === field) {
          return;
        }
        state.activeInput = { index: index, field: field };
        viewRoot.querySelectorAll("[data-field]").forEach(function (el) {
          const on =
            Number(el.getAttribute("data-idx")) === index &&
            el.getAttribute("data-field") === field;
          el.classList.toggle("active", on);
        });
        const label = viewRoot.querySelector(".keypad-bar-left .truncate");
        if (label) {
          const targetName = field === "machineNo" ? "CQM 機號" : "票袋編號";
          label.textContent = "第 " + (index + 1) + " 組 : " + targetName;
        }
      });
      input.addEventListener("input", function () {
        const idx = Number(input.getAttribute("data-idx"));
        const field = input.getAttribute("data-field");
        state.session.machineRecords[idx][field] = input.value.toUpperCase();
        const pos = input.selectionStart;
        input.value = state.session.machineRecords[idx][field];
        if (typeof pos === "number") input.setSelectionRange(pos, pos);
      });
    });

    viewRoot.querySelectorAll("[data-remove]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const indexToRemove = Number(btn.getAttribute("data-remove"));
        state.session.machineRecords = state.session.machineRecords.filter(function (_, idx) {
          return idx !== indexToRemove;
        });
        if (state.activeInput && state.activeInput.index >= state.session.machineRecords.length) {
          state.activeInput = { index: 0, field: "machineNo" };
        }
        render();
      });
    });

    const addMachine = document.getElementById("btn-add-machine");
    if (addMachine) {
      addMachine.addEventListener("click", function () {
        if (state.session.machineRecords.length < 4) {
          state.session.machineRecords.push({ machineNo: "", bagNo: "" });
          render();
        }
      });
    }

    viewRoot.querySelectorAll("[data-key]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        handleKeypadPress(btn.getAttribute("data-key"));
      });
    });
    const keyClear = document.getElementById("key-clear");
    if (keyClear) keyClear.addEventListener("click", handleKeypadClear);
    const keyBack = document.getElementById("key-back");
    if (keyBack) keyBack.addEventListener("click", handleKeypadBackspace);
    const nextField = document.getElementById("btn-next-field");
    if (nextField) nextField.addEventListener("click", handleNextField);
    const saveRecord = document.getElementById("btn-save-record");
    if (saveRecord) saveRecord.addEventListener("click", handleRecordSubmit);

    const clockOut = document.getElementById("btn-clock-out");
    if (clockOut) clockOut.addEventListener("click", handleClockOut);

    const adminPass = document.getElementById("admin-pass");
    if (adminPass) {
      adminPass.addEventListener("input", function (e) {
        state.adminPassword = e.target.value;
      });
      adminPass.addEventListener("keydown", function (e) {
        if (e.key === "Enter") handleAdminLoginSubmit();
      });
    }
    const adminLogin = document.getElementById("btn-admin-login");
    if (adminLogin) adminLogin.addEventListener("click", handleAdminLoginSubmit);

    viewRoot.querySelectorAll("[data-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.adminTab = btn.getAttribute("data-tab");
        render();
      });
    });
    const btnAi = document.getElementById("btn-ai");
    if (btnAi) btnAi.addEventListener("click", runAiAnalysis);
    const btnCopy = document.getElementById("btn-copy");
    if (btnCopy) btnCopy.addEventListener("click", copyToTSV);
    const btnExcel = document.getElementById("btn-excel");
    if (btnExcel) btnExcel.addEventListener("click", exportToExcel);

    const addQ = document.getElementById("btn-add-q");
    if (addQ) {
      addQ.addEventListener("click", function () {
        state.dbQuestions.push({
          id: Date.now().toString(),
          text: "新問題",
          options: ["選項A", "選項B", "選項C", "選項D"],
          correctIndex: 0
        });
        showToast("已新增一筆空白題目");
        render();
      });
    }
    viewRoot.querySelectorAll("[data-del-q]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const qIndex = Number(btn.getAttribute("data-del-q"));
        state.dbQuestions = state.dbQuestions.filter(function (_, idx) {
          return idx !== qIndex;
        });
        showToast("題目已刪除");
        render();
      });
    });
    viewRoot.querySelectorAll("[data-qtitle]").forEach(function (input) {
      input.addEventListener("input", function () {
        state.dbQuestions[Number(input.getAttribute("data-qtitle"))].text = input.value;
      });
    });
    viewRoot.querySelectorAll("[data-qopt]").forEach(function (input) {
      input.addEventListener("input", function () {
        const qIndex = Number(input.getAttribute("data-qopt"));
        const oIndex = Number(input.getAttribute("data-o"));
        state.dbQuestions[qIndex].options[oIndex] = input.value;
      });
    });
    viewRoot.querySelectorAll('input[type="radio"][data-q]').forEach(function (input) {
      input.addEventListener("change", function () {
        const qIndex = Number(input.getAttribute("data-q"));
        const oIndex = Number(input.getAttribute("data-o"));
        state.dbQuestions[qIndex].correctIndex = oIndex;
        render();
      });
    });
  }

  btnHome.addEventListener("click", function () {
    state.currentView = "login";
    render();
  });

  btnAdmin.addEventListener("click", function () {
    if (state.currentView === "admin" || state.currentView === "adminLogin") {
      state.currentView = "login";
    } else {
      state.currentView = state.isAdminAuth ? "admin" : "adminLogin";
    }
    render();
  });

  initFirebase();
  render();
})();

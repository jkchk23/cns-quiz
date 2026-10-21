// ───── 공용: 과목 전환 · 화면 색 · 마지막으로 연 과목
// 두 앱(cns/, micro/)이 같은 저장공간을 쓰므로 여기 값은 서로 공유된다.
const HUB_KEY = "study-hub-v1";
const SUBJECTS = [
  { id: "cns", path: "cns", label: "CNS 약리", sub: "객관식" },
  { id: "micro", path: "micro", label: "미생물", sub: "서술형" }
];
const hub = (() => {
  let h = null;
  try { h = JSON.parse(localStorage.getItem(HUB_KEY)); } catch (e) {}
  return h || {};
})();
function hubSave() { try { localStorage.setItem(HUB_KEY, JSON.stringify(hub)); } catch (e) {} }

// 예전 앱별 화면 색 설정을 한 번만 옮겨 온다
if (!hub.theme) {
  for (const k of ["cns-quiz-v1", "micro-essay-v1"]) {
    try { const t = JSON.parse(localStorage.getItem(k)).set.theme; if (t) { hub.theme = t; break; } } catch (e) {}
  }
  hub.theme = hub.theme || "auto";
}
hub.last = CURRENT_SUBJECT;
hubSave();

function getTheme() { return hub.theme || "auto"; }
function setTheme(t) { hub.theme = t; hubSave(); }

function subjectSwitcher() {
  return `<nav class="subj" aria-label="과목 전환">${SUBJECTS.map(s =>
    s.id === CURRENT_SUBJECT
      ? `<span class="sbtn on" aria-current="page"><b>${s.label}</b><small>${s.sub}</small></span>`
      : `<a class="sbtn" href="../${s.path}/"><b>${s.label}</b><small>${s.sub}</small></a>`
  ).join("")}</nav>`;
}

function registerSW() {
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("../sw.js", { scope: "../", updateViaCache: "none" }).catch(() => {});
  }
}

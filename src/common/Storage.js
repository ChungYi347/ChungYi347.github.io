// localStorage 는 사생활 보호 모드나 사이트 데이터 차단 시 접근만으로도 예외를 던진다.
// 저장이 안 되더라도 페이지는 정상 동작해야 하므로 모든 접근을 감싼다.
export const Storage = {
  get(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? null : JSON.parse(raw);
    } catch (e) {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* 저장 실패는 조용히 무시 — 이번 세션 동안만 설정이 유지된다 */
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      /* noop */
    }
  },
};

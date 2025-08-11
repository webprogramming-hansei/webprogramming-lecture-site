// 모든 페이지 공통 초기화(네비게이션 로드 등)
import { loadNavbar } from './navbar.js';
import { smoothScrollInit } from './utils.js';

function initCommon() {
  loadNavbar();
  smoothScrollInit(70);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCommon);
} else {
  initCommon();
}

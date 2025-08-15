// 프롬프트 페이지 전용 스크립트
import { loadNavbar } from './navbar.js';
import { smoothScrollInit } from './utils.js';

function initPromptsPage() {
  // 공통 네비게이션 로드 (main.js도 하지만 직접 접근 대비)
  loadNavbar();
  smoothScrollInit(70);
  setupCopyButtons();
}

function setupCopyButtons() {
  const buttons = document.querySelectorAll('[data-copy]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('[data-prompt]');
      if (!parent) return;
      const code = parent.querySelector('pre')?.innerText || '';
      navigator.clipboard.writeText(code.trim()).then(() => {
        btn.classList.add('copied');
        const original = btn.innerText;
        btn.innerText = '복사됨';
        setTimeout(() => { btn.classList.remove('copied'); btn.innerText = original; }, 1800);
      }).catch(() => {
        btn.innerText = '실패';
        setTimeout(() => { btn.innerText = '복사'; }, 1500);
      });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPromptsPage);
} else {
  initPromptsPage();
}

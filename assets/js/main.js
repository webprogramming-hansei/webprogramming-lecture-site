// 모든 페이지 공통 초기화(네비게이션 로드 등)
import { loadNavbar } from './navbar.js';
import { loadFooter } from './footer.js';
import { smoothScrollInit } from './utils.js';

function initCommon() {
  loadNavbar();
  loadFooter();
  smoothScrollInit(70);
  // Prism 하이라이트 로드 (없을 경우만)
  if (typeof Prism === 'undefined') {
    const core = document.createElement('script');
    core.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/prism.min.js';
    core.defer = true;
    core.onload = () => {
      const md = document.createElement('script');
      md.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/components/prism-markdown.min.js';
      md.defer = true;
      md.onload = () => { if (window.Prism) window.Prism.highlightAll(); };
      document.head.appendChild(md);
    };
    document.head.appendChild(core);
  } else {
    window.Prism.highlightAll();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCommon);
} else {
  initCommon();
}

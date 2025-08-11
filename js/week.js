// 주차(week) 페이지 전용 초기화
import { debounce, highlightCurrentSection } from './utils.js';

function initWeekPage() {
  const debouncedHighlight = debounce(highlightCurrentSection, 100);
  window.addEventListener('scroll', debouncedHighlight);
  highlightCurrentSection();
  // 초기 페이드인(선택적)
  setTimeout(() => { document.body.style.opacity = '1'; }, 100);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWeekPage);
} else {
  initWeekPage();
}

// Footer 로더
export async function loadFooter() {
  try {
    const path = getFooterPath();
    const res = await fetch(path);
    const html = await res.text();
    const pageType = getPageType();
    const temp = document.createElement('div');
    temp.innerHTML = html.trim();
    const footerEl = temp.querySelector('footer');
    if (footerEl) {
      if (!footerEl.classList.contains('gradient-footer')) footerEl.classList.add('gradient-footer');
      // Adjust relative links if week page
      if (pageType === 'week') {
        footerEl.querySelectorAll('a[href]').forEach(a => {
          const href = a.getAttribute('href');
          if (!href) return;
            if (href.startsWith('index.html')) a.setAttribute('href', '../' + href);
            if (href.startsWith('prompts.html')) a.setAttribute('href', '../' + href);
            if (href.startsWith('assets/')) a.setAttribute('href', '../' + href);
        });
      }
      const existing = document.querySelector('footer');
      if (existing) existing.replaceWith(footerEl); else document.body.appendChild(footerEl);
    }
  } catch (e) {
    console.error('Footer 로드 실패:', e);
  }
}

function getFooterPath() {
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf('/') + 1);
  // week 페이지면 상위 경로 필요
  if (filename.startsWith('week') && filename.endsWith('.html')) return '../partials/footer.html';
  return './partials/footer.html';
}

function getPageType() {
  const path = window.location.pathname;
  const file = path.substring(path.lastIndexOf('/') + 1);
  if (file.startsWith('week') && file.endsWith('.html')) return 'week';
  if (file === 'index.html' || file === '') return 'index';
  return 'other';
}

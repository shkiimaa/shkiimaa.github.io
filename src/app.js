const printButton = document.querySelector('[data-print]');
printButton?.addEventListener('click', () => window.print());

const sectionLinks = [...document.querySelectorAll('.section-nav a')];
const sections = sectionLinks.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
if (sectionLinks.length) sectionLinks[0].setAttribute('aria-current', 'location');
if ('IntersectionObserver' in window && sections.length) {
  const observed = new Set();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) entry.isIntersecting ? observed.add(entry.target) : observed.delete(entry.target);
    const first = sections.find(section => observed.has(section));
    if (!first) return;
    for (const link of sectionLinks) {
      if (link.hash === `#${first.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }, { rootMargin: '-110px 0px -45% 0px' });
  sections.forEach(section => observer.observe(section));
}

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const projectRows = [...document.querySelectorAll('[data-category]')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let count = 0;
  projectRows.forEach(row => {
    row.hidden = selected !== 'all' && row.dataset.category !== selected;
    if (!row.hidden) count++;
  });
  document.querySelector('.project-count').textContent = `${count}개 프로젝트`;
}));

const dialog = document.querySelector('.image-dialog');
if (dialog) {
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('p');
  document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
    image.src = button.dataset.image;
    image.alt = button.dataset.caption;
    caption.textContent = button.dataset.caption;
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { document.documentElement.style.overflow = ''; });
}

const printButton = document.querySelector('[data-print]');
printButton?.addEventListener('click', () => window.print());

const sectionLinks = [...document.querySelectorAll('.section-nav a')];
const sections = sectionLinks.map(link => document.getElementById(link.hash.slice(1))).filter(Boolean);
if (sections.length) {
  let requested = sections.find(section => `#${section.id}` === location.hash);
  let sectionObserver;
  const select = section => {
    for (const link of sectionLinks) {
      if (link.hash === `#${section.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };
  const activationLine = () => document.querySelector('.site-header').getBoundingClientRect().bottom + 40;
  const sync = () => {
    if (requested) {
      select(requested);
      return;
    }
    // Short final sections cannot always reach the activation line.
    const atBottom = scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 2;
    const current = atBottom ? sections.at(-1) : sections.filter(section => section.getBoundingClientRect().top <= activationLine()).at(-1);
    select(current || sections[0]);
  };
  const request = section => {
    requested = section;
    select(section);
  };
  const release = () => { requested = null; };
  sectionLinks.forEach(link => link.addEventListener('click', () => request(document.getElementById(link.hash.slice(1)))));
  window.addEventListener('hashchange', () => {
    const target = sections.find(section => `#${section.id}` === location.hash);
    if (target) request(target);
  });
  window.addEventListener('wheel', release, { passive: true });
  window.addEventListener('touchstart', release, { passive: true });
  document.addEventListener('pointerdown', event => {
    if (!event.target.closest('.section-nav')) release();
  });
  window.addEventListener('keydown', event => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) release();
  });
  document.addEventListener('scrollend', sync);
  const observeSections = () => {
    sectionObserver?.disconnect();
    const line = Math.min(activationLine(), innerHeight - 1);
    sectionObserver = new IntersectionObserver(sync, { rootMargin: `-${line}px 0px -${innerHeight - line - 1}px 0px` });
    sections.forEach(section => sectionObserver.observe(section));
    sync();
  };
  if ('IntersectionObserver' in window) {
    observeSections();
    const footerObserver = new IntersectionObserver(sync, { threshold: [0, 1] });
    footerObserver.observe(document.querySelector('.site-footer'));
    window.addEventListener('resize', observeSections);
  }
  if (requested) request(requested);
  else sync();
  document.fonts.ready.then(sync);
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

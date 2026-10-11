(() => {
  'use strict';

  const pageContent = document.querySelector('.page-content');
  const sectionOrder = ['home', 'approach', 'experience', 'education', 'certifications', 'adventures', 'travel', 'about', 'portfolio', 'volunteering', 'awards', 'contact'];
  sectionOrder.forEach(id => pageContent.append(document.getElementById(id)));

  const menuButton = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('#header-nav');
  const links = [...document.querySelectorAll('#one-page-menu .nav-link')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  const desktop = window.matchMedia('(min-width: 992px)');

  function setMenu(open, restoreFocus = false) {
    document.body.classList.toggle('nav-active', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (open) links[0].focus();
    if (restoreFocus) menuButton.focus();
  }

  menuButton.addEventListener('click', () => {
    setMenu(!document.body.classList.contains('nav-active'));
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      if (!desktop.matches) {
        setMenu(false);
        const destination = document.querySelector(link.getAttribute('href'));
        destination.setAttribute('tabindex', '-1');
        destination.focus({ preventScroll: true });
      }
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.body.classList.contains('nav-active')) {
      setMenu(false, true);
    }
  });

  document.addEventListener('click', event => {
    if (document.body.classList.contains('nav-active') &&
        !sidebar.contains(event.target) && !menuButton.contains(event.target)) {
      setMenu(false);
    }
  });

  desktop.addEventListener('change', () => setMenu(false));

  function updateActiveSection() {
    const threshold = window.scrollY + Math.min(180, window.innerHeight * 0.25);
    let active = sections[0];
    sections.forEach(section => {
      if (section.offsetTop <= threshold) active = section;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
      active = sections[sections.length - 1];
    }
    links.forEach(link => {
      const selected = link.getAttribute('href') === '#' + active.id;
      link.classList.toggle('active', selected);
      if (selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(() => {
        updateActiveSection();
        scheduled = false;
      });
    }
  }, { passive: true });
  window.addEventListener('resize', updateActiveSection);
  window.addEventListener('load', updateActiveSection);
  document.addEventListener('toggle', updateActiveSection, true);
  updateActiveSection();
})();

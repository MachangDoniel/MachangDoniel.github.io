/**
 * Main Interactive Script for Doniel Tripura's Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initCVDropdown();
  initProjectFilters();
  initCopyEmail();
  initScrollSpy();
  initBackToTop();
  lucide.createIcons();
});

/* ----------------------------------------------------
 * Theme Management (Dark / Light Mode)
 * ---------------------------------------------------- */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcons();

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcons();
    });
  });
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const sunIcons = document.querySelectorAll('.theme-icon-sun');
  const moonIcons = document.querySelectorAll('.theme-icon-moon');

  sunIcons.forEach(icon => {
    if (isDark) {
      icon.classList.remove('hidden');
    } else {
      icon.classList.add('hidden');
    }
  });

  moonIcons.forEach(icon => {
    if (isDark) {
      icon.classList.add('hidden');
    } else {
      icon.classList.remove('hidden');
    }
  });
}

/* ----------------------------------------------------
 * Mobile Navigation Menu Drawer
 * ---------------------------------------------------- */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const closeBtn = document.getElementById('close-mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileToggle || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    if (mobileOverlay) {
      mobileOverlay.classList.remove('hidden');
      setTimeout(() => mobileOverlay.classList.remove('opacity-0'), 10);
    }
    document.body.classList.add('overflow-hidden');
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    if (mobileOverlay) {
      mobileOverlay.classList.add('opacity-0');
      setTimeout(() => mobileOverlay.classList.add('hidden'), 300);
    }
    document.body.classList.remove('overflow-hidden');
  }

  mobileToggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ----------------------------------------------------
 * CV Download Dropdown
 * ---------------------------------------------------- */
function initCVDropdown() {
  const dropdownButtons = document.querySelectorAll('.cv-dropdown-btn');

  dropdownButtons.forEach(btn => {
    const menu = btn.nextElementSibling;
    if (!menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = menu.classList.contains('hidden');
      // Close other open dropdowns first
      document.querySelectorAll('.cv-dropdown-menu').forEach(m => m.classList.add('hidden'));
      if (isHidden) {
        menu.classList.remove('hidden');
      } else {
        menu.classList.add('hidden');
      }
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.cv-dropdown-menu').forEach(m => m.classList.add('hidden'));
  });
}

/* ----------------------------------------------------
 * Project Category Filter
 * ---------------------------------------------------- */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ----------------------------------------------------
 * Copy Email to Clipboard & Toast
 * ---------------------------------------------------- */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast');
  const emailToCopy = 'donieltripura121@gmail.com';

  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailToCopy);
        showToast('Email copied to clipboard!');
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = emailToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Email copied to clipboard!');
      }
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast) return;

  if (toastMsg) toastMsg.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 350);
  }, 2800);
}

/* ----------------------------------------------------
 * Active ScrollSpy for Header Links
 * ---------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-blue-600', 'dark:text-blue-400', 'font-semibold');
            link.classList.remove('text-slate-600', 'dark:text-slate-300');
          } else {
            link.classList.remove('text-blue-600', 'dark:text-blue-400', 'font-semibold');
            link.classList.add('text-slate-600', 'dark:text-slate-300');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
}

/* ----------------------------------------------------
 * Back to Top Button
 * ---------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
      backToTopBtn.classList.add('opacity-100');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

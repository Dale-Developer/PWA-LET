/**
 * student-layout.js
 * Complete sidebar and topbar functionality in one file
 */

(function () {
  "use strict";

  // ======================================
  // HTML TEMPLATES (embedded in JS)
  // ======================================

  const SIDEBAR_HTML = `
<div class="sidebar" id="mainSidebar">

  <!-- Collapse button -->
  <button class="collapse-toggle-btn" id="collapseBtn" title="Collapse Sidebar (Ctrl+B)">
    <i class="fa-solid fa-angles-left" id="collapseIcon"></i>
  </button>

  <!-- Logo -->
  <div class="logo">
    <div class="logo-circle">
      <i class="fa-solid fa-book-open-reader"></i>
    </div>
    <h1>LearnIQ</h1>
  </div>

  <!-- Menu -->
  <nav class="menu">
    <a href="../student/studentDashboard.html" class="menu-item" data-page="studentDashboard">
      <i class="fa-solid fa-table-cells-large"></i>
      <span>Dashboard</span>
    </a>
    <a href="../student/studentModules.html" class="menu-item" data-page="studentModules">
      <i class="fa-regular fa-window-restore"></i>
      <span>Modules</span>
    </a>
    <a href="../student/studentQuiz.html" class="menu-item" data-page="studentQuiz">
      <i class="fa-regular fa-file-lines"></i>
      <span>Quiz Mode</span>
    </a>
   <!-- <a href="../student/studentPractice.html" class="menu-item" data-page="studentPractice">
      <i class="fa-solid fa-brain"></i>
      <span>Practice</span>
    </a> -->
    <a href="../student/studentHistory.html" class="menu-item" data-page="studentHistory">
      <i class="fa-solid fa-clock-rotate-left"></i>
      <span>History</span>
    </a>
   <!-- <a href="../student/studentLeaderboard.html" class="menu-item" data-page="studentLeaderboard">
      <i class="fa-solid fa-ranking-star"></i>
      <span>Leaderboard</span>
    </a> -->
    <a href="../student/studentSettings.html" class="menu-item" data-page="studentSettings">
      <i class="fa-solid fa-gear"></i>
      <span>Settings</span>
    </a>
  </nav>

  <!-- Support Card -->
  <div class="support-card">
    <h3>Support 24/7</h3>
    <p>Contact us anytime</p>
    <button class="support-btn">Start</button>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
  </div>

  <!-- Logout -->
  <div class="logout" id="logoutBtn">
    <i class="fa-solid fa-right-from-bracket"></i>
    <span>Log Out</span>
  </div>

</div>`;

  const TOPBAR_HTML = `
<div class="topbar">

  <div class="search-box">
    <i class="fa-solid fa-magnifying-glass"></i>
    <input type="text" placeholder="Search modules, quizzes...">
  </div>

  <div class="top-right">
    <div class="bell">
      <i class="fa-regular fa-bell"></i>
    </div>
    <div class="profile">
      <img src="https://i.pravatar.cc/150?img=12" alt="Alexander Montefalco">
      <span>Alexander M.</span>
    </div>
  </div>

</div>`;

  // ======================================
  // INJECT HTML INTO CONTAINERS
  // ======================================

  function injectTemplates() {
    const sidebarContainer = document.getElementById("sidebar-container");
    const topbarContainer = document.getElementById("topbar-container");

    if (sidebarContainer && !sidebarContainer.querySelector("#mainSidebar")) {
      sidebarContainer.innerHTML = SIDEBAR_HTML;
    }

    if (topbarContainer && !topbarContainer.querySelector(".topbar")) {
      topbarContainer.innerHTML = TOPBAR_HTML;
    }
  }

  // ======================================
  // ACTIVE MENU HIGHLIGHT
  // ======================================

  function setActiveMenu() {
    let currentPage = window.location.pathname.split("/").pop().toLowerCase();
    
    // Handle edge cases
    if (!currentPage || currentPage === "" || currentPage === "student/") {
      currentPage = "studentdashboard.html";
    }

    const menuItems = document.querySelectorAll("#mainSidebar .menu-item");
    let activeFound = false;

    menuItems.forEach(item => {
      item.classList.remove("active");
      const href = item.getAttribute("href") || "";
      const hrefPage = href.split("/").pop().toLowerCase();

      if (hrefPage === currentPage) {
        item.classList.add("active");
        activeFound = true;
      }
    });

    // Dashboard fallback
    if (!activeFound && (currentPage === "studentdashboard.html" || currentPage === "")) {
      const dashboardItem = document.querySelector('#mainSidebar .menu-item[href*="studentDashboard"]');
      if (dashboardItem) dashboardItem.classList.add("active");
    }
  }

  // ======================================
  // SIDEBAR COLLAPSE (Desktop)
  // ======================================

  const COLLAPSED_KEY = "sidebar_collapsed";

  function initSidebarCollapse() {
    const sidebar = document.getElementById("mainSidebar");
    const collapseBtn = document.getElementById("collapseBtn");
    const collapseIcon = document.getElementById("collapseIcon");

    if (!sidebar || !collapseBtn) return;

    // Restore saved collapse state
    const savedState = localStorage.getItem(COLLAPSED_KEY);
    if (savedState === "true" && window.innerWidth > 1024) {
      sidebar.classList.add("collapsed");
      if (collapseIcon) {
        collapseIcon.classList.remove("fa-angles-left");
        collapseIcon.classList.add("fa-angles-right");
      }
    }

    // Collapse button click handler
    collapseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.innerWidth > 1024) {
        sidebar.classList.toggle("collapsed");
        const isCollapsed = sidebar.classList.contains("collapsed");
        localStorage.setItem(COLLAPSED_KEY, isCollapsed);

        if (collapseIcon) {
          if (isCollapsed) {
            collapseIcon.classList.remove("fa-angles-left");
            collapseIcon.classList.add("fa-angles-right");
          } else {
            collapseIcon.classList.remove("fa-angles-right");
            collapseIcon.classList.add("fa-angles-left");
          }
        }
      }
    });

    // Keyboard shortcut: Ctrl+B
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        if (window.innerWidth > 1024) {
          collapseBtn.click();
        }
      }
    });
  }

  // ======================================
  // MOBILE MENU (Hamburger)
  // ======================================

  function initMobileMenu() {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const sidebar = document.getElementById("mainSidebar");
    
    if (!hamburgerBtn || !sidebar) return;

    // Create overlay if it doesn't exist
    let overlay = document.getElementById("sidebarOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "sidebarOverlay";
      overlay.className = "sidebar-overlay";
      document.body.appendChild(overlay);
    }

    function openSidebar() {
      sidebar.classList.add("mobile-open");
      overlay.classList.add("active");
      hamburgerBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
      document.body.style.overflow = "hidden";
    }

    function closeSidebar() {
      sidebar.classList.remove("mobile-open");
      overlay.classList.remove("active");
      hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      document.body.style.overflow = "";
    }

    // Hamburger click
    hamburgerBtn.addEventListener("click", () => {
      if (sidebar.classList.contains("mobile-open")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    // Overlay click
    overlay.addEventListener("click", closeSidebar);

    // Close sidebar on menu item click (mobile only)
    document.querySelectorAll("#mainSidebar .menu-item, #mainSidebar .logout").forEach(el => {
      el.addEventListener("click", () => {
        if (window.innerWidth <= 1024) {
          closeSidebar();
        }
      });
    });

    // Close sidebar on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024 && sidebar.classList.contains("mobile-open")) {
        closeSidebar();
      }
    });
  }

  // ======================================
  // LOGOUT FUNCTIONALITY
  // ======================================

  function initLogout() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      // Remove existing listeners to prevent duplicates
      const newLogoutBtn = logoutBtn.cloneNode(true);
      logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
      
      newLogoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to log out?")) {
          window.location.href = "../index.html";
        }
      });
    }
  }

  // ======================================
  // PAGE TRANSITION HELPER
  // ======================================

  window.navigateWithTransition = function(url) {
    if (!url) return;
    document.body.classList.add("page-loading");
    setTimeout(() => {
      window.location.href = url;
    }, 150);
  };

  // ======================================
  // INITIALIZE EVERYTHING
  // ======================================

  function init() {
    // Inject HTML templates
    injectTemplates();
    
    // Initialize all functionality
    setActiveMenu();
    initSidebarCollapse();
    initMobileMenu();
    initLogout();
    
    // Remove loading class
    document.body.classList.remove("page-loading");
  }

  // Handle page load / DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    // DOM is already ready
    init();
  }

  // Handle back/forward navigation (bfcache)
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      // Re-initialize when page is restored from cache
      setTimeout(init, 10);
    }
  });

})();
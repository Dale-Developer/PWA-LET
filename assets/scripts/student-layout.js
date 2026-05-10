// ======================================
// LOAD SIDEBAR
// ======================================
fetch("../student/studentSidebar.html")
  .then(response => response.text())
  .then(data => {

    document.getElementById(
      "sidebar-container"
    ).innerHTML = data;

    initializeSidebar();

    setActiveMenu();

  });


// ======================================
// LOAD TOPBAR
// ======================================
fetch("../student/studentTopbar.html")
  .then(response => response.text())
  .then(data => {

    document.getElementById(
      "topbar-container"
    ).innerHTML = data;

  });


// ======================================
// ACTIVE MENU
// ======================================
function setActiveMenu() {

  const currentPage =
    window.location.pathname
      .split("/")
      .pop();

  document
    .querySelectorAll(".menu-item")
    .forEach(item => {

      const href =
        item.getAttribute("href");

      if (href === currentPage) {
        item.classList.add("active");
      }

    });

}


// ======================================
// SIDEBAR FUNCTIONALITY
// ======================================
function initializeSidebar() {

  const sidebar =
    document.getElementById("mainSidebar");

  const hamburger =
    document.getElementById("hamburgerBtn");

  const overlay =
    document.getElementById("sidebarOverlay");

  const collapseBtn =
    document.getElementById("collapseBtn");

  const collapseIcon =
    document.getElementById("collapseIcon");

  let mobileOpen = false;
  let collapsed = false;


  // OPEN SIDEBAR
  function openSidebar() {

    mobileOpen = true;

    sidebar.classList.add(
      "mobile-open"
    );

    overlay.classList.add(
      "active"
    );

    hamburger.innerHTML =
      '<i class="fa-solid fa-times"></i>';

    document.body.style.overflow =
      "hidden";
  }


  // CLOSE SIDEBAR
  function closeSidebar() {

    mobileOpen = false;

    sidebar.classList.remove(
      "mobile-open"
    );

    overlay.classList.remove(
      "active"
    );

    hamburger.innerHTML =
      '<i class="fa-solid fa-bars"></i>';

    document.body.style.overflow =
      "";
  }


  hamburger.addEventListener(
    "click",
    () => {

      mobileOpen
        ? closeSidebar()
        : openSidebar();

    }
  );


  overlay.addEventListener(
    "click",
    closeSidebar
  );


  // CLOSE MOBILE WHEN CLICK MENU
  sidebar
    .querySelectorAll(
      ".menu-item, .logout"
    )
    .forEach(el => {

      el.addEventListener(
        "click",
        () => {

          if (
            window.innerWidth <= 1024
          ) {
            closeSidebar();
          }

        }
      );

    });


  // DESKTOP COLLAPSE
  function setCollapsed(state) {

    collapsed = state;

    if (collapsed) {

      sidebar.classList.add(
        "collapsed"
      );

      document.body.classList.add(
        "sidebar-collapsed"
      );

      collapseIcon.className =
        "fa-solid fa-angles-right";

    } else {

      sidebar.classList.remove(
        "collapsed"
      );

      document.body.classList.remove(
        "sidebar-collapsed"
      );

      collapseIcon.className =
        "fa-solid fa-angles-left";
    }
  }


  collapseBtn.addEventListener(
    "click",
    (e) => {

      e.stopPropagation();

      if (
        window.innerWidth > 1024
      ) {
        setCollapsed(!collapsed);
      }

    }
  );


  // CTRL + B
  document.addEventListener(
    "keydown",
    (e) => {

      if (
        e.ctrlKey &&
        e.key === "b"
      ) {

        e.preventDefault();

        if (
          window.innerWidth > 1024
        ) {
          setCollapsed(!collapsed);
        }

      }

    }
  );


  // FIX RESIZE
  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 1024 &&
        mobileOpen
      ) {
        closeSidebar();
      }

    }
  );

}
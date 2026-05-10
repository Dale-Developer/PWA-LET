// sidebar-active.js - Set active sidebar item based on current page
(function() {
  function setActiveSidebarItem() {
    const sidebar = document.querySelector('#sidebar-container');
    if (!sidebar) return;
    
    const currentPage = window.location.pathname.split('/').pop().toLowerCase();
    const menuItems = sidebar.querySelectorAll('.menu-item');
    
    const pageMappings = {
      'dashboard': 'dashboard',
      'studentdashboard': 'dashboard',
      'student-dashboard': 'dashboard',
      'modules': 'modules',
      'studentmodules': 'modules',
      'student-modules': 'modules',
      'quiz': 'quiz mode',
      'studentquiz': 'quiz mode',
      'student-quiz': 'quiz mode',
      'history': 'history',
      'studenthistory': 'history',
      'student-history': 'history'
    };
    
    let expectedText = '';
    for (const [page, text] of Object.entries(pageMappings)) {
      if (currentPage.includes(page)) {
        expectedText = text;
        break;
      }
    }
    
    menuItems.forEach(item => {
      item.classList.remove('active');
      const itemText = item.textContent.toLowerCase();
      if (expectedText && itemText.includes(expectedText)) {
        item.classList.add('active');
      }
    });
    
    // Fallback: if no match, check by href
    if (!expectedText) {
      menuItems.forEach(item => {
        const onclickAttr = item.getAttribute('onclick') || '';
        if (onclickAttr && currentPage.includes(onclickAttr.split("'")[1]?.split('/').pop() || '')) {
          item.classList.add('active');
        }
      });
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setActiveSidebarItem);
  } else {
    setActiveSidebarItem();
  }
})();
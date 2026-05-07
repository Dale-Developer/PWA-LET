async function loadComponent(id, file) {
  const res = await fetch(file);
  document.getElementById(id).innerHTML = await res.text();
}

window.addEventListener("DOMContentLoaded", async () => {

  await loadComponent("sidebar", "../components/sidebar.html");
  await loadComponent("header", "../components/header.html");

  // Sidebar dropdown (event delegation)
  document.addEventListener("click", (e) => {

    // dropdown toggle
    const btn = e.target.closest(".dropdown-btn");
    if (btn) {
      btn.nextElementSibling.classList.toggle("show");
    }

    // mobile sidebar toggle
    if (e.target.closest("#menuToggle")) {
      document.querySelector(".sidebar").classList.toggle("show-sidebar");
    }

  });

});
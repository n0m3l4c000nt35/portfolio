function setYearCopyright() {
  const currentYear = new Date().getFullYear();
  const copyrightYearHTML = document.querySelector("#copy-year");
  copyrightYearHTML.textContent = `${currentYear}`;
}

function updateTitleOnScroll() {
  const sections = document.querySelectorAll('.body__section');
  let hasScrolled = false;

  window.addEventListener("scroll", () => {
    hasScrolled = true;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && hasScrolled) {
        const sectionTitle = entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1);
        document.title = `Portfolio - ${sectionTitle.replaceAll("-", " ")}`;
        history.pushState(null, "", `#${entry.target.id}`);
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(section => observer.observe(section));
}

updateTitleOnScroll();
setYearCopyright();
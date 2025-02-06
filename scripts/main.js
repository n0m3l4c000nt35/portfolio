function setYearCopyright() {
  const currentYear = new Date().getFullYear();
  const copyrightYearHTML = document.querySelector("#copy-year");
  copyrightYearHTML.textContent = `${currentYear}`;
}

setYearCopyright();
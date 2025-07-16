async function loadSkillHead(skill) {
  try {
    const skillData = await import(`./skills/${skill}.js`).then(m => m.default);

    const scripts = Array.from(document.head.querySelectorAll('script'));
    const links = Array.from(document.head.querySelectorAll('link'));
    document.head.innerHTML = '';
    scripts.forEach(s => document.head.appendChild(s));
    links.forEach(l => document.head.appendChild(l));

    const title = document.createElement("title");
    title.textContent += "Blog # " + skillData.title;
    document.head.appendChild(title);

    skillData.meta?.forEach(metaObj => {
      const meta = document.createElement("meta");
      Object.entries(metaObj).forEach(([k, v]) => meta.setAttribute(k, v));
      document.head.appendChild(meta);
    });

    skillData.og?.forEach(ogObj => {
      const meta = document.createElement("meta");
      Object.entries(ogObj).forEach(([k, v]) => meta.setAttribute(k, v));
      document.head.appendChild(meta);
    });

    skillData.links?.forEach(linkObj => {
      const link = document.createElement("link");
      Object.entries(linkObj).forEach(([k, v]) => link.setAttribute(k, v));
      document.head.appendChild(link);
    });

    if (skillData.pageTitle) {
      const skillTitle = document.getElementById('skill-title');
      if (skillTitle) skillTitle.textContent = skillData.pageTitle;
    }
  } catch (e) {
    console.error("Skill no encontrado:", skill, e);
  }
}

const params = new URLSearchParams(window.location.search);
const skill = params.get("skill") || "html";
loadSkillHead(skill);
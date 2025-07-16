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

class InfiniteCarousel {
  constructor(container) {
    this.container = container;
    this.track = container.querySelector('.carousel-track');
    this.slides = [...container.querySelectorAll('.carousel-slide')];
    this.prevButton = container.querySelector('.prev');
    this.nextButton = container.querySelector('.next');
    this.isDragging = false;
    this.startPos = 0;
    this.currentTranslate = 0;
    this.dragStartX = 0;
    this.dragDistance = 0;
    this.isScrolling = false;
    this.scrollTimeout = null;
    this.isTransitioning = false;
    this.slideWidth = this.container.offsetWidth;

    this.modal = document.querySelector('.image-modal');
    this.modalImage = this.modal.querySelector('.modal-image');

    this.setupProgressDots();
    this.setupClones();
    this.currentIndex = 1;
    this.setupEventListeners();
    this.setupModalListeners();

    requestAnimationFrame(() => {
      this.updatePosition(false);
    });
  }

  setupProgressDots() {
    const progressContainer = this.container.querySelector('.carousel-progress');
    progressContainer.innerHTML = '';

    const realSlideCount = this.slides.length;

    for (let i = 0; i < realSlideCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('progress-dot');
      dot.addEventListener('click', () => {
        this.goToSlide(i + 1);
      });
      progressContainer.appendChild(dot);
    }

    this.progressDots = Array.from(progressContainer.children);
  }

  setupEventListeners() {
    this.prevButton.addEventListener('click', () => this.prev());
    this.nextButton.addEventListener('click', () => this.next());
    this.track.addEventListener('transitionend', () => this.handleTransitionEnd());

    this.track.addEventListener('mousedown', e => this.dragStart(e));
    window.addEventListener('mousemove', e => this.drag(e));
    window.addEventListener('mouseup', () => this.dragEnd());

    this.track.addEventListener('touchstart', e => this.dragStart(e));
    window.addEventListener('touchmove', e => this.drag(e));
    window.addEventListener('touchend', () => this.dragEnd());

    this.container.addEventListener('wheel', e => {
      e.preventDefault();
      if (this.isTransitioning || this.isScrolling) return;

      if (e.deltaY > 0) {
        this.next();
      } else {
        this.prev();
      }

      this.isScrolling = true;
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        this.isScrolling = false;
      }, 200);
    }, { passive: false });

    window.addEventListener('resize', () => {
      this.slideWidth = this.container.offsetWidth;
      this.updatePosition(false);
    });
  }

  setupModalListeners() {
    this.slides.forEach(slide => {
      slide.addEventListener('click', (e) => {
        if (!this.isDragging && Math.abs(this.dragDistance || 0) < 5) {
          const img = slide.querySelector('img');
          this.modalImage.src = img.src;
          this.modalImage.alt = img.alt;
          this.modal.style.display = 'block';
          document.body.style.overflow = 'hidden';
        }
      });
    });

    this.modal.querySelector('.modal-content').addEventListener('click', (e) => {
      if (e.target === this.modal.querySelector('.modal-content')) {
        this.closeModal();
      }
    });

    this.modal.querySelector('.modal-close').addEventListener('click', () => {
      this.closeModal();
    });
  }

  closeModal() {
    this.modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  setupClones() {
    const firstClone = this.slides[0].cloneNode(true);
    const lastClone = this.slides[this.slides.length - 1].cloneNode(true);

    this.track.appendChild(firstClone);
    this.track.insertBefore(lastClone, this.slides[0]);
    this.slides = [...this.container.querySelectorAll('.carousel-slide')];
  }

  updateProgress() {
    if (!this.progressDots) return;

    const realIndex = this.currentIndex - 1;
    const totalDots = this.progressDots.length;

    this.progressDots.forEach((dot, index) => {
      let isActive = false;
      if (this.currentIndex === 0) {
        isActive = index === totalDots - 1;
      } else if (this.currentIndex === this.slides.length - 1) {
        isActive = index === 0;
      } else {
        isActive = index === realIndex;
      }
      dot.classList.toggle('active', isActive);
    });
  }

  dragStart(e) {
    if (this.isTransitioning) return;
    this.isDragging = true;
    this.track.classList.add('dragging');
    this.startPos = this.getPositionX(e);
    this.dragStartX = this.startPos;
    this.currentTranslate = -this.currentIndex * 100;
    this.dragDistance = 0;
  }

  drag(e) {
    if (!this.isDragging) return;

    const currentPosition = this.getPositionX(e);
    this.dragDistance = currentPosition - this.dragStartX;

    const dragPercentage = (this.dragDistance / this.slideWidth) * 100;

    const translate = this.currentTranslate + dragPercentage;
    this.track.style.transform = `translateX(${translate}%)`;
  }

  dragEnd() {
    if (!this.isDragging) return;

    const wasDragged = Math.abs(this.dragDistance) > 5;
    this.isDragging = false;
    this.track.classList.remove('dragging');

    if (!wasDragged) return;

    const threshold = this.slideWidth * 0.2;
    if (Math.abs(this.dragDistance) > threshold) {
      if (this.dragDistance > 0) {
        this.prev();
      } else {
        this.next();
      }
    } else {
      this.updatePosition();
    }
  }

  getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }

  updatePosition(animate = true) {
    this.track.style.transition = animate ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
    this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;

    this.slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === this.currentIndex);
    });

    this.updateProgress();
  }

  handleTransitionEnd() {
    if (this.currentIndex === 0 || this.currentIndex === this.slides.length - 1) {
      this.track.style.transition = 'none';
      if (this.currentIndex === 0) {
        this.currentIndex = this.slides.length - 2;
      } else {
        this.currentIndex = 1;
      }
      this.updatePosition(false);
      this.track.offsetHeight;
      this.track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    this.isTransitioning = false;
  }

  goToSlide(index) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex = index;
    this.updatePosition();
  }

  prev() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex--;
    this.updatePosition();
  }

  next() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex++;
    this.updatePosition();
  }
}

class FormValidator {
  constructor(formId, validationTexts) {
    this.form = document.getElementById(formId);
    this.submitButton = this.form.querySelector('button[type="submit"]');
    this.errorTimeouts = {};
    this.validStates = {};
    this.setValidationTexts(validationTexts);

    this.validations = {
      name: {
        required: 'Por favor, ingresa tu nombre',
        minLength: 'El nombre debe tener al menos 2 caracteres',
        pattern: 'Por favor, ingresa un nombre válido (solo letras y espacios)',
        validate: (value) => {
          if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
          if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return 'Por favor, ingresa un nombre válido';
          return '';
        }
      },
      email: {
        required: 'Por favor, ingresa tu email',
        pattern: 'Por favor, ingresa un email válido',
        validate: (value) => {
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(value)) return 'Por favor, ingresa un email válido';
          return '';
        }
      },
      message: {
        required: 'Por favor, ingresa tu mensaje',
        minLength: 'El mensaje debe tener al menos 10 caracteres',
        maxLength: 'El mensaje no debe exceder los 500 caracteres',
        validate: (value) => {
          if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';
          if (value.length > 500) return 'El mensaje no debe exceder los 500 caracteres';
          return '';
        }
      }
    };

    this.form.querySelectorAll('.form-control').forEach(input => {
      this.validStates[input.name] = false;
    });

    this.setupEventListeners();
    this.updateSubmitButtonState();
    this.submitButton.disabled = true;
  }

  setValidationTexts(validationTexts) {
    this.validations = validationTexts.validations;
    Object.keys(this.validations).forEach(key => {
      const v = this.validations[key];
      if (typeof v.validate === 'string') {
        v.validate = eval(`(${v.validate})`);
      }
    });
    this.successMessage = validationTexts.successMessage;
    this.errorMessage = validationTexts.errorMessage;
    if (this.submitButton) {
      this.submitButton.textContent = validationTexts.button;
    }
  }

  setupEventListeners() {
    this.form.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
        this.updateSubmitButtonState();
      });
      input.addEventListener('input', () => {
        this.validateField(input);
        this.updateSubmitButtonState();
      });
    });

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    const validation = this.validations[fieldName];
    const errorElement = document.getElementById(`${fieldName}Error`);

    field.classList.remove('error', 'success');

    if (this.errorTimeouts[fieldName]) {
      clearTimeout(this.errorTimeouts[fieldName]);
      delete this.errorTimeouts[fieldName];
    }

    let isValid = true;
    let errorMessage = '';

    if (!value && field.hasAttribute('required')) {
      isValid = false;
      errorMessage = validation.required;
    } else if (value && validation.validate) {
      errorMessage = validation.validate(value);
      if (errorMessage) {
        isValid = false;
      }
    }

    this.validStates[fieldName] = isValid;

    if (isValid) {
      field.classList.add('success');
      errorElement.textContent = '';
      errorElement.classList.remove('visible');
    } else {
      field.classList.remove('success');
      this.showError(field, errorElement, errorMessage);
    }

    return isValid;
  }

  showError(field, errorElement, message) {
    field.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('visible');

    const fieldName = field.name;
    this.errorTimeouts[fieldName] = setTimeout(() => {
      errorElement.classList.remove('visible');

      setTimeout(() => {
        errorElement.textContent = '';
        field.classList.remove('error');
        if (this.validStates[fieldName]) {
          field.classList.add('success');
        }
      }, 300);
    }, 3000);
  }

  updateSubmitButtonState() {
    const isFormValid = Object.values(this.validStates).every(isValid => isValid);
    this.submitButton.disabled = !isFormValid;
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (this.submitButton.disabled) return;

    const allValid = Array.from(this.form.querySelectorAll('.form-control'))
      .every(field => this.validateField(field));

    if (!allValid) return;

    this.submitButton.disabled = true;
    this.submitButton.textContent = this.validations.sending || 'Enviando...';

    const status = document.getElementById(`${this.form.id}-status`);
    if (status) status.textContent = '';
    try {
      await this.sendFormspree();

      Object.keys(this.errorTimeouts).forEach(key => {
        clearTimeout(this.errorTimeouts[key]);
        delete this.errorTimeouts[key];
      });

      this.form.reset();
      this.form.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('success', 'error');
        this.validStates[input.name] = false;
      });
      this.updateSubmitButtonState();

      if (status) {
        status.textContent = this.successMessage || "¡Gracias por tu mensaje!";
        status.classList.add('contactForm-status');
        setTimeout(() => {
          status.textContent = "";
          status.classList.remove('contactForm-status');
        }, 4000);
      }
    } catch (error) {
      if (status) status.textContent = this.errorMessage || "Hubo un error al enviar el formulario. Por favor, intenta nuevamente.";
      this.submitButton.disabled = false;
    } finally {
      this.submitButton.textContent = this.validations.button || 'Enviar mensaje';
    }
  }

  async sendFormspree() {
    const data = new FormData(this.form);
    const response = await fetch(this.form.action, {
      method: this.form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const status = document.getElementById(`${this.form.id}-status`);
      try {
        const result = await response.json();
        if (result.errors && status) {
          status.textContent = result.errors.map(error => error.message).join(", ");
        } else if (status) {
          status.textContent = "Oops! Hubo un problema al enviar el formulario";
        }
      } catch {
        if (status) status.textContent = "Oops! Hubo un problema al enviar el formulario";
      }
      throw new Error('Formspree error');
    }
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .catch(err => console.error('Error al copiar: ', err));
}

class Language {
  constructor() {
    this.currentLanguage = localStorage.getItem("portfolio-language") || "es";
    this.dataPath = "./data/data.json";
    this.languageData = null;
    this.formValidator = null;
    this.init();
  }

  async init() {
    try {
      const data = await this.fetchLanguageData();
      this.languageData = data;
      this.updateLanguage(this.currentLanguage);
      this.setupLanguageSwitcher();
      this.formValidator = new FormValidator('contactForm', this.languageData[this.currentLanguage].contactForm);
    } catch (error) {
      console.error("Error al cargar los datos de idioma:", error);
    }
  }

  async fetchLanguageData() {
    const response = await fetch(this.dataPath);
    if (!response.ok) {
      throw new Error(`Error al cargar el archivo JSON: ${response.statusText}`);
    }
    return response.json();
  }

  updateLanguage(language) {
    const texts = this.languageData[language];
    if (!texts) return;

    const languageSwitcher = document.querySelector(".language");
    if (languageSwitcher) {
      languageSwitcher.textContent = language === "en" ? "ES" : "EN";
    }

    const sectionTitles = [
      { selector: '#inicio-link', key: 'home' },
      { selector: '#sobre-mi .section__title', key: 'aboutme' },
      { selector: '#estudios .section__title', key: 'education' },
      { selector: '#skills .section__title', key: 'skills' },
      { selector: '#proyectos .section__title', key: 'projects' },
      { selector: '#experiencia-laboral .section__title', key: 'jobs' },
      { selector: '#contacto .section__title', key: 'contact' }
    ];

    sectionTitles.forEach(item => {
      const el = document.querySelector(item.selector);
      if (el) el.textContent = texts.navbar[item.key];
    });

    const aboutMe = texts.aboutme;
    if (aboutMe) {
      document.querySelector(".section__title-profile").textContent = aboutMe.fullname;
      document.querySelector(".profile__title").textContent = aboutMe.title;
      document.querySelector(".section__text").textContent = aboutMe.description;
    }

    const education = texts.education;
    if (education) {
      const educationContainer = document.querySelector("#estudios .article__container");
      if (educationContainer) {
        educationContainer.innerHTML = "";
        education.forEach(item => {
          const article = document.createElement("article");
          article.classList.add("section__article");
          article.innerHTML = `
                    <h3 class="article__title">${item.institution}</h3>
                    <h4>${item.title}</h4>
                    <p>
                        <time datetime="${item.dateBegin}">${item.dateBegin}</time>
                        ${item.dateEnd ? `- <time datetime="${item.dateEnd}">${item.dateEnd}</time>` : ""}
                    </p>
                `;
          educationContainer.appendChild(article);
        });
      }
    }

    const jobs = texts.jobs;
    if (jobs) {
      const jobsContainer = document.querySelector("#experiencia-laboral .article__container");
      if (jobsContainer) {
        jobsContainer.innerHTML = "";
        jobs.forEach(job => {
          const article = document.createElement("article");
          article.classList.add("section__article");
          article.innerHTML = `
                    <h3 class="article__title">${job.place}</h3>
                    <h4 class="experience-title">${job.title}</h4>
                    <p
                        <time datetime="${job.dateBegin}">${job.dateBegin}</time>
                        ${job.dateEnd ? `- <time datetime="${job.dateEnd}">${job.dateEnd}</time>` : ""}
                    </p>
                    <ul class="article__ul">
                        ${job.description && job.description.length > 0
              ? job.description.map(desc => `<li>${desc}</li>`).join("")
              : ""}
                    </ul>
                `;
          jobsContainer.appendChild(article);
        });
      }
    }

    const navbarLinks = [
      { id: "inicio-link", href: "./index.html", key: "home", icon: "house" },
      { href: "#sobre-mi", key: "aboutme", icon: "person-circle" },
      { href: "#experiencia-laboral", key: "jobs", icon: "briefcase" },
      { href: "#estudios", key: "education", icon: "mortarboard" },
      { href: "#skills", key: "skills", icon: "tools" },
      { href: "#proyectos", key: "projects", icon: "folder2-open" },
      { href: "#contacto", key: "contact", icon: "person-lines-fill" },
    ];

    const navContainer = document.querySelector(".nav");
    navContainer.innerHTML = "";

    navbarLinks.forEach(link => {
      const a = document.createElement("a");
      a.className = "nav__link";
      a.href = link.href;
      a.title = texts.navbar[link.key];
      if (link.id) a.id = link.id;

      a.innerHTML = `
            <i class="bi bi-${link.icon} nav__icon"></i>
            <span class="nav__text">${texts.navbar[link.key]}</span>
        `;
      navContainer.appendChild(a);
    });

    this.updateContactForm(texts.contactForm);

    if (this.formValidator) {
      this.formValidator.setValidationTexts(texts.contactForm);
    }

    localStorage.setItem("language", language);
  }

  updateContactForm(formTexts) {
    document.querySelector('label[for="name"]').textContent = formTexts.labels.name;
    document.querySelector('label[for="email"]').textContent = formTexts.labels.email;
    document.querySelector('label[for="message"]').textContent = formTexts.labels.message;
    document.getElementById('submitBtn').textContent = formTexts.button;
    document.getElementById('name').placeholder = formTexts.placeholders.name;
    document.getElementById('email').placeholder = formTexts.placeholders.email;
    document.getElementById('message').placeholder = formTexts.placeholders.message;
    document.querySelector('#contacto .section__title').textContent = formTexts.title;
  }

  setupLanguageSwitcher() {
    const languageSwitcher = document.querySelector(".language");
    if (!languageSwitcher) return;

    languageSwitcher.addEventListener("click", () => {
      this.currentLanguage = this.currentLanguage === "en" ? "es" : "en";
      this.updateLanguage(this.currentLanguage);
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.carousel-container');
  new InfiniteCarousel(container);
  updateTitleOnScroll();
  setYearCopyright();

  const sobreMiSection = document.getElementById('sobre-mi');
  if (sobreMiSection) {
    fetch('./partials/sobre-mi.html')
      .then(res => res.text())
      .then(html => {
        sobreMiSection.innerHTML = html;
      });
  }

  const aside = document.getElementById('share-portfolio');
  if (aside) {
    fetch('./partials/share-portfolio.html')
      .then(res => res.text())
      .then(html => {
        aside.innerHTML = html;
        const shareBtn = aside.querySelector("#share-link");
        if (shareBtn) {
          shareBtn.addEventListener("click", () => copyToClipboard('https://n0m3l4c000nt35.github.io/portfolio/'));
        }
      });
  }
  new Language();
});

window.addEventListener('scroll', function () {
  const language = document.querySelector('.language');
  const scrollY = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.offsetHeight;

  if (windowHeight + scrollY >= bodyHeight - 100) {
    language.style.bottom = '5rem';
  } else {
    language.style.bottom = '1rem';
  }
});
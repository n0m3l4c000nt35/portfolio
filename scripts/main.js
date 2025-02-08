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

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.carousel-container');
  new InfiniteCarousel(container);
  updateTitleOnScroll();
  setYearCopyright();
});

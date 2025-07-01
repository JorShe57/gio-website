// Main JavaScript for Gio Concrete Company 

// Gallery Filtering
const filterButtons = document.querySelectorAll('.gallery-filter');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active from all
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    galleryItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  lightboxImg.src = '';
  lightboxImg.alt = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// --- Gallery Carousel Functionality ---
const carouselImages = [
  {
    src: 'images/IMG_2300.JPG',
    alt: 'Driveway Project',
    category: 'driveways',
    description: 'Driveway Project'
  },
  {
    src: 'images/IMG_2298.JPG',
    alt: 'Patio Project',
    category: 'patios',
    description: 'Patio Project'
  },
  {
    src: 'images/IMG_2301.JPG',
    alt: 'Foundation Project',
    category: 'foundations',
    description: 'Foundation Project'
  },
  {
    src: 'images/IMG_2299.JPG',
    alt: 'Decorative Project',
    category: 'decorative',
    description: 'Decorative Project'
  },
  {
    src: 'images/IMG_2305.JPG',
    alt: 'Driveway Project 2',
    category: 'driveways',
    description: 'Driveway Project 2'
  },
  {
    src: 'images/IMG_2304.JPG',
    alt: 'Patio Project 2',
    category: 'patios',
    description: 'Patio Project 2'
  },
  {
    src: 'images/IMG_2307.JPG',
    alt: 'Foundation Project 2',
    category: 'foundations',
    description: 'Foundation Project 2'
  },
  {
    src: 'images/IMG_2309.JPG',
    alt: 'Decorative Project 2',
    category: 'decorative',
    description: 'Decorative Project 2'
  }
];

let currentFilter = 'all';
let currentIndex = 0;

const carouselImg = document.querySelector('.carousel-image');
const carouselDesc = document.querySelector('.carousel-description');
const leftBtn = document.querySelector('.carousel-btn-left');
const rightBtn = document.querySelector('.carousel-btn-right');
const filterBtns = document.querySelectorAll('.gallery-filter');

function getFilteredImages() {
  return currentFilter === 'all'
    ? carouselImages
    : carouselImages.filter(img => img.category === currentFilter);
}

function updateCarousel(index) {
  const filtered = getFilteredImages();
  if (filtered.length === 0) return;
  currentIndex = (index + filtered.length) % filtered.length;
  const img = filtered[currentIndex];
  carouselImg.src = img.src;
  carouselImg.alt = img.alt;
  carouselDesc.textContent = img.description;
}

leftBtn.addEventListener('click', () => {
  updateCarousel(currentIndex - 1);
});
rightBtn.addEventListener('click', () => {
  updateCarousel(currentIndex + 1);
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-filter');
    currentIndex = 0;
    updateCarousel(0);
  });
});

// Initialize carousel
updateCarousel(0); 
// Scroll Animations
const fadeEls = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));


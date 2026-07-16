document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const darkToggle = document.querySelector('.dark-toggle');
  const backToTop = document.getElementById('backToTop');
  const pageLoader = document.getElementById('pageLoader');
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterSuccess = document.getElementById('newsletterSuccess');
  const testimonialAvatar = document.getElementById('testimonialAvatar');
  const testimonialText = document.getElementById('testimonialText');
  const testimonialName = document.getElementById('testimonialName');
  const testimonialStars = document.getElementById('testimonialStars');
  const prevTestimonial = document.getElementById('prevTestimonial');
  const nextTestimonial = document.getElementById('nextTestimonial');

  const testimonials = [
    {
      name: 'Ariella Grace',
      text: 'Beautiva changed my skincare ritual. Every product feels luxurious, and my skin has never looked more radiant.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      rating: 5,
    },
    {
      name: 'Noelle Hayes',
      text: 'The packaging and texture feel incredible. The Velvet Matte Lipstick is my new everyday essential.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      rating: 5,
    },
    {
      name: 'Mina Patel',
      text: 'Such a beautiful range. The Glow Moisturizer leaves my skin soft, dewy, and hydrated all day.',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80',
      rating: 4,
    },
  ];

  let activeTestimonial = 0;

  function renderTestimonial(index) {
    const review = testimonials[index];
    testimonialAvatar.src = review.avatar;
    testimonialText.textContent = review.text;
    testimonialName.textContent = review.name;
    testimonialStars.innerHTML = Array.from({ length: 5 }, (_, i) => {
      return `<span>${i < review.rating ? '★' : '☆'}</span>`;
    }).join('');
  }

  function toggleNav() {
    navMenu?.classList.toggle('active');
  }

  function handleDarkMode() {
    document.body.classList.toggle('dark-theme');
  }

  function handleBackToTop() {
    if (window.scrollY > 520) {
      backToTop?.classList.add('show');
    } else {
      backToTop?.classList.remove('show');
    }
  }

  function revealOnScroll() {
    const items = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    items.forEach((item) => observer.observe(item));
  }

  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  }

  function initRippleButtons() {
    const buttons = document.querySelectorAll('.btn, .icon-btn');
    buttons.forEach((button) => {
      button.addEventListener('click', createRipple);
    });
  }

  navToggle?.addEventListener('click', toggleNav);
  darkToggle?.addEventListener('click', handleDarkMode);
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', handleBackToTop);

  prevTestimonial?.addEventListener('click', () => {
    activeTestimonial = activeTestimonial === 0 ? testimonials.length - 1 : activeTestimonial - 1;
    renderTestimonial(activeTestimonial);
  });

  nextTestimonial?.addEventListener('click', () => {
    activeTestimonial = activeTestimonial === testimonials.length - 1 ? 0 : activeTestimonial + 1;
    renderTestimonial(activeTestimonial);
  });

  newsletterForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailValue = newsletterEmail.value.trim();
    if (emailValue) {
      newsletterSuccess.textContent = `Thank you, ${emailValue}! You're on the Beautiva list.`;
      newsletterForm.reset();
    }
  });

  renderTestimonial(activeTestimonial);
  revealOnScroll();
  initRippleButtons();

  window.addEventListener('load', () => {
    setTimeout(() => {
      pageLoader.style.opacity = '0';
      pageLoader.style.pointerEvents = 'none';
      pageLoader.style.transition = 'opacity 0.6s ease';
    }, 900);
  });
});

// Add ripple styles dynamically for cleaner separation
const rippleStyle = document.createElement('style');
rippleStyle.innerHTML = `
.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple-effect 0.6s ease-out;
  background: rgba(255, 255, 255, 0.45);
  pointer-events: none;
}
@keyframes ripple-effect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
button { position: relative; overflow: hidden; }
`;
document.head.appendChild(rippleStyle);

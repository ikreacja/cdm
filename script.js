// Initialize AOS
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: false,
    mirror: true
});

// Quiz functionality
let quizAnswers = {};
let calculatedBMICategory = null;
let currentQuestionNumber = 1;

function nextQuestion(currentQuestion) {
    // Get current question element
    const current = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
    const selectedOption = current.querySelector('input[type="radio"]:checked');
    
    if (!selectedOption) {
        alert('Proszę wybrać jedną z opcji');
        return;
    }
    
    // Store answer
    quizAnswers[selectedOption.name] = selectedOption.value;
    
    // Show reset button after first question
    if (currentQuestion === 1) {
        document.getElementById('quiz-reset-btn').style.display = 'inline-flex';
    }
    
    // Hide current question
    current.classList.remove('active');
    
    // Show next question
    const next = document.querySelector(`.quiz-question[data-question="${currentQuestion + 1}"]`);
    if (next) {
        next.classList.add('active');
        currentQuestionNumber = currentQuestion + 1;
    }
}

function calculateResult() {
    // Get last answer
    const ageInput = document.querySelector('input[name="age"]:checked');
    if (!ageInput) {
        alert('Proszę wybrać jedną z opcji');
        return;
    }
    quizAnswers.age = ageInput.value;
    
    // Hide all questions
    document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
    
    // Calculate qualification
    let qualification = 'not-qualified';
    
    // Check age first - if below 18, automatic disqualification
    if (quizAnswers.age === 'below18') {
        qualification = 'not-qualified';
    } 
    // BMI 35+ with diseases OR BMI 40+
    else if ((quizAnswers.bmi === '35-40' || quizAnswers.bmi === '40+') && 
             (quizAnswers.diseases !== 'none' || quizAnswers.bmi === '40+') &&
             quizAnswers.age === '18-65' &&
             (quizAnswers.attempts === '3-5' || quizAnswers.attempts === '5+')) {
        qualification = 'qualified';
    }
    // BMI 30-35 with diseases or considering surgery
    else if ((quizAnswers.bmi === '30-35' && quizAnswers.diseases !== 'none') ||
             (quizAnswers.surgery === 'yes-soon' || quizAnswers.surgery === 'yes-research')) {
        qualification = 'maybe-qualified';
    }
    // BMI below 30
    else if (quizAnswers.bmi === 'below30') {
        qualification = 'not-qualified';
    }
    // Default case for edge scenarios
    else if (quizAnswers.age === '18-65') {
        qualification = 'maybe-qualified';
    }
    
    // Show appropriate result
    document.querySelector(`.quiz-result.${qualification}`).style.display = 'block';
    
    // Show reset button in results
    document.getElementById('quiz-reset-btn').style.display = 'inline-flex';
    
    // Scroll to result
    document.querySelector('.quiz-result:not([style*="none"])').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}

// BMI Calculator functionality
function showBMICalculator() {
    document.getElementById('bmi-modal').style.display = 'block';
}

function closeBMICalculator() {
    document.getElementById('bmi-modal').style.display = 'none';
    document.getElementById('bmi-result').style.display = 'none';
    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
}

function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    
    if (!weight || !height || weight < 30 || weight > 300 || height < 100 || height > 250) {
        alert('Proszę wprowadzić prawidłowe wartości (waga: 30-300 kg, wzrost: 100-250 cm)');
        return;
    }
    
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiRounded = Math.round(bmi * 10) / 10;
    
    let category = '';
    let bmiCategory = '';
    
    if (bmi < 18.5) {
        category = 'Niedowaga';
        bmiCategory = 'below30';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Waga prawidłowa';
        bmiCategory = 'below30';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Nadwaga';
        bmiCategory = 'below30';
    } else if (bmi >= 30 && bmi < 35) {
        category = 'Otyłość I stopnia';
        bmiCategory = '30-35';
    } else if (bmi >= 35 && bmi < 40) {
        category = 'Otyłość II stopnia';
        bmiCategory = '35-40';
    } else {
        category = 'Otyłość III stopnia (skrajna)';
        bmiCategory = '40+';
    }
    
    document.getElementById('bmi-value').textContent = bmiRounded;
    document.getElementById('bmi-category').textContent = category;
    document.getElementById('bmi-result').style.display = 'block';
    
    calculatedBMICategory = bmiCategory;
}

function useBMIResult() {
    if (calculatedBMICategory) {
        // Select the appropriate radio button based on BMI result
        const radioButton = document.querySelector(`input[name="bmi"][value="${calculatedBMICategory}"]`);
        if (radioButton) {
            radioButton.checked = true;
        }
        
        // Close modal and continue quiz
        closeBMICalculator();
        
        // Automatically proceed to next question
        nextQuestion(1);
    }
}

// Additional event listeners for BMI calculator
document.addEventListener('DOMContentLoaded', function() {
    // Close modal when clicking X
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeBMICalculator);
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('bmi-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeBMICalculator();
            }
        });
    }
    
    // Show BMI calculator when "Nie wiem" is selected
    document.addEventListener('change', function(e) {
        if (e.target.name === 'bmi' && e.target.value === 'unknown') {
            setTimeout(showBMICalculator, 300);
        }
    });
});

// Reset Quiz functionality
function resetQuiz() {
    // Clear all answers
    quizAnswers = {};
    calculatedBMICategory = null;
    currentQuestionNumber = 1;
    
    // Hide all questions and results
    document.querySelectorAll('.quiz-question').forEach(q => {
        q.classList.remove('active');
        // Clear all radio button selections
        q.querySelectorAll('input[type="radio"]').forEach(input => {
            input.checked = false;
        });
    });
    
    // Hide all results
    document.querySelectorAll('.quiz-result').forEach(result => {
        result.style.display = 'none';
    });
    
    // Show first question
    document.querySelector('.quiz-question[data-question="1"]').classList.add('active');
    
    // Hide reset button
    document.getElementById('quiz-reset-btn').style.display = 'none';
    
    // Scroll back to quiz start
    document.querySelector('.qualification-quiz').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hide');
    }, 2000);
});

// Enhanced Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const mobileOverlay = document.getElementById('mobile-overlay');

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    
    // Prevent body scroll and horizontal overflow when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.classList.add('menu-open');
        // Store current scroll position
        const scrollY = window.scrollY;
        document.body.style.top = `-${scrollY}px`;
    } else {
        document.body.classList.remove('menu-open');
        // Restore scroll position
        const scrollY = document.body.style.top;
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
}

function closeMobileMenu() {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
    mobileOverlay.classList.remove('active');
    
    // Restore body scroll
    document.body.classList.remove('menu-open');
    const scrollY = document.body.style.top;
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

navToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu on overlay click
if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .approach-item, .about-content').forEach(el => {
    observer.observe(el);
});

// Initialize Vanilla Tilt for 3D effects
document.querySelectorAll('[data-tilt]').forEach(el => {
    VanillaTilt.init(el, {
        max: 25,
        speed: 400,
        scale: 1.1,
        glare: true,
        'max-glare': 0.3
    });
});

// GSAP Animations
gsap.to('.gradient-orb', {
    y: '+=30',
    x: '+=20',
    duration: 4,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
    stagger: {
        each: 0.5,
        from: 'random'
    }
});

// Parallax Effect on Scroll
gsap.to('.hero-illustration', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: -100,
    scale: 0.9,
    opacity: 0.7
});

// Service Cards 3D Rotation on Mouse Move
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Floating Animation for Hero Elements
gsap.to('.hero-title .letter', {
    y: -10,
    duration: 2,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
    stagger: {
        each: 0.1,
        from: 'start'
    }
});

// Create Particle Effect
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);
    
    gsap.to(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: 0,
        duration: 2,
        ease: 'power2.out',
        onComplete: () => particle.remove()
    });
}

// Add particle effect on click
document.addEventListener('click', (e) => {
    if (e.target.closest('.cta-button, .submit-button')) {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => createParticle(e.clientX, e.clientY), i * 50);
        }
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
        
        // Reset form
        contactForm.reset();
    });
}

// Floating button functionality
function handleFloatingButton() {
    const floatingBtn = document.getElementById('floating-v2-btn');
    const footer = document.querySelector('.footer');
    
    if (!floatingBtn || !footer) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Footer is visible, hide floating button
                floatingBtn.classList.add('hide');
            } else {
                // Footer is not visible, show floating button
                floatingBtn.classList.remove('hide');
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(footer);
}

// Initialize floating button on page load
document.addEventListener('DOMContentLoaded', handleFloatingButton);

// Mobile responsiveness enhancements
function handleMobileResize() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const navToggle = document.querySelector('.nav-toggle');
    
    // Handle window resize events for responsive behavior
    function updateMobileView() {
        const windowWidth = window.innerWidth;
        
        // Reset mobile menu state on desktop
        if (windowWidth > 600) {
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        }
        
        // Adjust floating button positioning on very small screens
        const floatingBtn = document.getElementById('floating-v2-btn');
        if (floatingBtn && windowWidth <= 380) {
            floatingBtn.style.right = '10px';
            floatingBtn.style.bottom = '10px';
        } else if (floatingBtn && windowWidth <= 600) {
            floatingBtn.style.right = '15px';
            floatingBtn.style.bottom = '15px';
        }
    }
    
    // Initial call
    updateMobileView();
    
    // Add resize event listener with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateMobileView, 150);
    });
}

// Touch gesture support for mobile navigation - Fixed
function addTouchSupport() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) return;
    
    // Add touch event support for better mobile interaction - Fixed cancelable issue
    navToggle.addEventListener('touchstart', (e) => {
        // Don't prevent default if event is not cancelable
        if (e.cancelable) {
            e.preventDefault();
        }
        toggleMobileMenu();
    }, { passive: false });
    
    // Close mobile menu when touching outside - using passive listener
    document.addEventListener('touchstart', (e) => {
        const isNavClick = navToggle.contains(e.target) || navLinks.contains(e.target);
        if (!isNavClick && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    }, { passive: true });
}

// Initialize mobile enhancements
document.addEventListener('DOMContentLoaded', () => {
    handleMobileResize();
    addTouchSupport();
});

// Add mobile menu and particle styles
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(135deg, #7BB4D9 0%, #E85D75 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 10px rgba(123, 180, 217, 0.5);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 80px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: var(--bialy);
            flex-direction: column;
            padding: 40px 20px;
            gap: 30px;
            transition: right 0.3s ease;
            box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-links.active {
            right: 0;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 5px 30px rgba(43, 95, 138, 0.15);
    }
    
    .animated {
        animation: fadeInUp 0.6s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
// Initialize AOS
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: false,
    mirror: true
});

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hide');
    }, 2000);
});

// Enhanced Mobile Navigation Toggle for wsparcie-operacji
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const mobileOverlay = document.getElementById('mobile-overlay');

function toggleMobileMenuV2() {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenuV2() {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

navToggle.addEventListener('click', toggleMobileMenuV2);

// Close mobile menu on overlay click
if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenuV2);
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMobileMenuV2);
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

// Lead Generation Methods
function showBMICalculator() {
    // Create BMI Calculator Modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Kalkulator kwalifikacji bariatrycznej</h3>
            <p>Sprawdź swoje BMI i choroby współistniejące</p>
            
            <div class="bmi-calculator">
                <div class="bmi-input-group">
                    <label for="weight">Waga (kg):</label>
                    <input type="number" id="weight" placeholder="np. 85" min="40" max="300">
                </div>
                
                <div class="bmi-input-group">
                    <label for="height">Wzrost (cm):</label>
                    <input type="number" id="height" placeholder="np. 170" min="140" max="220">
                </div>
                
                <div class="diseases-section">
                    <label>Choroby współistniejące:</label>
                    <div class="checkbox-group">
                        <label><input type="checkbox" value="diabetes"> Cukrzyca typu 2</label>
                        <label><input type="checkbox" value="hypertension"> Nadciśnienie</label>
                        <label><input type="checkbox" value="sleep-apnea"> Bezdech senny</label>
                        <label><input type="checkbox" value="joint-problems"> Problemy ze stawami</label>
                    </div>
                </div>
                
                <button type="button" class="cta-button secondary" onclick="calculateQualification()">Sprawdź kwalifikację</button>
                
                <div id="qualification-result" style="display: none;"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        document.body.removeChild(modal);
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

function calculateQualification() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const diseases = Array.from(document.querySelectorAll('.checkbox-group input:checked')).map(cb => cb.value);
    
    if (!weight || !height) {
        alert('Proszę wprowadzić wagę i wzrost');
        return;
    }
    
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiRounded = Math.round(bmi * 10) / 10;
    
    let qualification = '';
    let recommendation = '';
    
    if (bmi >= 40 || (bmi >= 35 && diseases.length > 0)) {
        qualification = 'Kwalifikujesz się do operacji bariatrycznej';
        recommendation = 'Twoje BMI i stan zdrowia wskazują na kwalifikację do zabiegu. Skontaktuj się z nami, aby omówić następne kroki.';
    } else if (bmi >= 30) {
        qualification = 'Możesz rozważyć leczenie zachowawcze';
        recommendation = 'Najpierw warto spróbować leczenia dietetycznego. Operacja może być opcją w przyszłości.';
    } else {
        qualification = 'BMI poniżej kryterium operacyjnego';
        recommendation = 'Twoje BMI nie kwalifikuje do operacji bariatrycznej. Skonsultuj się z dietetykiem w sprawie zdrowego stylu życia.';
    }
    
    const resultDiv = document.getElementById('qualification-result');
    resultDiv.innerHTML = `
        <div class="qualification-result">
            <h4>Twoje BMI: ${bmiRounded}</h4>
            <h5>${qualification}</h5>
            <p>${recommendation}</p>
            <a href="#contact" class="cta-button primary" onclick="this.closest('.modal').remove()">Umów konsultację</a>
        </div>
    `;
    resultDiv.style.display = 'block';
}

function showQuiz() {
    // Create Quiz Modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content large">
            <span class="close-modal">&times;</span>
            <h3>Czy operacja bariatryczna jest dla mnie?</h3>
            <div id="quiz-container">
                <div class="quiz-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 20%"></div>
                    </div>
                    <span class="progress-text">Pytanie 1/5</span>
                </div>
                
                <div class="quiz-question active" data-question="1">
                    <h4>Ile razy próbowałeś/aś schudnąć na własną rękę?</h4>
                    <div class="quiz-options">
                        <label><input type="radio" name="attempts" value="never"> Nigdy</label>
                        <label><input type="radio" name="attempts" value="1-2"> 1-2 razy</label>
                        <label><input type="radio" name="attempts" value="3-5"> 3-5 razy</label>
                        <label><input type="radio" name="attempts" value="many"> Więcej niż 5 razy</label>
                    </div>
                </div>
                
                <div class="quiz-question" data-question="2">
                    <h4>Czy masz problemy zdrowotne związane z wagą?</h4>
                    <div class="quiz-options">
                        <label><input type="radio" name="health" value="none"> Nie mam problemów</label>
                        <label><input type="radio" name="health" value="minor"> Drobne dolegliwości</label>
                        <label><input type="radio" name="health" value="moderate"> Choroby wymagające leczenia</label>
                        <label><input type="radio" name="health" value="severe"> Poważne problemy zdrowotne</label>
                    </div>
                </div>
                
                <div class="quiz-question" data-question="3">
                    <h4>Jak wpływa Twoja waga na codzienne życie?</h4>
                    <div class="quiz-options">
                        <label><input type="radio" name="daily" value="minimal"> Minimalny wpływ</label>
                        <label><input type="radio" name="daily" value="some"> Czasami utrudnia aktywność</label>
                        <label><input type="radio" name="daily" value="significant"> Znacznie ogranicza możliwości</label>
                        <label><input type="radio" name="daily" value="severe"> Poważnie wpływa na jakość życia</label>
                    </div>
                </div>
                
                <div class="quiz-question" data-question="4">
                    <h4>Czy jesteś gotowy/a na zmiany stylu życia?</h4>
                    <div class="quiz-options">
                        <label><input type="radio" name="commitment" value="unsure"> Nie jestem pewny/a</label>
                        <label><input type="radio" name="commitment" value="somewhat"> Częściowo</label>
                        <label><input type="radio" name="commitment" value="ready"> Jestem gotowy/a</label>
                        <label><input type="radio" name="commitment" value="very-ready"> Bardzo chcę się zmienić</label>
                    </div>
                </div>
                
                <div class="quiz-question" data-question="5">
                    <h4>Jak długo zmagasz się z problemem wagi?</h4>
                    <div class="quiz-options">
                        <label><input type="radio" name="duration" value="recent"> Ostatnie 1-2 lata</label>
                        <label><input type="radio" name="duration" value="few-years"> 3-5 lat</label>
                        <label><input type="radio" name="duration" value="many-years"> Ponad 5 lat</label>
                        <label><input type="radio" name="duration" value="lifelong"> Całe dorosłe życie</label>
                    </div>
                </div>
                
                <div class="quiz-result" style="display: none;">
                    <h4 id="quiz-result-title"></h4>
                    <p id="quiz-result-text"></p>
                    <a href="#contact" class="cta-button primary" onclick="this.closest('.modal').remove()">Porozmawiajmy</a>
                </div>
                
                <div class="quiz-navigation">
                    <button type="button" class="quiz-btn" id="quiz-prev" style="display: none;" onclick="previousQuestion()">Wstecz</button>
                    <button type="button" class="quiz-btn" id="quiz-next" onclick="nextQuestion()">Dalej</button>
                    <button type="button" class="quiz-btn" id="quiz-submit" style="display: none;" onclick="submitQuiz()">Zobacz wynik</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        document.body.removeChild(modal);
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

let currentQuestion = 1;
let quizAnswers = {};

function nextQuestion() {
    const current = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
    const selected = current.querySelector('input[type="radio"]:checked');
    
    if (!selected) {
        alert('Proszę wybrać odpowiedź');
        return;
    }
    
    quizAnswers[selected.name] = selected.value;
    
    if (currentQuestion < 5) {
        current.classList.remove('active');
        currentQuestion++;
        document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`).classList.add('active');
        
        // Update progress
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        progressFill.style.width = `${(currentQuestion / 5) * 100}%`;
        progressText.textContent = `Pytanie ${currentQuestion}/5`;
        
        // Show/hide navigation buttons
        document.getElementById('quiz-prev').style.display = 'inline-block';
        if (currentQuestion === 5) {
            document.getElementById('quiz-next').style.display = 'none';
            document.getElementById('quiz-submit').style.display = 'inline-block';
        }
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`).classList.remove('active');
        currentQuestion--;
        document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`).classList.add('active');
        
        // Update progress
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        progressFill.style.width = `${(currentQuestion / 5) * 100}%`;
        progressText.textContent = `Pytanie ${currentQuestion}/5`;
        
        // Show/hide navigation buttons
        if (currentQuestion === 1) {
            document.getElementById('quiz-prev').style.display = 'none';
        }
        document.getElementById('quiz-next').style.display = 'inline-block';
        document.getElementById('quiz-submit').style.display = 'none';
    }
}

function submitQuiz() {
    const current = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
    const selected = current.querySelector('input[type="radio"]:checked');
    
    if (!selected) {
        alert('Proszę wybrać odpowiedź');
        return;
    }
    
    quizAnswers[selected.name] = selected.value;
    
    // Calculate result
    let score = 0;
    
    if (quizAnswers.attempts === 'many') score += 2;
    else if (quizAnswers.attempts === '3-5') score += 1;
    
    if (quizAnswers.health === 'severe') score += 3;
    else if (quizAnswers.health === 'moderate') score += 2;
    else if (quizAnswers.health === 'minor') score += 1;
    
    if (quizAnswers.daily === 'severe') score += 3;
    else if (quizAnswers.daily === 'significant') score += 2;
    else if (quizAnswers.daily === 'some') score += 1;
    
    if (quizAnswers.commitment === 'very-ready') score += 2;
    else if (quizAnswers.commitment === 'ready') score += 1;
    
    if (quizAnswers.duration === 'lifelong') score += 2;
    else if (quizAnswers.duration === 'many-years') score += 1;
    
    let resultTitle, resultText;
    
    if (score >= 8) {
        resultTitle = 'Operacja bariatryczna może być dobrą opcją dla Ciebie';
        resultText = 'Twoje odpowiedzi wskazują, że możesz być kandydatem do zabiegu bariatrycznego. Warto skonsultować się ze specjalistą, aby omówić możliwości leczenia.';
    } else if (score >= 5) {
        resultTitle = 'Warto rozważyć konsultację specjalistyczną';
        resultText = 'Twoja sytuacja wymaga indywidualnej oceny. Skonsultuj się z dietetykiem medycznym, który pomoże wybrać najlepszą metodę leczenia.';
    } else {
        resultTitle = 'Możliwości leczenia zachowawczego';
        resultText = 'Na tym etapie warto spróbować leczenia dietetycznego i zmian stylu życia. Operacja może być opcją w przyszłości, jeśli inne metody okażą się nieskuteczne.';
    }
    
    // Hide questions and show result
    document.querySelectorAll('.quiz-question').forEach(q => q.style.display = 'none');
    document.querySelector('.quiz-navigation').style.display = 'none';
    document.querySelector('.quiz-progress').style.display = 'none';
    
    const resultDiv = document.querySelector('.quiz-result');
    document.getElementById('quiz-result-title').textContent = resultTitle;
    document.getElementById('quiz-result-text').textContent = resultText;
    resultDiv.style.display = 'block';
}

function showVideoConsultation() {
    // Create Video Consultation Modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Bezpłatna konsultacja online (15 min)</h3>
            <p>Umów się na krótką rozmowę wideo z naszym specjalistą</p>
            
            <div class="consultation-form">
                <div class="input-group">
                    <label>Imię i nazwisko:</label>
                    <input type="text" placeholder="Jak się do Ciebie zwracać?">
                </div>
                
                <div class="input-group">
                    <label>Telefon:</label>
                    <input type="tel" placeholder="Numer telefonu">
                </div>
                
                <div class="input-group">
                    <label>E-mail:</label>
                    <input type="email" placeholder="Adres e-mail">
                </div>
                
                <div class="input-group">
                    <label>Preferowany termin:</label>
                    <select>
                        <option>Jutro rano (9:00-12:00)</option>
                        <option>Jutro popołudnie (14:00-17:00)</option>
                        <option>Pojutrze rano (9:00-12:00)</option>
                        <option>Pojutrze popołudnie (14:00-17:00)</option>
                        <option>Inny termin (skontaktujemy się)</option>
                    </select>
                </div>
                
                <div class="input-group">
                    <label>Krótko o Twojej sytuacji:</label>
                    <textarea placeholder="Opcjonalnie - napisz kilka słów o tym, czego oczekujesz od konsultacji" rows="3"></textarea>
                </div>
                
                <button type="button" class="cta-button primary" onclick="submitConsultationRequest()">Umów konsultację</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        document.body.removeChild(modal);
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

function submitConsultationRequest() {
    alert('Dziękujemy! Skontaktujemy się z Tobą w ciągu 24h, aby umówić konsultację.');
    document.querySelector('.modal').remove();
}

function showEbookDownload() {
    // Create E-book Download Modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>E-book "Dieta przed operacją bariatryczną"</h3>
            <p>Pobierz bezpłatny przewodnik przygotowania do zabiegu</p>
            
            <div class="ebook-preview">
                <div class="ebook-cover">
                    <div class="book-mockup">
                        <h4>Dieta przed operacją bariatryczną</h4>
                        <p>Kompletny przewodnik</p>
                    </div>
                </div>
                
                <div class="ebook-benefits">
                    <h4>Co znajdziesz w e-booku:</h4>
                    <ul>
                        <li>✓ Plan żywieniowy na 4 tygodnie przed operacją</li>
                        <li>✓ Lista dozwolonych i zakazanych produktów</li>
                        <li>✓ Przepisy na zdrowe posiłki</li>
                        <li>✓ Jak przygotować organizm do zabiegu</li>
                        <li>✓ Checklistę przed operacją</li>
                    </ul>
                </div>
            </div>
            
            <div class="download-form">
                <div class="input-group">
                    <label>Imię:</label>
                    <input type="text" placeholder="Twoje imię">
                </div>
                
                <div class="input-group">
                    <label>E-mail:</label>
                    <input type="email" placeholder="Adres e-mail do wysłania e-booka">
                </div>
                
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" required>
                        Wyrażam zgodę na otrzymywanie informacji o usługach CDM
                    </label>
                </div>
                
                <button type="button" class="cta-button primary" onclick="downloadEbook()">Pobierz bezpłatnie</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        document.body.removeChild(modal);
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

function downloadEbook() {
    const email = document.querySelector('input[type="email"]').value;
    const consent = document.querySelector('input[type="checkbox"]').checked;
    
    if (!email || !consent) {
        alert('Proszę wprowadzić e-mail i wyrazić zgodę');
        return;
    }
    
    alert('Dziękujemy! E-book został wysłany na Twój adres e-mail.');
    document.querySelector('.modal').remove();
}

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

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
        contactForm.reset();
    });
}

// Floating back button functionality for wsparcie-operacji
function handleFloatingBackButton() {
    const floatingBtn = document.getElementById('floating-back-btn');
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

// Mobile responsiveness enhancements for wsparcie-operacji
function handleMobileResizeV2() {
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
        const floatingBtn = document.getElementById('floating-back-btn');
        if (floatingBtn && windowWidth <= 380) {
            floatingBtn.style.right = '10px';
            floatingBtn.style.bottom = '10px';
        } else if (floatingBtn && windowWidth <= 600) {
            floatingBtn.style.right = '15px';
            floatingBtn.style.bottom = '15px';
        }
        
        // Adjust modal content for very small screens
        const modals = document.querySelectorAll('.modal-content');
        modals.forEach(modal => {
            if (windowWidth <= 400) {
                modal.style.margin = '2% 5px';
                modal.style.padding = '20px 15px';
            }
        });
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

// Touch gesture support for mobile navigation
function addTouchSupportV2() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) return;
    
    // Add touch event support for better mobile interaction
    navToggle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleMobileMenuV2();
    });
    
    // Close mobile menu when touching outside
    document.addEventListener('touchstart', (e) => {
        const isNavClick = navToggle.contains(e.target) || navLinks.contains(e.target);
        if (!isNavClick && navLinks.classList.contains('active')) {
            closeMobileMenuV2();
        }
    });
}

// Initialize mobile enhancements and floating button
document.addEventListener('DOMContentLoaded', () => {
    handleFloatingBackButton();
    handleMobileResizeV2();
    addTouchSupportV2();
});

// Add mobile menu and particle styles
const style = document.createElement('style');
style.textContent = `
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        animation: fadeIn 0.3s ease;
    }

    .modal-content {
        background-color: var(--bialy);
        margin: 5% auto;
        padding: 40px;
        border-radius: 20px;
        max-width: 600px;
        position: relative;
        animation: slideIn 0.3s ease;
        max-height: 90vh;
        overflow-y: auto;
    }

    .modal-content.large {
        max-width: 800px;
    }

    .close-modal {
        position: absolute;
        right: 20px;
        top: 20px;
        font-size: 30px;
        font-weight: bold;
        color: var(--szary);
        cursor: pointer;
        transition: color 0.3s ease;
    }

    .close-modal:hover {
        color: var(--czarny);
    }

    .input-group {
        margin-bottom: 20px;
    }

    .input-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 600;
        color: var(--niebieski-glowny);
    }

    .input-group input,
    .input-group select,
    .input-group textarea {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid var(--niebieski-pastelowy);
        border-radius: 10px;
        font-size: 16px;
        transition: border-color 0.3s ease;
    }

    .input-group input:focus,
    .input-group select:focus,
    .input-group textarea:focus {
        outline: none;
        border-color: var(--niebieski-jasny);
    }

    .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 20px 0;
    }

    .checkbox-group label {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: normal;
    }

    .diseases-section {
        margin: 20px 0;
    }

    .diseases-section label {
        font-weight: 600;
        color: var(--niebieski-glowny);
        margin-bottom: 10px;
        display: block;
    }

    .quiz-progress {
        margin-bottom: 30px;
    }

    .progress-bar {
        width: 100%;
        height: 8px;
        background: var(--niebieski-pastelowy);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 10px;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(135deg, var(--niebieski-glowny) 0%, var(--niebieski-jasny) 100%);
        transition: width 0.3s ease;
    }

    .progress-text {
        font-size: 14px;
        color: var(--szary);
    }

    .quiz-question {
        display: none;
        margin-bottom: 30px;
    }

    .quiz-question.active {
        display: block;
    }

    .quiz-question h4 {
        font-size: 20px;
        margin-bottom: 20px;
        color: var(--niebieski-glowny);
    }

    .quiz-options {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .quiz-options label {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 15px;
        border: 2px solid var(--niebieski-pastelowy);
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .quiz-options label:hover {
        border-color: var(--niebieski-jasny);
        background: var(--niebieski-pastelowy);
    }

    .quiz-navigation {
        display: flex;
        gap: 15px;
        justify-content: space-between;
        margin-top: 30px;
    }

    .quiz-btn {
        padding: 12px 24px;
        border: 2px solid var(--niebieski-glowny);
        background: transparent;
        color: var(--niebieski-glowny);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .quiz-btn:hover {
        background: var(--niebieski-glowny);
        color: var(--bialy);
    }

    .qualification-result,
    .quiz-result {
        text-align: center;
        padding: 30px;
        background: var(--niebieski-pastelowy);
        border-radius: 15px;
        margin-top: 20px;
    }

    .qualification-result h4,
    .qualification-result h5,
    .quiz-result h4 {
        color: var(--niebieski-glowny);
        margin-bottom: 15px;
    }

    .ebook-preview {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 30px;
        margin: 30px 0;
    }

    .book-mockup {
        background: linear-gradient(135deg, var(--niebieski-glowny) 0%, var(--niebieski-jasny) 100%);
        color: white;
        padding: 30px 20px;
        border-radius: 15px;
        text-align: center;
        min-height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .book-mockup h4 {
        font-size: 18px;
        margin-bottom: 10px;
    }

    .ebook-benefits ul {
        list-style: none;
        padding: 0;
    }

    .ebook-benefits li {
        padding: 8px 0;
        color: var(--szary);
    }

    .problem-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;
        margin: 40px 0;
    }

    .problem-item {
        text-align: center;
        color: white;
    }

    .problem-icon {
        width: 60px;
        height: 60px;
        margin: 0 auto 20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
    }

    .problem-icon svg {
        width: 30px;
        height: 30px;
    }

    .problem-item h3 {
        font-size: 20px;
        margin-bottom: 10px;
        font-weight: 600;
    }

    .problem-warning {
        text-align: center;
        font-size: 18px;
        background: rgba(255, 255, 255, 0.1);
        padding: 20px;
        border-radius: 15px;
        backdrop-filter: blur(10px);
    }

    .specialist-info {
        margin: 30px 0;
        padding: 30px;
        background: var(--niebieski-pastelowy);
        border-radius: 15px;
    }

    .specialist-info h3 {
        color: var(--niebieski-glowny);
        font-size: 24px;
        margin-bottom: 5px;
    }

    .specialist-title {
        color: var(--niebieski-jasny);
        font-weight: 600;
        margin-bottom: 15px;
    }

    .cdm-benefits {
        margin-top: 30px;
    }

    .benefit-item {
        display: flex;
        align-items: flex-start;
        gap: 15px;
        margin-bottom: 20px;
    }

    .benefit-icon {
        width: 40px;
        height: 40px;
        background: var(--niebieski-glowny);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .benefit-icon svg {
        width: 20px;
        height: 20px;
        fill: white;
    }

    .benefit-item h5 {
        margin-bottom: 5px;
        color: var(--niebieski-glowny);
        font-weight: 600;
    }

    .comparison-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        margin-top: 40px;
    }

    .success-column,
    .failure-column {
        padding: 30px;
        border-radius: 20px;
    }

    .success-column {
        background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(129, 199, 132, 0.1) 100%);
        border: 2px solid rgba(76, 175, 80, 0.3);
    }

    .failure-column {
        background: linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(229, 115, 115, 0.1) 100%);
        border: 2px solid rgba(244, 67, 54, 0.3);
    }

    .success-column h3 {
        color: #4CAF50;
        text-align: center;
        margin-bottom: 25px;
    }

    .failure-column h3 {
        color: #F44336;
        text-align: center;
        margin-bottom: 25px;
    }

    .outcome-item {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
    }

    .outcome-icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .success .outcome-icon {
        background: rgba(76, 175, 80, 0.2);
        color: #4CAF50;
    }

    .failure .outcome-icon {
        background: rgba(244, 67, 54, 0.2);
        color: #F44336;
    }

    .outcome-icon svg {
        width: 16px;
        height: 16px;
    }

    .lead-methods {
        margin: 40px 0;
    }

    .primary-cta-section {
        text-align: center;
        margin-bottom: 40px;
    }

    .cta-button.large {
        font-size: 20px;
        padding: 20px 40px;
        min-width: 320px;
    }

    .alternative-ctas {
        margin-bottom: 40px;
    }

    .alternative-ctas h4 {
        text-align: center;
        color: var(--bialy);
        margin-bottom: 20px;
        opacity: 0.9;
    }

    .cta-buttons-row {
        display: flex;
        gap: 15px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .cta-buttons-row .cta-button.secondary {
        background: rgba(255, 255, 255, 0.95);
        color: var(--niebieski-glowny);
        border: 2px solid rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        font-weight: 600;
    }

    .cta-buttons-row .cta-button.secondary:hover {
        background: var(--bialy);
        color: var(--niebieski-glowny);
        border-color: var(--bialy);
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
    }

    .cta-buttons-row .cta-button.secondary svg {
        fill: currentColor;
        stroke: currentColor;
    }

    .interactive-tools {
        background: rgba(255, 255, 255, 0.1);
        padding: 40px;
        border-radius: 20px;
        backdrop-filter: blur(10px);
    }

    .interactive-tools h3 {
        text-align: center;
        color: var(--bialy);
        margin-bottom: 30px;
    }

    .tools-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

    .tool-card {
        background: rgba(255, 255, 255, 0.95);
        padding: 25px;
        border-radius: 15px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .tool-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(255, 255, 255, 0.2);
    }

    .tool-icon {
        width: 50px;
        height: 50px;
        background: var(--niebieski-glowny);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 15px;
        color: white;
    }

    .tool-icon svg {
        width: 24px;
        height: 24px;
    }

    .tool-card h4 {
        color: var(--niebieski-glowny);
        margin-bottom: 10px;
        font-size: 18px;
    }

    .tool-card p {
        color: var(--szary);
        font-size: 14px;
    }

    @media (max-width: 768px) {
        .modal-content {
            margin: 10% auto;
            padding: 20px;
        }

        .ebook-preview {
            grid-template-columns: 1fr;
        }

        .comparison-grid {
            grid-template-columns: 1fr;
        }

        .cta-buttons-row {
            flex-direction: column;
            align-items: center;
        }

        .tools-grid {
            grid-template-columns: 1fr;
        }

        .problem-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);
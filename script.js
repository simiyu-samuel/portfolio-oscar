/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsHeaders = document.querySelectorAll('.skills__header')

skillsHeaders.forEach(header => {
    header.addEventListener('click', function(){
        const skillsItem = this.parentElement
        
        // Get all skills content items
        const allSkillsItems = document.querySelectorAll('.skills__content')
        
        // Toggle current item
        const isOpen = skillsItem.classList.contains('skills__open')
        
        // Close all first
        allSkillsItems.forEach(item => {
            item.classList.remove('skills__open')
            item.classList.add('skills__close')
        })
        
        // Open clicked item if it was closed
        if(!isOpen){
            skillsItem.classList.remove('skills__close')
            skillsItem.classList.add('skills__open')
        }
    })
})

/*==================== PORTFOLIO FILTER ====================*/
const portfolioFilters = document.querySelectorAll('.portfolio__item');
const portfolioCards = document.querySelectorAll('.portfolio__card');

portfolioFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        portfolioFilters.forEach(f => f.classList.remove('active-portfolio'));
        // Add active class to clicked filter
        filter.classList.add('active-portfolio');

        const category = filter.getAttribute('data-filter');

        portfolioCards.forEach(card => {
            card.style.display = 'none'; // Hide all initially
            if(category === 'all' || card.classList.contains(category.substring(1))) {
                card.style.display = 'block'; // Show matching
            }
        });
    });
});

/*==================== SCROLL UP ====================*/
const scrollUpButton = document.getElementById('scroll-up')

if(scrollUpButton) {
    window.addEventListener('scroll', () => {
        if(window.scrollY >= 560) {
            scrollUpButton.classList.add('show-scroll')
        } else {
            scrollUpButton.classList.remove('show-scroll')
        }
    })
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')
        const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if(link){
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                link.classList.add('active-link')
            }else{
                link.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SCROLL REVEAL ANIMATIONS ====================*/
const revealElements = document.querySelectorAll('.section__title, .section__subtitle, .about__img, .about__data, .skills__content, .services__content, .portfolio__card, .contact__information, .footer__container');

const revealScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if(elementTop < window.innerHeight - elementVisible) {
            element.classList.add('scroll-reveal');
        }
    });
};

window.addEventListener('scroll', revealScroll);
// Run once on load
setTimeout(revealScroll, 100);



/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
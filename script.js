// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

//scroll section
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let lastScrollTop = 0; 

window.onscroll = () => {
    let currentScrollTop = window.scrollY;
    let scrollingDown = currentScrollTop > lastScrollTop;
    let windowHeight = window.innerHeight;
    
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100; 
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        let isSectionVisible = (top + windowHeight > offset) && (top < offset + height);
        
        if (isSectionVisible) {
            if (scrollingDown) {
                let scrolledIntoSection = top + windowHeight - offset;
                let visiblePercent = (scrolledIntoSection / height) * 100;
                
                if (visiblePercent >= 20) {
                    navLinks.forEach(links => {
                        links.classList.remove('active');
                        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                    });
                    sec.classList.add('show-animate');
                }
            } else {
                if (top < offset + height && top >= offset) {
                    let sectionTopVisibility = ((offset + height - top) / height) * 100;
                    
                    if (sectionTopVisibility == 90) {
                        let currentIndex = Array.from(sections).indexOf(sec);
                        if (currentIndex > 0) {
                            let prevSection = sections[currentIndex - 1];
                            let prevId = prevSection.getAttribute('id');
                            
                            navLinks.forEach(links => {
                                links.classList.remove('active');
                                document.querySelector('header nav a[href*=' + prevId + ']').classList.add('active');
                            });
                            
                            prevSection.classList.add('show-animate');
                        }
                    } else {
                        navLinks.forEach(links => {
                            links.classList.remove('active');
                            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                        });
                        sec.classList.add('show-animate');
                    }
                }
            }
        } else {
            sec.classList.remove('show-animate');
        }
    });
    
    lastScrollTop = currentScrollTop;

    //sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    //remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    //animation footer on scroll
    let footer = document.querySelector('footer');
    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username');
    if (token) {
        // display users info
        const emailElement = document.getElementById('email');
        const usernameElement = document.getElementById('username');

        if (emailElement) {
            emailElement.textContent = email;
        }
        if (usernameElement) {
            usernameElement.textContent = username;
        }

        //display/hide concerning button
        document.getElementById('profile-btn').style.display = 'block';
        document.querySelector('a[href="profile_section/signup.html"]').style.display = 'none';
        document.querySelector('a[href="profile_section/login.html"]').style.display = 'none';

        // add logout event listener
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('token');
                localStorage.removeItem('email');
                localStorage.removeItem('username');
                alert('You have been logged out.');
                window.location.href = 'profile_section/login.html';
            });
        }

        // add fetch admin dashboard event listener
        const fetchDashboardButton = document.getElementById('fetchDashboard');
        if (fetchDashboardButton) {
            fetchDashboardButton.addEventListener('click', async () => {
                if (!token) {
                    alert('No token found. Please log in.');
                    return;
                }

                try {
                    const response = await fetch('http://localhost:5000/api/admin/dashboard', {
                        method: 'GET',
                        headers: {
                            'x-auth-token': token
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    document.getElementById('dashboardData').textContent = JSON.stringify(data, null, 2);
                } catch (error) {
                    console.error('Error fetching admin dashboard:', error);
                }
            });
        }

    }
});

// active hamburger menu 
let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist")
menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});

// remove navlist
navlist.addEventListener("click", () => {
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("open");
})



// rotate text js code 
let text = document.querySelector(".text p");

text.innerHTML = text.innerHTML.split("").map((char, i) =>
    `<b style="transform:rotate(${i * 6.3}deg")>${char}</b>`
).join("");


// switch between about buttons 

const buttons = document.querySelectorAll('.about-btn button');
const contents = document.querySelectorAll('.content');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        contents.forEach(content => content.style.display = 'none');
        contents[index].style.display = 'block';
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});



// portfolio fillter 

var mixer = mixitup('.portfolio-gallery', {
    selectors: {
        target: '.portfolio-box'
    },
    animation: {
        duration: 500
    }
});


// Initialize swiperjs 

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    breakpoints: {
        576: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
    }
});



//   skill Progress bar 

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll", () => {
    if (!skillsPlayed)
        skillsCounter();
})


function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;
    if (window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}

function updateCount(num, maxNum) {
    let currentNum = +num.innerText;

    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum)
        }, 12)
    }
}


let skillsPlayed = false;

function skillsCounter() {
    if (!hasReached(first_skill)) return;
    skillsPlayed = true;
    sk_counters.forEach((counter, i) => {
        let target = +counter.dataset.target;
        let strokeValue = 465 - 465 * (target / 100);

        progress_bars[i].style.setProperty("--target", strokeValue);

        setTimeout(() => {
            updateCount(counter, target);
        }, 400)
    });

    progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}


// side progress bar 

let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;

    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);

    if (pos > 100) {
        scrollProgress.style.display = "grid";
    } else {
        scrollProgress.style.display = "none";
    }

    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });

    scrollProgress.style.background = `conic-gradient(#fff ${scrollValue}%,#e6006d ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;


// active menu 

let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll('section');

function activeMenu() {
    let len = section.length;
    while (--len && window.scrollY + 97 < section[len].offsetTop) { }
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll", activeMenu);

// scroll reveal

ScrollReveal({
    distance: "90px",
    duration: 2000,
    delay: 200,
    // reset: true ,
});


ScrollReveal().reveal('.hero-info,.main-text,.proposal,.heading', { origin: "top" });
ScrollReveal().reveal('.about-img,.fillter-buttons,.contact-info', { origin: "left" });
ScrollReveal().reveal('.about-content,.skills', { origin: "right" });
ScrollReveal().reveal('.allServices,.portfolio-gallery,.blog-box,footer,.img-hero', { origin: "bottom" });


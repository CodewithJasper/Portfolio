let sections = document.querySelectorAll('section');
let navigation = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 270;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navigation.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*='+ id + ']').classList.add('active');
            });
        };
    });
};

const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
const slideWidth = slides.clientWidth;
slides.style.transform = `translateX(-${index * slideWidth}px)`;
updateDots(index);
currentSlide = index;
}

function updateDots(index) {
dots.forEach(dot => dot.classList.remove('active'));
dots[index].classList.add('active');
}

showSlide(0);

const slides2 = document.querySelector('.slides2');
const dots2 = document.querySelectorAll('.dot2');
let currentSlide2 = 0;

function showSlide2(index) {
const slideWidth = slides2.clientWidth;
slides2.style.transform = `translateX(-${index * slideWidth}px)`;
updateDots2(index);
currentSlide2 = index;
}

function updateDots2(index) {
dots2.forEach(dot2 => dot2.classList.remove('active'));
dots2[index].classList.add('active');
}

showSlide2(0);

const slides3 = document.querySelector('.slides3');
const dots3 = document.querySelectorAll('.dot3');
let currentSlide3 = 0;

function showSlide3(index) {
const slideWidth = slides3.clientWidth;
slides3.style.transform = `translateX(-${index * slideWidth}px)`;
updateDots3(index);
currentSlide3 = index;
}

function updateDots3(index) {
dots3.forEach(dot3 => dot3.classList.remove('active'));
dots3[index].classList.add('active');
}

showSlide3(0);

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const validationError = document.getElementById('validationError');
const clearConfirm = document.getElementById('clearConfirm');
const clearBtn = document.getElementById('clearBtn');
const confirmClear = document.getElementById('confirmClear');
const cancelClear = document.getElementById('cancelClear');

function showMessage(messageElement) {
    messageElement.style.display = 'flex';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('first_name').value.trim();
    const lastName = document.getElementById('last_name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (firstName && lastName && email && subject && message) {
        fetch('contact.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                first_name: firstName,
                last_name: lastName,
                email: email,
                subject: subject,
                message: message,
            })
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            showMessage(successMessage);
            contactForm.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            showMessage(validationError);
        });
    } else {
        showMessage(validationError);
    }
});

clearBtn.addEventListener('click', () => {
    clearConfirm.style.display = 'flex';
});

confirmClear.addEventListener('click', () => {
    contactForm.reset();
    clearConfirm.style.display = 'none';
});

cancelClear.addEventListener('click', () => {
    clearConfirm.style.display = 'none';
});
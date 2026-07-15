// WebVerge Interactive Behaviors
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for all anchor links (including navbar)
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

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Hero text animation (staggered reveal)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        text.split(' ').forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.transform = 'translateY(30px)';
            span.style.transition = `all 0.6s ease ${index * 0.1}s`;
            heroTitle.appendChild(span);
        });
        
        // Trigger animation after 300ms
        setTimeout(() => {
            document.querySelectorAll('.hero h1 span').forEach(span => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            });
        }, 300);
    }


});



const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector("button");

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const templateParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        company: document.getElementById("company").value,
        serviceType: document.getElementById("serviceType").value
    };

    emailjs.send(
        "service_bs0vops",
        "template_vna5tgz",
        templateParams
    )
    .then(function () {
        formMessage.style.color = "green";
        formMessage.textContent =
            "✅ Thank you! Your quote request has been sent successfully.";

        contactForm.reset();

        submitBtn.disabled = false;
        submitBtn.textContent = "Get a Quote";
    })
    .catch(function (error) {
    console.error("EmailJS Error:", error);

    alert(
        "Status: " + error.status + "\n\n" +
        "Text: " + error.text
    );

    formMessage.style.color = "red";
    formMessage.textContent = "❌ Failed to send. Please try again.";

    submitBtn.disabled = false;
    submitBtn.textContent = "Get a Quote";
});
});
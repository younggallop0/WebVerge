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


    // Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY");

    document.getElementById("contactForm").addEventListener("submit", function(e) {
        e.preventDefault();

        // Get form values
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let message = document.getElementById("message").value;

        // Send Email
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            from_name: name,
            from_email: email,
            phone_number: phone,
            message: message
        })
        .then(function(response) {

            alert("Message sent successfully!");

            // WhatsApp message
            let whatsappMessage =
`New Contact Message:

Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}`;

            // Your WhatsApp number
            let whatsappNumber = "2349167610126";

            // Open WhatsApp
            window.open(
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
                "_blank"
            );

            // Reset form
            document.getElementById("contactForm").reset();

        }, function(error) {
            alert("Failed to send message.");
            console.log(error);
        });
    });

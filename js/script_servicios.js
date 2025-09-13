        // Loading animation
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loadingOverlay').classList.add('fade-out');
            }, 800);
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar-custom');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Animate on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Service cards hover effects
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.service-icon');
                const button = this.querySelector('.service-btn');
                
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                button.style.transform = 'translateY(-2px)';
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.service-icon');
                const button = this.querySelector('.service-btn');
                
                icon.style.transform = 'scale(1) rotate(0deg)';
                button.style.transform = 'translateY(0)';
            });
        });

        // Tech icons animation
        document.querySelectorAll('.tech-icon').forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                const i = this.querySelector('i');
                i.style.transform = 'scale(1.2) rotate(10deg)';
                i.style.color = '#e67e22';
            });
            
            icon.addEventListener('mouseleave', function() {
                const i = this.querySelector('i');
                i.style.transform = 'scale(1) rotate(0deg)';
                i.style.color = '#f39c12';
            });
        });

        // Process steps animation
        document.querySelectorAll('.process-step').forEach((step, index) => {
            step.addEventListener('mouseenter', function() {
                const number = this.querySelector('.process-number');
                number.style.transform = 'scale(1.1)';
                number.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
            });
            
            step.addEventListener('mouseleave', function() {
                const number = this.querySelector('.process-number');
                number.style.transform = 'scale(1)';
                number.style.background = 'linear-gradient(135deg, #1a2332 0%, #2c3e50 100%)';
            });
        });

        // Parallax effect for page header
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.page-header');
            if (header) {
                header.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });

        // Typing effect for page title
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing animation
        setTimeout(() => {
            const pageTitle = document.querySelector('.page-header h1');
            if (pageTitle) {
                const originalText = pageTitle.textContent;
                typeWriter(pageTitle, originalText, 70);
            }
        }, 1200);

        // Add ripple effect to buttons
        document.querySelectorAll('.service-btn, .cta-button').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255,255,255,0.3)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.pointerEvents = 'none';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            .service-btn, .cta-button {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);

        // Staggered animations for process steps
        const processSteps = document.querySelectorAll('.process-step');
        processSteps.forEach((step, index) => {
            step.style.animationDelay = `${index * 0.2}s`;
        });

        // Smooth scroll for internal links
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
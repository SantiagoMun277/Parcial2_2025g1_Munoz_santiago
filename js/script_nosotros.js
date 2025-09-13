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

        // Add interactive hover effects for team members
        document.querySelectorAll('.team-member').forEach(member => {
            member.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            member.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add hover effects for skill items
        document.querySelectorAll('.skill-item').forEach(skill => {
            skill.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.skill-icon i');
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.color = '#e67e22';
            });
            
            skill.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.skill-icon i');
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = '#f39c12';
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

        // Add staggered animations to timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
        });

        // Add typing effect to page title
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

        // Initialize typing animation after page load
        setTimeout(() => {
            const pageTitle = document.querySelector('.page-header h1');
            if (pageTitle) {
                const originalText = pageTitle.textContent;
                typeWriter(pageTitle, originalText, 80);
            }
        }, 1200);

        // Add interactive effects to MVV cards
        document.querySelectorAll('.mvv-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.mvv-icon i');
                icon.style.transform = 'scale(1.2) rotate(15deg)';
                this.style.borderColor = '#f39c12';
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.mvv-icon i');
                icon.style.transform = 'scale(1) rotate(0deg)';
                this.style.borderColor = 'transparent';
            });
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
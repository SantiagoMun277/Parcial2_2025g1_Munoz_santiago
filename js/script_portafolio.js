      // Loading animation
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loadingOverlay').classList.add('fade-out');
            }, 1000);
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

        // Portfolio Filter Functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
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

        // Counter animation
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'));
            let count = 0;
            const speed = target / 100;
            
            const updateCount = () => {
                if (count < target) {
                    count += Math.ceil(speed);
                    if (count > target) count = target;
                    element.textContent = count;
                    requestAnimationFrame(updateCount);
                }
            };
            updateCount();
        }

        // Animate counters when they come into view
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.stat-number').forEach(counter => {
            counterObserver.observe(counter);
        });

        // Portfolio item hover effects
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Project modal/detail functions
        function openProject(projectId) {
            // Esta función se puede expandir para abrir modales con más detalles
            console.log(`Abriendo proyecto: ${projectId}`);
            
            // Ejemplo de implementación simple
            alert(`Ver detalles del proyecto ${projectId}. \n\nEsta funcionalidad puede expandirse para mostrar un modal con más información, galería de imágenes, testimonios del cliente, etc.`);
        }

        // Smooth scrolling for anchor links
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

        // Portfolio items staggered animation on page load
        setTimeout(() => {
            document.querySelectorAll('.portfolio-item').forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 1500);

        // Add click ripple effect to buttons
        document.querySelectorAll('.cta-button-white, .filter-btn').forEach(button => {
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
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
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
        `;
        document.head.appendChild(style);

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        });

        // Dynamic portfolio loading (simulación)
        function loadMoreProjects() {
            // Esta función podría cargar más proyectos dinámicamente
            console.log('Cargando más proyectos...');
        }

        // Search functionality (opcional)
        function searchProjects(query) {
            const items = document.querySelectorAll('.portfolio-item');
            items.forEach(item => {
                const title = item.querySelector('.portfolio-title').textContent.toLowerCase();
                const description = item.querySelector('.portfolio-description').textContent.toLowerCase();
                const tags = Array.from(item.querySelectorAll('.portfolio-tag')).map(tag => tag.textContent.toLowerCase());
                
                if (title.includes(query.toLowerCase()) || 
                    description.includes(query.toLowerCase()) || 
                    tags.some(tag => tag.includes(query.toLowerCase()))) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
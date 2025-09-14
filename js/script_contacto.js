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

        // Form validation and submission
        const contactForm = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');

        // Real-time validation
        const validators = {
            firstName: (value) => value.trim().length >= 2 ? null : 'El nombre debe tener al menos 2 caracteres',
            lastName: (value) => value.trim().length >= 2 ? null : 'El apellido debe tener al menos 2 caracteres',
            email: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value) ? null : 'Por favor ingresa un email válido';
            },
            phone: (value) => {
                if (!value.trim()) return null; // Optional field
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                return phoneRegex.test(value.replace(/[\s\-\(\)]/g, '')) ? null : 'Por favor ingresa un número válido';
            },
            service: (value) => value ? null : 'Por favor selecciona un servicio',
            message: (value) => value.trim().length >= 10 ? null : 'El mensaje debe tener al menos 10 caracteres'
        };

        // Add real-time validation to form fields
        Object.keys(validators).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                field.addEventListener('blur', () => validateField(field, validators[fieldName]));
                field.addEventListener('input', () => {
                    if (field.classList.contains('is-invalid')) {
                        validateField(field, validators[fieldName]);
                    }
                });
            }
        });

        function validateField(field, validator) {
            const error = validator(field.value);
            const feedbackElement = field.nextElementSibling;
            
            if (error) {
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
                if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                    feedbackElement.textContent = error;
                }
                return false;
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
                if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
                    feedbackElement.textContent = '';
                }
                return true;
            }
        }

        // Form submission
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            Object.keys(validators).forEach(fieldName => {
                const field = document.getElementById(fieldName);
                if (field && !validateField(field, validators[fieldName])) {
                    isValid = false;
                }
            });

            if (!isValid) {
                // Scroll to first invalid field
                const firstInvalid = contactForm.querySelector('.is-invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstInvalid.focus();
                }
                return;
            }

            // Show loading state
            const originalContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enviando...</span>';

            try {
                // Simulate form submission (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                contactForm.style.display = 'none';
                successMessage.classList.add('show');
                
                // Reset form after success
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.querySelectorAll('.is-valid').forEach(field => {
                        field.classList.remove('is-valid');
                    });
                    contactForm.style.display = 'block';
                    successMessage.classList.remove('show');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalContent;
                }, 5000);
                
            } catch (error) {
                console.error('Error sending form:', error);
                alert('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
            }
        });

        // Character counter for message field
        const messageField = document.getElementById('message');
        const messageContainer = messageField.parentElement;
        
        const charCounter = document.createElement('small');
        charCounter.className = 'text-muted float-end';
        charCounter.style.marginTop = '0.25rem';
        messageContainer.appendChild(charCounter);

        messageField.addEventListener('input', function() {
            const length = this.value.length;
            charCounter.textContent = `${length}/500 caracteres`;
            
            if (length > 500) {
                charCounter.classList.remove('text-muted');
                charCounter.classList.add('text-danger');
                this.value = this.value.substring(0, 500);
            } else {
                charCounter.classList.remove('text-danger');
                charCounter.classList.add('text-muted');
            }
        });

        // Auto-resize textarea
        messageField.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

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

        // Contact card hover effects
        document.querySelectorAll('.contact-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add click ripple effect to submit button
        submitBtn.addEventListener('click', function(e) {
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

        // Copy contact info to clipboard
        document.querySelectorAll('.contact-link').forEach(link => {
            if (link.textContent.includes('@') || link.textContent.includes('+')) {
                link.addEventListener('click', function(e) {
                    if (this.href.startsWith('mailto:') || this.href.startsWith('tel:')) {
                        return; // Let default behavior handle email/phone links
                    }
                    
                    e.preventDefault();
                    navigator.clipboard.writeText(this.textContent).then(() => {
                        // Show tooltip or notification
                        const originalText = this.textContent;
                        this.textContent = '¡Copiado!';
                        setTimeout(() => {
                            this.textContent = originalText;
                        }, 2000);
                    });
                });
            }
        });

        // Initialize character counter
        messageField.dispatchEvent(new Event('input'));



        // ///////////////

         document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const form = e.target;
            const formData = new FormData(form);
            let isValid = true;
            
            // Reset previous validation states
            const inputs = form.querySelectorAll('.form-control, .form-select');
            inputs.forEach(input => {
                input.classList.remove('is-invalid', 'is-valid');
                const feedback = input.parentNode.querySelector('.invalid-feedback');
                if (feedback) feedback.textContent = '';
            });
            
            // Validate required fields
            const requiredFields = ['firstName', 'lastName', 'email', 'service', 'message'];
            requiredFields.forEach(fieldName => {
                const field = form.querySelector(`[name="${fieldName}"]`);
                const value = formData.get(fieldName);
                
                if (!value || value.trim() === '') {
                    field.classList.add('is-invalid');
                    const feedback = field.parentNode.querySelector('.invalid-feedback');
                    if (feedback) feedback.textContent = 'Este campo es obligatorio';
                    isValid = false;
                } else {
                    field.classList.add('is-valid');
                }
            });
            
            // Validate email
            const emailField = form.querySelector('[name="email"]');
            const emailValue = formData.get('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailValue && !emailRegex.test(emailValue)) {
                emailField.classList.remove('is-valid');
                emailField.classList.add('is-invalid');
                const feedback = emailField.parentNode.querySelector('.invalid-feedback');
                if (feedback) feedback.textContent = 'Por favor ingresa un email válido';
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = document.getElementById('submitBtn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enviando...</span>';
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    
                    // Show success message
                    const successMessage = document.getElementById('successMessage');
                    successMessage.classList.add('show');
                    
                    // Reset form
                    form.reset();
                    inputs.forEach(input => {
                        input.classList.remove('is-invalid', 'is-valid');
                    });
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Hide success message after 10 seconds
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 10000);
                    
                }, 2000);
            }
        });
        
        // Add floating labels effect
        const inputs = document.querySelectorAll('.form-control, .form-select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentNode.classList.remove('focused');
                }
            });
        });
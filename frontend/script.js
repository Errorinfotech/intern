
// Main Initialization Function
const initApp = () => {
    // DOM Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const packageButtons = document.querySelectorAll('.package-button');

    // Mobile Menu Toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && menuToggle) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Package Selection Functionality
    packageButtons.forEach(button => {
        button.addEventListener('click', function () {
            const packageCard = this.closest('.package-card');
            const packageName = packageCard.querySelector('h3').textContent;
            const packageType = packageName.toLowerCase().includes('basic') ? 'basic' :
                packageName.toLowerCase().includes('pro') ? 'pro' : 'enterprise';

            const packageSelect = document.getElementById('package');
            const experienceSelect = document.getElementById('experience');

            if (packageSelect) {
                packageSelect.value = packageType;

                // Auto-select duration based on package
                if (experienceSelect) {
                    if (packageType === 'basic') experienceSelect.value = '1.5';
                    else if (packageType === 'pro') experienceSelect.value = '3';
                    else if (packageType === 'enterprise') experienceSelect.value = '6';
                }

                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
                packageSelect.focus();
                // Trigger validation
                const event = new Event('change', { bubbles: true });
                packageSelect.dispatchEvent(event);
                if (experienceSelect) experienceSelect.dispatchEvent(event);
            }
        });
    });

    // Handle package dropdown changes to auto-select duration
    const globalPackageSelect = document.getElementById('package');
    const globalExperienceSelect = document.getElementById('experience');

    if (globalPackageSelect && globalExperienceSelect) {
        globalPackageSelect.addEventListener('change', function () {
            const packageType = this.value.toLowerCase();
            if (packageType === 'basic') globalExperienceSelect.value = '1.5';
            else if (packageType === 'pro') globalExperienceSelect.value = '3';
            else if (packageType === 'enterprise') globalExperienceSelect.value = '6';

            // Trigger validation for experience dropdown
            const event = new Event('change', { bubbles: true });
            globalExperienceSelect.dispatchEvent(event);
        });
    }

    // --- NEW: Universal Click Handler for All Boxes ---
    document.addEventListener('click', (e) => {
        // 1. Logo Click -> Go to Home
        if (e.target.closest('.logo')) {
            window.location.href = 'index.html';
            return;
        }

        // 2. Package Card Click -> Scroll to Form & Trigger Button Click
        const packageCard = e.target.closest('.package-card');
        if (packageCard && !e.target.closest('.package-button')) {
            const btn = packageCard.querySelector('.package-button');
            if (btn) btn.click();
            return;
        }

        // 3. Floating Hero Cards -> Scroll to matching Operation Section
        const floatingCard = e.target.closest('.floating-card');
        if (floatingCard) {
            const cardText = floatingCard.textContent.trim().toLowerCase();
            let targetId = 'operations'; // Default

            if (cardText.includes('strategy')) targetId = 'strategy-planning';
            else if (cardText.includes('branding')) targetId = 'branding-positioning';
            else if (cardText.includes('lead')) targetId = 'lead-generation';
            else if (cardText.includes('sales')) targetId = 'sales-conversion';
            else if (cardText.includes('hr') || cardText.includes('team')) targetId = 'hr-team';
            else if (cardText.includes('finance')) targetId = 'finance-accounts';

            const target = document.getElementById(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
            return;
        }

        // 4. Highlight Cards -> Simple feedback or scroll to About (Company)
        if (e.target.closest('.highlight-card')) {
            const companySection = document.getElementById('company');
            if (companySection) {
                companySection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
};

// Comprehensive Real-time Form Validation
const initValidation = () => {
    const form = document.getElementById('internshipForm');
    if (!form) return;

    const fields = {
        fullName: {
            el: document.getElementById('fullName'),
            requiredMsg: "Full Name is required.",
            invalidMsg: "Please enter valid full name (Surname Name Fathername).",
            validate: (val) => {
                const parts = val.trim().split(/\s+/);
                return parts.length >= 3 && parts.every(part => part.length >= 2);
            }
        },
        email: {
            el: document.getElementById('email'),
            requiredMsg: "Email Address is required.",
            invalidMsg: "Please enter a valid email address.",
            validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
        },
        phone: {
            el: document.getElementById('phone'),
            requiredMsg: "Phone number is required.",
            invalidMsg: "Phone number must be 10 digits after +91-.",
            validate: (val) => {
                const digits = val.replace('+91-', '').replace(/\D/g, '');
                return val.startsWith('+91-') && digits.length === 10;
            }
        },
        program: {
            el: document.getElementById('program'),
            requiredMsg: "Please select an internship program.",
            invalidMsg: "Please select your internship program.",
            validate: (val) => val !== "" && !val.includes('Select')
        },
        package: {
            el: document.getElementById('package'),
            requiredMsg: "Please select a package.",
            invalidMsg: "Please select your package.",
            validate: (val) => val !== "" && !val.includes('Select')
        },
        experience: {
            el: document.getElementById('experience'),
            requiredMsg: "Please select internship duration.",
            invalidMsg: "Please select internship duration.",
            validate: (val) => val !== "" && !val.includes('Select')
        },
        readyToCommit: {
            el: document.getElementById('readyToCommit'),
            requiredMsg: "Please select an answer.",
            invalidMsg: "Please select your commitment.",
            validate: (val) => val !== "" && (val === 'Yes' || val === 'No')
        }
    };

    const termsCheckbox = document.getElementById('terms');
    const termsLabel = form.querySelector('.checkbox-label');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Setup each field
    Object.values(fields).forEach(field => {
        if (!field.el) return;

        // Create error message box if not exists
        let errorBox = document.getElementById(`${field.el.id}-error`);
        if (!errorBox) {
            errorBox = document.createElement('div');
            errorBox.className = 'error-message-box';
            errorBox.id = `${field.el.id}-error`;
            errorBox.textContent = field.requiredMsg;
            const formGroup = field.el.closest('.form-group');
            if (formGroup) {
                formGroup.appendChild(errorBox);
            } else {
                field.el.parentNode.appendChild(errorBox);
            }
        }

        // Real-time validation
        field.el.addEventListener('input', () => validateField(field));
        field.el.addEventListener('blur', () => validateField(field, true));
        field.el.addEventListener('change', () => validateField(field));
    });

    // Terms checkbox listener is now handled by pure HTML/Label
    if (termsLabel) {
        termsLabel.addEventListener('click', () => {
             // Logic removed as checkbox is now always enabled
        });
    }

    function validateField(field, isBlur = false) {
        if (!field.el) return;
        const val = field.el.value.trim();
        // More robust empty check
        const isEmpty = val === "" || (field.el.id === 'phone' && (val === '+91-' || val === '+91'));
        const isValid = field.validate(val);
        const errorBox = document.getElementById(`${field.el.id}-error`);

        if (isValid) {
            field.el.classList.add('input-valid');
            field.el.classList.remove('input-invalid');
            if (errorBox) errorBox.classList.remove('show');
        } else {
            // Update error text based on empty vs invalid
            if (errorBox) {
                errorBox.textContent = isEmpty ? field.requiredMsg : field.invalidMsg;
            }

            // SHOW ERROR:
            // 1. If user blurred the field (moved away)
            // 2. If user is typing AND it's not empty (but still invalid)
            // 3. If field is explicitly empty AND we want to show required status (on blur)
            const shouldShowError = isBlur || (!isEmpty);

            if (shouldShowError) {
                field.el.classList.add('input-invalid');
                field.el.classList.remove('input-valid');
                if (errorBox) errorBox.classList.add('show');
            } else {
                field.el.classList.remove('input-valid', 'input-invalid');
                if (errorBox) errorBox.classList.remove('show');
            }
        }
        checkFormValidity();
    }

    checkFormValidityGlobal = checkFormValidity;

    function checkFormValidity() {
        const allFieldsValid = Object.values(fields).every(field => {
            if (!field.el) return true;
            return field.validate(field.el.value);
        });

        if (submitBtn) {
            // Only disable if explicitly submitting
            // termsCheckbox check is still good for safety
            submitBtn.disabled = false; 
        }
    }

    // Phone Auto-formatting and Prefix Lock
    const phoneInput = fields.phone.el;
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let val = e.target.value;
            if (!val.startsWith('+91-')) {
                e.target.value = '+91-' + val.replace(/^\+91-/, '').replace(/\D/g, '');
            }

            let digits = e.target.value.replace('+91-', '').replace(/\D/g, '');
            if (digits.length > 10) digits = digits.substring(0, 10);
            e.target.value = '+91-' + digits;

            validateField(fields.phone);
        });

        phoneInput.addEventListener('focus', (e) => {
            if (e.target.value === '') {
                e.target.value = '+91-';
            }
        });

        phoneInput.addEventListener('keydown', (e) => {
            // Prevent deleting +91-
            if ((e.key === 'Backspace' || e.key === 'Delete') && e.target.selectionStart <= 4) {
                e.preventDefault();
            }
        });
    }

    // Initial check
};

let checkFormValidityGlobal = () => { };

const initFormSubmission = () => {
    const forms = [
        { id: 'internshipForm', endpoint: '/api/forms/submit' },
        { id: 'quickContactForm', endpoint: '/api/forms/submit' }
    ];

    forms.forEach(formConfig => {
        const form = document.getElementById(formConfig.id);
        if (!form) return;

        // Prevent attaching multiple listeners
        if (form.getAttribute('data-listener-attached')) return;
        form.setAttribute('data-listener-attached', 'true');

        let isSubmitting = false;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (isSubmitting) return;

            const submitBtn = form.querySelector('button[type="submit"]');
            if (!submitBtn) return;
            const originalText = submitBtn.innerHTML;

            // Clear any existing messages EVERYWHERE in this form
            form.querySelectorAll('.success-message-box, .submit-error-message-box').forEach(el => el.remove());

            isSubmitting = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            if (formConfig.id === 'quickContactForm') {
                data.fullName = data.name || data.fullName;
                data.phone = 'N/A';
                data.program = 'Quick Contact Message';
                data.package = 'N/A';
                data.experience = 'N/A';
                data.readyToCommit = 'N/A';
            }

            const showMessage = (type, text) => {
                // Final safety check: remove any other message box first
                form.querySelectorAll('.success-message-box, .submit-error-message-box').forEach(el => el.remove());

                const msgBox = document.createElement('div');
                msgBox.className = type === 'success' ? 'success-message-box' : 'submit-error-message-box';
                msgBox.style.display = 'flex';
                const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
                msgBox.innerHTML = `<i class="fas ${icon}"></i> <span>${text}</span>`;
                form.appendChild(msgBox);

                if (type === 'success') {
                    msgBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            };

            // Bulletproof API URL Detection and Sequential Retry
            const endpoints = [];

            // ==========================================
            // 🔴 IMPORTANT CONFIGURE THIS FOR LIVE SITE 🔴
            // ==========================================
            // Replace this with your actual live backend URL (e.g. 'https://api.errorinfotech.in')
            const LIVE_BACKEND_URL = '';

            if (LIVE_BACKEND_URL) {
                endpoints.push(LIVE_BACKEND_URL);
            }

            const hostname = window.location.hostname;
            const protocol = window.location.protocol;

            // 1. Relative path (Best for production proxies where frontend and backend are on same domain)
            endpoints.push('');

            // 2. Current Origin
            endpoints.push(window.location.origin);

            // 3. Current Host with port 5002
            if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1') {
                endpoints.push(`${protocol}//${hostname}:5002`);
            }

            // 4. Common Localhost/Alternative Endpoints
            if (protocol === 'file:') {
                endpoints.push('http://127.0.0.1:5002', 'http://localhost:5002');
            } else if (hostname === 'localhost' || hostname === '127.0.0.1') {
                endpoints.push(`http://${hostname}:5002`);
                endpoints.push(hostname === 'localhost' ? 'http://127.0.0.1:5002' : 'http://localhost:5002');
            }

            // Remove duplicates and filter out trailing slashes
            const uniqueEndpoints = [...new Set(endpoints)].map(e => e ? e.replace(/\/$/, '') : e);

            console.log('🚀 Sequential connection strategy:', uniqueEndpoints);

            const attemptSubmission = async (index = 0) => {
                const baseUrl = uniqueEndpoints[index];
                if (index >= uniqueEndpoints.length) {
                    const attemptedStr = uniqueEndpoints.map(u => u || '(relative)').join(', ');
                    throw new Error(`All connection attempts failed. Tried: ${attemptedStr}. Please ensure your backend is running on port 5002.`);
                }

                console.log(`📡 [Attempt ${index + 1}] Trying: ${baseUrl}${formConfig.endpoint}`);

                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 12000); // Increased to 12s

                    const response = await fetch(`${baseUrl}${formConfig.endpoint}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(data),
                        credentials: 'include',
                        signal: controller.signal
                    });

                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        let errorDetail = response.status;
                        let errData;
                        try {
                            errData = await response.json();
                            errorDetail = errData.message || errData.error || response.status;
                        } catch (e) { }

                        // If it's a 400, 404, 405, 500, 502, 503, 504, log specific error and try next endpoint
                        // Static hosts like Hostinger or Vercel often return 400 or 405 for POSTs to static pages.
                        if ([400, 404, 405, 500, 502, 503, 504].includes(response.status)) {
                            console.warn(`⚠️ [Attempt ${index + 1}] Server returned ${response.status} (${errorDetail}). Trying next endpoint...`);
                            return attemptSubmission(index + 1);
                        }

                        throw new Error(`Server returned ${errorDetail}`);
                    }

                    return await response.json();
                } catch (error) {
                    console.warn(`⚠️ [Attempt ${index + 1}] Failed:`, error.message);

                    // If it was a network error, timeout, or aborted, try the next one
                    if (error.name === 'AbortError' ||
                        error.message.includes('fetch') ||
                        error.message.includes('Failed to fetch') ||
                        error.message.includes('NetworkError') ||
                        error.message.includes('ECONNREFUSED')) {
                        return attemptSubmission(index + 1);
                    }

                    // Otherwise, it might be a validation error from server, stop retrying
                    throw error;
                }
            };

            attemptSubmission(0)
                .then(result => {
                    console.log('✅ Success:', result);
                    if (result.success) {
                        showMessage('success', 'Submitted Successfully!');
                        form.reset();
                        // Clear validation styles
                        document.querySelectorAll('.input-valid, .input-invalid').forEach(el => {
                            el.classList.remove('input-valid', 'input-invalid');
                        });
                        document.querySelectorAll('.error-message-box').forEach(el => el.classList.remove('show'));
                        if (typeof checkFormValidityGlobal === 'function') checkFormValidityGlobal();
                    } else {
                        showMessage('error', result.message || 'Submission failed. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('❌ Final Failure:', error);
                    let errorMsg = error.message || 'Could not connect to the server.';
                    if (!LIVE_BACKEND_URL && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
                        errorMsg = 'CRITICAL ERROR: Please configure LIVE_BACKEND_URL in script.js to point to your deployed backend (e.g. https://api.errorinfotech.in). Form cannot submit on a live site without it!';
                        alert(errorMsg);
                    }
                    showMessage('error', errorMsg);
                })
                .finally(() => {
                    isSubmitting = false;
                    submitBtn.innerHTML = originalText;
                    if (formConfig.id === 'internshipForm') {
                        submitBtn.disabled = true;
                    } else {
                        submitBtn.disabled = false;
                    }
                });
        });
    });
};

// Scroll animations
const initAnimations = () => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scrolled');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.js-scroll, .section-header, .packages-grid, .company-content, .contact-container, .stage-section').forEach(el => {
        el.classList.add('js-scroll');
        observer.observe(el);
    });
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    initValidation();
    initFormSubmission();
    initAnimations();

    console.log('%c🚀 Error Infotech - Form Validation Activated', 'color: #2563eb; font-size: 16px; font-weight: bold;');
});
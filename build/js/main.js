// Mobile menu functionality
const initApp = () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn')
    const mobileMenu = document.getElementById('mobile-menu')

    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('hidden')
        
        // Animate hamburger menu
        const spans = mobileMenuBtn.querySelectorAll('span')
        spans.forEach((span, index) => {
            if (mobileMenu.classList.contains('hidden')) {
                span.style.transform = 'rotate(0deg)'
                span.style.opacity = '1'
            } else {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(6px, 6px)'
                if (index === 1) span.style.opacity = '0'
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(6px, -6px)'
            }
        })
    }

    mobileMenuBtn?.addEventListener('click', toggleMobileMenu)
    
    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu?.querySelectorAll('a')
    mobileLinks?.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu()
            }
        })
    })

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn')
    const projectCards = document.querySelectorAll('.project-card')

    const filterProjects = (category) => {
        projectCards.forEach(card => {
            if (category === 'all' || card.dataset.category.includes(category)) {
                card.style.display = 'block'
                card.style.animation = 'fadeIn 0.5s ease-in-out'
            } else {
                card.style.display = 'none'
            }
        })
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-blue-600', 'text-white')
                b.classList.add('text-gray-600', 'dark:text-gray-400')
            })
            
            btn.classList.add('active', 'bg-blue-600', 'text-white')
            btn.classList.remove('text-gray-600', 'dark:text-gray-400')
            
            // Filter projects
            const category = btn.dataset.filter
            filterProjects(category)
        })
    })

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]')
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            const targetId = link.getAttribute('href')
            const targetSection = document.querySelector(targetId)
            
            if (targetSection) {
                const headerHeight = 80
                const targetPosition = targetSection.offsetTop - headerHeight
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                })
            }
        })
    })

    // Contact form handling
    const contactForm = document.getElementById('contact-form')
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault()
        
        // Get form data
        const formData = new FormData(contactForm)
        const data = Object.fromEntries(formData)
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]')
        const originalText = submitBtn.innerHTML
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
        submitBtn.disabled = true
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
            submitBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700')
            submitBtn.classList.add('bg-green-600')
            
            // Reset form
            contactForm.reset()
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText
                submitBtn.disabled = false
                submitBtn.classList.remove('bg-green-600')
                submitBtn.classList.add('bg-blue-600', 'hover:bg-blue-700')
            }, 2000)
        }, 1500)
    })

    // Animate skill bars on scroll
    const animateSkillBars = () => {
        const skillItems = document.querySelectorAll('.skill-item')
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.bg-blue-600')
                    const width = progressBar.style.width
                    
                    progressBar.style.width = '0%'
                    setTimeout(() => {
                        progressBar.style.width = width
                        progressBar.style.transition = 'width 1.5s ease-in-out'
                    }, 200)
                    
                    observer.unobserve(entry.target)
                }
            })
        }, { threshold: 0.5 })
        
        skillItems.forEach(item => observer.observe(item))
    }

    // Initialize animations
    animateSkillBars()

    // Add scroll effect to header
    const header = document.querySelector('header')
    let lastScrollY = window.scrollY

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY
        
        if (currentScrollY > 100) {
            header.classList.add('shadow-lg')
        } else {
            header.classList.remove('shadow-lg')
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)'
        } else {
            header.style.transform = 'translateY(0)'
        }
        
        lastScrollY = currentScrollY
    })

    // Add fade-in animation for elements
    const observeElements = () => {
        const elements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-right')
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1'
                    entry.target.style.transform = 'translateY(0) translateX(0)'
                }
            })
        }, { threshold: 0.1 })
        
        elements.forEach(el => {
            el.style.opacity = '0'
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
            
            if (el.classList.contains('animate-fade-in-up')) {
                el.style.transform = 'translateY(30px)'
            } else if (el.classList.contains('animate-fade-in-right')) {
                el.style.transform = 'translateX(30px)'
            }
            
            observer.observe(el)
        })
    }

    observeElements()
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp)

// Add CSS animations
const style = document.createElement('style')
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .filter-btn.active {
        background-color: #2563eb;
        color: white;
    }
    
    header {
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }
    
    .project-card {
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }
    
    .project-card:hover {
        transform: translateY(-5px);
    }
    
    .skill-item .bg-blue-600 {
        transition: width 1.5s ease-in-out;
    }
`
document.head.appendChild(style)
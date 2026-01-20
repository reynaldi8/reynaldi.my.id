// Enhanced JavaScript for Portfolio Website

// ==================== ADMIN MODE FUNCTIONS ====================
// Expose admin functions globally for owner use
window.enableAdminMode = function() {
    localStorage.setItem('admin_mode', 'true');
    console.log('✅ Admin mode enabled! You can now delete testimonials.');
    alert('Admin mode enabled! Refresh the page to see delete buttons.');
};

window.disableAdminMode = function() {
    localStorage.removeItem('admin_mode');
    console.log('❌ Admin mode disabled.');
    alert('Admin mode disabled! Refresh the page.');
};

window.isAdminMode = function() {
    const isAdmin = localStorage.getItem('admin_mode') === 'true';
    console.log('Admin mode:', isAdmin ? 'ENABLED ✅' : 'DISABLED ❌');
    return isAdmin;
};

document.addEventListener('DOMContentLoaded', function() {
    // ==================== THEME SWITCHER ====================
    class ThemeManager {
        constructor() {
            this.html = document.documentElement;
            this.themeToggle = document.getElementById('themeToggle');
            this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.init();
        }

        init() {
            // Get saved theme or use system preference
            const savedTheme = localStorage.getItem('theme');
            const theme = savedTheme || (this.prefersDark ? 'dark' : 'light');
            this.setTheme(theme, false); // false = no transition on init

            // Listen for theme toggle
            if (this.themeToggle) {
                this.themeToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleTheme();
                });
                // Update aria-checked
                this.updateAriaLabel();
            }

            // Listen to system theme changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light', true);
                }
            });
        }

        setTheme(theme, transition = true) {
            if (transition) {
                this.html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
                setTimeout(() => {
                    this.html.style.transition = '';
                }, 300);
            }

            // Set both data-theme and light class for compatibility
            this.html.setAttribute('data-theme', theme);
            
            // Add/remove light class
            if (theme === 'light') {
                this.html.classList.add('light');
            } else {
                this.html.classList.remove('light');
            }
            
            localStorage.setItem('theme', theme);
            this.updateThemeIcon(theme);
            this.updateAriaLabel();
        }

        toggleTheme() {
            const currentTheme = this.html.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme, true);
        }

        updateThemeIcon(theme) {
            if (!this.themeToggle) return;
            const icon = this.themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }

        updateAriaLabel() {
            const currentTheme = this.html.getAttribute('data-theme') || 'dark';
            if (this.themeToggle) {
                this.themeToggle.setAttribute('aria-checked', currentTheme === 'light');
            }
        }
    }

    // Initialize theme manager
    const themeManager = new ThemeManager();

    // ==================== TECH STACK WITH SKILL RATINGS ====================
    const techSkills = [
        { name: 'SQL', icon: 'fas fa-database', level: 'Advanced', percentage: 90 },
        { name: 'Python', icon: 'fab fa-python', level: 'Advanced', percentage: 85 },
        { name: 'Power BI', icon: 'fas fa-chart-line', level: 'Advanced', percentage: 90 },
        { name: 'Tableau', icon: 'fas fa-chart-bar', level: 'Intermediate', percentage: 75 },
        { name: 'Excel', icon: 'fas fa-file-excel', level: 'Expert', percentage: 95 },
        { name: 'Data Analysis', icon: 'fas fa-chart-pie', level: 'Advanced', percentage: 85 },
        { name: 'R Programming', icon: 'fab fa-r-project', level: 'Intermediate', percentage: 70 },
        { name: 'Pandas', icon: 'fas fa-cube', level: 'Advanced', percentage: 80 },
        { name: 'Data Visualization', icon: 'fas fa-palette', level: 'Advanced', percentage: 85 },
        { name: 'ETL Tools', icon: 'fas fa-cogs', level: 'Intermediate', percentage: 75 },
        { name: 'ML Tools', icon: 'fas fa-brain', level: 'Intermediate', percentage: 70 },
        { name: 'Cloud Tools', icon: 'fas fa-cloud', level: 'Beginner', percentage: 60 }
    ];

    function renderTechStack() {
        const techStackGrid = document.getElementById('techStackGrid');
        if (!techStackGrid) return;

        techStackGrid.innerHTML = techSkills.map(skill => `
            <div class="tech-card" title="${skill.name} - ${skill.level} (${skill.percentage}%)">
                <div class="tech-header">
                    <div class="tech-icon">
                        <i class="${skill.icon}"></i>
                    </div>
                    <span class="tech-name">${skill.name}</span>
                </div>
                <div class="skill-rating">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${skill.percentage}%"></div>
                    </div>
                    <div class="skill-info">
                        <span class="skill-level">${skill.level}</span>
                        <span class="skill-percentage">${skill.percentage}%</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

        // ==================== CERTIFICATES DATA (49 Total) ====================
        const certificateData = [
            // ==================== Certificates ====================
            { id: 1, name: 'Google Advanced Data Analytics', org: 'Google', date: '2024', path: 'public/Achievments/Google Advanced Data Analytics/Google-Advanced-Data-Analytics.jpg' },
            { id: 2, name: 'Microsoft Power BI Data Analyst', org: 'Microsoft', date: '2023', path: 'public/Achievments/Microsoft Data Visualization/Microsoft-Power-BI-Data-Analyst.jpg' },
            { id: 3, name: 'Microsoft SQL Server', org: 'Microsoft', date: '2022', path: 'public/Achievments/Microsoft SQL Server/Microsoft-SQL-Server.jpg' },
            { id: 4, name: 'Tableau Business Intelligence Analyst', org: 'Tableau', date: '2022', path: 'public/Achievments/Tableau Business Intelligence Analyst/Tableau-Business-Intelligence-Analyst.jpg' },
            { id: 5, name: 'Data Visualization Fundamentals', org: 'Microsoft', date: '2023', path: 'public/Achievments/Microsoft Data Visualization/Microsoft-Data-Visualization.jpg' },
            // Google Advanced Data Analytics (9)
            { id: 6, name: 'Accelerate Your Job Search with AI', org: 'Google', date: '2024', path: 'public/Achievments/Google Advanced Data Analytics/Accelerate-Your-Job-Search-with-AI.jpg' },
            { id: 7, name: 'Foundations of Data Science', org: 'Google', date: '2024', path: 'public/Achievments/Google Advanced Data Analytics/Foundations-of-Data-Science.jpg' },
            { id: 8, name: 'Get Started with Python', org: 'Google', date: '2024', path: 'public/Achievments/Google Advanced Data Analytics/Get-Started-with-Python.jpg' },
            { id: 9, name: 'Go Beyond the Numbers', org: 'Google', date: '2024', path: 'public/Achievments/Google Advanced Data Analytics/Go-Beyond-the-Numbers-Translate-Data-into-Insights.jpg' },
            { id: 1, name: 'Google Advanced Data Analytics Capstone', org: 'Google', date: '2024', path: 'public/Achievments/Google Advanced Data Analytics/Google-Advanced-Data-Analytics-Capstone.jpg' },
            
            { id: 11, name: 'Regression Analysis', org: 'Google', date: '2024', path: 'public/Achievments/Google Advanced Data Analytics/Regression-Analysis-Simplify-Complex-Data.jpg' },
            { id: 12, name: 'The Nuts and Bolts of Machine Learning', org: 'Google', date: '2024', path: 'public/Achievments/Google Advanced Data Analytics/The-Nuts-and-Bolts-of-Machine-Learning.jpg' },
            { id: 13, name: 'The Power of Statistics', org: 'Google', date: '2024', path: 'public/Achievments/Google Advanced Data Analytics/The-Power-of-Statistics.jpg' },
            
            // Advanced Business Analytics (1)
            { id: 14, name: 'Introduction to Data Analytics for Business', org: 'Coursera', date: '2024', path: 'public/Achievments/Advanced Business Analytics/Introduction-to-Data-Analytics-for-Business.jpg' },
            
            // Exam Prep PL-300 (1)
            { id: 15, name: 'Power BI Data Analytics and Data Preparation', org: 'Microsoft', date: '2024', path: 'public/Achievments/Exam Prep PL-300 Microsoft Power BI Data Analyst Associate/Power-BI-Data-Analytics-and-Data-Preparation.jpg' },
            
            // Google Data Analytics (1)
            { id: 16, name: 'Foundations: Data, Data, Everywhere', org: 'Google', date: '2024', path: 'public/Achievments/Google Data Analytics/Foundations-Data-Data-Everywhere.jpg' },
            
            // IBM Data Management (3)
            { id: 17, name: 'Practice Test for CompTIA Data+', org: 'IBM', date: '2023', path: 'public/Achievments/IBM/IBM Data Management/Practice-Test-for-CompTIA-Data.jpg' },
            { id: 18, name: 'Excel Basics for Data Analysis', org: 'IBM', date: '2023', path: 'public/Achievments/IBM/Excel-Basics-for-Data-Analysis.jpg' },
            { id: 19, name: 'Introduction to Data Analytics', org: 'IBM', date: '2023', path: 'public/Achievments/IBM/Introduction-to-Data-Analytics.jpg' },
            
            // Microsoft Azure DP-900 (1)
            { id: 20, name: 'Explore Core Data Concepts in Microsoft Azure', org: 'Microsoft', date: '2023', path: 'public/Achievments/Microsoft Azure Data Fundamentals DP-900 Exam Prep/Explore-Core-Data-Concepts-in-Microsoft-Azure.jpg' },
            
            // Microsoft Business Analyst (2)
            { id: 21, name: 'Business Analysis Fundamentals', org: 'Microsoft', date: '2022', path: 'public/Achievments/Microsoft Business Analyst/Business-Analysis-Fundamentals.jpg' },
            { id: 22, name: 'Data for Business Analysts Using Microsoft Excel', org: 'Microsoft', date: '2022', path: 'public/Achievments/Microsoft Business Analyst/Data-for-Business-Analysts-Using-Microsoft-Excel.jpg' },
            
            // Microsoft Data Visualization (6)
            { id: 23, name: 'Data Modeling and Architecture', org: 'Microsoft', date: '2023', path: 'public/Achievments/Microsoft Data Visualization/ata-Modeling-and-Architecture.jpg' },
            { id: 24, name: 'Building Powerful Reports and Dashboards in Power BI', org: 'Microsoft', date: '2023', path: 'public/Achievments/Microsoft Data Visualization/Building-Powerful-Reports-and-Dashboards-in-Power-BI.jpg' },
            { id: 25, name: 'Data Preparation and Management', org: 'Microsoft', date: '2023', path: 'public/Achievments/Microsoft Data Visualization/Data-Preparation-and-Management.jpg' },
            { id: 26, name: 'Data Visualization Fundamentals', org: 'Microsoft', date: '2023', path: 'public/Achievments/Microsoft Data Visualization/Data-Visualization-Fundamentals.jpg' },
            { id: 27, name: 'Visualization for Data Analysis with Power BI', org: 'Microsoft', date: '2023', path: 'public/Achievments/Microsoft Data Visualization/Visualization-for-Data-Analysis-with-Power-BI.jpg' },
            
            // Microsoft Power BI Data Analyst (9)
            { id: 28, name: 'Creative Designing in Power BI', org: 'Microsoft', date: '2023', path: 'public/Achievments/Microsoft Power BI Data Analyst/Creative-Designing-in-Power-BI.jpg' },
            { id: 29, name: 'Data Analysis and Visualization with Power BI', org: 'Microsoft', date: '2023', path: 'public/Achievments/Microsoft Power BI Data Analyst/Data-Analysis-and-Visualization-with-Power-BI.jpg' },
            { id: 30, name: 'Data Modeling in Power BI', org: 'Microsoft', date: '2023', path: 'public/Achievments/Microsoft Power BI Data Analyst/Data-Modeling-in-Power-BI.jpg' },
            { id: 31, name: 'Deploy and Maintain Power BI Assets and Capstone', org: 'Microsoft', date: '2023', path: 'public/Achievments/Microsoft Power BI Data Analyst/Deploy-and-Maintain-Power-BI-Assets-and-Capstone.jpg' },
            { id: 32, name: 'Extract, Transform and Load Data in Power BI', org: 'Microsoft', date: '2023', path: 'public/Achievments/Microsoft Power BI Data Analyst/Extract-Transform-and-Load-Data-in-Power-BI.jpg' },
            { id: 33, name: 'Harnessing the Power of Data with Power BI', org: 'Microsoft', date: '2023', path: 'public/Achievments/Microsoft Power BI Data Analyst/Harnessing-the-Power-of-Data-with-Power-BI.jpg' },
            { id: 34, name: 'Microsoft PL-300 Exam Preparation and Practice', org: 'Microsoft', date: '2023', path: 'public/Achievments/Microsoft Power BI Data Analyst/Microsoft-PL-300-Exam-Preparation-and-Practice.jpg' },
            { id: 35, name: 'Preparing Data for Analysis with Microsoft Excel', org: 'Microsoft', date: '2023', path: 'public/Achievments/Microsoft Power BI Data Analyst/Preparing-Data-for-Analysis-with-Microsoft-Excel_page-0001.jpg' },
            
            // Microsoft SQL Server (6)
            { id: 36, name: 'Data Manipulation and Transactions in SQL Server', org: 'Microsoft', date: '2022', path: 'public/Achievments/Microsoft SQL Server/Data-Manipulation-and-Transactions-in-SQL-Server.jpg' },
            { id: 37, name: 'Indexing, Performance Optimization & Functions', org: 'Microsoft', date: '2022', path: 'public/Achievments/Microsoft SQL Server/Indexing-Performance-Optimization-&-Functions.jpg' }, 
            { id: 38, name: 'Relational Database Design and Advanced SQL', org: 'Microsoft', date: '2022', path: 'public/Achievments/Microsoft SQL Server/Relational-Database-Design-and-Advanced.jpg' },
            { id: 39, name: 'Security, Maintenance & Integration with BI Tools', org: 'Microsoft', date: '2022', path: 'public/Achievments/Microsoft SQL Server/Security-Maintenance-&-Integration-with-BI-Tools.jpg' },
            { id: 40, name: 'SQL Foundations', org: 'Microsoft', date: '2022', path: 'public/Achievments/Microsoft SQL Server/SQL-Foundations.jpg' },
            
            // PostgreSQL for Everybody (1)
            { id: 41, name: 'Database Design and Basic SQL in PostgreSQL', org: 'Coursera', date: '2022', path: 'public/Achievments/PostgreSQL for Everybody/Database-Design-and-Basic-SQL-in-PostgreSQL.jpg' },
            
            // Tableau Business Intelligence Analyst (9)
            { id: 42, name: 'Advanced Data Visualization with Tableau', org: 'Tableau', date: '2022', path: 'public/Achievments/Tableau Business Intelligence Analyst/Advanced-Data-Visualization-with-Tableau.jpg' },
            { id: 43, name: 'Business Analysis Process', org: 'Tableau', date: '2022', path: 'public/Achievments/Tableau Business Intelligence Analyst/Business-Analysis-Process.jpg' },
            { id: 44, name: 'Communicating Data Insights with Tableau', org: 'Tableau', date: '2022', path: 'public/Achievments/Tableau Business Intelligence Analyst/Communicating-Data-Insights-with-Tableau.jpg' },
            { id: 45, name: 'Data Analysis with Tableau', org: 'Tableau', date: '2022', path: 'public/Achievments/Tableau Business Intelligence Analyst/Data-Analysis-with-Tableau.jpg' },
            { id: 46, name: 'Data Ecosystem', org: 'Tableau', date: '2022', path: 'public/Achievments/Tableau Business Intelligence Analyst/Data-Ecosystem.jpg' },
            { id: 47, name: 'Data Visualization with Tableau', org: 'Tableau', date: '2022', path: 'public/Achievments/Tableau Business Intelligence Analyst/Data-Visualization-with-Tableau.jpg' },
            { id: 48, name: 'Introduction to Business Analytics', org: 'Tableau', date: '2022', path: 'public/Achievments/Tableau Business Intelligence Analyst/Introduction-to-Busines-Analytics.jpg' },
            { id: 49, name: 'Introduction to Tableau', org: 'Tableau', date: '2022', path: 'public/Achievments/Tableau Business Intelligence Analyst/Introduction-to-Tableau.jpg' }
            
        ];

        let displayedCerts = 6;
        let allCertsLoaded = false;

        function renderCertificates(count) {
    const grid = document.querySelector('.certificates-grid');
    const empty = document.getElementById('certificatesEmpty');
    
    if (!grid) {
        console.warn('❌ Grid tidak ditemukan');
        return;
    }
    
    console.log('📊 Rendering', count, 'dari', certificateData.length, 'certificates');
    
    if (certificateData.length === 0) {
        if (empty) empty.style.display = 'flex';
        grid.innerHTML = '';
        return;
    }
    
    if (empty) empty.style.display = 'none';
    
    // Tampilkan hanya yang diminta
    const certsToShow = certificateData.slice(0, count);
    console.log('✅ Menampilkan:', certsToShow.length, 'certificates');
    
    grid.innerHTML = certsToShow.map((cert, i) => `
        <div class="certificate-card" data-cert-id="${cert.id}" style="animation-delay: ${i * 0.05}s;">
            <div class="certificate-frame">
                <img src="${cert.path}" alt="${cert.name}" loading="lazy" title="${cert.name}" onerror="this.src='./public/Icon/python.png'">
                <div class="certificate-overlay">
                    <button class="view-certificate-btn" data-cert-path="${cert.path}" data-cert-name="${cert.name}">
                        <i class="fas fa-eye"></i>
                        <span>View Certificate</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Setup view certificate buttons
    setupCertificateViewButtons();
}

function setupCertificateViewButtons() {
    const buttons = document.querySelectorAll('.view-certificate-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const certPath = this.getAttribute('data-cert-path');
            const certName = this.getAttribute('data-cert-name');
            
            console.log('👁️ Viewing certificate:', certName);
            openCertificateViewer(certPath, certName);
        });
    });
}

function openCertificateViewer(imagePath, certName) {
    // Create modal if not exists
    let modal = document.getElementById('certificateViewerModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'certificateViewerModal';
        modal.className = 'certificate-viewer-modal';
        modal.innerHTML = `
            <div class="certificate-viewer-content">
                <button class="certificate-viewer-close">
                    <i class="fas fa-times"></i>
                </button>
                <img id="certificateViewerImage" src="" alt="Certificate" loading="lazy">
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close button handler
        modal.querySelector('.certificate-viewer-close').addEventListener('click', closeCertificateViewer);
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeCertificateViewer();
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeCertificateViewer();
            }
        });
    }
    
    // Set image source
    const imgElement = modal.querySelector('#certificateViewerImage');
    imgElement.src = imagePath;
    imgElement.onerror = () => {
        imgElement.src = './public/Icon/python.png';
    };
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCertificateViewer() {
    const modal = document.getElementById('certificateViewerModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

        function loadCertificates() {
            const grid = document.querySelector('.certificates-grid') || document.querySelector('[data-tab="certificates"] .portfolio-grid');
            const empty = document.getElementById('certificatesEmpty');
            const certificatesTab = document.querySelector('.certificates-tab');
            const seeMoreWrapper = certificatesTab ? certificatesTab.querySelector('.see-more-wrapper') : null;
            
            if (!grid) {
                setTimeout(loadCertificates, 500);
                return;
            }
            if (certificateData.length === 0) {
                if (empty) empty.style.display = 'flex';
                if (seeMoreWrapper) seeMoreWrapper.style.display = 'none';
                return;
            }
            renderCertificates(displayedCerts);
            if (empty) empty.style.display = 'none';
            
            // Setup See More button - hanya untuk certificates
            if (certificateData.length > 6) {
                if (seeMoreWrapper) {
                    seeMoreWrapper.style.display = 'flex';
                    setupCertificateSeeMoreButton(seeMoreWrapper);
                }
            } else if (seeMoreWrapper) {
                seeMoreWrapper.style.display = 'none';
            }
        }

        function setupCertificateSeeMoreButton(wrapper) {
            const btn = wrapper.querySelector('.see-more-btn');
            
            if (!btn) {
                console.warn('❌ Certificate See More button not found');
                return;
            }
            
            console.log('✅ Found certificate button:', btn.textContent.trim());
            
            // Remove old event listeners by cloning
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            // Add click handler
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🖱️ Certificate button clicked!');
                toggleCertificates(newBtn);
            });
            
            console.log('✅ Certificate button handler attached');
        }

        function toggleCertificates(btn) {
            console.log('🔄 Certificate toggle. Current state:', allCertsLoaded ? 'expanded' : 'collapsed');
            console.log('Total certificates:', certificateData.length);
            
            if (allCertsLoaded) {
                // Collapse to 6
                displayedCerts = 6;
                allCertsLoaded = false;
                btn.innerHTML = `<span>${t('see-more')}</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
                console.log('📦 Collapsed to 6 certificates');
            } else {
                // Expand to all
                displayedCerts = certificateData.length;
                allCertsLoaded = true;
                btn.innerHTML = `<span>${t('see-less')}</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
                console.log('📂 Expanded to', certificateData.length, 'certificates');
            }
            
            // Render ulang
            renderCertificates(displayedCerts);
            console.log('Rendered:', displayedCerts, 'certificates');
            
            // Scroll ke grid
            const grid = document.querySelector('.certificates-grid');
            if (grid && allCertsLoaded) {
                setTimeout(() => grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
            }
        }

    // ==================== INITIALIZE ALL FEATURES ====================
    renderTechStack();
    loadCertificates();

    // DOM Elements
    const header = document.querySelector('header');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const ctaBtn = document.querySelector('.cta-btn');
    const hireBtns = document.querySelectorAll('.hire-btn');
    const aboutBtn = document.querySelector('.about-btn');
    const socialIcons = document.querySelectorAll('.social-icon');

    // Professions for typewriter effect
    const professions = [
        'Data Analyst',
        'Business Intelligence Analyst', 
        'Data-Driven Insights',
        'Data Enthusiast',
    ];

    // Typewriter Effect for Profession Cycling
    function setupTypewriterEffect() {
        const subtitleElement = document.querySelector('.hero-subtitle');
        if (!subtitleElement) return;

        let currentProfessionIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80; // Speed of typing
        let deletingSpeed = 50; // Speed of deleting
        const pauseBeforeDelete = 2500; // Pause before starting to delete
        const pauseBeforeNext = 500; // Pause before typing next profession

        function typeWriter() {
            const currentProfession = professions[currentProfessionIndex];
            
            if (isDeleting) {
                // Deleting mode
                currentCharIndex--;
                subtitleElement.textContent = currentProfession.substring(0, currentCharIndex);
                
                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentProfessionIndex = (currentProfessionIndex + 1) % professions.length;
                    setTimeout(typeWriter, pauseBeforeNext);
                } else {
                    setTimeout(typeWriter, deletingSpeed);
                }
            } else {
                // Typing mode
                currentCharIndex++;
                subtitleElement.textContent = currentProfession.substring(0, currentCharIndex);
                
                if (currentCharIndex === currentProfession.length) {
                    // Typed full profession, now pause and prepare to delete
                    isDeleting = true;
                    setTimeout(typeWriter, pauseBeforeDelete);
                } else {
                    setTimeout(typeWriter, typingSpeed);
                }
            }
        }

        // Start typewriter effect
        typeWriter();
    }
    function toggleMobileMenu() {
        hamburger?.classList.toggle('active');
        navMenu?.classList.toggle('active');
        document.body.style.overflow = navMenu?.classList.contains('active') ? 'hidden' : 'auto';
    }

    // Smooth Scroll Navigation
    function smoothScroll(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header?.offsetHeight || 80;
                const offsetTop = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu
                if (navMenu?.classList.contains('active')) {
                    toggleMobileMenu();
                }

                // Update active state
                updateActiveNavLink(targetId);
            }
        }
    }

    // Update Active Navigation Link
    function updateActiveNavLink(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeId) {
                link.classList.add('active');
            }
        });
    }

    // Scroll-based Header Effects
    function handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    }

    // Scroll-based Active Navigation
    function updateActiveNavFromScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + (header?.offsetHeight || 80);

        let activeSection = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSection = section;
            }
        });

        if (activeSection) {
            const id = '#' + activeSection.getAttribute('id');
            updateActiveNavLink(id);
            
            // Update URL hash
            if (history.pushState) {
                history.pushState(null, null, id);
            }
        } else if (scrollPosition < 100) {
            updateActiveNavLink('#home');
        }
    }

    // Throttled scroll listener
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNavFromScroll, 50);
    });

    // Intersection Observer for Animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for multiple elements
                const siblings = entry.target.parentElement?.querySelectorAll('.animate-on-scroll');
                if (siblings && siblings.length > 1) {
                    siblings.forEach((sibling, index) => {
                        setTimeout(() => {
                            sibling.style.opacity = '1';
                            sibling.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Setup animations for elements
    function setupAnimations() {
        const animatedElements = document.querySelectorAll(
            '.hero-stats .stat, .about-highlights .highlight, .floating-card, .social-icon'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            el.style.transitionDelay = `${index * 0.1}s`;
            
            animationObserver.observe(el);
        });
    }

    // Button Click Handlers
    function handleButtonClick(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Add button-specific actions here
        if (button.classList.contains('cta-btn') || button.textContent.includes('Hire')) {
            // Scroll to contact section or show contact modal
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Fallback: show alert or modal
                showNotification('Contact section coming soon!', 'info');
            }
        } else if (button.textContent.includes('Download CV')) {
            // Handle CV download
            showNotification('CV download will be available soon!', 'info');
        }
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'info' ? 'info-circle' : 'check-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'info' ? 'var(--accent-primary)' : '#10b981',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Keyboard Navigation
    function handleKeyboard(event) {
        // Close mobile menu on Escape
        if (event.key === 'Escape' && navMenu?.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        // Navigate with arrow keys when menu is open
        if (navMenu?.classList.contains('active') && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            event.preventDefault();
            const currentActive = document.querySelector('.nav-link:focus') || document.querySelector('.nav-link.active');
            const navLinksArray = Array.from(navLinks);
            const currentIndex = navLinksArray.indexOf(currentActive);
            
            let nextIndex;
            if (event.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % navLinksArray.length;
            } else {
                nextIndex = currentIndex <= 0 ? navLinksArray.length - 1 : currentIndex - 1;
            }
            
            navLinksArray[nextIndex]?.focus();
        }
    }

    // Performance Optimized Scroll Handler
    let ticking = false;
    function optimizedScrollHandler() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Debounced Resize Handler
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Close mobile menu on resize to larger screen
            if (window.innerWidth >= 769 && navMenu?.classList.contains('active')) {
                toggleMobileMenu();
            }
        }, 250);
    }

    // Initialize Active Navigation from Hash
    function initializeActiveNav() {
        const hash = window.location.hash || '#home';
        updateActiveNavLink(hash);
        
        // Smooth scroll to section if hash exists
        if (hash !== '#home') {
            setTimeout(() => {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const headerHeight = header?.offsetHeight || 80;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }, 500);
        }
    }

    // Event Listeners
    hamburger?.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });

    // Button event listeners
    [ctaBtn, ...hireBtns, aboutBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', handleButtonClick);
        }
    });

    // Social icons hover effects
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Global event listeners
    window.addEventListener('scroll', optimizedScrollHandler);
    window.addEventListener('resize', handleResize);
    window.addEventListener('hashchange', initializeActiveNav);
    document.addEventListener('keydown', handleKeyboard);

    // Handle clicks outside mobile menu
    document.addEventListener('click', (event) => {
        if (navMenu?.classList.contains('active') && 
            !navMenu.contains(event.target) && 
            !hamburger?.contains(event.target)) {
            toggleMobileMenu();
        }
    });

    // Language switcher - add event listener
    const langPill = document.querySelector('.lang-pill');
    if (langPill) {
        langPill.addEventListener('click', (e) => {
            e.preventDefault();
            const currentLang = getCurrentLanguage();
            const newLang = currentLang === 'en' ? 'id' : 'en';
            switchLanguage(newLang);
        });
    }

    // Initialize everything
    function init() {
        // Initialize language system
        initializeLanguage();
        
        // Setup typewriter effect
        setupTypewriterEffect();
        
        // Setup animations
        setupAnimations();
        
        // Initialize navigation
        initializeActiveNav();
        
        // Initial scroll check
        handleScroll();
        
        // Add loaded class for CSS animations
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
        
        console.log('Portfolio website initialized successfully! 🚀');
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Simulate form submission (replace with actual API call)
            console.log('Form submitted:', data);

            // Show success message
            showNotification('Thank you for your message! I will get back to you soon.', 'success');

            // Reset form
            this.reset();
        });
    }

    // Initialize New Portfolio Tabs
    (function setupNewPortfolioTabs(){
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        if(!tabBtns.length) return;
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                // Remove active from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active to clicked button and corresponding content
                btn.classList.add('active');
                document.querySelector(`.tab-content[data-tab="${targetTab}"]`)?.classList.add('active');
                
                // Reset certificates state jika certificates tab diklik
                if (targetTab === 'certificates') {
                    console.log('🔄 Certificates tab clicked - resetting state');
                    displayedCerts = 6;
                    allCertsLoaded = false;
                    loadCertificates();
                }
            });
        });
        
        // Set first tab as active by default
        if(tabBtns.length > 0) {
            tabBtns[0].classList.add('active');
            const firstTab = tabBtns[0].getAttribute('data-tab');
            document.querySelector(`.tab-content[data-tab="${firstTab}"]`)?.classList.add('active');
        }
    })();

    // Setup See More buttons for all tabs
    (function setupSeeMoreButtons(){
        const seeMoreBtns = document.querySelectorAll('.see-more-btn');
        
        seeMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get parent tab content
                const tabContent = btn.closest('.tab-content');
                if(!tabContent) return;
                
                // Skip certificates tab - handled by loadCertificates()
                if(tabContent.classList.contains('certificates-tab')) {
                    return;
                }
                
                // Find grid and hidden cards based on tab type
                let hiddenCards = [];
                
                if(tabContent.classList.contains('projects-tab')) {
                    const grid = tabContent.querySelector('.projects-grid');
                    if(grid) {
                        hiddenCards = Array.from(grid.querySelectorAll('.hidden-card'));
                    }
                } 
                
                // Toggle visibility
                const isCollapsed = btn.classList.toggle('collapsed');
                hiddenCards.forEach(card => {
                    if(isCollapsed) {
                        card.classList.add('show');
                    } else {
                        card.classList.remove('show');
                    }
                });
                
                // Update button text
                const span = btn.querySelector('span');
                span.textContent = isCollapsed ? t('see-less') : t('see-more');
            });
        });
    })();

    // Initialize portfolio tabs (if present)
    (function setupPortfolioTabs(){
        const tabs = document.querySelectorAll('.portfolio-tab');
        const panels = document.querySelectorAll('.portfolio-panel');
        function activate(name){
            tabs.forEach(t => {
                const active = t.dataset.tab === name;
                t.classList.toggle('active', active);
                t.setAttribute('aria-selected', active ? 'true' : 'false');
            });
            panels.forEach(p => {
                const active = p.dataset.panel === name;
                p.classList.toggle('active', active);
                p.setAttribute('aria-hidden', active ? 'false' : 'true');
            });
        }
        if(tabs.length){
            tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.tab)));
            tabs.forEach(t => t.addEventListener('keydown', (e) => {
                if(e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
                    e.preventDefault();
                    const arr = Array.from(tabs);
                    const idx = arr.indexOf(t);
                    let next = idx + (e.key === 'ArrowRight' ? 1 : -1);
                    if(next < 0) next = arr.length -1; if(next >= arr.length) next = 0;
                    arr[next].focus();
                }
            }));
            // default activate
            activate(document.querySelector('.portfolio-tab.active')?.dataset.tab || tabs[0].dataset.tab);
        }
    })();

    // Setup See More / See Less toggles
    (function setupSeeMore(){
        function attachToggle(buttonSelector, panelDataAttr){
            const btn = document.querySelector(buttonSelector);
            if(!btn) return;
            
            let grid;
            
            // For standalone certificates section
            if(panelDataAttr === 'certificates-section') {
                const certificatesSection = document.querySelector('.certificates');
                if(!certificatesSection) return;
                grid = certificatesSection.querySelector('.certificates-grid');
            } 
            // For portfolio tabs
            else {
                const panel = document.querySelector(`.portfolio-panel[data-panel="${panelDataAttr}"]`);
                if(!panel) return;
                grid = panel.querySelector('.portfolio-grid');
            }
            
            if(!grid) return;
            
            // Get all cards
            const allCards = grid.querySelectorAll('.certificate-card, .portfolio-card');
            const MAX_VISIBLE = 6;
            
            // Hide all cards beyond MAX_VISIBLE and all with .extra class
            allCards.forEach((card, index) => {
                if(index >= MAX_VISIBLE || card.classList.contains('extra')) {
                    card.style.display = 'none';
                }
            });
            
            btn.setAttribute('aria-expanded', 'false');
            btn.textContent = t('see-more');
            
            // Handle button click
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const isExpanded = btn.getAttribute('aria-expanded') === 'true';
                
                if(isExpanded) {
                    // Hide - show only first 6
                    allCards.forEach((card, index) => {
                        if(index >= MAX_VISIBLE || card.classList.contains('extra')) {
                            card.style.display = 'none';
                        } else {
                            card.style.display = '';
                        }
                    });
                    btn.setAttribute('aria-expanded', 'false');
                    btn.textContent = t('see-more');
                } else {
                    // Show all
                    allCards.forEach(card => {
                        card.style.display = '';
                    });
                    btn.setAttribute('aria-expanded', 'true');
                    btn.textContent = t('see-less');
                }
            });
        }
        attachToggle('.projects-see-toggle', 'projects');
        attachToggle('.certificates-see-toggle', 'certificates-section');
    })();

    // Small helpers for contact file upload & UI
    (function setupContactHelpers(){
        document.querySelectorAll('.choose-file-btn').forEach(btn => {
            const fileUpload = btn.closest('.file-upload');
            if(!fileUpload) return;
            const input = fileUpload.querySelector('input[type="file"]');
            const nameEl = fileUpload.querySelector('.file-name');
            btn.addEventListener('click', () => input && input.click());
            input && input.addEventListener('change', () => {
                const f = input.files[0];
                nameEl.textContent = f ? f.name : 'Max file size: 5MB';
            });
        });

        // small UX: Post Comment button can clear form (local demo)
        document.querySelectorAll('.comment-form .btn-gradient').forEach(b => {
            b.addEventListener('click', (e) => {
                const form = b.closest('.comment-form');
                const name = form.querySelector('#cm-name');
                const msg = form.querySelector('#cm-message');
                if(!name.value || !msg.value){
                    // simple visual cue
                    b.textContent = 'Please fill required';
                    setTimeout(()=> b.innerHTML = '<span>Post Comment</span>', 1200);
                    return;
                }
                // simulate post
                b.textContent = 'Posted ✓';
                setTimeout(()=>{
                    b.innerHTML = '<span>Post Comment</span>';
                    name.value = ''; msg.value = ''; form.querySelector('input[type=file]').value = ''; form.querySelector('.file-name').textContent = 'Max file size: 5MB';
                }, 900);
            });
        });
    })();

    // Setup Testimonials Feature
    (function setupTestimonials(){
        const modal = document.getElementById('testimonialModal');
        const addBtn = document.querySelector('.add-testimonial-btn');
        const form = document.getElementById('testimonialForm');
        const cancelBtn = document.getElementById('cancelTestimonialBtn');
        const modalClose = document.querySelector('.modal-close');
        const testimonialsList = document.querySelector('.testimonials-list');
        const testimonialEmpty = document.querySelector('.testimonials-empty');
        const ratingInput = document.getElementById('t-rating');
        const stars = document.querySelectorAll('.star');

        // Admin check - hanya pemilik portfolio yang bisa delete
        const isAdmin = () => {
            // Check if admin mode is enabled via localStorage
            // User bisa login dengan mengetik "reynaldi" di console: enableAdminMode()
            return localStorage.getItem('admin_mode') === 'true';
        };

        // Load testimonials from localStorage
        let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];

        // Display testimonials
        function displayTestimonials() {
            if (testimonials.length === 0) {
                testimonialsList.style.display = 'none';
                testimonialEmpty.style.display = 'block';
            } else {
                testimonialEmpty.style.display = 'none';
                testimonialsList.style.display = 'grid';
                testimonialsList.innerHTML = '';

                testimonials.forEach((testimonial, index) => {
                    const card = document.createElement('div');
                    card.className = 'testimonial-card';
                    card.role = 'listitem';

                    const starsHtml = Array(testimonial.rating)
                        .fill('<i class="fas fa-star star-filled"></i>')
                        .join('');

                    // Hanya tampilkan delete button jika user adalah admin
                    const deleteButtonHtml = isAdmin() ? `
                        <div class="testimonial-actions">
                            <button class="testimonial-delete-btn" data-index="${index}" aria-label="Delete testimonial" title="Admin only">
                                <i class="fas fa-trash-alt"></i>
                                <span>Delete</span>
                            </button>
                        </div>
                    ` : '';

                    card.innerHTML = `
                        <div class="testimonial-quote-icon">
                            <i class="fas fa-quote-left"></i>
                        </div>
                        <div class="testimonial-text">"${testimonial.message}"</div>
                        
                        <div class="testimonial-header">
                            <div class="testimonial-author">
                                <div class="testimonial-name">${testimonial.name}</div>
                                ${testimonial.role ? `<div class="testimonial-role">${testimonial.role}</div>` : ''}
                            </div>
                            <div class="testimonial-rating">
                                ${starsHtml}
                            </div>
                        </div>

                        ${deleteButtonHtml}
                    `;

                    testimonialsList.appendChild(card);

                    // Add delete handler (hanya jika admin)
                    if (isAdmin()) {
                        card.querySelector('.testimonial-delete-btn').addEventListener('click', (e) => {
                            e.preventDefault();
                            if (!isAdmin()) {
                                showNotification('Only admin can delete testimonials', 'error');
                                return;
                            }
                            const idx = parseInt(e.currentTarget.dataset.index);
                            if (confirm('Are you sure you want to delete this testimonial?')) {
                                testimonials.splice(idx, 1);
                                localStorage.setItem('testimonials', JSON.stringify(testimonials));
                                displayTestimonials();
                                showNotification('Testimonial deleted successfully', 'success');
                            }
                        });
                    }
                });
            }
        }

        // Open modal
        function openModal() {
            modal.removeAttribute('hidden');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            form.reset();
            ratingInput.value = 5;
            updateStars(5);
        }

        // Close modal
        function closeModal() {
            modal.setAttribute('hidden', '');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
        }

        // Update star rating display
        function updateStars(rating) {
            stars.forEach(star => {
                const starRating = parseInt(star.dataset.rating);
                if (starRating <= rating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        }

        // Handle form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('t-name').value.trim();
            const email = document.getElementById('t-email').value.trim();
            const role = document.getElementById('t-role').value.trim();
            const message = document.getElementById('t-message').value.trim();
            const rating = parseInt(ratingInput.value);

            if (!name || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            const newTestimonial = {
                name,
                email,
                role: role || 'Client',
                message,
                rating,
                date: new Date().toISOString()
            };

            testimonials.unshift(newTestimonial);
            localStorage.setItem('testimonials', JSON.stringify(testimonials));

            displayTestimonials();
            closeModal();
            showNotification('Thank you! Your testimonial has been added successfully.', 'success');
        });

        // Event listeners
        addBtn?.addEventListener('click', openModal);
        cancelBtn?.addEventListener('click', closeModal);
        modalClose?.addEventListener('click', closeModal);

        // Star rating click handlers
        stars.forEach(star => {
            star.addEventListener('click', (e) => {
                e.preventDefault();
                const rating = parseInt(star.dataset.rating);
                ratingInput.value = rating;
                updateStars(rating);
            });

            star.addEventListener('mouseover', (e) => {
                const rating = parseInt(star.dataset.rating);
                updateStars(rating);
            });
        });

        // Reset star display on mouse leave
        document.getElementById('ratingStars').addEventListener('mouseleave', () => {
            updateStars(parseInt(ratingInput.value));
        });

        // Close modal on background click
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Initialize
        displayTestimonials();
    })();

    // Initialize the application

    init();

    // Add CSS for ripple effect and notifications
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        button {
            position: relative;
            overflow: hidden;
        }
        
        .loaded {
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Focus styles for accessibility */
        .nav-link:focus-visible,
        .social-icon:focus-visible,
        .hire-btn:focus-visible,
        .cta-btn:focus-visible {
            outline: 2px solid var(--accent-primary);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance monitoring
// Initialize theme manager on page load
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
    
    // Render tech stack
    renderTechStack();
    
    // Load certificates
    loadCertificates();
});

if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${pageLoadTime}ms`);
        }, 0);
    });
}

// Error handling
window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
});

// Service Worker Registration (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// ==================== SECTION ANIMATIONS ====================
// Intersection Observer for Section Fade-In Animations
function initSectionAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize section animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSectionAnimations);
} else {
    // If DOM is already loaded, initialize immediately
    initSectionAnimations();
}

// Handle Post Comment functionality with localStorage persistence
document.addEventListener('DOMContentLoaded', function() {
    const postCommentBtn = document.querySelector('.post-btn');
    const cmNameInput = document.getElementById('cm-name');
    const cmMessageInput = document.getElementById('cm-message');
    const commentList = document.querySelector('.comment-list');
    const commentsCountSpan = document.querySelector('.comments-count');
    
    // Storage key untuk localStorage
    const STORAGE_KEY = 'portfolio_comments';

    // Fungsi untuk format waktu yang human-readable
    function formatTimeAgo(timestamp) {
        const now = new Date();
        const commentDate = new Date(timestamp);
        const secondsAgo = Math.floor((now - commentDate) / 1000);
        
        if (secondsAgo < 60) {
            return 'Just now';
        }
        
        const minutesAgo = Math.floor(secondsAgo / 60);
        if (minutesAgo < 60) {
            return minutesAgo === 1 ? '1 minute ago' : `${minutesAgo} minutes ago`;
        }
        
        const hoursAgo = Math.floor(minutesAgo / 60);
        if (hoursAgo < 24) {
            return hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`;
        }
        
        const daysAgo = Math.floor(hoursAgo / 24);
        if (daysAgo < 7) {
            return daysAgo === 1 ? '1d ago' : `${daysAgo}d ago`;
        }
        
        const weeksAgo = Math.floor(daysAgo / 7);
        if (weeksAgo < 4) {
            return weeksAgo === 1 ? '1 week ago' : `${weeksAgo} weeks ago`;
        }
        
        const monthsAgo = Math.floor(daysAgo / 30);
        return monthsAgo === 1 ? '1 month ago' : `${monthsAgo} months ago`;
    }

    // Fungsi untuk mendapatkan comments dari localStorage
    function getCommentsFromStorage() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    // Fungsi untuk menyimpan comments ke localStorage
    function saveCommentsToStorage(comments) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    }

    // Fungsi untuk memperbarui counter comments
    function updateCommentCount() {
        const comments = getCommentsFromStorage();
        // Hitung total comments (tidak termasuk pinned comment admin)
        const totalComments = comments.length + 2; // +2 untuk 2 comments yang sudah ada
        if (commentsCountSpan) {
            commentsCountSpan.textContent = `(${totalComments})`;
        }
    }

    // Fungsi untuk render comments dari localStorage
    function renderStoredComments() {
        const comments = getCommentsFromStorage();
        const pinnedComment = commentList.querySelector('.comment-pinned');
        
        // Hapus comments yang sebelumnya ditampilkan (kecuali pinned dan 2 original)
        const existingComments = commentList.querySelectorAll('.comment-item:not(.comment-pinned)');
        existingComments.forEach((comment, index) => {
            // Hapus jika lebih dari 2 (karena ada 2 original comments)
            if (index >= 2) {
                comment.remove();
            }
        });

        // Tampilkan comments dari storage setelah pinned comment
        comments.forEach(comment => {
            const timeAgo = formatTimeAgo(comment.timestamp);
            const commentHTML = `
                <div class="comment-item" role="listitem">
                    <div class="comment-avatar">${comment.avatar}</div>
                    <div class="comment-body">
                        <h5>${comment.name}</h5>
                        <small class="muted">${timeAgo}</small>
                        <p>${comment.message}</p>
                    </div>
                </div>
            `;
            if (pinnedComment) {
                pinnedComment.insertAdjacentHTML('afterend', commentHTML);
            } else {
                commentList.insertAdjacentHTML('beforeend', commentHTML);
            }
        });

        updateCommentCount();
    }

    // Load comments saat halaman dimuat
    renderStoredComments();

    if (postCommentBtn && cmNameInput && cmMessageInput && commentList) {
        postCommentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const name = cmNameInput.value.trim();
            const message = cmMessageInput.value.trim();

            // Validasi input
            if (!name || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Buat avatar dari 2 huruf pertama nama
            const avatar = name.substring(0, 2).toUpperCase();

            // Buat object comment baru
            const newComment = {
                name: name,
                message: message,
                avatar: avatar,
                timestamp: new Date().toISOString()
            };

            // Simpan ke localStorage
            const comments = getCommentsFromStorage();
            comments.unshift(newComment); // Tambahkan di awal (terbaru di atas)
            saveCommentsToStorage(comments);

            // Buat elemen comment baru di DOM
            const newCommentHTML = `
                <div class="comment-item" role="listitem">
                    <div class="comment-avatar">${avatar}</div>
                    <div class="comment-body">
                        <h5>${name}</h5>
                        <small class="muted">Just now</small>
                        <p>${message}</p>
                    </div>
                </div>
            `;

            // Tambahkan comment baru ke comment-list
            // Insert setelah pinned comment
            const pinnedComment = commentList.querySelector('.comment-pinned');
            if (pinnedComment) {
                pinnedComment.insertAdjacentHTML('afterend', newCommentHTML);
            } else {
                commentList.insertAdjacentHTML('beforeend', newCommentHTML);
            }

            // Clear form
            cmNameInput.value = '';
            cmMessageInput.value = '';

            // Update comment count
            updateCommentCount();

            // Scroll ke bawah untuk melihat comment baru
            setTimeout(() => {
                commentList.scrollTop = commentList.scrollHeight;
            }, 100);

            // Tampilkan notifikasi sukses
            alert('Comment posted successfully!');
        });
    }
    
    // ==================== AUTO-UPDATE COMMENT COUNT ====================
    function updateCommentCount() {
        const commentList = document.querySelector('.comment-list');
        const commentsCountSpan = document.querySelector('.comments-count');
        
        if (commentList && commentsCountSpan) {
            const commentItems = commentList.querySelectorAll('.comment-item');
            const totalComments = commentItems.length;
            commentsCountSpan.textContent = `(${totalComments})`;
        }
    }
    
    // Initial update on page load
    updateCommentCount();
    
    // Listen for new comments
    const postBtn = document.querySelector('.post-btn');
    if (postBtn) {
        postBtn.addEventListener('click', () => {
            setTimeout(updateCommentCount, 500);
        });
    }
    
    // Auto-refresh comment timestamps setiap menit
    setInterval(() => {
        renderStoredComments();
        updateCommentCount();
    }, 60000); // Refresh setiap 60 detik
});


// Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        function toggleMobileMenu() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        }

        // Predict button click
        const predictBtn = document.getElementById('predictBtn');
        predictBtn.addEventListener('click', () => {
            const query = document.getElementById('query_sequence').value.trim();
            if (!query) {
                document.getElementById('query_sequence').focus();
                return;
            }
            
            // Show loading animation
            document.querySelector('.loading').style.display = 'block';
            
            // Redirect to Colab notebook with query_sequence as parameter
            const colabUrl = 'https://colab.research.google.com/drive/1VqBFA_a7PYyRVU1BAxE7NWmZNAku1KGI?usp=share_link';
            window.location.href = `${colabUrl}&query_sequence=${encodeURIComponent(query)}`;
        });

        // Dark mode toggle
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');

        function setTheme(dark) {
            const toggleKnob = document.querySelector('#toggle-svg #toggle-knob');
            const toggleBg = document.querySelector('#toggle-svg rect');
            if (dark) {
                document.body.classList.add('dark-theme');
                // Move knob to right and change bg color
                toggleKnob.setAttribute('cx', '22');
                toggleBg.setAttribute('fill', '#232946');
            } else {
                document.body.classList.remove('dark-theme');
                // Move knob to left and change bg color
                toggleKnob.setAttribute('cx', '10');
                toggleBg.setAttribute('fill', '#667eea');
            }
        }

        // Load theme from localStorage
        const darkPref = localStorage.getItem('dark-theme') === 'true';
        setTheme(darkPref);

        themeToggle.addEventListener('click', () => {
            const isDark = !document.body.classList.contains('dark-theme');
            setTheme(isDark);
            localStorage.setItem('dark-theme', isDark);
        });
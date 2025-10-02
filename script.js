        document.addEventListener('DOMContentLoaded', function() {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            const menuOverlay = document.getElementById('menu-overlay');
            const navLinks = document.querySelectorAll('.nav-link');
            let activeDropdown = null;

            // Toggle main menu
            hamburger.addEventListener('click', function(e) {
                e.stopPropagation();
                navMenu.classList.toggle('active');
                menuOverlay.classList.toggle('active');
                
                // Change icon
                if (navMenu.classList.contains('active')) {
                    hamburger.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                    // Close all dropdowns when closing menu
                    closeAllDropdowns();
                }
            });

            // Close menu when clicking overlay
            menuOverlay.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                closeAllDropdowns();
            });

            // Toggle dropdowns on mobile
            navLinks.forEach(link => {
                if (link.querySelector('.fa-chevron-down')) {
                    link.addEventListener('click', function(e) {
                        if (window.innerWidth <= 768) {
                            e.preventDefault();
                            e.stopPropagation();
                            
                            const dropdown = this.nextElementSibling;
                            
                            // If clicking the same dropdown, toggle it
                            if (activeDropdown === dropdown) {
                                dropdown.classList.toggle('active');
                                this.classList.toggle('active');
                                activeDropdown = dropdown.classList.contains('active') ? dropdown : null;
                            } 
                            // If clicking a different dropdown, close previous and open new
                            else {
                                // Close previous active dropdown
                                if (activeDropdown) {
                                    activeDropdown.classList.remove('active');
                                    activeDropdown.previousElementSibling.classList.remove('active');
                                }
                                
                                // Open new dropdown
                                dropdown.classList.add('active');
                                this.classList.add('active');
                                activeDropdown = dropdown;
                            }
                        }
                    });
                } else {
                    // For links without dropdowns, close menu on click
                    link.addEventListener('click', function() {
                        if (window.innerWidth <= 768) {
                            navMenu.classList.remove('active');
                            menuOverlay.classList.remove('active');
                            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                            closeAllDropdowns();
                        }
                    });
                }
            });

            // Close dropdowns when clicking on dropdown items
            document.querySelectorAll('.dropdown-item a').forEach(item => {
                item.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        navMenu.classList.remove('active');
                        menuOverlay.classList.remove('active');
                        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                        closeAllDropdowns();
                    }
                });
            });

            // Close all dropdowns function
            function closeAllDropdowns() {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                activeDropdown = null;
            }

            // Handle window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    // Reset mobile menu state on desktop
                    navMenu.classList.remove('active');
                    menuOverlay.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                    closeAllDropdowns();
                }
            });

            // Close menu when clicking outside on mobile
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 768 && 
                    navMenu.classList.contains('active') && 
                    !e.target.closest('.nav-container') && 
                    !e.target.closest('.menu-overlay')) {
                    navMenu.classList.remove('active');
                    menuOverlay.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                    closeAllDropdowns();
                }
            });
        });
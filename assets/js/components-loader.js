// Function to load HTML components
function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            // Set up navigation links after components are loaded
            if (elementId === 'header-placeholder') {
                setupNavigation();
                highlightActiveNavItem();
            }
            if (elementId === 'footer-placeholder') {
                setupFooterNavigation();
            }
        })
        .catch(error => {
            console.error('Error loading component:', error);
        });
}

// Function to determine if we're in assets/pages directory
function isInAssetsPages() {
    return window.location.pathname.includes('assets/pages/');
}

// Function to get the correct path for a page
function getPagePath(page) {
    const inAssetsPages = isInAssetsPages();
    
    switch(page) {
        case 'index':
            return inAssetsPages ? '../../index.html' : 'index.html';
        case 'about':
            return inAssetsPages ? '../../about.html' : 'about.html';
        case 'contact':
            return inAssetsPages ? '../../contact.html' : 'contact.html';
        case 'services':
            return inAssetsPages ? 'services.html' : 'assets/pages/services.html';
        case 'blog':
            return inAssetsPages ? 'blog.html' : 'assets/pages/blog.html';
        default:
            return '#';
    }
}

// Function to setup navigation links
function setupNavigation() {
    // Setup logo link
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.href = getPagePath('index');
    }
    
    // Setup navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const listItem = link.closest('li');
        const page = listItem.getAttribute('data-page');
        link.href = getPagePath(page);
    });
}

// Function to setup footer navigation links
function setupFooterNavigation() {
    // Setup footer logo link
    const footerLogoLink = document.getElementById('footer-logo-link');
    if (footerLogoLink) {
        footerLogoLink.href = getPagePath('index');
    }
    
    // Setup footer navigation links
    const footerNavLinks = document.querySelectorAll('.footer-nav-link');
    footerNavLinks.forEach(link => {
        const page = link.getAttribute('data-page');
        link.href = getPagePath(page);
    });
}

// Function to highlight the active navigation item
function highlightActiveNavItem() {
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop() || 'index.html';
    
    // Remove active classes from all nav items
    const navItems = document.querySelectorAll('.navbar-nav .dropdown.submenu');
    navItems.forEach(item => {
        item.classList.remove('active');
        const link = item.querySelector('a');
        if (link) {
            link.classList.remove('active');
        }
    });
    
    // Add active class to current page nav item
    navItems.forEach(item => {
        const page = item.getAttribute('data-page');
        let isActive = false;
        
        switch(page) {
            case 'index':
                isActive = fileName === 'index.html' || fileName === '';
                break;
            case 'about':
                isActive = fileName === 'about.html';
                break;
            case 'contact':
                isActive = fileName === 'contact.html';
                break;
            case 'services':
                isActive = fileName === 'services.html';
                break;
            case 'blog':
                isActive = fileName === 'blog.html' || fileName === 'blog-single.html';
                break;
        }
        
        if (isActive) {
            item.classList.add('active');
            const link = item.querySelector('a');
            if (link) {
                link.classList.add('active');
            }
        }
    });
}

// Function to determine the correct component path
function getComponentPath(componentName) {
    const inAssetsPages = isInAssetsPages();
    
    if (inAssetsPages) {
        return `../components/${componentName}.html`;
    } else {
        return `assets/components/${componentName}.html`;
    }
}

// Load header and footer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header-placeholder', getComponentPath('header'));
    loadComponent('footer-placeholder', getComponentPath('footer'));
    
    // Load consultation CTA if the element exists (only on certain pages)
    const consultationElement = document.getElementById('consultation-placeholder');
    if (consultationElement) {
        loadComponent('consultation-placeholder', getComponentPath('consultation-cta'));
    }
});

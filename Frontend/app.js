document.addEventListener("DOMContentLoaded", () => {
    const lostFoundSection = document.getElementById('lostFoundSection');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    // 1. Feature box click scroll
    const lostFoundFeatureBox = document.querySelectorAll('.feature-box-in');
    lostFoundFeatureBox.forEach(box => {
        const title = box.querySelector('h3');
        if (title && title.innerText.trim() === "Lost & Found") {
            box.style.cursor = 'pointer';
            box.addEventListener('click', () => {
                window.scrollTo({
                    top: lostFoundSection.offsetTop - navbarHeight - 10, // offset for navbar
                    behavior: 'smooth'
                });
                highlightSection(lostFoundSection);
            });
        }
    });

    // 2. Navbar link click scroll
    const navLinks = document.querySelectorAll('.navbar-nav a');
    navLinks.forEach(link => {
        if (link.innerText.trim() === "Lost & Found") {
            link.style.cursor = 'pointer';
            link.addEventListener('click', (e) => {
                e.preventDefault(); // prevent default jump
                window.scrollTo({
                    top: lostFoundSection.offsetTop - navbarHeight - 10,
                    behavior: 'smooth'
                });
                highlightSection(lostFoundSection);
            });
        }
    });

    // 3. Search functionality
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keyup", () => {
        const searchText = searchInput.value.toLowerCase();
        document.querySelectorAll("#lost_found_right .card").forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(searchText) ? "" : "none";
        });
    });

    // 4. Smooth highlight using outline
    function highlightSection(section) {
        section.style.transition = 'outline 0.5s ease-in-out';
        // section.style.outline = '4px solid y';
        section.style.outlineOffset = '4px';
        setTimeout(() => {
            section.style.outline = 'none';
        }, 1000);
    }
});

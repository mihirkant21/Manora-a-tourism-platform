// document.addEventListener("DOMContentLoaded", () => {
//     const lostFoundSection = document.getElementById('lostFoundSection');
//     const navbarHeight = document.querySelector('.navbar').offsetHeight;

//     // 1. Feature box click scroll
//     const lostFoundFeatureBox = document.querySelectorAll('.feature-box-in');
//     lostFoundFeatureBox.forEach(box => {
//         const title = box.querySelector('h3');
//         if (title && title.innerText.trim() === "Lost & Found") {
//             box.style.cursor = 'pointer';
//             box.addEventListener('click', () => {
//                 window.scrollTo({
//                     top: lostFoundSection.offsetTop - navbarHeight - 10, // offset for navbar
//                     behavior: 'smooth'
//                 });
//                 highlightSection(lostFoundSection);
//             });
//         }
//     });

//     // 2. Navbar link click scroll
//     const navLinks = document.querySelectorAll('.navbar-nav a');
//     navLinks.forEach(link => {
//         if (link.innerText.trim() === "Lost & Found") {
//             link.style.cursor = 'pointer';
//             link.addEventListener('click', (e) => {
//                 e.preventDefault(); // prevent default jump
//                 window.scrollTo({
//                     top: lostFoundSection.offsetTop - navbarHeight - 10,
//                     behavior: 'smooth'
//                 });
//                 highlightSection(lostFoundSection);
//             });
//         }
//     });

//     // 3. Search functionality
//     const searchInput = document.getElementById("searchInput");
//     searchInput.addEventListener("keyup", () => {
//         const searchText = searchInput.value.toLowerCase();
//         document.querySelectorAll("#lost_found_right .card").forEach(card => {
//             const text = card.innerText.toLowerCase();
//             card.style.display = text.includes(searchText) ? "" : "none";
//         });
//     });

//     // 4. Smooth highlight using outline
//     function highlightSection(section) {
//         section.style.transition = 'outline 0.5s ease-in-out';
//         // section.style.outline = '4px solid y';
//         section.style.outlineOffset = '4px';
//         setTimeout(() => {
//             section.style.outline = 'none';
//         }, 1000);
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    // --- Helpers / config ---
    const navbar = document.querySelector('.navbar');
    let navbarHeight = navbar ? navbar.offsetHeight : 0;
    window.addEventListener('resize', () => { navbarHeight = navbar ? navbar.offsetHeight : 0; });

    // Inject small helper CSS for highlight + pointer
    const style = document.createElement('style');
    style.textContent = `
    .js-scroll-highlight {
      box-shadow: 0 0 40px 10px rgba(255,215,0,0.9);
      transition: box-shadow 0.4s ease-in-out;
    }
    .js-clickable { cursor: pointer; }
  `;
    document.head.appendChild(style);

    // Smooth scroll + highlight (unified)
    function smoothScrollToElem(elem) {
        if (!elem) { console.warn('smoothScrollToElem: target not found'); return; }
        const rect = elem.getBoundingClientRect();
        const top = window.pageYOffset + rect.top - navbarHeight - 10; // offset for fixed navbar
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

        // highlight
        elem.classList.add('js-scroll-highlight');
        clearTimeout(elem._jsHighlightTimeout);
        elem._jsHighlightTimeout = setTimeout(() => elem.classList.remove('js-scroll-highlight'), 1600);
    }

    // Map normalized titles (lowercase) -> CSS selector for the target section
    const mapping = {
        'lost & found': '#lostFoundSection',       // you already have this id
        'photo contest': '.contest_section',       // selects the contest section by class
        'contest': '.contest_section'              // navbar "Contest" link should go here
    };

    // Attach click handlers to feature boxes based on their <h3> text
    document.querySelectorAll('.feature-box-in').forEach(box => {
        const h3 = box.querySelector('h3');
        if (!h3) return;
        const name = h3.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
        const selector = mapping[name];
        if (selector) {
            const target = document.querySelector(selector);
            if (!target) { console.warn('No target found for feature:', name, selector); return; }

            // Make box feel clickable + accessible
            box.classList.add('js-clickable');
            if (!box.hasAttribute('tabindex')) box.tabIndex = 0;

            box.addEventListener('click', () => smoothScrollToElem(target));
            box.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); smoothScrollToElem(target); }
            });
        }
    });

    // Attach click handlers to navbar links (match by link text)
    document.querySelectorAll('.navbar-nav a').forEach(link => {
        const text = link.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
        const selector = mapping[text];
        if (selector) {
            const target = document.querySelector(selector);
            if (!target) { console.warn('No target found for nav link:', text, selector); return; }

            link.classList.add('js-clickable');
            link.addEventListener('click', (e) => {
                e.preventDefault();           // prevents href="#" from jumping to top
                smoothScrollToElem(target);
            });
        }
    });

    // Existing search functionality (defensive)
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const q = searchInput.value.toLowerCase();
            document.querySelectorAll('#lost_found_right .card').forEach(card => {
                card.style.display = card.innerText.toLowerCase().includes(q) ? '' : 'none';
            });
        });
    }

    console.log('Scroll bindings attached (Lost & Found, Photo Contest, navbar links).');
});


document.addEventListener("DOMContentLoaded", () => {
    const uploadBtn = document.getElementById("uploadBtn");   // custom button
    const fileInput = document.getElementById("fileInput");   // hidden input
    const previewImg = document.getElementById("previewImg"); // preview image

    if (uploadBtn && fileInput && previewImg) {
        // When user clicks the custom button → open file picker
        uploadBtn.addEventListener("click", () => {
            fileInput.click();
        });

        // When user selects a file → show preview
        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImg.src = e.target.result;
                    previewImg.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

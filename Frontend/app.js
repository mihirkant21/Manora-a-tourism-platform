document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------
    // Navbar + Smooth Scroll
    // -----------------------------
    const navbar = document.querySelector('.navbar');
    let navbarHeight = navbar ? navbar.offsetHeight : 0;
    window.addEventListener('resize', () => {
        navbarHeight = navbar ? navbar.offsetHeight : 0;
    });

    // Small helper CSS - Updated to prevent location cropping in slideshow
    const style = document.createElement('style');
    style.textContent = `
      .js-scroll-highlight { transition: box-shadow 0.4s ease-in-out; }
      .js-clickable { cursor: pointer; }
      /* Picture Gallery Slide - Enhanced Styling with Increased Box Size and Anti-Cropping Fixes */
      .Picture_Gallery { padding: 60px 0; background: linear-gradient(135deg, #f5f5f5 0%, #e8f4f8 100%); }
      .slideshow-container { 
        position: relative; 
        width: 90%; 
        max-width: 1200px; 
        height: 700px; /* Increased height for larger box */
        margin: 0 auto; 
        overflow: hidden; 
        border-radius: 20px; 
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); 
        background: #000; 
      }
      .slides-track { 
        display: flex; 
        height: 100%; 
        transition: transform 0.5s ease-in-out; 
        will-change: transform; 
      }
      .slide { 
        flex: 0 0 100%; 
        height: 100%; 
        position: relative; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        padding: 25px; 
        opacity: 0.7; 
        transform: scale(0.95); 
        transition: all 0.5s ease; 
      }
      .slide.active { 
        opacity: 1; 
        transform: scale(1); 
      }
      .picture_gallery { 
        display: flex; 
        width: 100%; 
        height: 100%; 
        gap: 30px; 
        align-items: center; 
        background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%); 
        border-radius: 15px; 
        padding: 25px; 
        box-sizing: border-box; 
      }
      .picture_gallery img { 
        width: 50%; 
        height: 100%; 
        object-fit: cover; 
        border-radius: 15px; 
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); 
        flex-shrink: 0; 
      }
      .gallery_info { 
        width: 50%; 
        height: 100%; 
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
        padding: 0 25px; 
        color: #fff; 
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8); 
        background: rgba(0, 0, 0, 0.3); 
        border-radius: 15px; 
        backdrop-filter: blur(10px); 
        overflow: hidden; 
      }
      .gallery_info h3 { 
        font-size: 2.5em; 
        font-weight: 700; 
        margin-bottom: 15px; 
        color: #ffd700; 
        letter-spacing: 1px; 
        line-height: 1.2; 
        overflow-wrap: break-word; 
        word-wrap: break-word; 
        hyphens: auto; 
        white-space: normal; 
        max-width: 100%; 
        text-align: left; 
      }
      .gallery_info p { 
        font-size: 1.3em; 
        line-height: 1.6; 
        margin: 0; 
        font-weight: 400; 
        overflow-wrap: break-word; 
        white-space: normal; 
        max-width: 100%; 
      }
      .dots { 
        text-align: center; 
        position: absolute; 
        bottom: 25px; 
        width: 100%; 
        z-index: 10; 
      }
      .dot { 
        height: 16px; 
        width: 16px; 
        margin: 0 8px; 
        display: inline-block; 
        background: rgba(255, 255, 255, 0.5); 
        border-radius: 50%; 
        cursor: pointer; 
        transition: all 0.3s ease; 
        border: 2px solid rgba(255, 255, 0.8); 
      }
      .dot.active { 
        background: #ffd700; 
        transform: scale(1.2); 
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.6); 
      }
      .dot:hover { 
        background: rgba(255, 255, 255, 0.8); 
        transform: scale(1.1); 
      }
      @media (max-width: 768px) {
          .slideshow-container { width: 95%; height: 550px; border-radius: 15px; }
          .slide { padding: 20px; }
          .picture_gallery { flex-direction: column; gap: 20px; padding: 20px; }
          .picture_gallery img { width: 100%; height: 60%; max-height: 350px; }
          .gallery_info { width: 100%; height: auto; padding: 20px; text-align: center; justify-content: flex-start; }
          .gallery_info h3 { font-size: 2em; margin-bottom: 10px; text-align: center; }
          .gallery_info p { font-size: 1.1em; text-align: left; }
      }
      @media (max-width: 480px) {
          .gallery_info h3 { font-size: 1.8em; }
          .gallery_info p { font-size: 1em; }
      }
    `;
    document.head.appendChild(style);

    function smoothScrollToElem(elem) {
        if (!elem) return;
        const rect = elem.getBoundingClientRect();
        const top = window.pageYOffset + rect.top - navbarHeight - 10;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

        elem.classList.add('js-scroll-highlight');
        clearTimeout(elem._jsHighlightTimeout);
        elem._jsHighlightTimeout = setTimeout(() => elem.classList.remove('js-scroll-highlight'), 1600);
    }

    const mapping = {
        'lost & found': '#lostFoundSection',
        'photo contest': '.contest_section',
        'contest': '.contest_section',
        'gallery': '.Picture_Gallery',
        'places': '#Picture_Gallery' // ✅ Added "Places" feature mapping
    };

    // Feature boxes click
    document.querySelectorAll('.feature-box-in').forEach(box => {
        const h3 = box.querySelector('h3');
        if (!h3) return;
        const name = h3.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
        const selector = mapping[name];
        if (!selector) return;
        const target = document.querySelector(selector);
        if (!target) return;

        box.classList.add('js-clickable');
        if (!box.hasAttribute('tabindex')) box.tabIndex = 0;

        box.addEventListener('click', () => smoothScrollToElem(target));
        box.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                smoothScrollToElem(target);
            }
        });
    });

    // Navbar links click
    document.querySelectorAll('.navbar-nav a').forEach(link => {
        const text = link.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
        const selector = mapping[text];
        if (!selector) return;
        const target = document.querySelector(selector);
        if (!target) return;

        link.classList.add('js-clickable');
        link.addEventListener('click', e => {
            e.preventDefault();
            smoothScrollToElem(target);
        });
    });

    // -----------------------------
    // Lost & Found Search
    // -----------------------------
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const q = searchInput.value.toLowerCase();
            document.querySelectorAll('#lost_found_right .card').forEach(card => {
                card.style.display = card.innerText.toLowerCase().includes(q) ? '' : 'none';
            });
        });
    }

    // -----------------------------
    // Photo Contest Upload Preview
    // -----------------------------
    const uploadBtn = document.getElementById("uploadBtn");
    const fileInput = document.getElementById("fileInput");
    const previewImg = document.getElementById("previewImg");

    if (uploadBtn && fileInput && previewImg) {
        uploadBtn.addEventListener("click", () => fileInput.click());

        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                previewImg.style.display = "block";
            };
            reader.readAsDataURL(file);
        });
    }

    // -----------------------------
    // Picture Gallery Slideshow
    // -----------------------------
    const slidesTrack = document.getElementById("slidesTrack");
    const dotsContainer = document.getElementById("dots");

    if (slidesTrack && dotsContainer) {
        const galleryData = [
            { img: "images/Phek_town.jpg", experience: "Stepping inside felt like wandering into a dreamlike maze, pieced together from broken bangles, glass shards, tiles, and even old pipes. What should’ve been junk suddenly looked delicate and almost magical — proof that even scraps can be art.As I walked further, the echo of waterfalls filled the air.One moment I was squeezing through tight, sculpture- lined passages, the next I was standing in wide courtyards with ponds and greenery all around.The shift in spaces made the whole place feel alive, constantly surprising you.", location: "Rock Garden, Ranchi" },
            { img: "images/Panchghat_Waterfall.jpg", experience: "Entering the forest path to Panchghagh is a descent into a living gallery of sound and motion. You don't just see the waterfall; you hear it long before you arrive, a distant hum growing into a powerful, multi-layered roar. It feels less like a single destination and more like five separate stories unfolding at once.", location: "Panchghagh Waterfall, Khunti" },
            { img: "images/Patratu_dam_Ramgarh.png", experience: "Standing in front of Patratu Dam feels overwhelming — the sheer wall of concrete rising above you, with thin streams of water sliding down its face, is both powerful and oddly calming. At the bottom, the water collects quietly, surrounded by rocks and little patches of green that soften the heavy industrial look of the structure. It’s the kind of place where you really notice the mix of human engineering and nature, working together to create something striking.", location: "Patratu dam, Ramgarh" },
            { img: "images/Khandoli Park_Giridih.png", experience: "When I walked through Khandoli Park, the first thing I noticed was the sound of kids laughing on the swings, their voices mixing with the chugging of a toy train in the background. A few rabbits and ducks were hanging around, as if they were part of the show, looking way too serious for such a playful setting. Families had spread out under the trees, sharing snacks, clicking selfies, and just enjoying the day. The whole place felt lighthearted and warm, like a simple picnic scene brought to life.", location: "Khandoli Park, Giridih" }
        ];

        let currentIndex = 0;
        let autoSlideInterval;

        // Render slides + dots
        galleryData.forEach((item, i) => {
            const slide = document.createElement("div");
            slide.classList.add("slide");
            if (i === 0) slide.classList.add("active");

            slide.innerHTML = `
                <div class="picture_gallery">
                    <img src="${item.img}" alt="Slide ${i + 1}">
                    <div class="gallery_info">
                        <h3>${item.location}</h3>
                        <p>${item.experience}</p>
                    </div>
                </div>
            `;
            slidesTrack.appendChild(slide);

            const dot = document.createElement("span");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                goToSlide(i);
                restartAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });

        const slides = document.querySelectorAll(".slide");
        const dots = document.querySelectorAll(".dot");

        function goToSlide(index) {
            currentIndex = index;
            updateSlides();
        }

        function updateSlides() {
            slides.forEach((slide, i) => slide.classList.toggle("active", i === currentIndex));
            dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
            slidesTrack.style.transform = `translateX(${-currentIndex * 100}%)`;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % galleryData.length;
            updateSlides();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000); // smoother interval
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        function restartAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        // Pause on hover (better UX)
        slidesTrack.addEventListener("mouseenter", stopAutoSlide);
        slidesTrack.addEventListener("mouseleave", startAutoSlide);

        // Start
        startAutoSlide();
    }

    console.log("✅ All features initialized (navbar scroll, search, upload preview, gallery slider).");
});

//    MIS AL MUHAJIRIN BANJARMASIN Main JavaScript
const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const currentYear = document.getElementById("currentYear");

// Mobile Menu
if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const icon = menuToggle.querySelector("i");
        if (navMenu.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
}

//    CLOSE MENU AFTER CLICK
navLinks.forEach((link) => {
    link.addEventListener("click", () => {

        // Jangan tutup menu jika yang diklik
        // adalah tombol dropdown
        if (link.classList.contains("dropdown-toggle")) {
            return;
        }

        if (!navMenu || !menuToggle) return;

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
});

//    CLOSE MENU WHEN CLICKING OUTSIDE
document.addEventListener("click", (event) => {
    if (!navMenu || !menuToggle) return;
    const clickedMenu = navMenu.contains(event.target);
    const clickedButton = menuToggle.contains(event.target);
    if (!clickedMenu && !clickedButton) {
        navMenu.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});

//    HEADER SHADOW ON SCROLL
window.addEventListener("scroll", () => {
    if (!header) return;
    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// CURRENT YEAR
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

//    GALLERY MIS AL MUHAJIRIN
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".gallery-filter-btn");
    const galleryCards = document.querySelectorAll(".gallery-card");

    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");

    const closeButton = document.getElementById("lightboxClose");
    const prevButton = document.getElementById("lightboxPrev");
    const nextButton = document.getElementById("lightboxNext");

//    FILTER GALERI
    if (filterButtons.length && galleryCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                const filter = button.dataset.filter;

                // ACTIVE BUTTON
                filterButtons.forEach(btn => {
                    btn.classList.remove("active");
                });
                button.classList.add("active");

                // FILTER CARD
                galleryCards.forEach(card => {
                    const category = card.dataset.category;
                    if (
                        filter === "all" ||
                        category === filter
                    ) {
                        card.classList.remove("hide");
                    } else {
                        card.classList.add("hide");
                    }
                });
            });
        });
    }

// LIGHTBOX
    if (!lightbox) return;
    let activeGallery = [];
    let currentIndex = 0;

    /* GET VISIBLE GALLERY */
    function getVisibleGallery() {
        activeGallery = Array.from(
            document.querySelectorAll(
                ".gallery-card:not(.hide) .gallery-open"
            )
        );
    }

    // IMAGE
    function showImage(index) {
        if (!activeGallery.length) return;

        /* LOOP */
        if (index < 0) {
            index = activeGallery.length - 1;
        }
        if (index >= activeGallery.length) {
            index = 0;
        }
        currentIndex = index;
        const button = activeGallery[currentIndex];
        const image = button.dataset.image;
        const title = button.dataset.title;
        lightboxImage.src = image;
        lightboxImage.alt = title;
        lightboxTitle.textContent = title;
    }

    // OPEN LIGHTBOX
    document.addEventListener("click", event => {
        const galleryButton = event.target.closest(".gallery-open");
        if (!galleryButton) return;
        getVisibleGallery();
        currentIndex = activeGallery.indexOf(galleryButton);
        showImage(currentIndex);
        lightbox.classList.add("active");
        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );
        document.body.classList.add("lightbox-open");
    });

    // CLOSE LIGHTBOX
    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );
        document.body.classList.remove("lightbox-open");
        setTimeout(() => {
            lightboxImage.src = "";
        }, 300);
    }
    if (closeButton) {
        closeButton.addEventListener(
            "click",
            closeLightbox
        );
    }

    // CLICK BACKGROUND
    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // PREVIOUS
    if (prevButton) {
        prevButton.addEventListener("click", () => {
            showImage(currentIndex - 1);
        });
    }

    // NEXT
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            showImage(currentIndex + 1);
        });
    }

//    KEYBOARD CONTROL
    document.addEventListener("keydown", event => {
        if (!lightbox.classList.contains("active")) {
            return;
        }

        // ESC
        if (event.key === "Escape") {
            closeLightbox();
        }

        // RIGHT
        if (event.key === "ArrowRight") {
            showImage(currentIndex + 1);
        }

        // LEFT
        if (event.key === "ArrowLeft") {
            showImage(currentIndex - 1);
        }
    });
});

//    CONTACT WHATSAPP FORM MIS AL MUHAJIRIN BANJARMASIN
document.addEventListener("DOMContentLoaded", () => {
    const whatsappForm = document.getElementById("whatsappForm");
    if (!whatsappForm) return;

    /* =====================================================
       NOMOR WHATSAPP MADRASAH

       PENTING:
       Ganti dengan nomor WhatsApp resmi.

       Format:
       08xxxxxxxxxx
       menjadi
       628xxxxxxxxxx

       Contoh:
       081234567890
       menjadi
       6281234567890
    ===================================================== */
    const whatsappNumber = "6282148248725";

    //    SUBMIT FORM
    whatsappForm.addEventListener("submit", event => {
        event.preventDefault();

        // AMBIL DATA
        const name =
            document.getElementById("contactName").value.trim();
        const status =
            document.getElementById("contactStatus").value;
        const topic =
            document.getElementById("contactTopic").value;
        const message =
            document.getElementById("contactMessage").value.trim();

        // VALIDASI 
        if (!name || !status || !topic || !message) {
            alert("Silakan lengkapi seluruh formulir.");
            return;
        }

        // SUSUN PESAN
        const whatsappMessage =
        `Assalamu'alaikum Wr. Wb.

        Saya ingin menghubungi MIS Al Muhajirin Banjarmasin.

        Nama: ${name}
        Status: ${status}
        Topik: ${topic}

        Pesan:
        ${message}

        Terima kasih.`;

        // ENCODE
        const encodedMessage =
            encodeURIComponent(whatsappMessage);

        // RL WHATSAPP
        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // BUKA WHATSAPP
        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );
    });
});

// PPDB FAQ ACCORDION MIS AL MUHAJIRIN BANJARMASIN
document.addEventListener("DOMContentLoaded", () => {
    const faqItems =
        document.querySelectorAll(".ppdb-faq-item");
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question =
            item.querySelector(".ppdb-faq-question");
        const answer =
            item.querySelector(".ppdb-faq-answer");
        if (!question || !answer) return;

        question.addEventListener("click", () => {
            const isActive =
                item.classList.contains("active");

            //    TUTUP SEMUA FAQ
            faqItems.forEach(otherItem => {
                const otherAnswer =
                    otherItem.querySelector(".ppdb-faq-answer");
                otherItem.classList.remove("active");
                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            });

            //    BUKA FAQ YANG DIPILIH
            if (!isActive) {
                item.classList.add("active");
                answer.style.maxHeight =
                    answer.scrollHeight + "px";
            }
        });
    });
});

//    HALAMAN ISI BERITA MIS AL MUHAJIRIN
document.addEventListener("DOMContentLoaded", () => {

    //    SHARE BERITA KE WHATSAPP
    const whatsappShareButton =
        document.querySelector(".article-share-whatsapp");
    if (whatsappShareButton) {
        whatsappShareButton.addEventListener("click", (event) => {
            event.preventDefault();

            // Judul halaman berita
            const articleTitle =
                document.querySelector(".article-hero h1");
            const title = articleTitle
                ? articleTitle.textContent.trim()
                : document.title;

            // URL halaman berita
            const currentUrl = window.location.href;

            // Pesan yang akan dikirim
            const message =
                `${title}\n\n` +
                `Baca selengkapnya:\n${currentUrl}`;

            // URL WhatsApp
            const whatsappUrl =
                `https://wa.me/?text=${encodeURIComponent(message)}`;


            // Buka WhatsApp
            window.open(
                whatsappUrl,
                "_blank",
                "noopener,noreferrer"
            );
        });
    }

    // COPY LINK BERITA
    const copyLinkButton =
        document.querySelector(".article-copy-link");
    if (copyLinkButton) {
        copyLinkButton.addEventListener("click", async () => {
            const currentUrl = window.location.href;
            try {

                // Salin URL
                await navigator.clipboard.writeText(currentUrl);

                // Feedback tombol
                showCopySuccess(copyLinkButton);
            } catch (error) {
                /* Fallback untuk browser tertentu */
                fallbackCopyLink(currentUrl, copyLinkButton);
            }
        });
    }

    // COPY SUCCESS
    function showCopySuccess(button) {
        const originalHTML = button.innerHTML;
        button.classList.add("copied");
        button.innerHTML =
            '<i class="fa-solid fa-check"></i>';

        // Tampilkan toast
        showArticleToast(
            "Tautan berita berhasil disalin"
        );

        // Kembalikan icon
        setTimeout(() => {
            button.classList.remove("copied");
            button.innerHTML = originalHTML;
        }, 1800);
    }

    // FALLBACK COPY
    function fallbackCopyLink(text, button) {
        const textarea =
            document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute(
            "readonly",
            ""
        );
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        textarea.style.pointerEvents = "none";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand("copy");
            showCopySuccess(button);
        } catch (error) {
            showArticleToast(
                "Tautan belum dapat disalin"
            );
        }
        document.body.removeChild(textarea);
    }

    //    TOAST NOTIFICATION
    function showArticleToast(message) {

        // Hapus toast lama jika ada
        const oldToast =
            document.querySelector(".article-toast");
        if (oldToast) {
            oldToast.remove();
        }

        // Buat toast
        const toast =
            document.createElement("div");
        toast.className = "article-toast";
        toast.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            <span>
                ${message}
            </span>
        `;
        document.body.appendChild(toast);

        // Tampilkan
        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        // Hilangkan
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => {
                toast.remove();
            }, 350);
        }, 2500);
    }
});

/* =====================================================
   DROPDOWN NAVBAR
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const dropdowns =
        document.querySelectorAll(".nav-item.dropdown");

    if (!dropdowns.length) return;


    dropdowns.forEach((dropdown) => {

        const toggle =
            dropdown.querySelector(".dropdown-toggle");

        if (!toggle) return;


        toggle.addEventListener("click", function (event) {

            /* =========================================
               MOBILE
            ========================================== */

            if (window.innerWidth <= 900) {

                event.preventDefault();

                /* Tutup dropdown lain */

                dropdowns.forEach((otherDropdown) => {

                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove("active");
                    }

                });

                /* Toggle dropdown yang dipilih */

                dropdown.classList.toggle("active");
            }

        });

    });


    /* ================================================
       KLIK DI LUAR DROPDOWN
    ================================================= */

    document.addEventListener("click", function (event) {

        if (event.target.closest(".nav-item.dropdown")) {
            return;
        }

        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("active");
        });

    });

});

/* =====================================================
   BERITA BLOGGER OTOMATIS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const newsContainer =
        document.getElementById("bloggerNews");

    if (!newsContainer) return;


    const feedURL =
        "https://mialmuhajirinkm6.blogspot.com/feeds/posts/default" +
        "?alt=json-in-script" +
        "&max-results=6" +
        "&callback=renderBloggerNews";


    window.renderBloggerNews = function (data) {

        const entries =
            data.feed?.entry || [];

        if (!entries.length) {

            newsContainer.innerHTML = `
                <div class="news-empty">
                    Belum ada berita terbaru.
                </div>
            `;

            return;
        }


        /* =============================================
           BERITA PERTAMA
        ============================================== */

        const first = entries[0];

        const firstTitle =
            first.title?.$t || "Tanpa Judul";

        const firstLink =
            getBloggerLink(first);

        const firstDate =
            formatBloggerDate(
                first.published?.$t
            );

        const firstImage =
            getBloggerImage(first);

        const firstExcerpt =
            getBloggerExcerpt(first, 180);


        let html = `

            <article class="featured-news">

                <a
                    href="${firstLink}"
                    class="featured-news-image"
                    target="_blank"
                    rel="noopener noreferrer"
                >

                    <img
                        src="${firstImage}"
                        alt="${escapeHTML(firstTitle)}"
                        loading="lazy"
                    >

                    <span class="featured-news-category">
                        Kegiatan Madrasah
                    </span>

                </a>


                <div class="featured-news-content">

                    <div class="news-meta">

                        <span>
                            <i class="fa-regular fa-calendar"></i>
                            ${firstDate}
                        </span>

                        <span>
                            <i class="fa-regular fa-newspaper"></i>
                            Berita
                        </span>

                    </div>


                    <h3>

                        <a
                            href="${firstLink}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ${escapeHTML(firstTitle)}
                        </a>

                    </h3>


                    <p>
                        ${escapeHTML(firstExcerpt)}...
                    </p>


                    <a
                        href="${firstLink}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="news-read-more"
                    >
                        Baca Selengkapnya
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>

                </div>

            </article>


            <div class="news-small-grid">
        `;


        /* =============================================
           BERITA 2 - 6
        ============================================== */

        entries.slice(1).forEach((entry) => {

            const title =
                entry.title?.$t || "Tanpa Judul";

            const link =
                getBloggerLink(entry);

            const date =
                formatBloggerDate(
                    entry.published?.$t
                );

            const image =
                getBloggerImage(entry);

            const excerpt =
                getBloggerExcerpt(entry, 100);


            html += `

                <article class="news-small-card">

                    <a
                        href="${link}"
                        class="news-small-image"
                        target="_blank"
                        rel="noopener noreferrer"
                    >

                        <img
                            src="${image}"
                            alt="${escapeHTML(title)}"
                            loading="lazy"
                        >

                    </a>


                    <div class="news-small-content">

                        <span class="news-small-date">

                            <i class="fa-regular fa-calendar"></i>

                            ${date}

                        </span>


                        <h3>

                            <a
                                href="${link}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ${escapeHTML(title)}
                            </a>

                        </h3>


                        <p>
                            ${escapeHTML(excerpt)}...
                        </p>

                    </div>

                </article>
            `;
        });


        html += `</div>`;


        newsContainer.innerHTML = html;

    };


    /* =============================================
       LINK BLOGGER
    ============================================== */

    function getBloggerLink(entry) {

        const link =
            (entry.link || []).find(
                item =>
                    item.rel === "alternate"
            );

        return link
            ? link.href
            : "https://mialmuhajirinkm6.blogspot.com/";
    }


    /* =============================================
       GAMBAR
    ============================================== */

    function getBloggerImage(entry) {

        if (entry.media$thumbnail?.url) {

            return entry.media$thumbnail.url
                .replace(
                    /\/s72-c\//,
                    "/s600/"
                );
        }


        const content =
            entry.content?.$t ||
            entry.summary?.$t ||
            "";


        const match =
            content.match(
                /<img[^>]+src=["']([^"']+)["']/i
            );


        if (match) {
            return match[1];
        }


        return "aset/logonobg.png";
    }


    /* =============================================
       RINGKASAN
    ============================================== */

    function getBloggerExcerpt(entry, length) {

        const content =
            entry.summary?.$t ||
            entry.content?.$t ||
            "";


        return stripHTML(content)
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, length);
    }


    /* =============================================
       FORMAT TANGGAL
    ============================================== */

    function formatBloggerDate(dateString) {

        if (!dateString) {
            return "";
        }

        const date =
            new Date(dateString);

        return date.toLocaleDateString(
            "id-ID",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );
    }


    /* =============================================
       HAPUS HTML
    ============================================== */

    function stripHTML(html) {

        const temp =
            document.createElement("div");

        temp.innerHTML = html;

        return (
            temp.textContent ||
            temp.innerText ||
            ""
        );
    }


    /* =============================================
       AMANKAN TEKS
    ============================================== */

    function escapeHTML(text) {

        const temp =
            document.createElement("div");

        temp.textContent = text;

        return temp.innerHTML;
    }


    /* =============================================
       LOAD FEED BLOGGER
    ============================================== */

    const script =
        document.createElement("script");

    script.src = feedURL;

    script.onerror = () => {

        newsContainer.innerHTML = `
            <div class="news-empty">
                Berita belum dapat dimuat.
            </div>
        `;
    };

    document.body.appendChild(script);

});
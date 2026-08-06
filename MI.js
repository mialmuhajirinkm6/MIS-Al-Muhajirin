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
        if (!navMenu || !menuToggle) return;
        navMenu.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
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
    const whatsappNumber = "6283112250227";

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
/* =====================================================
   BERITA BLOGGER
   - 150 berita terbaru
   - 12 berita per halaman
   - pencarian
   - pagination
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const newsContainer =
        document.getElementById("allBloggerNews");

    const searchInput =
        document.getElementById("newsSearch");

    const clearSearchButton =
        document.getElementById("clearNewsSearch");

    if (!newsContainer) return;


    /* =================================================
       PENGATURAN
    ================================================= */

    const POSTS_PER_PAGE = 12;

    const MAX_NEWS = 150;


    /* =================================================
       STATE
    ================================================= */

    let allNewsEntries = [];

    let filteredNewsEntries = [];

    let currentPage = 1;

    let searchMode = false;


    /* =================================================
       NOMOR HALAMAN DARI URL
    ================================================= */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const pageParam =
        parseInt(
            urlParams.get("page"),
            10
        );

    if (
        Number.isInteger(pageParam) &&
        pageParam > 0
    ) {
        currentPage = pageParam;
    }


    /* =================================================
       LOADING
    ================================================= */

    function showLoading(message = "Memuat berita...") {

        newsContainer.innerHTML = `
            <div class="news-loading">

                <i class="fa-solid fa-spinner fa-spin"></i>

                ${message}

            </div>
        `;

    }


    /* =================================================
       LOAD BLOGGER
    ================================================= */

    function loadBloggerNews() {

        showLoading(
            "Memuat berita terbaru..."
        );


        const callbackName =
            "bloggerNewsCallback_" +
            Date.now();


        const feedURL =
            "https://mialmuhajirinkm6.blogspot.com/feeds/posts/default" +
            "?alt=json-in-script" +
            "&start-index=1" +
            "&max-results=" +
            MAX_NEWS +
            "&callback=" +
            callbackName;


        window[callbackName] =
            function (data) {

                delete window[callbackName];


                const entries =
                    data.feed?.entry || [];


                if (!entries.length) {

                    newsContainer.innerHTML = `
                        <div class="news-empty">

                            <i class="fa-solid fa-newspaper"></i>

                            <p>
                                Belum ada berita terbaru.
                            </p>

                        </div>
                    `;

                    return;
                }


                allNewsEntries =
                    entries;


                filteredNewsEntries =
                    entries;


                renderNews();

            };


        const oldScript =
            document.getElementById(
                "bloggerNewsFeed"
            );

        if (oldScript) {
            oldScript.remove();
        }


        const script =
            document.createElement("script");

        script.id =
            "bloggerNewsFeed";

        script.src =
            feedURL;


        script.onerror = () => {

            delete window[callbackName];


            newsContainer.innerHTML = `
                <div class="news-empty">

                    <i class="fa-solid fa-triangle-exclamation"></i>

                    <p>
                        Berita belum dapat dimuat.
                    </p>

                </div>
            `;

        };


        document.body.appendChild(
            script
        );

    }


    /* =================================================
       RENDER BERITA
    ================================================= */

    function renderNews() {

        const totalResults =
            filteredNewsEntries.length;


        const totalPages =
            Math.max(
                1,
                Math.ceil(
                    totalResults /
                    POSTS_PER_PAGE
                )
            );


        /* Pastikan halaman valid */

        if (
            currentPage >
            totalPages
        ) {
            currentPage =
                totalPages;
        }


        const start =
            (currentPage - 1) *
            POSTS_PER_PAGE;


        const end =
            start +
            POSTS_PER_PAGE;


        const pageEntries =
            filteredNewsEntries.slice(
                start,
                end
            );


        if (!pageEntries.length) {

            newsContainer.innerHTML = `
                <div class="news-empty">

                    <i class="fa-solid fa-newspaper"></i>

                    <p>
                        Tidak ada berita pada halaman ini.
                    </p>

                </div>
            `;

            return;
        }


        let html = "";


        /* =================================================
           INFO HASIL PENCARIAN
        ================================================= */

        if (searchMode) {

            html += `
                <div class="search-result-info">

                    Menampilkan
                    <strong>
                        ${totalResults}
                    </strong>

                    berita untuk

                    <strong>
                        "${escapeHTML(
                            searchInput
                                ? searchInput.value.trim()
                                : ""
                        )}"
                    </strong>

                </div>
            `;

        }


        html += `
            <div class="news-result-grid">
        `;


        /* =================================================
           CARD BERITA
        ================================================= */

        pageEntries.forEach((entry) => {

            const title =
                entry.title?.$t ||
                "Tanpa Judul";


            const link =
                getPostLink(entry);


            const date =
                formatDate(
                    entry.published?.$t ||
                    ""
                );


            const image =
                getPostImage(entry);


            const excerpt =
                getExcerpt(
                    entry,
                    150
                );


            html += `
                <article class="all-news-card">

                    <a
                        href="${link}"
                        class="all-news-image"
                        target="_blank"
                        rel="noopener noreferrer"
                    >

                        <img
                            src="${image}"
                            alt="${escapeHTML(title)}"
                            loading="lazy"
                        >

                    </a>


                    <div class="all-news-content">

                        <span class="all-news-date">

                            <i
                                class="fa-regular fa-calendar"
                            ></i>

                            ${date}

                        </span>


                        <h2>

                            <a
                                href="${link}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ${escapeHTML(title)}
                            </a>

                        </h2>


                        <p>
                            ${escapeHTML(excerpt)}
                            ${excerpt ? "..." : ""}
                        </p>


                        <a
                            href="${link}"
                            class="all-news-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >

                            Baca Selengkapnya

                            <i
                                class="fa-solid fa-arrow-right"
                            ></i>

                        </a>

                    </div>

                </article>
            `;

        });


        html += `
            </div>
        `;


        /* =================================================
           PAGINATION
        ================================================= */

        html += createPagination(
            totalPages
        );


        newsContainer.innerHTML =
            html;

    }


    /* =================================================
       PAGINATION
    ================================================= */

    function createPagination(
        totalPages
    ) {

        if (totalPages <= 1) {
            return "";
        }


        let html = `
            <div class="news-pagination">
        `;


        /* SEBELUMNYA */

        if (currentPage > 1) {

            html += `
                <a
                    href="?page=${currentPage - 1}"
                    class="pagination-prev"
                    data-page="${currentPage - 1}"
                    aria-label="Halaman sebelumnya"
                >

                    <i
                        class="fa-solid fa-chevron-left"
                    ></i>

                    Sebelumnya

                </a>
            `;

        } else {

            html += `
                <span
                    class="pagination-disabled"
                >

                    <i
                        class="fa-solid fa-chevron-left"
                    ></i>

                    Sebelumnya

                </span>
            `;

        }


        /* =================================================
           NOMOR HALAMAN
        ================================================= */

        const maxVisible = 5;


        let startPage =
            Math.max(
                1,
                currentPage - 2
            );


        let endPage =
            Math.min(
                totalPages,
                startPage +
                maxVisible -
                1
            );


        if (
            endPage -
            startPage +
            1 <
            maxVisible
        ) {

            startPage =
                Math.max(
                    1,
                    endPage -
                    maxVisible +
                    1
                );

        }


        /* HALAMAN 1 */

        if (startPage > 1) {

            html += `
                <a
                    href="?page=1"
                    class="pagination-number"
                    data-page="1"
                >
                    1
                </a>
            `;


            if (startPage > 2) {

                html += `
                    <span
                        class="pagination-dots"
                    >
                        ...
                    </span>
                `;

            }

        }


        /* NOMOR HALAMAN */

        for (
            let page = startPage;
            page <= endPage;
            page++
        ) {

            if (
                page === currentPage
            ) {

                html += `
                    <span
                        class="pagination-number active"
                    >
                        ${page}
                    </span>
                `;

            } else {

                html += `
                    <a
                        href="?page=${page}"
                        class="pagination-number"
                        data-page="${page}"
                    >
                        ${page}
                    </a>
                `;

            }

        }


        /* HALAMAN TERAKHIR */

        if (
            endPage <
            totalPages
        ) {

            if (
                endPage <
                totalPages - 1
            ) {

                html += `
                    <span
                        class="pagination-dots"
                    >
                        ...
                    </span>
                `;

            }


            html += `
                <a
                    href="?page=${totalPages}"
                    class="pagination-number"
                    data-page="${totalPages}"
                >
                    ${totalPages}
                </a>
            `;

        }


        /* BERIKUTNYA */

        if (
            currentPage <
            totalPages
        ) {

            html += `
                <a
                    href="?page=${currentPage + 1}"
                    class="pagination-next"
                    data-page="${currentPage + 1}"
                    aria-label="Halaman berikutnya"
                >

                    Berikutnya

                    <i
                        class="fa-solid fa-chevron-right"
                    ></i>

                </a>
            `;

        } else {

            html += `
                <span
                    class="pagination-disabled"
                >

                    Berikutnya

                    <i
                        class="fa-solid fa-chevron-right"
                    ></i>

                </span>
            `;

        }


        html += `
            </div>
        `;


        return html;

    }


    /* =================================================
       KLIK PAGINATION
    ================================================= */

    newsContainer.addEventListener(
        "click",
        (event) => {

            const paginationLink =
                event.target.closest(
                    "[data-page]"
                );


            if (!paginationLink) {
                return;
            }


            event.preventDefault();


            const page =
                parseInt(
                    paginationLink.dataset.page,
                    10
                );


            if (
                !Number.isInteger(page) ||
                page < 1
            ) {
                return;
            }


            currentPage =
                page;


            const newURL =
                `?page=${page}`;


            window.history.pushState(
                {},
                "",
                newURL
            );


            renderNews();


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =================================================
       PENCARIAN
    ================================================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                const keyword =
                    searchInput.value
                        .trim()
                        .toLowerCase();


                /* CLEAR BUTTON */

                if (clearSearchButton) {

                    clearSearchButton.style.display =
                        keyword
                            ? "flex"
                            : "none";

                }


                if (!keyword) {

                    searchMode =
                        false;


                    filteredNewsEntries =
                        allNewsEntries;


                    currentPage =
                        1;


                    updateURL();


                    renderNews();


                    return;

                }


                searchMode =
                    true;


                currentPage =
                    1;


                filteredNewsEntries =
                    allNewsEntries.filter(
                        (entry) => {

                            const title =
                                entry.title?.$t ||
                                "";


                            const summary =
                                entry.summary?.$t ||
                                "";


                            const content =
                                entry.content?.$t ||
                                "";


                            const labels =
                                getLabels(entry);


                            const searchableText =
                                (
                                    title +
                                    " " +
                                    summary +
                                    " " +
                                    content +
                                    " " +
                                    labels
                                )
                                .toLowerCase();


                            return searchableText
                                .includes(keyword);

                        }
                    );


                updateURL();


                renderNews();

            }
        );

    }


    /* =================================================
       CLEAR SEARCH
    ================================================= */

    if (clearSearchButton) {

        clearSearchButton.addEventListener(
            "click",
            () => {

                if (searchInput) {
                    searchInput.value = "";
                }


                clearSearchButton.style.display =
                    "none";


                searchMode =
                    false;


                filteredNewsEntries =
                    allNewsEntries;


                currentPage =
                    1;


                updateURL();


                renderNews();

            }
        );

    }


    /* =================================================
       UPDATE URL
    ================================================= */

    function updateURL() {

        const params =
            new URLSearchParams();


        if (currentPage > 1) {

            params.set(
                "page",
                currentPage
            );

        }


        const keyword =
            searchInput
                ? searchInput.value.trim()
                : "";


        if (keyword) {

            params.set(
                "q",
                keyword
            );

        }


        const queryString =
            params.toString();


        const newURL =
            queryString
                ? `?${queryString}`
                : window.location.pathname;


        window.history.replaceState(
            {},
            "",
            newURL
        );

    }


    /* =================================================
       LINK POSTING BLOGGER
    ================================================= */

    function getPostLink(entry) {

        const link =
            (entry.link || []).find(
                (item) =>
                    item.rel === "alternate"
            );


        return link
            ? link.href
            : "https://mialmuhajirinkm6.blogspot.com/";

    }


    /* =================================================
       LABEL / KATEGORI
    ================================================= */

    function getLabels(entry) {

        if (
            !entry.category ||
            !entry.category.length
        ) {
            return "";
        }


        return entry.category
            .map(
                item =>
                    item.term || ""
            )
            .join(" ");

    }


    /* =================================================
       GAMBAR
    ================================================= */

    function getPostImage(entry) {

        /* Media thumbnail */

        if (
            entry.media$thumbnail &&
            entry.media$thumbnail.url
        ) {

            return convertThumbnail(
                entry.media$thumbnail.url
            );

        }


        /* Cari gambar dari content */

        const html =
            entry.content?.$t ||
            entry.summary?.$t ||
            "";


        const imageMatch =
            html.match(
                /<img[^>]+src=["']([^"']+)["']/i
            );


        if (
            imageMatch &&
            imageMatch[1]
        ) {

            return imageMatch[1];

        }


        return "aset/logonobg.png";

    }


    /* =================================================
       UBAH UKURAN THUMBNAIL
    ================================================= */

    function convertThumbnail(
        url
    ) {

        if (!url) {
            return "aset/logonobg.png";
        }


        return url
            .replace(
                /\/s72-c\//,
                "/s600/"
            )
            .replace(
                /\/w\d+-h\d+(-p)?\//,
                "/s600/"
            );

    }


    /* =================================================
       RINGKASAN
    ================================================= */

    function getExcerpt(
        entry,
        length = 150
    ) {

        const html =
            entry.summary?.$t ||
            entry.content?.$t ||
            "";


        const temp =
            document.createElement(
                "div"
            );


        temp.innerHTML =
            html;


        const text =
            temp.textContent ||
            temp.innerText ||
            "";


        return text
            .replace(
                /\s+/g,
                " "
            )
            .trim()
            .slice(
                0,
                length
            );

    }


    /* =================================================
       TANGGAL
    ================================================= */

    function formatDate(
        dateString
    ) {

        if (!dateString) {
            return "";
        }


        const date =
            new Date(
                dateString
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "";
        }


        return date.toLocaleDateString(
            "id-ID",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

    }


    /* =================================================
       ESCAPE HTML
    ================================================= */

    function escapeHTML(
        text
    ) {

        const temp =
            document.createElement(
                "div"
            );


        temp.textContent =
            text;


        return temp.innerHTML;

    }


    /* =================================================
       BACA QUERY SEARCH SAAT HALAMAN DIBUKA
    ================================================= */

    const initialQuery =
        urlParams.get("q");


    if (
        initialQuery &&
        searchInput
    ) {

        searchInput.value =
            initialQuery;


        if (clearSearchButton) {

            clearSearchButton.style.display =
                "flex";

        }

        searchMode =
            true;

    }


    /* =================================================
       MULAI
    ================================================= */

    loadBloggerNews();

});
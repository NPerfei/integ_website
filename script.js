let navlinks = document.querySelectorAll("nav a");
let sections = document.querySelectorAll("section");
let bottomNavLinks = document.querySelectorAll('.footer-nav a');
let leftSidebar = document.querySelector("#left-sidebar");
let rightSidebar = document.querySelector("#right-sidebar");
let sideBarContents = {
    "programming": ['introduction', 'compiler', 'hello world', 'conditionals', 'loops'],
    "html": ['introduction', 'compiler', 'html structure', 'headings', 'links & images'],
    "php": ['introduction', 'compiler', 'basic syntax', 'variables', 'conditionals']
};
let overlay = document.getElementById("dark-overlay");
let hamburgerMenu = document.getElementById('hamburger-menu');
let hamburgerMenuLinks = document.querySelectorAll('#hamburger-menu > *');
let hamburgerSide = document.querySelector("#hamburger-side #sub-content")
let currentSection = null;

navlinks.forEach(navlink => {
    navlink.addEventListener('click', openSection);
});

bottomNavLinks.forEach(navlink => {
    navlink.addEventListener('click', openSection);
});

hamburgerMenuLinks.forEach(navlink => {
    navlink.addEventListener('click', openSection);
});

document.getElementById('hamburger-menu-toggle').addEventListener('click', openHamburgerMenu);
document.getElementById("hamburger-side-toggle").addEventListener('click', openHamburgerSide);

function openSection(e) {
    if (e.target.parentElement.classList.contains('show')) {
        overlayCascade(e.target.parentElement);
    }

    let sectionName = e.target.textContent.split(" ")[0].toLowerCase();
    currentSection = sectionName;

    let type = e.target.parentElement.classList.contains("footer-nav") ? 1 : 0;

    if (type == 1 && sectionName == "contact") {
        return;
    }

    for (let i = 0; i < sections.length; i++) {
        if (sections[i].classList.contains('active')) {
            sections[i].classList.remove('active');
            navlinks[i].classList.remove('active');
        }
    }

    document.getElementById(sectionName).classList.add('active');
    
    if (type == 1) {
        navlinks[sectionName == "home" ? 0 : 6].classList.add('active');
    }
    else {
        if (e.target.parentElement.id == "hamburger-menu") {
            for (let i = 0; i < navlinks.length; i++) { // for cases when section is changed using hamburger menu

                if (navlinks[i].textContent.split(" ")[0].toLowerCase() == sectionName) {
                    navlinks[i].classList.add('active');
                    break;
                }
            }
        }
        else {
            e.target.classList.add('active')
        }
    }

    toggleSidebar(sectionName);
    setSidebarLinks(sectionName);
}

function toggleSidebar(activeTab) {
    let hamburgerToggle = document.getElementById("hamburger-side-toggle");
    if (["home", "about"].includes(activeTab)) {
        leftSidebar.classList.remove('active');
        rightSidebar.classList.remove('active');
        hamburgerToggle.classList.remove('active');
    }
    else {
        leftSidebar.classList.add('active');
        rightSidebar.classList.add('active');
        hamburgerToggle.classList.add('active');
    }
}

function setSidebarLinks(activeTab) {
    if (activeTab == 'about' || activeTab == "home") {
        return;
    }

    leftSidebar.innerHTML = '';
    hamburgerSide.innerHTML = ''; //

    if (['c', 'python', 'javascript'].includes(activeTab)) { activeTab = "programming" };
    
    sideBarContents[activeTab].forEach(link => {
        const a = document.createElement('a');
        a.href = "#";
        a.textContent = capitalizeWords(link);
        leftSidebar.appendChild(a);
        hamburgerSide.append(a.cloneNode(true)); //
    });

    if (leftSidebar.children.length > 0) {
        openSubContent(null, 'introduction');
        [...leftSidebar.children].forEach(link => {
            link.addEventListener('click', openSubContent);
        });
        [...hamburgerSide.children].forEach(link => {
            link.addEventListener('click', openSubContent);
        });
    }
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
}

function openSubContent(e, type = 0) { // hijack this function for hamburger-side
    let subContentClicked = type == 0 ? e.target.textContent.split(" ")[0].toLowerCase() : type;
    let toShow = document.querySelector(`section#${currentSection} > .container > div.${subContentClicked}`);
    let currentSubContents = document.querySelectorAll(`#${currentSection} > .container > *`);
    let leftSidebarLinks = leftSidebar.children;

    for (let i = 0; i < currentSubContents.length; i++) {
        if (currentSubContents[i].classList.contains('active')) {
            currentSubContents[i].classList.remove('active');
        }
    }

    for (let i = 0; i < leftSidebarLinks.length; i++) {
        leftSidebarLinks[i].classList.remove('active');
    }


    toShow.classList.add('active');

    for (let i = 0; i < leftSidebarLinks.length; i++) {
        if (leftSidebarLinks[i].textContent.split(" ")[0].toLowerCase() == subContentClicked) {
            leftSidebarLinks[i].classList.add('active');
            break;
        }
    }

    overlayCascade(document.querySelector("#hamburger-side"));
}

function openHamburgerMenu(e) {
    overlay.classList.add('show');
    hamburgerMenu.classList.add('show');

    overlay.addEventListener('click', () => {
        overlayCascade(hamburgerMenu);
    });
}

function openHamburgerSide(e) {
    overlay.classList.add('show');
    let hamburgerSideWhole =  document.querySelector("#hamburger-side");
    hamburgerSideWhole.classList.add('show');

    overlay.addEventListener('click', () => {
        overlayCascade(hamburgerSideWhole);
    });
}

function overlayCascade(shownHamburger) {
    overlay.classList.remove('show');
    shownHamburger.classList.remove('show');

    overlay.removeEventListener('click', overlayCascade);
}
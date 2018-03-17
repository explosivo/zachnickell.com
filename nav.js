var navbar = document.createElement("nav");
navbar.classList.add("navbar", "navbar-expand-lg", "navbar-dark", "bg-faded");

var brand = document.createElement("a");
brand.classList.add("navbar-brand");
brand.href = "index.html";
brand.innerHTML = "zachnickell";

var navbarButton = document.createElement("button");
navbarButton.classList.add("navbar-toggler");
navbarButton.type = "button";
navbarButton.setAttribute("data-toggle", "collapse");
navbarButton.setAttribute("data-target", "#navbarSupportedContent");
navbarButton.setAttribute("aria-controls", "navbarSupportedContent");
navbarButton.setAttribute("aria-expanded", "false");
navbarButton.setAttribute("aria-label", "Toggle navigation");
var navbarButtonIcon = document.createElement("span");
navbarButtonIcon.classList.add("navbar-toggler-icon");
navbarButton.appendChild(navbarButtonIcon);

var collapseNav = document.createElement("div");
collapseNav.classList.add("collapse", "navbar-collapse");
collapseNav.setAttribute("id", "navbarSupportedContent");

var navlist = document.createElement("ul");
navlist.classList.add("navbar-nav", "mr-auto");

var about = createNavItem("about", "index.html");
var projects = createNavItem("projects", "projects.html");
var downloads = createNavItem("downloads", "#");

var navItems = [about, projects, downloads];
setActiveNavItem(navItems);
addNavItemsToNavList(navItems, navlist);

collapseNav.appendChild(navlist);

navbar.appendChild(brand);
navbar.appendChild(navbarButton);
navbar.appendChild(collapseNav);

document.body.appendChild(navbar);

function createNavItem(text, href)
{
    let navitem = document.createElement("li");
    navitem.classList.add("nav-item");
    
    let navlink = document.createElement("a");
    navlink.classList.add("nav-link");
    navlink.href = href;
    navlink.innerHTML = text;

    navitem.appendChild(navlink);

    return navitem;
}

function setActiveNavItem(navItems)
{
    let urlParts = window.location.href.split("/");
    let currentHref = urlParts[urlParts.length - 1];
    
    for (var i = 0, len = navItems.length; i < len; i ++)
    {
        let urlParts = navItems[i].firstElementChild.href.split("/");
        let href = urlParts[urlParts.length - 1];
        
        if (currentHref == href)
        {
            navItems[i].classList.add("active");
            return;
        }
    }
}

function addNavItemsToNavList(navItems, navlist)
{
    for (var i = 0, len = navItems.length; i < len; i ++)
    {
        navlist.appendChild(navItems[i]);
    }
}
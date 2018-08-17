var navbar = document.createElement("nav");
navbar.className = "navbar sticky-top navbar-expand-lg navbar-dark bg-faded";

var brand = document.createElement("a");
brand.className = "navbar-brand";
brand.href = "/";
brand.innerHTML = "zachnickell";

var navbarButton = document.createElement("button");
navbarButton.className = "navbar-toggler";
navbarButton.setAttribute("type", "button");
navbarButton.setAttribute("data-toggle", "collapse");
navbarButton.setAttribute("data-target", "#navbarSupportedContent");
navbarButton.setAttribute("aria-controls", "navbarSupportedContent");
navbarButton.setAttribute("aria-expanded", "false");
navbarButton.setAttribute("aria-label", "Toggle navigation");
var navbarButtonIcon = document.createElement("span");
navbarButtonIcon.className = "navbar-toggler-icon";
navbarButton.appendChild(navbarButtonIcon);

var collapseNav = document.createElement("div");
collapseNav.className = "collapse navbar-collapse";
collapseNav.setAttribute("id", "navbarSupportedContent");

var navlist = document.createElement("ul");
navlist.className = "navbar-nav mr-auto";

var about = createNavItem("about", "/");
var projects = createNavItem("projects", "projects.html");
var downloads = createNavItem("docs", "docs.html");

var navItems = [about, projects, downloads];
setActiveNavItem(navItems);
addNavItemsToNavList(navItems, navlist);
collapseNav.appendChild(navlist);

var blur = document.createElement("div");
blur.className = "blur";

navbar.appendChild(brand);
navbar.appendChild(navbarButton);
navbar.appendChild(collapseNav);
navbar.appendChild(blur);

document.body.appendChild(navbar);

function createNavItem(text, href)
{
    var navitem = document.createElement("li");
    navitem.className = "nav-item";
    
    var navlink = document.createElement("a");
    navlink.className = "nav-link";
    navlink.href = href;
    navlink.innerHTML = text;

    navitem.appendChild(navlink);

    return navitem;
}

function setActiveNavItem(navItems)
{
    var urlParts = window.location.href.split("/");
    var currentHref = urlParts[urlParts.length - 1];
    
    for (var i = 0, len = navItems.length; i < len; i ++)
    {
        var urlParts = navItems[i].firstElementChild.href.split("/");
        var href = urlParts[urlParts.length - 1];
        
        if (currentHref == href)
        {
            navItems[i].className = "active";
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
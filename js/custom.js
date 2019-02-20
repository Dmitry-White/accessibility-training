(() => {
  const burger = document.querySelector('.burger');
  const navBlock = document.querySelector(".navbar");
  const menu = document.querySelector("#" + burger.dataset.target);
  const mainMenuItems = document.querySelectorAll("#navbarMenu .navbar-item a");
  const skip = document.querySelector('.skipnav-button');
  burger.addEventListener("click", function() {
    navBlock.classList.toggle("is-active");
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");

    mainMenuItems.forEach(function(item) {
      if (burger.classList.contains("is-active")) {
        burger.setAttribute("aria-expanded", true);
        item.setAttribute("tabindex", "-1");
        
        burger.onkeyup = function(event) {
          if (event.which == 32 || 13 ) { 
            mainMenuItems[0].setAttribute("tabindex", 0);
            mainMenuItems[0].focus();
          }
        }
      }
      else {
        burger.setAttribute("aria-expanded", false);
        item.removeAttribute("tabindex");
      } 

      item.onkeyup = function(event) {
        var elToFocus;
        var menuList = item.parentElement.parentElement;

        switch (event.which) {
          case 40:
            elToFocus = item.parentElement === menuList.lastElementChild ? menuList.firstElementChild.firstElementChild : item.parentElement.nextElementSibling.firstElementChild;  
            break;

          case 38:
            elToFocus = item.parentElement === menuList.firstElementChild ?
            menuList.lastElementChild.firstElementChild : item.parentElement.previousElementSibling.firstElementChild; 
            break;
        }

        item.setAttribute("tabindex", "-1");
        item.blur();
        elToFocus.setAttribute("tabindex", 0);
        elToFocus.focus();  
      }
    });
  });

  skip.addEventListener('click', () => {
    skip.parentNode.classList.toggle('is-active');
  })
})();

document.querySelectorAll('#nav button').forEach(function (navEl) {
  navEl.onclick = function () {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  const navEls = document.querySelectorAll('#nav button');

  navEls.forEach(navEl => {
    if (navEl.id == selectedNav) {
      navEl.classList.add('is-active');
      navEl.setAttribute("aria-selected", true);
      navEl.setAttribute("tabindex", "");
    }
    else if (navEl.classList.contains('is-active')) {
      navEl.classList.remove('is-active');
      navEl.setAttribute("aria-selected", false);
      navEl.setAttribute("tabindex", "-1");
    }
  });

  const tabs = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.id == targetId
      ? tab.style.display = 'block'
      : tab.style.display = 'none';
  });
}


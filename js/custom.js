(() => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('#' + burger.dataset.target);
  const skip = document.querySelector('.skipnav-button');
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });
  skip.addEventListener('click', () => {
    skip.parentNode.classList.toggle('is-active');
  })
})();

document.querySelectorAll('#nav li').forEach(function (navEl) {
  navEl.onclick = function () {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  const navEls = document.querySelectorAll('#nav li');

  navEls.forEach(navEl => {
    if (navEl.id == selectedNav) navEl.classList.add('is-active')
    else if (navEl.classList.contains('is-active')) {
      navEl.classList.remove('is-active');
    }
  });

  const tabs = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.id == targetId
      ? tab.style.display = 'block'
      : tab.style.display = 'none';
  });
}


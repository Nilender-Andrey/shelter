document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const burgerBtn = document.getElementById('burger-btn');
  const headerWrapper = document.getElementById('header-wrapper');

  burgerBtn.addEventListener('click', toggleMenuHandler);
  headerWrapper.addEventListener('click', closeMenuHandler);

  function toggleMenuHandler(event) {
    content.classList.toggle('content--nav-open');
  }

  function closeMenuHandler(event) {
    let target = event.target;

    if (['nav-list__link', 'backdrop'].includes(target.classList[0])) {
      content.classList.remove('content--nav-open');
    }
  }
});

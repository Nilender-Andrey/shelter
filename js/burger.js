document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const burgerBtn = document.getElementById('burger-btn');
  const headerWrapper = document.getElementById('header-wrapper');

  burgerBtn.addEventListener('click', toggleMenuHandler);
  headerWrapper.addEventListener('click', closeMenuHandler);

  function toggleMenuHandler() {
    headerWrapper.classList.toggle('header-wrapper--nav-open');
    content.classList.toggle('content--scroll-disabled');
  }

  function closeMenuHandler(event) {
    let target = event.target;

    if (['nav-list__link', 'backdrop'].includes(target.classList[0])) {
      headerWrapper.classList.remove('header-wrapper--nav-open');
      content.classList.remove('content--scroll-disabled');
    }
  }
});

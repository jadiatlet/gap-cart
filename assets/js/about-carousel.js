// CAROUSEL
$(document).ready(function () {
  $('.carousel').carousel({
    dist: 0,
    padding: 0,
    fullWidth: true,
    fullHeight: true,
    indicators: true,
    duration: 100,
  });
});

autoplay()

function autoplay() {
  $('.carousel').carousel('next');
  setTimeout(autoplay, 45000);
}
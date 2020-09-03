// Make sure sw are supported
if ('serviceWorker' in navigator) {
  // Register when window loads
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_site.js')
      .then(reg => console.log('Service Worker Registered'))
      .catch(err => console.log(`Service Worker: ERROR: ${err}`))
  });
}

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = './styles.css';
document.head.appendChild(link);

(function mount() {
  import('./app.js').then(({ default: App }) => {
    const root = document.getElementById('root');
    root.innerHTML = '';
    root.appendChild(App());
  });
})();
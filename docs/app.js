export default function App() {
  const page = document.createElement('main');
  page.className = 'page';

  const hero = document.createElement('section');
  hero.className = 'hero';
  const h1 = document.createElement('h1');
  h1.className = 'logo';
  const left = document.createElement('span');
  left.className = 'logo-left';
  left.textContent = 'Vice';
  const right = document.createElement('span');
  right.className = 'logo-right';
  right.textContent = 'Bank';
  h1.appendChild(left);
  h1.appendChild(right);

  const tag = document.createElement('p');
  tag.className = 'tagline';
  const emph = document.createElement('span');
  emph.className = 'emph';
  emph.textContent = 'Rizz Up';
  tag.appendChild(emph);
  tag.appendChild(document.createTextNode(", don’t Jizz Up"));

  const sub = document.createElement('p');
  sub.className = 'sub';
  sub.textContent = 'Financial accountability to get you off of 🌽 and on top of a baddie 🍑';

  hero.appendChild(h1);
  hero.appendChild(tag);
  hero.appendChild(sub);

  const mockups = document.createElement('section');
  mockups.className = 'mockups';
  const phones = document.createElement('div');
  phones.className = 'phones';

  const imgs = [
    { src: './phone-1.png', alt: 'Dashboard screen', delay: 0 },
    { src: './phone-2.png', alt: 'Custom domains screen', delay: 120 },
    { src: './phone-3.png', alt: 'Grace period screen', delay: 240 },
    { src: './phone-4.png', alt: 'Welcome screen', delay: 360 },
  ];
  imgs.forEach(({ src, alt, delay }) => {
    const img = document.createElement('img');
    img.className = 'phone reveal';
    img.src = src;
    img.alt = alt;
    img.style.transitionDelay = `${delay}ms`;
    phones.appendChild(img);
  });

  const cta = document.createElement('p');
  cta.className = 'cta reveal';
  cta.style.transitionDelay = '520ms';
  cta.innerHTML = 'Your First Step Towards Being a <strong>Rizzler</strong> Starts here…';

  mockups.appendChild(phones);
  mockups.appendChild(cta);

  page.appendChild(hero);
  page.appendChild(mockups);

  // Fade-up observer
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  page.querySelectorAll('.reveal').forEach((n) => io.observe(n));

  return page;
}
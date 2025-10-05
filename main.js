// Hash-based routing for tabs
const tabs = Array.from(document.querySelectorAll('.tab'));
const sections = Array.from(document.querySelectorAll('.section'));

function activateFromHash() {
  const hash = location.hash || '#home';
  tabs.forEach(t => t.classList.toggle('active', t.getAttribute('href') === hash));
  sections.forEach(sec => sec.style.display = '#' + sec.id === hash ? '' : 'none');
}

// Mascot auto-minimize and toggle behaviour
document.addEventListener('DOMContentLoaded', ()=>{
  const mascot = document.querySelector('.mascot');
  const speech = mascot && mascot.querySelector('.mascot__speech');
  if(!mascot || !speech) return;

  let minimizeTimer = null;
  // whether the initial auto-minimize has already occurred
  let autoMinimizedOnce = false;
  const startTimer = ()=>{
    clearTimeout(minimizeTimer);
    minimizeTimer = setTimeout(()=>{ mascot.classList.add('minimized'); autoMinimizedOnce = true; }, 3000);
  };

  const open = ()=>{ mascot.classList.remove('minimized'); if(!autoMinimizedOnce) startTimer(); };
  const toggle = ()=>{
    mascot.classList.toggle('minimized');
    if(!mascot.classList.contains('minimized')) {
      if(!autoMinimizedOnce) startTimer();
    } else {
      clearTimeout(minimizeTimer);
    }
  };

  // start timer on load (only the first time)
  startTimer();

  // clicking the mascot (image or bubble) toggles — clicks on interactive elements inside should still work
  mascot.addEventListener('click', (e)=>{
    const tag = e.target.tagName.toLowerCase();
    if(['a','button','input','textarea'].includes(tag)) return;
    toggle();
  });

  // if user interacts with page before the one-time auto-minimize, reopen the mascot and restart timer
  ['pointerdown','keydown','scroll','touchstart'].forEach(ev=>{
    window.addEventListener(ev, ()=>{ if(!autoMinimizedOnce && mascot.classList.contains('minimized')) open(); });
  });
});
window.addEventListener('hashchange', activateFromHash);
activateFromHash();

// Gallery data (local images only)
const galleryItems = [
  { local: 'earths-horizon.jpg', title: "Earth's Horizon", description: 'Curvature and atmosphere from Cupola' },
  { local: 'cupola-inner.jpg', title: 'Cupola Inner', description: 'Inside the seven-windowed observatory' },
  { local: 'cupola-sunset.jpg', title: 'Cupola Sunset', description: 'Sunset scenes from orbit' },
  { local: 'nanoracks-cupola.jpg', title: 'Nanoracks Cupola', description: 'Commercial research at the window' },
  { local: 'ISS-training.jpg', title: 'ISS Training', description: 'Astronaut training and preparation' }
];

const galleryGrid = document.getElementById('gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-desc');
const lightboxClose = document.getElementById('lightbox-close');

if (galleryGrid) {
  const transparentPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AArgBvYw3/SEAAAAASUVORK5CYII=';
  galleryItems.forEach(item => {
    const el = document.createElement('button');
    el.className = 'thumb';
    const img = document.createElement('img');
    img.src = item.local;
    img.alt = item.title;
    img.referrerPolicy = 'no-referrer';
    img.onerror = () => { img.src = transparentPng; };
    const title = document.createElement('div');
    title.className = 'thumb-title';
    title.textContent = item.title;
    const desc = document.createElement('div');
    desc.className = 'thumb-desc';
    desc.textContent = item.description;
    el.appendChild(img);
    el.appendChild(title);
    el.appendChild(desc);

    // prevent clicks while swiping on touch
    let isDraggingThumb = false; let startX=0;
    el.addEventListener('pointerdown', (e)=>{ isDraggingThumb=false; startX = e.clientX; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', (e)=>{ if(Math.abs(e.clientX - startX) > 8) isDraggingThumb = true; });
    el.addEventListener('pointerup', ()=>{ el.releasePointerCapture && el.releasePointerCapture(); });

    el.addEventListener('click', (e) => {
      if (isDraggingThumb) return; // ignore click when swipe
      lightboxImg.src = item.local;
      lightboxImg.alt = item.title;
      lightboxTitle.textContent = item.title;
      lightboxDesc.textContent = item.description;
      lightbox.classList.remove('hidden');
      lightboxImg.onerror = () => { lightboxImg.src = transparentPng; };
    });

    galleryGrid.appendChild(el);
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', () => lightbox.classList.add('hidden'));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.add('hidden'); });
}

// Disaster carousel (local images only)
const disasters = [
  { name: 'Wildfires', local: './images/wildfire.jpg', text: 'From space: Wildfires show up as bright orange/red hotspots using thermal sensors, while thick brown or gray smoke plumes often stretch for hundreds of kilometers. Burn scars appear as dark patches contrasting with surrounding land. Key features: Long smoke trails, rapid expansion, thermal signatures even through clouds.' },
  { name: 'Tsunamis', local: './images/tsunami.jpg', text: 'From space: The tsunami wave itself is hard to spot—but the aftermath is visible: changed coastlines, flooded land, debris fields. Satellite images taken before and after an event reveal the full extent of flooding and structural damage. Key features: Altered shoreline, inundated lowlands, sediment plumes spreading into the ocean.' },
  { name: 'Floods', local: './images/flood.jpg', text: 'From space: Floodwaters turn land unusually dark or blue, expanding beyond normal riverbanks seen in pre-event images. Space imagery quickly outlines the true size of affected areas, even when clouds obscure the ground. Key features: Large swaths of darkened or shimmering area, water pooled in fields and urban landscapes.' },
  { name: 'Sandstorms', local: './images/sandstorm.jpg', text: 'From space: Massive sand or dust storms appear as tan or yellowish clouds moving across continents. These plumes can be traced from their origin (like the Sahara) as they travel thousands of kilometers, sometimes crossing oceans. Key features: Thick, billowing clouds of dust, often obscuring the surface below, moving in distinct fronts or swirls.' }
];

const track = document.getElementById('disaster-track');
const prevBtn = document.querySelector('.carousel .prev');
const nextBtn = document.querySelector('.carousel .next');

let slideIndex = 0;
if (track) {
  const transparentPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AArgBvYw3/SEAAAAASUVORK5CYII=';
  disasters.forEach(d => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    const wrap = document.createElement('div');
    wrap.className = 'img-wrap';
    const img = document.createElement('img');
    img.src = d.local;
    img.alt = `${d.name} from ISS`;
    img.referrerPolicy = 'no-referrer';
    img.onerror = () => { img.src = transparentPng; };
    wrap.appendChild(img);
    const text = document.createElement('div');
    text.className = 'text';
    const h = document.createElement('h3'); h.className = 'card-title'; h.textContent = d.name;
    const p = document.createElement('p'); p.className = 'card-text'; p.textContent = d.text;
    text.appendChild(h); text.appendChild(p);
    slide.appendChild(wrap); slide.appendChild(text);
    track.appendChild(slide);
  });

  function showSlide(i){
    slideIndex = (i + disasters.length) % disasters.length;
    const offset = slideIndex * track.clientWidth;
    track.scrollTo({ left: offset, behavior: 'smooth' });
  }
  prevBtn && prevBtn.addEventListener('click',()=>showSlide(slideIndex-1));
  nextBtn && nextBtn.addEventListener('click',()=>showSlide(slideIndex+1));

  let startX=0; let isDown=false; let startScroll=0;
  track.addEventListener('pointerdown',e=>{isDown=true;startX=e.clientX;startScroll=track.scrollLeft;track.setPointerCapture(e.pointerId)});
  track.addEventListener('pointermove',e=>{if(!isDown)return;const dx=e.clientX-startX;track.scrollLeft=startScroll-dx});
  track.addEventListener('pointerup',()=>{isDown=false;const w=track.clientWidth;showSlide(Math.round(track.scrollLeft/w))});
  window.addEventListener('resize',()=>showSlide(slideIndex));
}

// Three.js Earth with background planets
const loadingEl = document.getElementById('loading');
const root = document.getElementById('three-root');
if (root && window.THREE) {
  const THREE_NS = window.THREE;
  const scene = new THREE_NS.Scene();
  const camera = new THREE_NS.PerspectiveCamera(75, root.clientWidth/root.clientHeight, 0.1, 1000);
  const renderer = new THREE_NS.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(root.clientWidth, root.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  root.appendChild(renderer.domElement);
  camera.position.z = 5;

  const ambient = new THREE_NS.AmbientLight(0xffffff, 0.5); scene.add(ambient);
  const dir = new THREE_NS.DirectionalLight(0xffffff, 1); dir.position.set(5,3,5); scene.add(dir);

  const textureLoader = new THREE_NS.TextureLoader();
  if (textureLoader.setCrossOrigin) { textureLoader.setCrossOrigin('anonymous'); }
  const earthGeometry = new THREE_NS.SphereGeometry(1.5, 64, 64);
  const earthMaterial = new THREE_NS.MeshPhongMaterial({
    color: 0x2a5daa,
    bumpScale: 0.05,
    specular: new THREE_NS.Color('grey')
  });
  function applyTex(key, tex){ earthMaterial[key] = tex; earthMaterial.needsUpdate = true; }
  function loadWithFallback(localUrl, remoteUrl, key){
    textureLoader.load(localUrl, t => applyTex(key, t), undefined, () => {
      textureLoader.load(remoteUrl, t2 => applyTex(key, t2));
    });
  }
  loadWithFallback('assets/earth_atmos_2048.jpg', 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg', 'map');
  loadWithFallback('assets/earth_normal_2048.jpg', 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg', 'bumpMap');
  loadWithFallback('assets/earth_specular_2048.jpg', 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg', 'specularMap');
  const earth = new THREE_NS.Mesh(earthGeometry, earthMaterial); scene.add(earth);

  // Raycaster and pointer state to detect hovering over the earth mesh
  const raycaster = new THREE_NS.Raycaster();
  const pointer = new THREE_NS.Vector2();
  let pointerOverEarth = false;

  function checkPointerOverEarth(clientX, clientY){
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(earth, true);
    return hits.length > 0;
  }

  const planets=[];
  const planetConfigs=[
    { size: .4, distance: 8, speed: .001, tex: './images/earths-horizon.jpg', x: -3, y: 2 },
    { size: .6, distance:10, speed: .0008,tex: './images/cupola-sunset.jpg', x: 4, y:-2 },
    { size: .3, distance:12, speed: .0012,tex: './images/nanoracks-cupola.jpg', x:-5, y:-3 },
    { size: .5, distance: 9, speed: .0009,tex: './images/ISS-training.jpg', x: 3, y: 3 }
  ];
  planetConfigs.forEach(cfg=>{
    const g=new THREE_NS.SphereGeometry(cfg.size,32,32);
    const mat=new THREE_NS.MeshPhongMaterial({});
    new THREE_NS.TextureLoader().load(cfg.tex, tex=>{ mat.map=tex; mat.needsUpdate=true; });
    const p=new THREE_NS.Mesh(g,mat);
    p.position.set(cfg.x,cfg.y,-cfg.distance);
    p.userData={...cfg,angle:Math.random()*Math.PI*2};
    scene.add(p); planets.push(p);
  });

  const starsGeometry=new THREE_NS.BufferGeometry();
  const starsMaterial=new THREE_NS.PointsMaterial({ color:0xffffff, size:.05, transparent:true, opacity:.8 });
  const starsVertices=[];
  for(let i=0;i<8000;i++){starsVertices.push((Math.random()-.5)*2000,(Math.random()-.5)*2000,(Math.random()-.5)*2000)}
  starsGeometry.setAttribute('position', new THREE_NS.Float32BufferAttribute(starsVertices,3));
  const stars=new THREE_NS.Points(starsGeometry, starsMaterial); scene.add(stars);

  let isDragging=false; let prev={x:0,y:0}; let vel={x:0,y:0};
  const onDown=e=>{
    // only start dragging if the pointer was over the earth mesh
    if (!checkPointerOverEarth(e.clientX, e.clientY)) return;
    isDragging=true;prev.x=e.clientX;prev.y=e.clientY;
    renderer.domElement.classList.add('cursor-grabbing');
    renderer.domElement.classList.remove('cursor-grab');
  };
  const onMove=e=>{
    // update cursor hover state — only add classes when over the earth
    const over = checkPointerOverEarth(e.clientX, e.clientY);
    pointerOverEarth = over;
    if (pointerOverEarth && !isDragging) {
      renderer.domElement.classList.add('cursor-grab');
    } else if (!pointerOverEarth && !isDragging) {
      renderer.domElement.classList.remove('cursor-grab');
    }
    if(!isDragging) return;
    const dx=e.clientX-prev.x;const dy=e.clientY-prev.y;vel.x=dy*.005;vel.y=dx*.005;prev.x=e.clientX;prev.y=e.clientY
  };
  const onUp=()=>{isDragging=false; renderer.domElement.classList.remove('cursor-grabbing'); renderer.domElement.classList.remove('cursor-grab');};
  const onWheel=e=>{e.preventDefault();camera.position.z+=e.deltaY*.01;camera.position.z=Math.max(3,Math.min(10,camera.position.z))};
  renderer.domElement.addEventListener('mousedown',onDown);
  renderer.domElement.addEventListener('mousemove',onMove);
  renderer.domElement.addEventListener('mouseup',onUp);
  // pointer enter/leave for hover cursor cue
  // pointerenter/leave keep default when leaving canvas
  renderer.domElement.addEventListener('pointerenter',()=>{ /* noop - pointermove will set cursor when over earth */ });
  renderer.domElement.addEventListener('pointerleave',()=>{ renderer.domElement.classList.remove('cursor-grab'); renderer.domElement.classList.remove('cursor-grabbing'); pointerOverEarth = false; });
  renderer.domElement.addEventListener('wheel',onWheel,{passive:false});
  renderer.domElement.addEventListener('touchstart',e=>{
    const tx = e.touches[0].clientX, ty = e.touches[0].clientY;
    if (!checkPointerOverEarth(tx, ty)) return;
    isDragging=true;prev.x=tx;prev.y=ty; renderer.domElement.classList.add('cursor-grabbing'); renderer.domElement.classList.remove('cursor-grab');
  },{passive:true});
  renderer.domElement.addEventListener('touchmove',e=>{if(!isDragging)return;const dx=e.touches[0].clientX-prev.x;const dy=e.touches[0].clientY-prev.y;vel.x=dy*.005;vel.y=dx*.005;prev.x=e.touches[0].clientX;prev.y=e.touches[0].clientY},{passive:true});
  renderer.domElement.addEventListener('touchend',()=>{isDragging=false; renderer.domElement.classList.remove('cursor-grabbing'); renderer.domElement.classList.remove('cursor-grab');});

  // also listen to pointermove on canvas for cursor updates when not dragging
  renderer.domElement.addEventListener('pointermove', (e)=>{
    if (e.pointerType === 'mouse') {
      const over = checkPointerOverEarth(e.clientX, e.clientY);
      pointerOverEarth = over;
      if (pointerOverEarth && !isDragging) {
        renderer.domElement.classList.add('cursor-grab');
      } else if (!pointerOverEarth && !isDragging) {
        renderer.domElement.classList.remove('cursor-grab');
      }

      // Make gallery swipeable by dragging on the container (useful for desktop and mobile)
      const galleryContainer = document.querySelector('.gallery-wrap #gallery-grid');
      if (galleryContainer) {
        let isDown = false; let startX = 0; let scrollLeft = 0;
        galleryContainer.addEventListener('pointerdown', (e)=>{
          isDown = true; startX = e.clientX; scrollLeft = galleryContainer.scrollLeft; galleryContainer.setPointerCapture && galleryContainer.setPointerCapture(e.pointerId);
          galleryContainer.classList.add('dragging');
        });
        galleryContainer.addEventListener('pointermove', (e)=>{
          if(!isDown) return; const dx = e.clientX - startX; galleryContainer.scrollLeft = scrollLeft - dx;
        });
        ['pointerup','pointercancel','pointerleave'].forEach(ev=> galleryContainer.addEventListener(ev, (e)=>{ isDown=false; galleryContainer.classList.remove('dragging'); galleryContainer.releasePointerCapture && galleryContainer.releasePointerCapture(e.pointerId); }));
      }
    }
  });

  const resize=()=>{const w=root.clientWidth,h=root.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h)};
  window.addEventListener('resize',resize);

  loadingEl && loadingEl.classList.add('hidden');
  function animate(){
    requestAnimationFrame(animate);
    earth.rotation.x+=vel.x; earth.rotation.y+=vel.y;
    vel.x*=.95; vel.y*=.95; if(!isDragging) earth.rotation.y+=.001;
    planets.forEach(pl=>{pl.userData.angle+=pl.userData.speed;pl.position.x=Math.cos(pl.userData.angle)*pl.userData.distance*.5;pl.position.z=-pl.userData.distance+Math.sin(pl.userData.angle)*2;pl.rotation.y+=.005});
    stars.rotation.y+=.0001;
    renderer.render(scene,camera);
  }
  animate();
}




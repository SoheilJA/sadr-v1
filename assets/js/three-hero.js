/* ═══ المان سه‌بعدی هیرو — شبکه مولکولی سبک با Three.js
   لود تنبل، pixelRatio ≤ 1.5، توقف رندر خارج از دید / تب غیرفعال، dispose کامل ═══ */

const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

export function initHero3D(){
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return Promise.resolve(false);

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const weak = (navigator.hardwareConcurrency || 8) <= 4 || innerWidth < 640;
  if (reduced || weak) return Promise.resolve(false); // نسخه سبک: پترن CSS باقی می‌ماند

  // WebGL موجود است؟
  try { const gl = document.createElement('canvas').getContext('webgl'); if (!gl) return Promise.resolve(false); }
  catch { return Promise.resolve(false); }

  // لود تنبل Three.js
  return new Promise(res => {
    const s = document.createElement('script');
    s.src = THREE_CDN; s.async = true;
    s.onload = () => { res(build(canvas)); };
    s.onerror = () => res(false);
    document.head.appendChild(s);
  });
}

function build(canvas){
  const T = window.THREE;
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, .1, 100);
  camera.position.z = 16;
  const renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const group = new T.Group();
  scene.add(group);

  // اتم‌ها: چند ایکوساهد کوچک low-poly
  const matA = new T.MeshBasicMaterial({ color: 0x0B2447 });
  const matB = new T.MeshBasicMaterial({ color: 0x14A3B0 });
  const geo = new T.IcosahedronGeometry(0.45, 0);
  const nodes = [];
  const positions = [
    [-4.5,  1.5, 0], [-1.5, -1.2, -1], [1.5,  2.0, -2], [4.5, -0.5, 0],
    [ 2.5, -2.6, -1], [-3.0, -2.4, -2], [0, 0.8, -3]
  ];
  positions.forEach((p, i) => {
    const m = new T.Mesh(geo, i % 3 === 0 ? matB : matA);
    m.position.set(...p);
    m.scale.setScalar(.8 + (i % 3) * .35);
    group.add(m); nodes.push(m);
  });

  // اتصالات مولکولی (خطوط)
  const lineMat = new T.LineBasicMaterial({ color: 0x0E7C86, transparent: true, opacity: .35 });
  const links = [[0,1],[1,2],[2,3],[3,4],[1,4],[1,5],[0,5],[2,6],[6,3]];
  links.forEach(([a,b]) => {
    const g = new T.BufferGeometry().setFromPoints([
      new T.Vector3(...positions[a]), new T.Vector3(...positions[b])
    ]);
    group.add(new T.Line(g, lineMat));
  });

  // ذرات پس‌زمینه
  const pCount = 120;
  const pGeo = new T.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount * 3; i++) pPos[i] = (Math.random() - .5) * 30;
  pGeo.setAttribute('position', new T.BufferAttribute(pPos, 3));
  const points = new T.Points(pGeo, new T.PointsMaterial({ color: 0x123A6B, size: .06, transparent: true, opacity: .5 }));
  scene.add(points);

  // پارالاکس ماوس/ژیروسکوپ
  let tx = 0, ty = 0, cx = 0, cy = 0;
  const onPointer = e => {
    tx = (e.clientX / innerWidth - .5); ty = (e.clientY / innerHeight - .5);
  };
  addEventListener('pointermove', onPointer, { passive: true });
  addEventListener('deviceorientation', e => { if (e.gamma != null) { tx = Math.max(-.5, Math.min(.5, e.gamma / 45)); ty = Math.max(-.5, Math.min(.5, (e.beta - 45) / 90)); } }, { passive: true });

  // توقف رندر وقتی هیرو خارج دید یا تب غیرفعال
  let visible = true, running = false, rafId = null, disposed = false;
  const clock = new T.Clock();

  function loop(){
    if (disposed || !running) return;
    rafId = requestAnimationFrame(loop);
    const t = clock.getElapsedTime();
    cx += (tx - cx) * .04; cy += (ty - cy) * .04;
    group.rotation.y = cx * .6 + Math.sin(t * .12) * .08;
    group.rotation.x = cy * .4;
    nodes.forEach((n, i) => { n.rotation.y = t * .3 + i; n.position.y += Math.sin(t * .8 + i * 1.7) * .0022; });
    points.rotation.y = t * .02;
    renderer.render(scene, camera);
  }
  function setRunning(on){
    if (on === running || !visible) return;
    running = on;
    if (on) loop(); else cancelAnimationFrame(rafId);
  }
  new IntersectionObserver(en => { visible = en[0].isIntersecting; setRunning(visible); }, { threshold: .05 })
    .observe(canvas);
  document.addEventListener('visibilitychange', () => setRunning(!document.hidden && visible));
  setRunning(true);

  // resize با debounce
  let rz;
  addEventListener('resize', () => {
    clearTimeout(rz);
    rz = setTimeout(() => {
      if (disposed) return;
      const w = canvas.clientWidth, h = canvas.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    }, 200);
  });

  // dispose برای پاک‌سازی (در SPA/تست)
  return {
    dispose(){
      disposed = true; cancelAnimationFrame(rafId);
      removeEventListener('pointermove', onPointer);
      geo.dispose(); lineMat.dispose(); pGeo.dispose();
      scene.traverse(o => { if (o.geometry) o.geometry.dispose(); });
      renderer.dispose();
    }
  };
}
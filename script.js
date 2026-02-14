const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
},{threshold:0.2});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<120;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*2,
    dx:(Math.random()-0.5)*0.5,
    dy:(Math.random()-0.5)*0.5
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    p.x+=p.dx;
    p.y+=p.dy;

    if(p.x<0||p.x>canvas.width) p.dx*=-1;
    if(p.y<0||p.y>canvas.height) p.dy*=-1;

    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="rgba(94,242,255,0.7)";
    ctx.fill();
  });
  requestAnimationFrame(animate);
}

animate();

function toggleExp(header){
  const card = header.parentElement;
  card.classList.toggle("active");
}

/* ===== 3D TECH SPHERE ===== */

const container = document.getElementById('sphere-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

camera.position.z = 12;

// Light
const light = new THREE.PointLight(0x5ef2ff, 1.5);
light.position.set(10,10,10);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// Technologies
const technologies = [
  "React","TypeScript","Next.js","Microfrontends",
  "SSR","Webpack","Vite","Node.js",
  "Zustand","Redux","React Query","Jest",
  "CI/CD","BFF","Design Systems","Performance"
];

const radius = 5;
const group = new THREE.Group();
scene.add(group);

technologies.forEach((tech, i)=>{
  const phi = Math.acos(-1 + (2 * i) / technologies.length);
  const theta = Math.sqrt(technologies.length * Math.PI) * phi;

  const x = radius * Math.cos(theta) * Math.sin(phi);
  const y = radius * Math.sin(theta) * Math.sin(phi);
  const z = radius * Math.cos(phi);

  const geometry = new THREE.SphereGeometry(0.35, 16, 16);
  const material = new THREE.MeshStandardMaterial({
    color:0x5ef2ff,
    emissive:0x5ef2ff,
    emissiveIntensity:0.6,
    metalness:0.4,
    roughness:0.3
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x,y,z);
  group.add(mesh);
});

// Mouse rotation
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event)=>{
  mouseX = (event.clientX - window.innerWidth/2) / 300;
  mouseY = (event.clientY - window.innerHeight/2) / 300;
});

function animate(){
  requestAnimationFrame(animate);

  group.rotation.y += 0.003;
  group.rotation.x += 0.001;

  group.rotation.y += mouseX * 0.02;
  group.rotation.x += mouseY * 0.02;

  renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener('resize', ()=>{
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

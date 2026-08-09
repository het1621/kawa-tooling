import { 
  Scene, 
  PerspectiveCamera, 
  WebGLRenderer, 
  AmbientLight, 
  DirectionalLight, 
  PointLight, 
  MeshPhongMaterial, 
  Group, 
  Mesh, 
  CylinderGeometry, 
  BoxGeometry, 
  MathUtils 
} from 'three';

export function initThreeScene() {
  const container = document.getElementById('threejs-canvas');
  const bgContainer = document.getElementById('threejs-bg-container');
  if (!container || !bgContainer) return; // Only run on pages with the canvas

  const width = window.innerWidth;
  const height = window.innerHeight;

  const scene = new Scene();
  const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  container.appendChild(renderer.domElement);

  const ambientLight = new AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const directionalLight = new DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
  const pointLight = new PointLight(0xdebe8a, 1);
  pointLight.position.set(-5, -5, 5);
  scene.add(pointLight);

  const metallicMaterial = new MeshPhongMaterial({ color: 0x4c5d6f, specular: 0xdebe8a, shininess: 100 });
  const goldMaterial = new MeshPhongMaterial({ color: 0xdebe8a, specular: 0xffffff, shininess: 100 });

  function createGear(radius, thickness, teethCount) {
      const gear = new Group();
      const core = new Mesh(new CylinderGeometry(radius * 0.85, radius * 0.85, thickness, 32), metallicMaterial);
      core.rotation.x = Math.PI / 2;
      gear.add(core);

      const toothWidth = (Math.PI * 2 * radius) / (teethCount * 2);
      const toothHeight = radius * 0.15;
      
      for (let i = 0; i < teethCount; i++) {
          const angle = (i / teethCount) * Math.PI * 2;
          const tooth = new Mesh(new BoxGeometry(toothWidth, toothHeight, thickness), metallicMaterial);
          tooth.position.x = Math.cos(angle) * (radius + toothHeight/2 - 0.05);
          tooth.position.y = Math.sin(angle) * (radius + toothHeight/2 - 0.05);
          tooth.rotation.z = angle;
          gear.add(tooth);
      }
      
      const center = new Mesh(new CylinderGeometry(radius * 0.2, radius * 0.2, thickness + 0.1, 16), goldMaterial);
      center.rotation.x = Math.PI / 2;
      gear.add(center);
      return gear;
  }

  const gearGroup = new Group();

  function getMeshRotation(contactAngleDeg, centerTeeth, satelliteTeeth) {
      const pitch1 = 360 / centerTeeth;
      const pitch2 = 360 / satelliteTeeth;
      const rotZDeg = contactAngleDeg + 180 - pitch2 * (0.5 - contactAngleDeg / pitch1);
      return (rotZDeg % pitch2) * (Math.PI / 180);
  }

  const mainGear = createGear(2, 0.5, 12);
  gearGroup.add(mainGear);

  const smallGear1 = createGear(1, 0.4, 6);
  smallGear1.position.set(Math.cos(30 * Math.PI/180)*3, Math.sin(30 * Math.PI/180)*3, -0.2);
  smallGear1.rotation.z = getMeshRotation(30, 12, 6);
  gearGroup.add(smallGear1);

  const smallGear2 = createGear(1.5, 0.4, 9);
  smallGear2.position.set(Math.cos(200 * Math.PI/180)*3.5, Math.sin(200 * Math.PI/180)*3.5, 0.3);
  smallGear2.rotation.z = getMeshRotation(200, 12, 9);
  gearGroup.add(smallGear2);

  scene.add(gearGroup);
  camera.position.z = 8;
  gearGroup.position.x = 2;

  let mouseX = 0, mouseY = 0;
  const onMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
  };
  window.addEventListener('mousemove', onMouseMove);

  const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 1000;
      const opacity = Math.max(0.05, 0.4 - (scrollY / maxScroll) * 0.35);
      bgContainer.style.opacity = opacity;
  };
  window.addEventListener('scroll', onScroll);

  const baseSpeed = 0.005;
  let animationFrameId;

  function animate() {
      animationFrameId = requestAnimationFrame(animate);
      
      mainGear.rotation.z += baseSpeed;
      smallGear1.rotation.z -= baseSpeed * (12/6);
      smallGear2.rotation.z -= baseSpeed * (12/9);

      gearGroup.rotation.y = MathUtils.lerp(gearGroup.rotation.y, mouseX * 0.2, 0.05);
      gearGroup.rotation.x = MathUtils.lerp(gearGroup.rotation.x, mouseY * 0.2, 0.05);

      renderer.render(scene, camera);
  }

  const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onResize);

  animate();

  // Return a cleanup function
  return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
  };
}

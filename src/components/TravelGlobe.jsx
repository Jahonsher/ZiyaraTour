import { useEffect, useRef } from 'react'

// A deliberately stylised globe. No map tiles, remote textures or location data.
const land = [
  [[-168,70],[-130,72],[-105,80],[-55,50],[-65,45],[-82,25],[-98,17],[-117,32],[-130,52]],
  [[-81,12],[-60,8],[-35,-7],[-47,-25],[-68,-55],[-77,-20]],
  [[-18,35],[10,37],[35,30],[50,12],[34,-28],[18,-35],[9,-5],[-16,13]],
  [[-10,36],[-10,58],[25,72],[65,75],[100,77],[175,60],[145,38],[120,20],[106,-5],[78,8],[60,28],[35,35],[20,45]],
  [[112,-12],[135,-10],[154,-24],[146,-39],[118,-35]],
  [[-52,60],[-22,65],[-20,82],[-48,84],[-64,75]],
]
function contains(x, y, polygon) {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i], [xj, yj] = polygon[j]
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

export default function TravelGlobe() {
  const host = useRef(null)
  useEffect(() => {
    let disposed = false, cleanup = () => {}
    import('three').then((THREE) => {
      if (disposed || !host.current) return
      const element = host.current
      let renderer
      try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power', preserveDrawingBuffer: true }) } catch { return }
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30)
      camera.position.z = 5.4
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setClearColor(0x000000, 0)
      element.appendChild(renderer.domElement)
      element.classList.add('globe-ready')
      scene.add(new THREE.AmbientLight(0xffffff, 2.3))
      const light = new THREE.DirectionalLight(0xffedcc, 3)
      light.position.set(-3, 4, 5)
      scene.add(light)
      const world = new THREE.Group()
      world.rotation.set(0.15, -1.5, -0.25)
      scene.add(world)
      world.add(new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), new THREE.MeshStandardMaterial({ color: 0xe8ddba, roughness: 0.7, metalness: 0.05 })))
      const dots = []
      for (let lat = -57; lat <= 82; lat += 2.5) {
        for (let lon = -180; lon < 180; lon += 2.5) {
          if (!land.some((poly) => contains(lon, lat, poly))) continue
          const phi = lat * Math.PI / 180, theta = lon * Math.PI / 180
          dots.push(1.013 * Math.cos(phi) * Math.cos(theta), 1.013 * Math.sin(phi), -1.013 * Math.cos(phi) * Math.sin(theta))
        }
      }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(dots, 3))
      world.add(new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x326151, size: 0.028 })))
      const grid = new THREE.Mesh(new THREE.SphereGeometry(1.004, 24, 12), new THREE.MeshBasicMaterial({ color: 0x6e856f, wireframe: true, transparent: true, opacity: 0.08 }))
      world.add(grid)
      const orbit = new THREE.Group()
      orbit.rotation.set(0.8, 0.1, 0.4)
      scene.add(orbit)
      orbit.add(new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.009, 6, 100), new THREE.MeshBasicMaterial({ color: 0xd18b43 })))
      const traveller = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.2, 3), new THREE.MeshStandardMaterial({ color: 0xd65b35, roughness: 0.4 }))
      orbit.add(traveller)
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
      let frame = 0, visible = false, elapsed = 0, previous = 0
      function render(now = 0) {
        frame = 0
        if (disposed || !visible || document.hidden) return
        if (!motion.matches && previous) elapsed += Math.min((now - previous) / 1000, 0.04)
        previous = now
        world.rotation.y = -1.5 + elapsed * 0.12
        const angle = elapsed * 0.45 + 0.6
        traveller.position.set(Math.cos(angle) * 1.4, Math.sin(angle) * 1.4, 0)
        traveller.rotation.z = angle
        renderer.render(scene, camera)
        if (!motion.matches) frame = requestAnimationFrame(render)
      }
      function resume() {
        cancelAnimationFrame(frame)
        previous = 0
        frame = requestAnimationFrame(render)
      }
      const resize = new ResizeObserver(() => {
        const { width, height } = element.getBoundingClientRect()
        if (!width || !height) return
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        resume()
      })
      resize.observe(element)
      const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume() })
      visibility.observe(element)
      motion.addEventListener('change', resume)
      document.addEventListener('visibilitychange', resume)
      cleanup = () => {
        cancelAnimationFrame(frame)
        resize.disconnect()
        visibility.disconnect()
        motion.removeEventListener('change', resume)
        document.removeEventListener('visibilitychange', resume)
        scene.traverse((object) => { object.geometry?.dispose(); object.material?.dispose() })
        renderer.dispose()
        renderer.domElement.remove()
        element.classList.remove('globe-ready')
      }
    }).catch(() => { /* Keep the CSS globe if WebGL or the optional chunk is unavailable. */ })
    return () => { disposed = true; cleanup() }
  }, [])
  return <div ref={host} className="travel-globe" aria-hidden="true"><div className="globe-fallback">✦</div></div>
}

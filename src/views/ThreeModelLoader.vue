<template>
  <div class="container">
    <div class="buttons_view">
      <a-button class="item_button" type="primary" status="warning" @click="switchCar('pink')">粉色</a-button>
      <a-button class="item_button" type="primary" status="warning" @click="switchCar('blue')">蓝色</a-button>
      <a-button class="item_button" type="primary" status="warning" @click="switchCar('black')">黑色</a-button>
    </div>
    <div ref="content"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


const content = ref()
// 创建场景对象
const scene = new THREE.Scene()
// 设置场景背景
scene.background = new THREE.Color(0xdcdcdc)

const init = (path: string) => {
  if (content.value) {
    // 切换时先移除容器中的元素
    scene.clear()
    while (content.value.firstChild) {
      content.value.removeChild(content.value.firstChild)
    }
    // 创建相机
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer()
    // 设置画布宽高
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 将画布添加到容器中
    content.value.appendChild(renderer.domElement)

    // 增加平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
    directionalLight.position.set(-4.774, 5.426, -1.062) // set position
    scene.add(directionalLight)

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3)
    directionalLight2.position.set(5.000, 5.000, 0) // set position
    scene.add(directionalLight2)

    // 增加手势控制
    const controls = new OrbitControls(camera, renderer.domElement)

    // 加载外部文件
    const loader = new GLTFLoader()
    loader.load(
      path,
      (gltf) => {
        scene.add(gltf.scene)
      },
      undefined,
      (error) => {
        console.error('Error loading GLTF file:', error)
      }
    )

    camera.position.set(-4.285, 1.792, -2.931) // 设置相机位置
    camera.lookAt(0, 0, 0) // 设置相机朝向

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()
  }
}

onMounted(() => {
  init('./glb/red.glb')
})

// 切换车辆
const switchCar = (color: any) => {
  init(`./glb/${color || 'red'}.glb`)
}

</script>

<style>
body {
  margin: 0;
}

.container {
  box-sizing: border-box;
}

.buttons_view {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: fit-content;
}

.item_button {
  margin-right: 10px;
}
</style>
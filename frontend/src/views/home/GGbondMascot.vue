<template>
  <svg
    ref="svgRef"
    :viewBox="viewBox"
    class="gg-mascot"
    :class="{ 'is-happy': happy, 'is-powering': powering }"
    role="img"
    :aria-label="label"
    xmlns="http://www.w3.org/2000/svg"
    @pointerenter="happy = true"
    @pointerleave="happy = false"
    @click="powerUp"
  >
    <defs>
      <radialGradient :id="id('red')" cx="0.4" cy="0.3" r="0.8">
        <stop offset="0" stop-color="#E3302A" />
        <stop offset="0.6" stop-color="#C2161A" />
        <stop offset="1" stop-color="#8A0C10" />
      </radialGradient>
      <radialGradient :id="id('hood')" cx="0.45" cy="0.25" r="0.85">
        <stop offset="0" stop-color="#E8332B" />
        <stop offset="0.7" stop-color="#C4171A" />
        <stop offset="1" stop-color="#8A0C10" />
      </radialGradient>
      <radialGradient :id="id('skin')" cx="0.45" cy="0.4" r="0.7">
        <stop offset="0" stop-color="#FCE3D2" />
        <stop offset="0.65" stop-color="#F6CDB4" />
        <stop offset="1" stop-color="#E9AE93" />
      </radialGradient>
      <radialGradient :id="id('snout')" cx="0.45" cy="0.35" r="0.75">
        <stop offset="0" stop-color="#F9C7BA" />
        <stop offset="1" stop-color="#E79C8D" />
      </radialGradient>
      <radialGradient :id="id('ear')" cx="0.5" cy="0.4" r="0.7">
        <stop offset="0" stop-color="#FAD7C7" />
        <stop offset="1" stop-color="#E8A996" />
      </radialGradient>
      <linearGradient :id="id('yellow')" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FFE45C" />
        <stop offset="1" stop-color="#F5C400" />
      </linearGradient>
      <radialGradient :id="id('iris')" cx="0.5" cy="0.6" r="0.6">
        <stop offset="0" stop-color="#7A4A2C" />
        <stop offset="1" stop-color="#3A2014" />
      </radialGradient>
      <radialGradient :id="id('cheek')" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#F29C90" stop-opacity="0.55" />
        <stop offset="1" stop-color="#F29C90" stop-opacity="0" />
      </radialGradient>
      <radialGradient :id="id('burst')" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#FFE45C" stop-opacity="0.9" />
        <stop offset="0.5" stop-color="#FFB703" stop-opacity="0.35" />
        <stop offset="1" stop-color="#FFB703" stop-opacity="0" />
      </radialGradient>
      <filter :id="id('glow')" x="-30%" y="-80%" width="160%" height="260%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <!-- 左耳、左臂；右侧用 <use> 镜像 -->
      <g :id="id('ear-shape')">
        <path d="M104 196 C88 180 62 178 52 196 C44 214 58 238 88 252 C98 236 106 214 104 196 Z" :fill="url('ear')" />
        <path d="M96 202 C82 192 68 192 61 204 C57 217 68 233 85 242 Z" fill="#E8A090" opacity="0.6" />
      </g>
      <g :id="id('arm-shape')">
        <path d="M92 435 C72 440 52 432 38 422 L30 446 C48 460 74 464 98 458 Z" :fill="url('red')" />
        <path d="M28 412 L46 418 L40 454 L22 448 Z" :fill="url('yellow')" />
        <path d="M24 414 C10 404 0 400 -2 408 L2 414 C-6 418 -4 426 4 426 C0 434 6 440 14 436 L22 446 Z" :fill="url('red')" />
      </g>
    </defs>

    <ellipse v-if="isFull" class="gg-shadow" cx="200" cy="690" rx="105" ry="12" fill="#000" opacity="0.12" />

    <g class="gg-float">
      <g class="gg-jump">
        <circle v-if="powering" class="gg-burst" cx="202" cy="400" r="230" :fill="url('burst')" />

        <g v-if="isFull" class="gg-body">
          <!-- 腿 -->
          <path d="M118 606 C118 640 116 666 106 692 C100 700 120 704 140 700 C158 704 176 700 172 690 C174 664 176 636 178 614 Z" :fill="url('red')" />
          <path d="M288 606 C288 640 290 666 300 692 C306 700 286 704 266 700 C248 704 230 700 234 690 C232 664 230 636 228 614 Z" :fill="url('red')" />

          <!-- 手臂：挥手时绕肩膀旋转 -->
          <g class="gg-arm gg-arm-left">
            <use :href="hrefOf('arm-shape')" />
          </g>
          <g class="gg-arm gg-arm-right">
            <use :href="hrefOf('arm-shape')" transform="translate(405 0) scale(-1 1)" />
          </g>

          <!-- 躯干 -->
          <path d="M112 416 C88 450 70 508 72 560 C74 612 122 638 202 638 C284 638 332 612 334 560 C336 508 318 450 294 416 C266 404 236 400 202 400 C170 400 140 404 112 416 Z" :fill="url('red')" />
          <ellipse cx="150" cy="470" rx="38" ry="48" fill="#fff" opacity="0.06" />
          <path d="M82 552 C140 572 266 572 324 552" fill="none" stroke="#E2453C" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round" />

          <!-- 胸前猪头徽章：变身时发光 -->
          <g class="gg-emblem" transform="translate(-6 0)" :filter="powering ? url('glow') : undefined">
            <ellipse cx="160" cy="485" rx="8" ry="7" :fill="url('yellow')" />
            <ellipse cx="242" cy="485" rx="8" ry="7" :fill="url('yellow')" />
            <ellipse cx="201" cy="527" rx="47" ry="31" :fill="url('yellow')" />
            <rect x="176" y="510" width="13" height="34" rx="6.5" fill="#C81B15" />
            <rect x="214" y="510" width="13" height="34" rx="6.5" fill="#C81B15" />
          </g>
        </g>

        <g class="gg-head">
          <!-- 头套后层 -->
          <path d="M60 292 C56 222 102 160 202 156 C302 160 350 222 346 292 C346 324 340 344 330 356 L76 356 C66 344 60 324 60 292 Z" :fill="url('hood')" />

          <!-- 猪耳朵：开心时抖动 -->
          <g class="gg-ear gg-ear-left">
            <use :href="hrefOf('ear-shape')" />
          </g>
          <g class="gg-ear gg-ear-right">
            <use :href="hrefOf('ear-shape')" transform="translate(410 10) scale(-1 1)" />
          </g>

          <!-- 头套内衬白边 -->
          <path d="M68 250 C64 270 64 296 68 312 L78 308 C74 292 74 270 78 254 Z" fill="#F4E9E4" />
          <path d="M337 250 C341 270 341 296 337 312 L327 308 C331 292 331 270 327 254 Z" fill="#F4E9E4" />

          <!-- 脸 -->
          <path d="M66 330 C62 284 98 244 202 238 C306 244 344 284 340 330 C344 372 326 410 290 424 C262 434 232 438 202 438 C170 438 140 434 112 424 C78 410 62 372 64 318 Z" :fill="url('skin')" />
          <ellipse class="gg-cheek" cx="102" cy="360" rx="34" ry="24" :fill="url('cheek')" />
          <ellipse class="gg-cheek" cx="300" cy="360" rx="34" ry="24" :fill="url('cheek')" />

          <!-- 头套前沿 -->
          <path d="M70 266 C76 200 126 162 202 160 C280 162 330 200 336 266 C314 248 288 242 262 244 C238 246 220 240 202 232 C184 240 166 246 142 244 C116 242 92 248 70 266 Z" :fill="url('hood')" />
          <path d="M120 186 C150 172 180 168 202 168 C226 168 256 172 284 186" fill="none" stroke="#fff" stroke-opacity="0.18" stroke-width="5" stroke-linecap="round" />

          <!-- 黄色眉饰 -->
          <g class="gg-visor" :filter="powering ? url('glow') : undefined">
            <path d="M104 210 C114 186 150 176 182 186 C188 196 186 206 178 212 C154 204 128 206 108 220 Z" :fill="url('yellow')" stroke="#9E0F12" stroke-width="5" stroke-linejoin="round" paint-order="stroke" />
            <path d="M302 210 C292 186 256 176 224 186 C218 196 220 206 228 212 C252 204 278 206 298 220 Z" :fill="url('yellow')" stroke="#9E0F12" stroke-width="5" stroke-linejoin="round" paint-order="stroke" />
          </g>
          <path d="M182 190 C190 194 196 200 202 210 C208 200 214 194 223 190 C214 182 190 182 182 190 Z" fill="#B5160F" />

          <!-- 眉毛 -->
          <path class="gg-brow" d="M124 270 C134 260 152 258 166 264" fill="none" stroke="#6B3A22" stroke-width="5" stroke-linecap="round" />
          <path class="gg-brow" d="M238 266 C252 260 270 262 280 272" fill="none" stroke="#6B3A22" stroke-width="5" stroke-linecap="round" />

          <!-- 眼睛：瞳孔跟随指针，定时眨眼 -->
          <g class="gg-eyes" :class="{ 'is-blinking': blinking }">
            <g class="gg-eye">
              <ellipse cx="146" cy="304" rx="25" ry="23" fill="#fff" />
              <g class="gg-pupil" :transform="pupilTransform">
                <circle cx="148" cy="305" r="16" :fill="url('iris')" />
                <circle cx="148" cy="305" r="9" fill="#1F1410" />
                <circle cx="153" cy="299" r="4.5" fill="#fff" />
                <circle cx="143" cy="310" r="1.8" fill="#fff" opacity="0.8" />
              </g>
              <path class="gg-lid" d="M121 304 C121 290 132 281 146 281 C160 281 171 290 171 304 Z" :fill="url('skin')" />
            </g>
            <g class="gg-eye">
              <ellipse cx="256" cy="308" rx="25" ry="23" fill="#fff" />
              <g class="gg-pupil" :transform="pupilTransform">
                <circle cx="254" cy="309" r="16" :fill="url('iris')" />
                <circle cx="254" cy="309" r="9" fill="#1F1410" />
                <circle cx="259" cy="303" r="4.5" fill="#fff" />
                <circle cx="249" cy="314" r="1.8" fill="#fff" opacity="0.8" />
              </g>
              <path class="gg-lid" d="M231 308 C231 294 242 285 256 285 C270 285 281 294 281 308 Z" :fill="url('skin')" />
            </g>
          </g>

          <!-- 猪鼻子 -->
          <g class="gg-snout">
            <ellipse cx="196" cy="352" rx="50" ry="34" :fill="url('snout')" />
            <ellipse cx="186" cy="338" rx="24" ry="9" fill="#fff" opacity="0.22" />
            <ellipse cx="180" cy="354" rx="6" ry="11" fill="#4A2418" />
            <ellipse cx="213" cy="354" rx="6" ry="11" fill="#4A2418" />
          </g>

          <!-- 嘴：开心时咧得更大 -->
          <path class="gg-mouth" :d="mouthPath" fill="none" stroke="#7A3A28" stroke-width="4" stroke-linecap="round" />
        </g>
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    /** full = 全身（首页轨道中心），head = 只有头（Logo 等小尺寸） */
    variant?: 'full' | 'head'
    label?: string
    /** 关闭指针跟随、眨眼等动效 */
    still?: boolean
  }>(),
  { variant: 'full', label: 'GGbond', still: false }
)

const emit = defineEmits<{ power: [] }>()

const VIEWBOX = { full: '-12 140 430 570', head: '36 148 334 298' } as const
const MOUTH = {
  idle: 'M150 374 C170 390 214 394 244 376',
  happy: 'M146 370 C166 400 220 404 248 372'
} as const
const PUPIL_MAX_OFFSET = 5
const BLINK_MS = 140
const POWER_MS = 1200

// 同页可能有多个实例（首页 + Logo），渐变 id 必须唯一
const uid = `gg-${Math.random().toString(36).slice(2, 9)}`
const id = (name: string) => `${uid}-${name}`
const url = (name: string) => `url(#${id(name)})`
const hrefOf = (name: string) => `#${id(name)}`

const svgRef = ref<SVGSVGElement | null>(null)
const happy = ref(false)
const powering = ref(false)
const blinking = ref(false)
const pupil = ref({ x: 0, y: 0 })

const isFull = computed(() => props.variant === 'full')
const viewBox = computed(() => VIEWBOX[props.variant])
const mouthPath = computed(() => (happy.value || powering.value ? MOUTH.happy : MOUTH.idle))
const pupilTransform = computed(() => `translate(${pupil.value.x} ${pupil.value.y})`)

const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const animated = computed(() => !props.still && !reducedMotion)

function trackPointer(event: PointerEvent) {
  const rect = svgRef.value?.getBoundingClientRect()
  if (!rect || rect.width === 0) return
  const dx = event.clientX - (rect.left + rect.width / 2)
  const dy = event.clientY - (rect.top + rect.height * (isFull.value ? 0.3 : 0.5))
  const distance = Math.hypot(dx, dy) || 1
  const strength = Math.min(distance / 300, 1) * PUPIL_MAX_OFFSET
  pupil.value = { x: (dx / distance) * strength, y: (dy / distance) * strength }
}

let blinkTimer: ReturnType<typeof setTimeout> | undefined
let powerTimer: ReturnType<typeof setTimeout> | undefined

function scheduleBlink() {
  blinkTimer = setTimeout(
    () => {
      blinking.value = true
      blinkTimer = setTimeout(() => {
        blinking.value = false
        scheduleBlink()
      }, BLINK_MS)
    },
    2500 + Math.random() * 2500
  )
}

function powerUp() {
  if (powering.value) return
  emit('power')
  if (!animated.value) return
  powering.value = true
  powerTimer = setTimeout(() => (powering.value = false), POWER_MS)
}

onMounted(() => {
  if (!animated.value) return
  window.addEventListener('pointermove', trackPointer, { passive: true })
  scheduleBlink()
})

onUnmounted(() => {
  window.removeEventListener('pointermove', trackPointer)
  clearTimeout(blinkTimer)
  clearTimeout(powerTimer)
})
</script>

<style scoped>
.gg-mascot {
  overflow: visible;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.gg-float {
  animation: gg-float 4.2s ease-in-out infinite;
}

.gg-jump,
.gg-arm,
.gg-ear,
.gg-lid,
.gg-cheek,
.gg-brow {
  transform-box: fill-box;
}

.gg-arm-left {
  transform-origin: 100% 30%;
  animation: gg-wave-left 3.6s ease-in-out infinite;
}

.gg-arm-right {
  transform-origin: 0% 30%;
  animation: gg-wave-right 3.6s ease-in-out infinite;
}

.gg-ear-left {
  transform-origin: 90% 80%;
}

.gg-ear-right {
  transform-origin: 10% 80%;
}

.gg-pupil {
  transition: transform 0.18s ease-out;
}

.gg-lid {
  transform-origin: 50% 0%;
  transform: scaleY(0);
  transition: transform 0.07s ease-in;
}

.gg-eyes.is-blinking .gg-lid {
  transform: scaleY(1);
}

.gg-mouth {
  transition: d 0.25s ease-out;
}

.gg-cheek {
  transform-origin: center;
  transition: transform 0.25s ease-out;
}

.gg-brow {
  transition: transform 0.25s ease-out;
}

.is-happy .gg-ear-left {
  animation: gg-ear-left 0.5s ease-in-out infinite;
}

.is-happy .gg-ear-right {
  animation: gg-ear-right 0.5s ease-in-out infinite;
}

.is-happy .gg-cheek {
  transform: scale(1.15);
}

.is-happy .gg-brow {
  transform: translateY(-3px);
}

.is-powering .gg-jump {
  transform-origin: 50% 100%;
  animation: gg-jump 1.2s cubic-bezier(0.3, 0.7, 0.4, 1);
}

.is-powering .gg-arm-left,
.is-powering .gg-arm-right {
  animation-duration: 0.4s;
}

.gg-burst {
  animation: gg-burst 1.2s ease-out forwards;
  transform-box: fill-box;
  transform-origin: center;
}

@keyframes gg-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes gg-wave-left {
  0%, 60%, 100% { transform: rotate(0deg); }
  70% { transform: rotate(-14deg); }
  80% { transform: rotate(4deg); }
  90% { transform: rotate(-10deg); }
}

@keyframes gg-wave-right {
  0%, 10%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(14deg); }
  30% { transform: rotate(-4deg); }
  40% { transform: rotate(10deg); }
  50% { transform: rotate(0deg); }
}

@keyframes gg-ear-left {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-10deg); }
}

@keyframes gg-ear-right {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(10deg); }
}

@keyframes gg-jump {
  0% { transform: translateY(0) scale(1, 1); }
  15% { transform: translateY(0) scale(1.06, 0.92); }
  40% { transform: translateY(-36px) scale(0.96, 1.05); }
  65% { transform: translateY(0) scale(1.04, 0.96); }
  100% { transform: translateY(0) scale(1, 1); }
}

@keyframes gg-burst {
  0% { transform: scale(0.3); opacity: 0; }
  30% { opacity: 1; }
  100% { transform: scale(1.2); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .gg-float,
  .gg-arm-left,
  .gg-arm-right,
  .is-happy .gg-ear-left,
  .is-happy .gg-ear-right,
  .is-powering .gg-jump,
  .gg-burst {
    animation: none;
  }
}
</style>

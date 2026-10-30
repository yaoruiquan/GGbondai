<template>
  <div v-if="homeContent" class="min-h-screen">
    <iframe
      v-if="isHomeContentUrl"
      :src="homeContent.trim()"
      class="h-screen w-full border-0"
      allowfullscreen
    ></iframe>
    <div v-else v-html="homeContent"></div>
  </div>

  <div
    v-else
    class="relative min-h-screen overflow-hidden bg-ggbond-pink-50 text-gray-950 dark:bg-dark-950 dark:text-white"
  >
    <!-- 猪猪侠主题背景装饰 -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <!-- 粉红色光晕 -->
      <div class="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-ggbond-pink-500/15 blur-3xl animate-pulse-slow"></div>
      <!-- 紫蓝色光晕 -->
      <div class="absolute -right-40 top-80 h-96 w-96 rounded-full bg-ggbond-purple-400/15 blur-3xl animate-float"></div>
      <!-- 金黄色光晕 -->
      <div class="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-ggbond-gold-500/10 blur-3xl animate-pulse-slow"></div>
      <!-- 网格背景（更柔和的粉色调） -->
      <div
        class="absolute inset-0 bg-[linear-gradient(rgba(255,105,180,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,105,180,0.04)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(255,105,180,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,105,180,0.08)_1px,transparent_1px)]"
      ></div>
    </div>

    <header class="sticky top-0 z-30 border-b border-ggbond-pink-200/50 bg-white/75 backdrop-blur-xl dark:border-ggbond-purple-900/30 dark:bg-dark-950/70">
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <router-link to="/" class="inline-flex items-center transition-transform hover:scale-105">
          <BrandLockup :name="siteName" :logo="siteLogo" :subtitle="t('home.brandSubtitle')" compact />
        </router-link>

        <div class="hidden items-center gap-8 text-sm font-medium text-gray-600 dark:text-dark-300 lg:flex">
          <a href="#capabilities" class="transition-colors hover:text-ggbond-pink-600 dark:hover:text-ggbond-pink-400">{{ t('home.nav.capabilities') }}</a>
          <a href="#models" class="transition-colors hover:text-ggbond-pink-600 dark:hover:text-ggbond-pink-400">{{ t('home.nav.models') }}</a>
          <a href="#billing" class="transition-colors hover:text-ggbond-pink-600 dark:hover:text-ggbond-pink-400">{{ t('home.nav.billing') }}</a>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <LocaleSwitcher />
          <a
            v-if="docUrl"
            :href="docUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden rounded-full p-2 text-gray-500 transition-all hover:bg-ggbond-pink-50 hover:text-ggbond-pink-600 dark:text-dark-300 dark:hover:bg-white/10 dark:hover:text-ggbond-pink-400 sm:inline-flex"
            :title="t('home.viewDocs')"
          >
            <Icon name="book" size="md" />
          </a>
          <button
            @click="toggleTheme"
            class="rounded-full p-2 text-gray-500 transition-all hover:bg-ggbond-pink-50 hover:text-ggbond-pink-600 dark:text-dark-300 dark:hover:bg-white/10 dark:hover:text-ggbond-pink-400"
            :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
          >
            <Icon v-if="isDark" name="sun" size="md" />
            <Icon v-else name="moon" size="md" />
          </button>
          <router-link
            v-if="!isAuthenticated"
            to="/login"
            class="hidden rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-ggbond-pink-50 hover:text-ggbond-pink-600 dark:text-dark-200 dark:hover:bg-white/10 dark:hover:text-ggbond-pink-400 sm:inline-flex"
          >
            {{ t('home.login') }}
          </router-link>
          <router-link
            :to="isAuthenticated ? dashboardPath : '/register'"
            class="inline-flex items-center rounded-full bg-gradient-to-r from-ggbond-pink-500 to-ggbond-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-ggbond-pink-500/30 transition-all hover:scale-105 hover:shadow-glow-pink sm:px-5"
          >
            {{ isAuthenticated ? t('home.dashboard') : t('home.register') }}
          </router-link>
        </div>
      </nav>
    </header>

    <main class="relative z-10">
      <section class="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-24 lg:pt-24">
        <div class="flex flex-col justify-center">
          <!-- 猪猪侠主题徽章 -->
          <div class="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-ggbond-pink-500/30 bg-gradient-to-r from-ggbond-pink-50 to-ggbond-purple-50 px-4 py-2 text-sm font-medium text-ggbond-purple-700 shadow-sm dark:from-ggbond-pink-900/20 dark:to-ggbond-purple-900/20 dark:text-ggbond-pink-200">
            <span class="h-2 w-2 rounded-full bg-ggbond-pink-500 animate-ping-slow"></span>
            {{ t('home.heroEyebrow') }}
          </div>
          <h1 class="max-w-4xl text-5xl font-semibold tracking-tight text-gray-950 dark:text-white sm:text-6xl lg:text-7xl">
            {{ t('home.heroTitle') }}
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-dark-300 sm:text-xl">
            {{ siteSubtitle }}
          </p>
          <div class="mt-10 flex flex-col gap-3 sm:flex-row">
            <router-link
              :to="isAuthenticated ? dashboardPath : '/register'"
              class="btn btn-primary btn-lg shadow-xl shadow-ggbond-gold-500/30 transition-all hover:scale-105 hover:shadow-button-gold animate-pulse-slow"
            >
              {{ isAuthenticated ? t('home.goToDashboard') : t('home.primaryCta') }}
              <Icon name="chevronRight" size="sm" :stroke-width="2" />
            </router-link>
            <a href="#integration" class="btn btn-secondary btn-lg transition-all hover:scale-105">
              {{ t('home.secondaryCta') }}
            </a>
          </div>
        </div>

        <div class="relative flex items-center justify-center lg:justify-end">
          <!-- 代码演示卡片 -->
          <div class="w-full max-w-xl rounded-[2rem] border border-ggbond-pink-200/50 bg-white/85 p-4 shadow-2xl shadow-ggbond-pink-500/10 backdrop-blur-xl dark:border-ggbond-purple-900/30 dark:bg-dark-900/80 dark:shadow-ggbond-pink-900/40">
            <div class="rounded-[1.5rem] bg-dark-950 p-5 text-white shadow-inner">
              <div class="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div class="flex items-center gap-2">
                  <span class="h-3 w-3 rounded-full bg-red-400"></span>
                  <span class="h-3 w-3 rounded-full bg-amber-400"></span>
                  <span class="h-3 w-3 rounded-full bg-emerald-400"></span>
                </div>
                <span class="font-mono text-xs text-white/40">api.ggbondai.example.com</span>
              </div>
              <pre class="overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-7 text-dark-100"><code>{{ codeSample }}</code></pre>
            </div>
            <!-- 指标卡片 - 猪猪侠配色 -->
            <div class="grid gap-3 pt-4 sm:grid-cols-3">
              <div v-for="metric in heroMetrics" :key="metric.label" class="group rounded-2xl bg-gradient-to-br from-ggbond-pink-50 to-ggbond-purple-50 p-4 transition-all hover:scale-105 hover:shadow-card-ggbond dark:from-ggbond-pink-900/10 dark:to-ggbond-purple-900/10">
                <p class="text-xl font-semibold text-ggbond-pink-600 dark:text-ggbond-pink-400">{{ metric.value }}</p>
                <p class="mt-1 text-xs text-gray-500 dark:text-dark-400">{{ metric.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div class="mb-10 max-w-3xl">
          <p class="section-kicker">{{ t('home.capabilities.kicker') }}</p>
          <h2 class="section-title">{{ t('home.capabilities.title') }}</h2>
        </div>
        <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article v-for="item in capabilityCards" :key="item.title" class="brand-card group">
            <!-- 猪猪侠配色图标 -->
            <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ggbond-pink-500 to-ggbond-purple-500 text-white shadow-lg shadow-ggbond-pink-500/30 transition-all group-hover:scale-110 group-hover:rotate-3">
              <Icon :name="item.icon" size="lg" />
            </div>
            <h3 class="text-lg font-semibold text-gray-950 dark:text-white">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-gray-600 dark:text-dark-300">{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section id="models" class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div class="rounded-[2rem] border border-ggbond-pink-200/50 bg-white/80 p-6 shadow-xl shadow-ggbond-pink-500/10 backdrop-blur dark:border-ggbond-purple-900/30 dark:bg-dark-900/70 lg:p-10">
          <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p class="section-kicker">{{ t('home.models.kicker') }}</p>
              <h2 class="section-title">{{ t('home.models.title') }}</h2>
              <p class="mt-4 text-sm leading-7 text-gray-600 dark:text-dark-300">{{ t('home.models.description') }}</p>
            </div>
            <div class="grid gap-3 sm:grid-cols-2">
              <div v-for="model in modelCards" :key="model.title" class="group rounded-2xl border border-ggbond-pink-200/50 bg-white p-5 transition-all hover:scale-105 hover:border-ggbond-pink-300 hover:shadow-card-ggbond dark:border-ggbond-purple-900/30 dark:bg-white/5">
                <p class="text-base font-semibold text-gray-950 dark:text-white">{{ model.title }}</p>
                <p class="mt-2 text-sm text-gray-500 dark:text-dark-400">{{ model.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="integration" class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div class="mb-10 max-w-3xl">
          <p class="section-kicker">{{ t('home.integration.kicker') }}</p>
          <h2 class="section-title">{{ t('home.integration.title') }}</h2>
        </div>
        <div class="grid gap-5 md:grid-cols-3">
          <article v-for="(step, index) in integrationSteps" :key="step.title" class="brand-card group">
            <!-- 猪猪侠金黄色步骤标记 -->
            <div class="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-ggbond-gold-500 to-ggbond-gold-600 text-sm font-bold text-white shadow-lg shadow-ggbond-gold-500/40 transition-all group-hover:scale-110 group-hover:rotate-12">
              {{ index + 1 }}
            </div>
            <h3 class="text-lg font-semibold text-gray-950 dark:text-white">{{ step.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-gray-600 dark:text-dark-300">{{ step.description }}</p>
          </article>
        </div>
      </section>

      <section id="billing" class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div class="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <!-- 猪猪侠紫色渐变主卡片 -->
          <div class="brand-card flex flex-col justify-between bg-gradient-to-br from-ggbond-purple-900 to-ggbond-purple-950 text-white dark:from-ggbond-purple-950 dark:to-black">
            <div>
              <p class="section-kicker text-ggbond-pink-300">{{ t('home.billing.kicker') }}</p>
              <h2 class="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{{ t('home.billing.title') }}</h2>
              <p class="mt-4 text-sm leading-7 text-white/75">{{ t('home.billing.description') }}</p>
            </div>
            <div class="mt-8 rounded-2xl border border-ggbond-pink-300/20 bg-ggbond-pink-500/15 p-5 text-sm leading-7 text-ggbond-pink-50 shadow-inner-glow-pink">
              {{ t('home.billing.rule') }}
            </div>
          </div>
          <div class="grid gap-5 sm:grid-cols-2">
            <article v-for="item in billingCards" :key="item.title" class="brand-card group">
              <Icon :name="item.icon" size="lg" class="text-ggbond-pink-600 transition-transform group-hover:scale-110 dark:text-ggbond-pink-400" />
              <h3 class="mt-4 text-lg font-semibold text-gray-950 dark:text-white">{{ item.title }}</h3>
              <p class="mt-3 text-sm leading-6 text-gray-600 dark:text-dark-300">{{ item.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <!-- 猪猪侠粉紫渐变 CTA 卡片 -->
        <div class="rounded-[2rem] bg-gradient-to-r from-ggbond-pink-500 via-ggbond-purple-500 to-ggbond-pink-500 p-8 text-white shadow-2xl shadow-ggbond-pink-500/30 sm:p-10 lg:flex lg:items-center lg:justify-between animate-gradient-x">
          <div>
            <h2 class="text-3xl font-semibold tracking-tight">{{ t('home.finalCta.title') }}</h2>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-white/90">{{ t('home.finalCta.description') }}</p>
          </div>
          <router-link :to="isAuthenticated ? dashboardPath : '/register'" class="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-ggbond-pink-700 shadow-lg transition-all hover:scale-105 hover:bg-ggbond-pink-50 lg:mt-0">
            {{ isAuthenticated ? t('home.goToDashboard') : t('home.finalCta.button') }}
          </router-link>
        </div>
      </section>
    </main>

    <footer class="relative z-10 border-t border-ggbond-pink-200/30 bg-white/60 py-8 backdrop-blur dark:border-ggbond-purple-900/30 dark:bg-dark-950/70">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-gray-500 dark:text-dark-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <BrandLockup :name="siteName" :logo="siteLogo" compact />
        <p>&copy; {{ currentYear }} {{ t('common.copyrightOwner') }}. {{ t('home.footer.allRightsReserved') }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore, useAppStore } from '@/stores'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import Icon from '@/components/icons/Icon.vue'
import BrandLockup from '@/components/brand/BrandLockup.vue'
import { sanitizeUrl } from '@/utils/url'

const { t } = useI18n()
const authStore = useAuthStore()
const appStore = useAppStore()

const siteName = computed(() => appStore.cachedPublicSettings?.site_name || appStore.siteName || 'GGbond AI')
const siteLogo = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '/logo.png', { allowRelative: true, allowDataUrl: true }))
const siteSubtitle = computed(
  () => appStore.cachedPublicSettings?.site_subtitle || t('home.heroDescription')
)
const docUrl = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.doc_url || appStore.docUrl || ''))
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')
const isHomeContentUrl = computed(() => {
  const content = homeContent.value.trim()
  return content.startsWith('http://') || content.startsWith('https://')
})

const isDark = ref(document.documentElement.classList.contains('dark'))
const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => (isAdmin.value ? '/admin/dashboard' : '/dashboard'))
const currentYear = computed(() => new Date().getFullYear())

const codeSample = `curl https://api.ggbondai.example.com/v1/chat/completions \\\n  -H "Authorization: Bearer $GGBONDAI_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"Hello"}]}'`

const heroMetrics = computed(() => [
  { value: t('home.metrics.compatibleValue'), label: t('home.metrics.compatibleLabel') },
  { value: t('home.metrics.billingValue'), label: t('home.metrics.billingLabel') },
  { value: t('home.metrics.securityValue'), label: t('home.metrics.securityLabel') }
])

const capabilityCards = computed(() => [
  { icon: 'link' as const, title: t('home.capabilities.unified.title'), description: t('home.capabilities.unified.description') },
  { icon: 'sync' as const, title: t('home.capabilities.routing.title'), description: t('home.capabilities.routing.description') },
  { icon: 'calculator' as const, title: t('home.capabilities.metering.title'), description: t('home.capabilities.metering.description') },
  { icon: 'shield' as const, title: t('home.capabilities.security.title'), description: t('home.capabilities.security.description') }
])

const modelCards = computed(() => [
  { title: t('home.models.openai.title'), description: t('home.models.openai.description') },
  { title: t('home.models.claude.title'), description: t('home.models.claude.description') },
  { title: t('home.models.gemini.title'), description: t('home.models.gemini.description') },
  { title: t('home.models.compatible.title'), description: t('home.models.compatible.description') }
])

const integrationSteps = computed(() => [
  { title: t('home.integration.createKey.title'), description: t('home.integration.createKey.description') },
  { title: t('home.integration.replaceBaseUrl.title'), description: t('home.integration.replaceBaseUrl.description') },
  { title: t('home.integration.sendRequest.title'), description: t('home.integration.sendRequest.description') }
])

const billingCards = computed(() => [
  { icon: 'dollar' as const, title: t('home.billing.rmb.title'), description: t('home.billing.rmb.description') },
  { icon: 'chart' as const, title: t('home.billing.transparent.title'), description: t('home.billing.transparent.description') },
  { icon: 'badge' as const, title: t('home.billing.packageFirst.title'), description: t('home.billing.packageFirst.description') },
  { icon: 'server' as const, title: t('home.billing.support.title'), description: t('home.billing.support.description') }
])

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
}

onMounted(() => {
  initTheme()
  authStore.checkAuth()
  if (!appStore.publicSettingsLoaded) {
    appStore.fetchPublicSettings()
  }
})
</script>

<style scoped>
.section-kicker {
  @apply text-sm font-semibold uppercase tracking-[0.28em] text-ggbond-pink-600 dark:text-ggbond-pink-400;
}

.section-title {
  @apply mt-3 text-3xl font-semibold tracking-tight text-gray-950 dark:text-white sm:text-4xl;
}

.brand-card {
  @apply rounded-[1.5rem] border border-ggbond-pink-200/50 bg-white/85 p-6 shadow-lg shadow-ggbond-pink-500/5 backdrop-blur transition-all duration-300 dark:border-ggbond-purple-900/30 dark:bg-dark-900/75;
}

.brand-card:hover {
  @apply -translate-y-1 shadow-xl shadow-ggbond-pink-500/15 dark:shadow-ggbond-purple-900/30;
}

/* 渐变动画 */
@keyframes gradient-x {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 6s ease infinite;
}
</style>

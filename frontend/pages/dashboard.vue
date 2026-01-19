<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
    <!-- Sidebar -->
    <aside class="w-64 backdrop-blur-lg bg-white/5 border-r border-white/10">
      <div class="p-6">
        <!-- Logo -->
        <div class="flex items-center space-x-3 mb-8">
          <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
            </svg>
          </div>
          <h1 class="text-xl font-bold text-white">CloudVault</h1>
        </div>

        <!-- Menu -->
        <nav class="space-y-2">
          <button
            @click="activeSection = 'dashboard'"
            :class="activeSection === 'dashboard' ? 'bg-white/20 text-white' : 'text-purple-200 hover:bg-white/10'"
            class="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            </svg>
            <span>Dashboard</span>
          </button>
          
          <button
            @click="activeSection = 'companies'"
            :class="activeSection === 'companies' ? 'bg-white/20 text-white' : 'text-purple-200 hover:bg-white/10'"
            class="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            <span>Empresas</span>
          </button>
        </nav>
      </div>

      <!-- User Info -->
      <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-white font-medium text-sm">{{ user?.name }}</p>
            <p class="text-purple-200 text-xs">{{ user?.email }}</p>
          </div>
          <button
            @click="logout"
            class="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <div class="max-w-6xl mx-auto">
        <!-- Dashboard Section -->
        <div v-if="activeSection === 'dashboard'">
          <h2 class="text-3xl font-bold text-white mb-8">Dashboard</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-6">
              <h3 class="text-white font-semibold mb-2">Empresas</h3>
              <p class="text-3xl font-bold text-purple-300">0</p>
            </div>
            <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-6">
              <h3 class="text-white font-semibold mb-2">Armazenamento</h3>
              <p class="text-3xl font-bold text-purple-300">0 MB</p>
            </div>
          </div>
        </div>

        <!-- Companies Section -->
        <div v-if="activeSection === 'companies'">
          <h2 class="text-3xl font-bold text-white mb-8">Gerenciar Empresas</h2>
          <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-8">
            <p class="text-purple-200">Seção de empresas em desenvolvimento...</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Company Modal -->
    <CompanyModal 
      :show="showCompanyModal" 
      @company-selected="handleCompanySelected" 
    />

    <!-- Messages -->
    <div v-if="message" class="fixed bottom-6 right-6 p-4 rounded-2xl shadow-2xl backdrop-blur-lg border transition-all duration-300 z-50" :class="messageType === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-200' : 'bg-green-500/20 border-green-500/30 text-green-200'">
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0">
          <svg v-if="messageType === 'error'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="font-medium">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Middleware de autenticação
definePageMeta({
  middleware: 'auth'
})

const config = useRuntimeConfig()

// Estados
const user = ref(null)
const activeSection = ref('dashboard')
const message = ref('')
const messageType = ref('')

// Carregar dados do usuário
onMounted(async () => {
  await loadUserProfile()
})

// Funções
const showMessage = (msg, type = 'success') => {
  message.value = msg
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

const loadUserProfile = async () => {
  try {
    const token = useCookie('auth-token')
    
    const response = await $fetch(`${config.public.apiBase}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    
    user.value = response.user
  } catch (error) {
    console.error('Erro ao carregar perfil:', error)
    navigateTo('/')
  }
}

const logout = () => {
  const token = useCookie('auth-token')
  token.value = null
  navigateTo('/')
}
</script>
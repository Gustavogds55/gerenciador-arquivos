<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <!-- Header -->
    <header class="backdrop-blur-lg bg-white/5 border-b border-white/10">
      <div class="max-w-6xl mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-white">CloudVault</h1>
              <p v-if="selectedCompany" class="text-purple-200 text-sm">{{ selectedCompany.name }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <button
              v-if="selectedCompany"
              @click="showCompanyModal = true"
              class="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 border border-white/20"
            >
              Trocar Empresa
            </button>
            
            <div class="text-right">
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
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto p-8">
      <div v-if="selectedCompany">
        <h2 class="text-3xl font-bold text-white mb-8">Dashboard</h2>
        
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-6">
            <h3 class="text-white font-semibold mb-2">Arquivos</h3>
            <p class="text-3xl font-bold text-purple-300">{{ companyStats.files }}</p>
          </div>
          <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-6">
            <h3 class="text-white font-semibold mb-2">Armazenamento</h3>
            <p class="text-3xl font-bold text-purple-300">{{ companyStats.storage }}</p>
          </div>
          <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer" @click="openDocuments">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-white font-semibold mb-2">Documentos</h3>
                <p class="text-purple-200 text-sm">Gerenciar arquivos</p>
              </div>
              <svg class="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Upload Area -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Upload Drag & Drop -->
          <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-6">
            <h3 class="text-xl font-bold text-white mb-4">Upload de Arquivos</h3>
            <div 
              @drop="handleDrop" 
              @dragover.prevent 
              @dragenter.prevent
              @dragleave="isDragging = false"
              @dragenter="isDragging = true"
              :class="isDragging ? 'border-purple-400 bg-purple-500/20' : 'border-white/30'"
              class="border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer"
              @click="$refs.fileInput.click()"
            >
              <input
                ref="fileInput"
                type="file"
                multiple
                @change="handleFileSelect"
                class="hidden"
              />
              
              <div class="space-y-4">
                <div class="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-white font-medium">Arraste arquivos aqui</p>
                  <p class="text-purple-200 text-sm">ou clique para selecionar</p>
                </div>
              </div>
            </div>
            
            <!-- Selected Files -->
            <div v-if="selectedFiles.length > 0" class="mt-4 space-y-2">
              <div v-for="(file, index) in selectedFiles" :key="index" class="flex items-center justify-between bg-white/10 p-3 rounded-lg">
                <span class="text-white text-sm">{{ file.name }}</span>
                <button @click="removeFile(index)" class="text-red-400 hover:text-red-300">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <button
                @click="uploadFiles"
                :disabled="uploading"
                class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
              >
                {{ uploading ? 'Enviando...' : 'Enviar Arquivos' }}
              </button>
            </div>
          </div>

          <!-- Recent Files -->
          <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-6">
            <h3 class="text-xl font-bold text-white mb-4">Arquivos Recentes</h3>
            <div v-if="recentFiles.length === 0" class="text-center py-8">
              <svg class="w-12 h-12 text-purple-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
              <p class="text-purple-200">Nenhum arquivo ainda</p>
            </div>
            <div v-else class="space-y-3 max-h-80 overflow-y-auto">
              <div v-for="file in recentFiles" :key="file.key" class="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-white text-sm font-medium">{{ file.name }}</p>
                    <p class="text-purple-200 text-xs">{{ formatFileSize(file.size) }}</p>
                  </div>
                </div>
                <a :href="file.url" target="_blank" class="text-purple-300 hover:text-purple-200">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-20">
        <div class="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-white mb-4">Bem-vindo ao CloudVault</h2>
        <p class="text-purple-200 text-lg mb-6">Selecione uma empresa para começar</p>
        <button
          @click="showCompanyModal = true"
          class="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-lg"
        >
          Selecionar Empresa
        </button>
      </div>
    </main>

    <!-- Company Modal -->
    <CompanyModal 
      :show="showCompanyModal" 
      @company-selected="handleCompanySelected" 
    />

    <!-- Documents Modal -->
    <DocumentsModal 
      :show="showDocumentsModal" 
      :company-id="selectedCompany?.id" 
      @close="showDocumentsModal = false" 
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
const message = ref('')
const messageType = ref('')
const showCompanyModal = ref(false)
const selectedCompany = ref(null)
const companyStats = ref({
  files: 0,
  storage: '0 MB'
})
const selectedFiles = ref([])
const recentFiles = ref([])
const uploading = ref(false)
const isDragging = ref(false)
const showDocumentsModal = ref(false)

// Carregar dados do usuário
onMounted(async () => {
  await loadUserProfile()
  // Verificar se precisa mostrar modal de empresa
  const companyCookie = useCookie('selected-company')
  if (!companyCookie.value) {
    showCompanyModal.value = true
  } else {
    try {
      selectedCompany.value = JSON.parse(companyCookie.value)
      loadCompanyStats()
      loadRecentFiles()
    } catch (error) {
      console.error('Erro ao parsear cookie da empresa:', error)
      showCompanyModal.value = true
    }
  }
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
  const company = useCookie('selected-company')
  token.value = null
  company.value = null
  navigateTo('/')
}

const handleCompanySelected = (company) => {
  selectedCompany.value = company
  const companyCookie = useCookie('selected-company')
  companyCookie.value = JSON.stringify(company)
  showCompanyModal.value = false
  showMessage(`Empresa ${company.name} selecionada!`)
  loadCompanyStats()
  loadRecentFiles()
}

const loadCompanyStats = async () => {
  if (!selectedCompany.value) return
  
  try {
    const token = useCookie('auth-token')
    const response = await $fetch(`${config.public.apiBase}/companies/${selectedCompany.value.id}/stats`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    
    companyStats.value = response.stats
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error)
    // Valores padrão se der erro
    companyStats.value = {
      files: 0,
      storage: '0 MB'
    }
  }
}

const openDocuments = () => {
  showDocumentsModal.value = true
}

const handleDrop = (event) => {
  event.preventDefault()
  isDragging.value = false
  const files = Array.from(event.dataTransfer.files)
  selectedFiles.value = [...selectedFiles.value, ...files]
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  selectedFiles.value = [...selectedFiles.value, ...files]
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const uploadFiles = async () => {
  if (selectedFiles.value.length === 0) return
  
  uploading.value = true
  
  try {
    const token = useCookie('auth-token')
    
    for (const file of selectedFiles.value) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('companyId', selectedCompany.value.id)
      
      await $fetch(`${config.public.apiBase}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
    }
    
    showMessage(`${selectedFiles.value.length} arquivo(s) enviado(s) com sucesso!`)
    selectedFiles.value = []
    loadCompanyStats()
    loadRecentFiles()
    
  } catch (error) {
    showMessage(error.data?.error || 'Erro no upload', 'error')
  } finally {
    uploading.value = false
  }
}

const loadRecentFiles = async () => {
  if (!selectedCompany.value) return
  
  try {
    const token = useCookie('auth-token')
    const response = await $fetch(`${config.public.apiBase}/companies/${selectedCompany.value.id}/files`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    
    recentFiles.value = (response.files || []).slice(0, 5) // Apenas 5 arquivos
  } catch (error) {
    console.error('Erro ao carregar arquivos:', error)
    recentFiles.value = []
  }
}
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
    </div>

    <!-- Header -->
    <header class="relative z-10 backdrop-blur-lg bg-white/5 border-b border-white/10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white">CloudVault</h1>
              <p class="text-purple-200 text-sm">{{ uploadedFiles.length }} arquivos</p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <p class="text-white font-medium">{{ user?.name }}</p>
              <p class="text-purple-200 text-sm">{{ user?.email }}</p>
            </div>
            <button
              @click="logout"
              class="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Conteúdo Principal -->
    <main class="max-w-6xl mx-auto py-8 sm:px-6 lg:px-8 relative z-10">
      <div class="px-4 py-6 sm:px-0 space-y-8">

        <!-- Upload de Arquivos -->
        <div class="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 overflow-hidden shadow-2xl hover:bg-white/20 transition-all duration-300">
          <div class="px-8 py-8">
            <h3 class="text-2xl font-bold text-white mb-6">
              📁 Upload de Arquivos
            </h3>
            
            <!-- Área de Upload -->
            <div 
              @drop="handleDrop" 
              @dragover.prevent 
              @dragenter.prevent
              class="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center hover:border-purple-400 transition-all duration-300 bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/20 group cursor-pointer"
              @click="$refs.fileInput.click()"
            >
              <input
                ref="fileInput"
                type="file"
                multiple
                @change="handleFileSelect"
                class="hidden"
              />
              
              <div v-if="!selectedFiles.length" class="space-y-4">
                <div class="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-xl font-semibold text-white mb-2">
                    Arraste seus arquivos aqui
                  </p>
                  <p class="text-purple-200">
                    ou clique para selecionar
                  </p>
                </div>
                <div class="flex justify-center">
                  <span class="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm text-purple-200 border border-white/20">
                    Suporte para múltiplos arquivos
                  </span>
                </div>
              </div>

              <!-- Arquivos Selecionados -->
              <div v-else class="space-y-4">
                <div class="grid gap-3">
                  <div v-for="(file, index) in selectedFiles" :key="index" class="flex items-center justify-between bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <p class="text-white font-medium">{{ file.name }}</p>
                        <p class="text-purple-200 text-sm">{{ formatFileSize(file.size) }}</p>
                      </div>
                    </div>
                    <button
                      @click.stop="removeFile(index)"
                      class="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-300"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div class="flex space-x-4 justify-center">
                  <button
                    @click.stop="uploadFiles"
                    :disabled="uploading"
                    class="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                  >
                    <svg v-if="uploading" class="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                    </svg>
                    <span>{{ uploading ? 'Enviando...' : 'Enviar Arquivos' }}</span>
                  </button>
                  
                  <button
                    @click.stop="$refs.fileInput.click()"
                    class="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/20 flex items-center space-x-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span>Adicionar Mais</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Progresso do Upload -->
            <div v-if="uploadProgress > 0" class="mt-6 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-purple-200">Progresso do Upload</span>
                <span class="text-white font-semibold">{{ uploadProgress }}%</span>
              </div>
              <div class="bg-white/10 rounded-full h-3 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out shadow-lg"
                  :style="{ width: uploadProgress + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Lista de Arquivos Enviados -->
        <div class="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 overflow-hidden shadow-2xl hover:bg-white/20 transition-all duration-300">
          <div class="px-8 py-8">
            <h3 class="text-2xl font-bold text-white mb-6">
              📂 Meus Arquivos
            </h3>
            
            <div v-if="uploadedFiles.length === 0" class="text-center py-12">
              <div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <p class="text-purple-200 text-lg">Nenhum arquivo enviado ainda</p>
              <p class="text-purple-300 text-sm mt-2">Faça seu primeiro upload acima!</p>
            </div>
            
            <div v-else class="grid gap-4">
              <div
                v-for="file in uploadedFiles"
                :key="file.key"
                class="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="font-semibold text-white group-hover:text-purple-200 transition-colors">{{ file.name }}</p>
                    <p class="text-purple-300 text-sm">{{ file.uploadedAt }}</p>
                  </div>
                </div>
                <a
                  :href="file.url"
                  target="_blank"
                  class="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  <span>Abrir</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Mensagens -->
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
    </main>
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
const selectedFiles = ref([])
const uploadedFiles = ref([])
const uploading = ref(false)
const uploadProgress = ref(0)
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

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  selectedFiles.value = [...selectedFiles.value, ...files]
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

const handleDrop = (event) => {
  event.preventDefault()
  const files = Array.from(event.dataTransfer.files)
  selectedFiles.value = [...selectedFiles.value, ...files]
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
  uploadProgress.value = 0
  
  try {
    const token = useCookie('auth-token')
    
    for (let i = 0; i < selectedFiles.value.length; i++) {
      const file = selectedFiles.value[i]
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await $fetch(`${config.public.apiBase}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      
      // Adicionar à lista de arquivos enviados
      uploadedFiles.value.unshift({
        name: file.name,
        url: response.url,
        key: response.key,
        uploadedAt: new Date().toLocaleString()
      })
      
      // Atualizar progresso
      uploadProgress.value = Math.round(((i + 1) / selectedFiles.value.length) * 100)
    }
    
    showMessage(`${selectedFiles.value.length} arquivo(s) enviado(s) com sucesso!`)
    selectedFiles.value = []
    
  } catch (error) {
    showMessage(error.data?.error || 'Erro no upload', 'error')
  } finally {
    uploading.value = false
    setTimeout(() => {
      uploadProgress.value = 0
    }, 2000)
  }
}

const logout = () => {
  const token = useCookie('auth-token')
  token.value = null
  navigateTo('/')
}
</script>
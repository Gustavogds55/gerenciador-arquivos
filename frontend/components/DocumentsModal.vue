<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 p-8 max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
      <!-- Header with breadcrumb -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-2xl font-bold text-white">Documentos da Empresa</h2>
          <div v-if="currentFolder" class="flex items-center space-x-2 mt-2">
            <button @click="navigateToFolder('')" class="text-purple-300 hover:text-white text-sm">Raiz</button>
            <span class="text-purple-300">/</span>
            <span class="text-white text-sm">{{ currentFolder }}</span>
          </div>
        </div>
        <button @click="$emit('close')" class="p-2 text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Actions -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Buscar arquivos..."
              class="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
            />
          </div>
          <button
            @click="$refs.fileInput.click()"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
            </svg>
            <span>Upload</span>
          </button>
          <input
            ref="fileInput"
            type="file"
            multiple
            @change="handleFileSelect"
            class="hidden"
          />
        </div>
        <button
          @click="showCreateFolder = true"
          class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>Nova Pasta</span>
        </button>
      </div>

      <!-- Files List -->
      <div class="overflow-y-auto max-h-96">
        <div v-if="loading" class="text-center py-8">
          <div class="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p class="text-purple-200">Carregando arquivos...</p>
        </div>

        <div v-else-if="filteredItems.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-purple-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
          <p class="text-purple-200 text-lg">{{ searchTerm ? 'Nenhum item encontrado' : 'Nenhum arquivo ainda' }}</p>
        </div>

        <div v-else class="space-y-3">
          <!-- Folders -->
          <div v-for="folder in filteredFolders" :key="folder.path" class="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
            <div class="flex items-center space-x-4 cursor-pointer" @click="navigateToFolder(folder.path)">
              <div class="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                </svg>
              </div>
              <div>
                <p class="text-white font-medium">{{ folder.name }}</p>
                <p class="text-purple-200 text-sm">Pasta</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button 
                @click="editFolder(folder)"
                class="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-300"
                title="Editar pasta"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </button>
              <button 
                @click="deleteFolder(folder)"
                class="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all duration-300"
                title="Excluir pasta"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Files -->
          <div v-for="file in filteredFiles" :key="file.key" class="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div>
                <p class="text-white font-medium">{{ file.name }}</p>
                <div class="flex items-center space-x-4 text-sm text-purple-200">
                  <span>{{ formatFileSize(file.size) }}</span>
                  <span>{{ formatDate(file.lastModified) }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <a 
                :href="file.url" 
                target="_blank" 
                class="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-300"
                title="Abrir arquivo"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
              <button 
                @click="downloadFile(file)"
                class="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg transition-all duration-300"
                title="Download"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </button>
              <button 
                @click.stop="deleteFile(file)"
                class="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all duration-300"
                title="Excluir arquivo"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60">
      <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-6 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-white mb-4">Confirmar Exclusão</h3>
        <p class="text-purple-200 mb-6">
          Tem certeza que deseja excluir {{ itemToDelete?.type === 'folder' ? 'a pasta' : 'o arquivo' }} 
          <span class="font-semibold text-white">"{{ itemToDelete?.name }}"</span>?
        </p>
        <div class="flex space-x-3">
          <button
            @click="confirmDelete"
            class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-medium transition-all duration-300"
          >
            Excluir
          </button>
          <button
            @click="showDeleteConfirm = false; itemToDelete = null"
            class="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl font-medium transition-all duration-300 border border-white/20"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Folder Modal -->
    <div v-if="showEditFolder" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60">
      <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-6 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-white mb-4">Editar Pasta</h3>
        <input
          v-model="newFolderName"
          type="text"
          placeholder="Nome da pasta"
          class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 mb-4"
          @keyup.enter="updateFolder"
        />
        <div class="flex space-x-3">
          <button
            @click="updateFolder"
            :disabled="!newFolderName.trim()"
            class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-medium transition-all duration-300 disabled:opacity-50"
          >
            Salvar
          </button>
          <button
            @click="showEditFolder = false; editingFolder = null; newFolderName = ''"
            class="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl font-medium transition-all duration-300 border border-white/20"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- Create Folder Modal -->
    <div v-if="showCreateFolder" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60">
      <div class="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-6 max-w-md w-full mx-4">
        <h3 class="text-xl font-bold text-white mb-4">Nova Pasta</h3>
        <input
          v-model="newFolderName"
          type="text"
          placeholder="Nome da pasta"
          class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 mb-4"
          @keyup.enter="createFolder"
        />
        <div class="flex space-x-3">
          <button
            @click="createFolder"
            :disabled="!newFolderName.trim()"
            class="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-xl font-medium transition-all duration-300 disabled:opacity-50"
          >
            Criar
          </button>
          <button
            @click="showCreateFolder = false; newFolderName = ''"
            class="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-xl font-medium transition-all duration-300 border border-white/20"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  companyId: String
})

const emit = defineEmits(['close'])

const config = useRuntimeConfig()

// Estados
const files = ref([])
const folders = ref([])
const loading = ref(false)
const searchTerm = ref('')
const currentFolder = ref('')
const showCreateFolder = ref(false)
const newFolderName = ref('')
const editingFolder = ref(null)
const showEditFolder = ref(false)
const showDeleteConfirm = ref(false)
const itemToDelete = ref(null)

// Computed
const filteredFiles = computed(() => {
  if (!searchTerm.value) return files.value
  
  const term = searchTerm.value.toLowerCase()
  return files.value.filter(file => 
    file.name.toLowerCase().includes(term)
  )
})

const filteredFolders = computed(() => {
  if (!searchTerm.value) return folders.value
  
  const term = searchTerm.value.toLowerCase()
  return folders.value.filter(folder => 
    folder.name.toLowerCase().includes(term)
  )
})

const filteredItems = computed(() => {
  return [...filteredFolders.value, ...filteredFiles.value]
})

// Funções
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const loadFiles = async () => {
  if (!props.companyId) return
  
  loading.value = true
  
  try {
    const token = useCookie('auth-token')
    const response = await $fetch(`${config.public.apiBase}/companies/${props.companyId}/files`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      query: {
        folder: currentFolder.value
      }
    })
    
    files.value = response.files || []
    folders.value = response.folders || []
  } catch (error) {
    console.error('Erro ao carregar arquivos:', error)
    files.value = []
    folders.value = []
  } finally {
    loading.value = false
  }
}

const navigateToFolder = (folderPath) => {
  currentFolder.value = folderPath
  loadFiles()
}

const createFolder = async () => {
  if (!newFolderName.value.trim()) return
  
  try {
    const token = useCookie('auth-token')
    await $fetch(`${config.public.apiBase}/companies/${props.companyId}/folders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      body: {
        name: newFolderName.value.trim(),
        parentFolder: currentFolder.value
      }
    })
    
    showCreateFolder.value = false
    newFolderName.value = ''
    loadFiles()
  } catch (error) {
    console.error('Erro ao criar pasta:', error)
  }
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  uploadFiles(files)
}

const uploadFiles = async (fileList) => {
  if (fileList.length === 0) return
  
  try {
    const token = useCookie('auth-token')
    
    for (const file of fileList) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('companyId', props.companyId)
      formData.append('folder', currentFolder.value)
      
      await $fetch(`${config.public.apiBase}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
    }
    
    loadFiles()
  } catch (error) {
    console.error('Erro no upload:', error)
  }
}

const editFolder = (folder) => {
  editingFolder.value = folder
  newFolderName.value = folder.name
  showEditFolder.value = true
}

const updateFolder = async () => {
  if (!newFolderName.value.trim() || !editingFolder.value) return
  
  try {
    const token = useCookie('auth-token')
    await $fetch(`${config.public.apiBase}/companies/${props.companyId}/folders/${editingFolder.value.path}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      body: {
        name: newFolderName.value.trim()
      }
    })
    
    showEditFolder.value = false
    editingFolder.value = null
    newFolderName.value = ''
    loadFiles()
  } catch (error) {
    console.error('Erro ao editar pasta:', error)
  }
}

const deleteFolder = async (folder) => {
  itemToDelete.value = { ...folder, type: 'folder' }
  showDeleteConfirm.value = true
}

const deleteFile = async (file) => {
  itemToDelete.value = { ...file, type: 'file' }
  showDeleteConfirm.value = true
}

const confirmDelete = async () => {
  if (!itemToDelete.value) return
  
  try {
    const token = useCookie('auth-token')
    
    if (itemToDelete.value.type === 'folder') {
      await $fetch(`${config.public.apiBase}/companies/${props.companyId}/folders/${itemToDelete.value.path}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
    } else {
      await $fetch(`${config.public.apiBase}/files/${encodeURIComponent(itemToDelete.value.key)}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
    }
    
    showDeleteConfirm.value = false
    itemToDelete.value = null
    loadFiles()
  } catch (error) {
    console.error('Erro ao excluir:', error)
  }
}

const downloadFile = (file) => {
  const link = document.createElement('a')
  link.href = file.url
  link.download = file.name
  link.click()
}

// Carregar arquivos quando modal abre
watch(() => props.show, (show) => {
  if (show) {
    currentFolder.value = ''
    loadFiles()
    searchTerm.value = ''
  }
})
</script>
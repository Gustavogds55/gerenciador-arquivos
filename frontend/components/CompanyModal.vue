<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 p-8 max-w-md w-full mx-4">
      <h2 class="text-2xl font-bold text-white mb-6 text-center">
        {{ companies.length > 0 ? 'Selecionar Empresa' : 'Nova Empresa' }}
      </h2>

      <!-- Busca (só mostra se tem empresas) -->
      <div v-if="companies.length > 0" class="mb-6">
        <div class="relative">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Buscar nome ou CNPJ..."
            class="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
          />
        </div>
      </div>

      <!-- Lista de empresas -->
      <div v-if="companies.length > 0" class="space-y-3 mb-6 max-h-60 overflow-y-auto">
        <div
          v-for="company in filteredCompanies"
          :key="company.id"
          @click="selectedCompany = company"
          :class="selectedCompany?.id === company.id ? 'bg-purple-500/30 border-purple-400' : 'bg-white/10 border-white/20 hover:bg-white/20'"
          class="p-4 rounded-xl border cursor-pointer transition-all duration-300"
        >
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 rounded-full" :class="selectedCompany?.id === company.id ? 'bg-purple-400' : 'bg-white/30'"></div>
            <div>
              <p class="text-white font-medium">{{ company.name }}</p>
              <p class="text-purple-200 text-sm">CNPJ: {{ formatCNPJ(company.cnpj) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulário criar empresa -->
      <div v-if="companies.length === 0 || showCreateForm" class="space-y-4 mb-6">
        <input
          v-model="newCompany.name"
          type="text"
          placeholder="Nome da empresa"
          class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
        />
        <input
          v-model="newCompany.cnpj"
          type="text"
          placeholder="CNPJ"
          @input="formatCNPJInput"
          maxlength="18"
          class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
        />
      </div>

      <!-- Botões -->
      <div class="flex space-x-3">
        <button
          v-if="companies.length > 0 && selectedCompany && !showCreateForm"
          @click="selectCompany"
          class="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300"
        >
          Continuar
        </button>
        
        <button
          v-if="companies.length > 0 && !showCreateForm"
          @click="showCreateForm = true"
          class="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300 border border-white/20"
        >
          Nova Empresa
        </button>

        <button
          v-if="companies.length === 0 || showCreateForm"
          @click="createCompany"
          :disabled="!newCompany.name || !newCompany.cnpj || loading"
          class="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
        >
          {{ loading ? 'Criando...' : 'Criar' }}
        </button>

        <button
          v-if="showCreateForm && companies.length > 0"
          @click="showCreateForm = false"
          class="px-4 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300 border border-white/20"
        >
          Cancelar
        </button>
      </div>

      <!-- Erro -->
      <div v-if="error" class="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
        <p class="text-red-200 text-sm">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['company-selected'])

const config = useRuntimeConfig()

// Estados
const companies = ref([])
const selectedCompany = ref(null)
const searchTerm = ref('')
const showCreateForm = ref(false)
const loading = ref(false)
const error = ref('')

const newCompany = ref({
  name: '',
  cnpj: ''
})

// Computed
const filteredCompanies = computed(() => {
  if (!searchTerm.value) return companies.value
  
  const term = searchTerm.value.toLowerCase()
  return companies.value.filter(company => 
    company.name.toLowerCase().includes(term) ||
    company.cnpj.replace(/\D/g, '').includes(term.replace(/\D/g, ''))
  )
})

// Funções
const formatCNPJ = (cnpj) => {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

const formatCNPJInput = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  newCompany.value.cnpj = value
}

const loadCompanies = async () => {
  try {
    const token = useCookie('auth-token')
    const response = await $fetch(`${config.public.apiBase}/companies`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    companies.value = response.companies
  } catch (err) {
    console.error('Erro ao carregar empresas:', err)
  }
}

const createCompany = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const token = useCookie('auth-token')
    const response = await $fetch(`${config.public.apiBase}/companies`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      body: {
        name: newCompany.value.name,
        cnpj: newCompany.value.cnpj
      }
    })
    
    emit('company-selected', response.company)
  } catch (err) {
    error.value = err.data?.error || 'Erro ao criar empresa'
  } finally {
    loading.value = false
  }
}

const selectCompany = () => {
  emit('company-selected', selectedCompany.value)
}

// Carregar empresas quando modal abre
watch(() => props.show, (show) => {
  if (show) {
    loadCompanies()
    // Reset form
    newCompany.value = { name: '', cnpj: '' }
    selectedCompany.value = null
    showCreateForm.value = false
    error.value = ''
  }
})
</script>
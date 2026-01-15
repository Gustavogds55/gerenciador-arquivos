<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Background Animation -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div class="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Main Container -->
    <div class="max-w-md w-full relative z-10">
      <!-- Glassmorphism Card -->
      <div class="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 transition-all duration-300 hover:bg-white/20">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            CloudVault
          </h1>
          <p class="text-purple-200">Seu gerenciador de arquivos na nuvem</p>
        </div>

        <!-- Formulário de Login -->
        <form @submit.prevent="handleLogin" class="space-y-6" novalidate>
          <div class="space-y-4">
            <div class="relative">
              <input
                v-model="loginForm.email"
                type="email"
                maxlength="50"
                :class="[
                  'w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm',
                  errors.email ? 'border-red-400' : 'border-white/20'
                ]"
                placeholder="Digite seu email"
                @blur="validateEmail"
                @input="clearEmailError"
              />
              <div class="absolute top-3 right-3 flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
              <div v-if="errors.email" class="mt-2 text-red-300 text-sm flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ errors.email }}
              </div>
            </div>

            <div class="relative">
              <input
                v-model="loginForm.password"
                type="password"
                minlength="3"
                maxlength="6"
                :class="[
                  'w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm',
                  errors.password ? 'border-red-400' : 'border-white/20'
                ]"
                placeholder="Digite sua senha"
                @blur="validatePassword"
                @input="clearPasswordError"
              />
              <div class="absolute top-3 right-3 flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <div v-if="errors.password" class="mt-2 text-red-300 text-sm flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ errors.password }}
              </div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Entrando...
            </span>
            <span v-else>Entrar na Plataforma</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-white/20"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-transparent text-purple-200">ou</span>
          </div>
        </div>

        <!-- Link para Registro -->
        <div class="text-center">
          <button
            @click="showRegister = !showRegister"
            class="text-purple-200 hover:text-white transition-colors duration-300 font-medium"
          >
            {{ showRegister ? 'Já tem conta? Fazer login' : 'Não tem conta? Criar uma agora' }}
          </button>
        </div>

        <!-- Formulário de Registro -->
        <div v-if="showRegister" class="mt-6 space-y-6">
          <form @submit.prevent="handleRegister" class="space-y-4" novalidate>
            <div class="relative">
              <input
                v-model="registerForm.name"
                type="text"
                required
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="Seu nome completo"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>

            <div class="relative">
              <input
                v-model="registerForm.email"
                type="email"
                required
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="Seu melhor email"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
            </div>

            <div class="relative">
              <input
                v-model="registerForm.password"
                type="password"
                required
                minlength="6"
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                placeholder="Crie uma senha segura"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Criando conta...
              </span>
              <span v-else>Criar Minha Conta</span>
            </button>
          </form>
        </div>

        <!-- Mensagens -->
        <div v-if="message" class="mt-6 p-4 rounded-xl backdrop-blur-sm transition-all duration-300" :class="messageType === 'error' ? 'bg-red-500/20 border border-red-500/30 text-red-200' : 'bg-green-500/20 border border-green-500/30 text-green-200'">
          <div class="flex items-center">
            <svg v-if="messageType === 'error'" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Adicionar animações CSS customizadas
useHead({
  style: [{
    children: `
      @keyframes blob {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      .animate-blob {
        animation: blob 7s infinite;
      }
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }
    `
  }]
});

const config = useRuntimeConfig()

// Estados
const loading = ref(false)
const showRegister = ref(false)
const message = ref('')
const messageType = ref('')
const errors = ref({
  email: '',
  password: ''
})

// Formulários
const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  name: '',
  email: '',
  password: ''
})

// Funções
const showMessage = (msg, type = 'success') => {
  message.value = msg
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

const validateEmail = () => {
  if (!loginForm.value.email.trim()) {
    errors.value.email = 'Campo obrigatório'
    return false
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(loginForm.value.email)) {
    errors.value.email = 'Email inválido'
    return false
  }
  
  errors.value.email = ''
  return true
}

const validatePassword = () => {
  if (!loginForm.value.password.trim()) {
    errors.value.password = 'Campo obrigatório'
    return false
  }
  
  if (loginForm.value.password.length < 3 || loginForm.value.password.length > 6) {
    errors.value.password = 'Senha deve ter entre 3 e 6 caracteres'
    return false
  }
  
  errors.value.password = ''
  return true
}

const clearEmailError = () => {
  if (errors.value.email) {
    errors.value.email = ''
  }
}

const clearPasswordError = () => {
  if (errors.value.password) {
    errors.value.password = ''
  }
}

const handleLogin = async () => {
  // Validar campos obrigatórios
  const emailValid = validateEmail()
  const passwordValid = validatePassword()
  
  if (!emailValid || !passwordValid) {
    return
  }
  
  loading.value = true
  
  try {
    const response = await $fetch(`${config.public.apiBase}/auth/login`, {
      method: 'POST',
      body: loginForm.value
    })

    // Salvar token
    const token = useCookie('auth-token')
    token.value = response.token

    showMessage('Login realizado com sucesso!')
    
    // Redirecionar para dashboard
    setTimeout(() => {
      navigateTo('/dashboard')
    }, 1000)
    
  } catch (error) {
    showMessage(error.data?.error || 'Erro no login', 'error')
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  loading.value = true
  
  try {
    const response = await $fetch(`${config.public.apiBase}/auth/register`, {
      method: 'POST',
      body: registerForm.value
    })

    showMessage(response.message || 'Conta criada com sucesso!')
    
    // Voltar para o formulário de login
    showRegister.value = false
    
    // Limpar formulário de registro
    registerForm.value = {
      name: '',
      email: '',
      password: ''
    }
    
  } catch (error) {
    showMessage(error.data?.error || 'Erro ao criar conta', 'error')
  } finally {
    loading.value = false
  }
}
</script>
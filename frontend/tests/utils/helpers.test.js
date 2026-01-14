import { describe, test, expect } from 'vitest'

describe('Utilitários do Sistema', () => {
  describe('Formatação de Tamanho de Arquivo', () => {
    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    test('Deve formatar 0 bytes', () => {
      expect(formatFileSize(0)).toBe('0 Bytes')
    })

    test('Deve formatar bytes', () => {
      expect(formatFileSize(500)).toBe('500 Bytes')
      expect(formatFileSize(1023)).toBe('1023 Bytes')
    })

    test('Deve formatar kilobytes', () => {
      expect(formatFileSize(1024)).toBe('1 KB')
      expect(formatFileSize(2048)).toBe('2 KB')
      expect(formatFileSize(1536)).toBe('1.5 KB')
    })

    test('Deve formatar megabytes', () => {
      expect(formatFileSize(1048576)).toBe('1 MB')
      expect(formatFileSize(5242880)).toBe('5 MB')
    })

    test('Deve formatar gigabytes', () => {
      expect(formatFileSize(1073741824)).toBe('1 GB')
      expect(formatFileSize(2147483648)).toBe('2 GB')
    })
  })

  describe('Manipulação de Cookies', () => {
    const setCookie = (name, value) => {
      return { name, value, set: true }
    }

    const getCookie = (name, cookies) => {
      return cookies[name] || null
    }

    const deleteCookie = (name) => {
      return { name, value: null, deleted: true }
    }

    test('Deve criar cookie', () => {
      const cookie = setCookie('auth-token', 'abc123')
      expect(cookie.name).toBe('auth-token')
      expect(cookie.value).toBe('abc123')
      expect(cookie.set).toBe(true)
    })

    test('Deve obter cookie existente', () => {
      const cookies = { 'auth-token': 'abc123', 'user': 'john' }
      expect(getCookie('auth-token', cookies)).toBe('abc123')
      expect(getCookie('user', cookies)).toBe('john')
    })

    test('Deve retornar null para cookie inexistente', () => {
      const cookies = { 'auth-token': 'abc123' }
      expect(getCookie('nonexistent', cookies)).toBeNull()
    })

    test('Deve deletar cookie', () => {
      const result = deleteCookie('auth-token')
      expect(result.name).toBe('auth-token')
      expect(result.value).toBeNull()
      expect(result.deleted).toBe(true)
    })
  })

  describe('Validação de Resposta HTTP', () => {
    const isSuccessResponse = (status) => {
      return status >= 200 && status < 300
    }

    const isErrorResponse = (status) => {
      return status >= 400
    }

    const isUnauthorized = (status) => {
      return status === 401 || status === 403
    }

    test('Deve identificar respostas de sucesso', () => {
      expect(isSuccessResponse(200)).toBe(true)
      expect(isSuccessResponse(201)).toBe(true)
      expect(isSuccessResponse(204)).toBe(true)
    })

    test('Deve identificar respostas de erro', () => {
      expect(isErrorResponse(400)).toBe(true)
      expect(isErrorResponse(401)).toBe(true)
      expect(isErrorResponse(404)).toBe(true)
      expect(isErrorResponse(500)).toBe(true)
    })

    test('Deve identificar não autorizado', () => {
      expect(isUnauthorized(401)).toBe(true)
      expect(isUnauthorized(403)).toBe(true)
      expect(isUnauthorized(200)).toBe(false)
      expect(isUnauthorized(404)).toBe(false)
    })
  })

  describe('Manipulação de Mensagens', () => {
    const createMessage = (text, type = 'success') => {
      return { text, type, timestamp: Date.now() }
    }

    const isErrorMessage = (message) => {
      return message.type === 'error'
    }

    const isSuccessMessage = (message) => {
      return message.type === 'success'
    }

    test('Deve criar mensagem de sucesso', () => {
      const msg = createMessage('Login realizado', 'success')
      expect(msg.text).toBe('Login realizado')
      expect(msg.type).toBe('success')
      expect(msg.timestamp).toBeDefined()
    })

    test('Deve criar mensagem de erro', () => {
      const msg = createMessage('Erro no login', 'error')
      expect(msg.text).toBe('Erro no login')
      expect(msg.type).toBe('error')
    })

    test('Deve identificar tipo de mensagem', () => {
      const success = createMessage('OK', 'success')
      const error = createMessage('Erro', 'error')
      
      expect(isSuccessMessage(success)).toBe(true)
      expect(isErrorMessage(error)).toBe(true)
      expect(isErrorMessage(success)).toBe(false)
      expect(isSuccessMessage(error)).toBe(false)
    })
  })
})

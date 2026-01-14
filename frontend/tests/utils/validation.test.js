import { describe, test, expect } from 'vitest'

describe('Validações de Login', () => {
  describe('Validação de Email', () => {
    const validateEmail = (email) => {
      if (!email || !email.trim()) {
        return 'Campo obrigatório'
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return 'Email inválido'
      }
      return ''
    }

    test('Deve aceitar email válido', () => {
      expect(validateEmail('teste@email.com')).toBe('')
      expect(validateEmail('user@example.com')).toBe('')
      expect(validateEmail('nome.sobrenome@dominio.com.br')).toBe('')
    })

    test('Deve rejeitar email vazio', () => {
      expect(validateEmail('')).toBe('Campo obrigatório')
      expect(validateEmail('   ')).toBe('Campo obrigatório')
    })

    test('Deve rejeitar email sem @', () => {
      expect(validateEmail('emailinvalido.com')).toBe('Email inválido')
    })

    test('Deve rejeitar email sem domínio', () => {
      expect(validateEmail('email@')).toBe('Email inválido')
      expect(validateEmail('email@dominio')).toBe('Email inválido')
    })

    test('Deve rejeitar email com espaços', () => {
      expect(validateEmail('email @dominio.com')).toBe('Email inválido')
      expect(validateEmail('email@ dominio.com')).toBe('Email inválido')
    })
  })

  describe('Validação de Senha', () => {
    const validatePassword = (password, isLogin = true) => {
      if (!password || !password.trim()) {
        return 'Campo obrigatório'
      }
      
      if (isLogin) {
        if (password.length < 3 || password.length > 6) {
          return 'Senha deve ter entre 3 e 6 caracteres'
        }
      } else {
        if (password.length < 6) {
          return 'Senha deve ter no mínimo 6 caracteres'
        }
      }
      
      return ''
    }

    test('Deve aceitar senha válida para login', () => {
      expect(validatePassword('123', true)).toBe('')
      expect(validatePassword('123456', true)).toBe('')
      expect(validatePassword('abc', true)).toBe('')
    })

    test('Deve aceitar senha válida para registro', () => {
      expect(validatePassword('123456', false)).toBe('')
      expect(validatePassword('senhasegura', false)).toBe('')
      expect(validatePassword('abc123', false)).toBe('')
    })

    test('Deve rejeitar senha vazia', () => {
      expect(validatePassword('', true)).toBe('Campo obrigatório')
      expect(validatePassword('   ', true)).toBe('Campo obrigatório')
    })

    test('Deve rejeitar senha muito curta para login', () => {
      expect(validatePassword('12', true)).toBe('Senha deve ter entre 3 e 6 caracteres')
      expect(validatePassword('a', true)).toBe('Senha deve ter entre 3 e 6 caracteres')
    })

    test('Deve rejeitar senha muito longa para login', () => {
      expect(validatePassword('1234567', true)).toBe('Senha deve ter entre 3 e 6 caracteres')
      expect(validatePassword('senhamuito longa', true)).toBe('Senha deve ter entre 3 e 6 caracteres')
    })

    test('Deve rejeitar senha muito curta para registro', () => {
      expect(validatePassword('12345', false)).toBe('Senha deve ter no mínimo 6 caracteres')
      expect(validatePassword('abc', false)).toBe('Senha deve ter no mínimo 6 caracteres')
    })
  })

  describe('Validação de Campos Obrigatórios', () => {
    const validateRequired = (value, fieldName) => {
      if (!value || !value.trim()) {
        return `${fieldName} é obrigatório`
      }
      return ''
    }

    test('Deve validar campo nome', () => {
      expect(validateRequired('João Silva', 'Nome')).toBe('')
      expect(validateRequired('', 'Nome')).toBe('Nome é obrigatório')
      expect(validateRequired('   ', 'Nome')).toBe('Nome é obrigatório')
    })

    test('Deve validar campo email', () => {
      expect(validateRequired('teste@email.com', 'Email')).toBe('')
      expect(validateRequired('', 'Email')).toBe('Email é obrigatório')
    })

    test('Deve validar campo senha', () => {
      expect(validateRequired('123456', 'Senha')).toBe('')
      expect(validateRequired('', 'Senha')).toBe('Senha é obrigatório')
    })
  })
})

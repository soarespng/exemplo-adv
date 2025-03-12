import { theme } from "@/lib/theme"

// Função para criar um objeto de tema personalizado
export function createTheme(customTheme: any) {
  // Mescla o tema personalizado com o tema padrão
  return deepMerge(theme, customTheme)
}

// Função para mesclar profundamente dois objetos
function deepMerge(target: any, source: any) {
  const output = { ...target }

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] })
        } else {
          output[key] = deepMerge(target[key], source[key])
        }
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }

  return output
}

// Função auxiliar para verificar se um valor é um objeto
function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item)
}
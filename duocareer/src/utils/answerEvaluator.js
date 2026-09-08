export function evaluateAnswer(answer, question) {
  const text = answer.toLowerCase().trim()

  if (question.id === 1) {
    if (
      text.includes('experiência') ||
      text.includes('experiencia') ||
      text.includes('interesse') ||
      text.includes('oportunidade') ||
      text.includes('mudar')
    ) {
      return {
        result: 'correct',
        message: 'Na mosca! 🎯',
        explanation:
          'Você entendeu que uma carreira pode mudar conforme novas experiências, interesses e oportunidades aparecem.',
        hint: null
      }
    }

    if (
      text.includes('objetivo') ||
      text.includes('objetivos') ||
      text.includes('caminho')
    ) {
      return {
        result: 'almost',
        message: 'Hmm... é quase isso.',
        explanation:
          'Você entendeu parte da ideia, mas sua resposta ainda está um pouco vaga.',
        hint: 'E o que pode fazer esses objetivos mudarem?'
      }
    }
  }

  if (question.id === 2) {
    const concepts = [
      text.includes('experiência') || text.includes('experiencia'),
      text.includes('conhecimento'),
      text.includes('habilidade'),
      text.includes('decisão') || text.includes('decisao')
    ]

    const correctConcepts = concepts.filter(Boolean).length

    if (correctConcepts >= 3) {
      return {
        result: 'correct',
        message: 'Muito bem! 🚀',
        explanation:
          'Você identificou vários elementos importantes para a construção de uma carreira.',
        hint: null
      }
    }

    if (correctConcepts >= 1) {
      return {
        result: 'almost',
        message: 'Tá perto, mas não é bem isso.',
        explanation:
          'Você mencionou um elemento importante, mas ainda faltam outros aspectos.',
        hint: 'Pense no que uma pessoa aprende, desenvolve e vivencia.'
      }
    }
  }

  if (question.id === 3) {
    if (
      (text.includes('sim') || text.includes('pode')) &&
      (
        text.includes('interesse') ||
        text.includes('competência') ||
        text.includes('competencia') ||
        text.includes('experiência') ||
        text.includes('experiencia') ||
        text.includes('mudar')
      )
    ) {
      return {
        result: 'correct',
        message: 'Na mosca! 🎯',
        explanation:
          'Você entendeu que mudanças de área podem acontecer durante o desenvolvimento profissional.',
        hint: null
      }
    }

    if (text.includes('sim') || text.includes('pode')) {
      return {
        result: 'almost',
        message: 'Hmm... é quase isso.',
        explanation:
          'Você respondeu corretamente, mas faltou explicar o motivo.',
        hint: 'Pense no que pode fazer alguém decidir seguir outro caminho profissional.'
      }
    }
  }

  return {
    result: 'incorrect',
    message: 'Não é isso... tente novamente!',
    explanation:
      'Sua resposta ainda não demonstra completamente o conceito apresentado.',
    hint: 'Volte ao conteúdo e tente relacionar sua resposta com o que foi estudado.'
  }
}
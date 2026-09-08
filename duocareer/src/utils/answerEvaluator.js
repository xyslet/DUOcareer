export function evaluateAnswer(answer, question) {
  const text = answer.toLowerCase().trim()

  // PERGUNTA 1
  if (question.id === 1) {
    const concepts = [
      text.includes('tempo'),
      text.includes('experiência') || text.includes('experiencia'),
      text.includes('conhecimento'),
      text.includes('habilidade'),
      text.includes('aprender'),
      text.includes('desenvolv')
    ]

    const correctConcepts = concepts.filter(Boolean).length

    if (correctConcepts >= 2) {
      return {
        result: 'correct',
        message: 'Na mosca! 🎯',
        explanation:
          'Você entendeu que a carreira é construída gradualmente por meio de experiências e aprendizados.',
        hint: null
      }
    }

    if (correctConcepts === 1) {
      return {
        result: 'almost',
        message: 'Hmm... é quase isso.',
        explanation:
          'Você identificou parte da ideia, mas sua resposta ainda está um pouco vaga.',
        hint:
          'Pense nas experiências e aprendizados que uma pessoa acumula ao longo do tempo.'
      }
    }
  }

  // PERGUNTA 2
  if (question.id === 2) {
    const mentionsProfession =
      text.includes('profissão') ||
      text.includes('profissao') ||
      text.includes('área') ||
      text.includes('area') ||
      text.includes('atuação') ||
      text.includes('atuacao')

    const mentionsCareer =
      text.includes('carreira') ||
      text.includes('caminho') ||
      text.includes('vida profissional') ||
      text.includes('experiência') ||
      text.includes('experiencia')

    if (mentionsProfession && mentionsCareer) {
      return {
        result: 'correct',
        message: 'Muito bem! 🚀',
        explanation:
          'Você diferenciou uma profissão de uma carreira e entendeu como os dois conceitos se relacionam.',
        hint: null
      }
    }

    if (mentionsProfession || mentionsCareer) {
      return {
        result: 'almost',
        message: 'Tá perto, mas não é bem isso.',
        explanation:
          'Você mencionou um dos conceitos, mas ainda não explicou completamente a diferença.',
        hint:
          'Tente pensar em uma área de atuação e no caminho profissional construído ao longo da vida.'
      }
    }
  }

  // PERGUNTA 3
  if (question.id === 3) {
    const mentionsChange =
      text.includes('mudar') ||
      text.includes('mudança') ||
      text.includes('mudanca') ||
      text.includes('alterar') ||
      text.includes('novo') ||
      text.includes('novos')

    const mentionsReason =
      text.includes('interesse') ||
      text.includes('oportunidade') ||
      text.includes('experiência') ||
      text.includes('experiencia') ||
      text.includes('objetivo') ||
      text.includes('competência') ||
      text.includes('competencia')

    if (mentionsChange && mentionsReason) {
      return {
        result: 'correct',
        message: 'Na mosca! 🎯',
        explanation:
          'Você entendeu que os planos profissionais podem mudar conforme novas experiências, interesses, oportunidades e objetivos surgem.',
        hint: null
      }
    }

    if (mentionsChange || mentionsReason) {
      return {
        result: 'almost',
        message: 'Hmm... é quase isso.',
        explanation:
          'Você percebeu que mudanças podem acontecer, mas faltou explicar melhor o motivo.',
        hint:
          'Pense no que pode fazer uma pessoa mudar seus objetivos profissionais.'
      }
    }
  }

  // RESPOSTA INCORRETA
  return {
    result: 'incorrect',
    message: 'Não é isso... tente dar uma olhadinha novamente!',
    explanation:
      'Sua resposta ainda não demonstra completamente o conceito apresentado.',
    hint:
      'Volte ao conteúdo acima e tente relacionar sua resposta com o que acabou de estudar.'
  }
}
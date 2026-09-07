export function evaluateAnswer(answer) {
  const text = answer.toLowerCase().trim()

  if (
    text.includes('experiência') ||
    text.includes('experiencias') ||
    text.includes('interesse')
  ) {
    return {
      result: 'correct',
      message: 'Na mosca! 🎯',
      explanation: 'Você identificou que uma carreira pode mudar conforme novas experiências e interesses surgem.',
      expectedAnswer:
        'Uma carreira pode mudar porque novas experiências, interesses e oportunidades podem surgir ao longo do tempo.',
      hint: null
    }
  }

  if (
    text.includes('objetivo') ||
    text.includes('objetivos') ||
    text.includes('caminho') ||
    text.includes('mudar')
  ) {
    return {
      result: 'almost',
      message: 'Hmm... é quase isso.',
      explanation: 'Você entendeu parte da ideia, mas sua resposta ainda está um pouco vaga.',
      expectedAnswer:
        'Uma carreira pode mudar porque novas experiências, interesses e oportunidades podem surgir ao longo do tempo.',
      hint: 'E as experiências que podem mudar seus objetivos?'
    }
  }

  return {
    result: 'incorrect',
    message: 'Não é isso... tente dar uma olhadinha novamente!',
    explanation:
      'Sua resposta ainda não demonstra o conceito apresentado no texto.',
    expectedAnswer:
      'Uma carreira pode mudar porque novas experiências, interesses e oportunidades podem surgir ao longo do tempo.',
    hint: 'Pense no que pode fazer uma pessoa mudar seus objetivos.'
  }
}
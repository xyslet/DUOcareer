const STOP_WORDS = new Set([
  'a', 'as', 'ao', 'aos', 'e', 'em', 'de', 'do', 'da', 'dos', 'das',
  'com', 'para', 'por', 'que', 'quem', 'um', 'uma', 'uns', 'umas',
  'no', 'na', 'nos', 'nas', 'se', 'sem', 'ser', 'sao', 'são', 'mais',
  'mas', 'como', 'ou', 'entao', 'então', 'tambem', 'também', 'sua',
  'seu', 'sua', 'me', 'te', 'nos', 'vos', 'este', 'esta', 'estes',
  'estas', 'esse', 'essa', 'esses', 'essas', 'isso', 'aquilo', 'não',
  'nao', 'sim', 'nunca', 'sempre', 'muito', 'muita', 'muitos', 'muitas'
])

function normalizeText(text = '') {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractKeywords(text = '') {
  const normalized = normalizeText(text)

  if (!normalized) {
    return []
  }

  return [...new Set(
    normalized
      .split(' ')
      .filter((word) => word.length > 2 && !STOP_WORDS.has(word))
  )]
}

function getCoverage(answerText, expectedText) {
  const answerNormalized = normalizeText(answerText)
  const expectedNormalized = normalizeText(expectedText)

  if (!answerNormalized || !expectedNormalized) {
    return 0
  }

  const expectedKeywords = extractKeywords(expectedText)
  const answerKeywords = new Set(extractKeywords(answerText))

  if (expectedKeywords.length === 0) {
    return 0
  }

  const matchedKeywords = expectedKeywords.filter((keyword) =>
    answerKeywords.has(keyword) || answerNormalized.includes(keyword)
  )

  return matchedKeywords.length / expectedKeywords.length
}

export function evaluateAnswer(answer, question) {
  const text = typeof answer === 'string' ? answer.trim() : ''

  if (!text) {
    return {
      result: 'incorrect',
      message: 'Parece que você não respondeu ainda.',
      explanation: 'Tente escrever sua resposta antes de enviar.',
      hint: 'Reflita sobre o que a pergunta pede e responda em uma frase completa.'
    }
  }

  if (!question || !question.expectedAnswer) {
    return {
      result: 'incorrect',
      message: 'Não foi possível validar essa resposta.',
      explanation: 'A pergunta ainda não possui uma resposta esperada definida.',
      hint: null
    }
  }

  const answerNormalized = normalizeText(text)
  const expectedNormalized = normalizeText(question.expectedAnswer)
  const coverage = getCoverage(text, question.expectedAnswer)

  const hasKeyIdeas =
    answerNormalized.length >= 20 && coverage >= 0.45

  const hasStrongMatch =
    coverage >= 0.6 ||
    answerNormalized.includes(expectedNormalized.slice(0, 40)) ||
    (answerNormalized.includes('porque') && coverage >= 0.4)

  if (hasStrongMatch || hasKeyIdeas) {
    return {
      result: 'correct',
      message: 'Na mosca! 🎯',
      explanation:
        'Sua resposta conversa com a ideia principal esperada e mostra entendimento do tema.',
      hint: null
    }
  }

  if (coverage >= 0.25 || answerNormalized.length >= 12) {
    return {
      result: 'almost',
      message: 'Tá perto, mas dá para melhorar.',
      explanation:
        'Você trouxe parte da ideia principal, mas ainda faltou reforçar alguns pontos importantes.',
      hint:
        'Tente incluir a ideia central da resposta esperada com mais clareza.'
    }
  }

  return {
    result: 'incorrect',
    message: 'Não é isso... tente dar uma olhadinha novamente!',
    explanation:
      'Sua resposta ainda não está alinhada com a ideia central esperada para essa pergunta.',
    hint:
      'Volte ao conteúdo da aula e tente responder com os conceitos principais da pergunta.'
  }
}
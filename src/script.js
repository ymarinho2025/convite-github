const btnNao = document.getElementById('btnNao')
const btnSim = document.getElementById('btnSim')
const telaPedido = document.getElementById('telaPedido')
const mensagemFinal = document.getElementById('mensagemFinal')
const audioPlayer = document.getElementById('audioPlayer')

function fogeBotao() {
  const largura = window.innerWidth
  const altura = window.innerHeight
  const maxX = largura - btnNao.offsetWidth - 50
  const maxY = altura - btnNao.offsetHeight - 50

  const posX = Math.floor(Math.random() * maxX)
  const posY = Math.floor(Math.random() * maxY)

  btnNao.style.position = "fixed"
  btnNao.style.left = posX + "px"
  btnNao.style.top = posY + "px"
}

btnNao.addEventListener('mouseover', fogeBotao)
btnNao.addEventListener('touchstart', (e) => {
  e.preventDefault()
  fogeBotao()
})

btnSim.addEventListener('click', () => {
  try { chuvaDeConfetes() } catch(e) {}

  telaPedido.style.display = 'none'
  mensagemFinal.classList.remove('hidden')

  audioPlayer.volume = 1
  try { audioPlayer.play() } catch(e) {}

setTimeout(() => {
  const link = "https://github.com/ymarinho2025"
  window.open(link, '_blank')
}, 5000)
})

document.body.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play().catch(() => {})
  }
}, { once: true })

function chuvaDeConfetes() {
  const duracao = 5000
  const fim = Date.now() + duracao
  const opcoes = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  function aleatorio(min, max) {
    return Math.random() * (max - min) + min
  }

  const intervalo = setInterval(() => {
    const tempoRestante = fim - Date.now()
    if (tempoRestante <= 0) return clearInterval(intervalo)

    const quantidade = 50 * (tempoRestante / duracao)

    confetti({ ...opcoes, particleCount: quantidade, origin: { x: aleatorio(0.1, 0.3), y: Math.random() - 0.2 } })
    confetti({ ...opcoes, particleCount: quantidade, origin: { x: aleatorio(0.7, 0.9), y: Math.random() - 0.2 } })
    confetti({ ...opcoes, particleCount: quantidade / 2, origin: { x: 0.5, y: -0.1 } })
  }, 250)
}

export const intiScroll = () => {
  const body = window.document.body
  const home = body.querySelector('#section-home')

  const scrollContainer = body.querySelector('.scroll-container') as HTMLElement

  let canSlick = false
  const innerH = window.innerHeight
  home?.addEventListener('scroll', () => {
    if (home.scrollTop > innerH - 1) {
      let timer = setTimeout(() => {
        canSlick = true
        clearTimeout(timer)
      }, 500)
    } else {
      canSlick = false
    }
  })
  let currentIndex = 0

  const slickWrapper = () => {
    if (canSlick) {
      scrollContainer.style.transform = `translateY(${
        currentIndex * -innerH
      }px)`
      scrollContainer.style.transition = `all 1s ease`
      canSlick = false
      let timer = setTimeout(() => {
        canSlick = true
        clearTimeout(timer)
      }, 1000)
    }
  }

  slickWrapper()

  window.addEventListener('wheel', (e) => {
    console.log(canSlick, e.deltaY)

    if (canSlick) {
      if (e.deltaY > 15) {
        if (currentIndex < 4) {
          currentIndex++
          slickWrapper()
        }
      }
      if (e.deltaY < -15) {
        if (currentIndex > 0) {
          currentIndex--
          slickWrapper()
        }
      }
    }
  })
}

// liquido('your_api_key') => create liquido instance
const liquidoInstance = liquido('your_api_key')

const getId = (prefix) => ((suffix) => suffix ? prefix + '__' + suffix : prefix)

const triggleBoxLoading = (boxId, close = true) => {
  const box = document.getElementById(boxId),
    loadingClassName = 'payment-box--loading'
  if (close) {
    box?.classList.remove(loadingClassName)
  } else {
    box?.classList.add(loadingClassName)
  }
}

const showErrMsg = (containerId, msg) => {
  const containerEl = document.getElementById(containerId),
    errEl = document.querySelector(`#${containerId} + .payment-box__item__error`)
  if (containerEl && errEl) {
    const errElClassName = 'payment-box__item__error--show',
      containerErrCLassName = 'payment-box__item__container--error'
    if (msg) {
      errEl.innerText = msg
      errEl.classList.add(errElClassName)
      containerEl.classList.add(containerErrCLassName)
    } else {
      errEl.innerText = ''
      errEl.classList.remove(errElClassName)
      containerEl.classList.remove(containerErrCLassName)
    }
  }
}

const triggleFocusStyle = (containerId, show = true) => {
  const container = document.getElementById(containerId)
  if (container) {
    const focusClassName = 'payment-box__item__container--focus'
    show ? container.classList.add(focusClassName) : container.classList.remove(focusClassName)
  }
}
(() => {
  const getElId = getId('example1'),
    style = {
      base: {
        fontSize: '18px',
        lineHeight: '30px',
        ':focus': {
          color: '#0068ff'
        }
      },
      invalid: {
        color: '#f54e4e !important'
      }
    }

  // liquidoInstance.elements(options) => create elements instance
  const elements = liquidoInstance.elements({
    country: 'MX',
    locale: 'en'
  })

  // elements.create(type, options) => create element
  const pan = elements.create('pan', { style, placeholder: 'Card number' }),
    panContainerId = getElId('pan')
  const expiration = elements.create('expiration', { style }),
    expirationContainerId = getElId('expiration')
  const cvv = elements.create('cvv', { style }),
    cvvContainerId = getElId('cvv')
  
  // element.addEventListener('ready', callback) => close loading
  let isPanReady = false,
    isExpirationReady = false,
    isCvvReady = false,
    closeLoading = () => {
      if (isPanReady && isExpirationReady && isCvvReady) triggleBoxLoading('example1')
    }
  pan.addEventListener('ready', () => {
    isPanReady = true
    closeLoading()
  })
  expiration.addEventListener('ready', () => {
    isExpirationReady = true
    closeLoading()
  })
  cvv.addEventListener('ready',  () => {
    isCvvReady = true
    closeLoading()
  })
  
  // element.mount(dom | selector) => mount element
  pan.mount(document.getElementById(panContainerId))
  expiration.mount(document.getElementById(expirationContainerId))
  cvv.mount(document.getElementById(cvvContainerId))

  // element.focus() => focus if click its label
  document.getElementById(getElId('label-pan')).addEventListener('click', () => {
    pan.focus()
  })
  document.getElementById(getElId('label-expiration')).addEventListener('click', () => {
    expiration.focus()
  })
  document.getElementById(getElId('label-cvv')).addEventListener('click', () => {
    cvv.focus()
  })

  // element.addEventListener('focus', callback) => add focus style
  pan.addEventListener('focus', (event) => {
    triggleFocusStyle(panContainerId)
    showErrMsg(panContainerId, event.error?.message)
  }) 
  expiration.addEventListener('focus', (event) => {
    triggleFocusStyle(expirationContainerId)
    showErrMsg(expirationContainerId, event.error?.message)
  }) 
  cvv.addEventListener('focus', (event) => {
    triggleFocusStyle(cvvContainerId)
    showErrMsg(cvvContainerId, event.error?.message)
  })

  // element.addEventListener('blur', callback) => remove focus style
  pan.addEventListener('blur', (event) => {
    triggleFocusStyle(panContainerId, false)
    showErrMsg(panContainerId, event.error?.message)
  }) 
  expiration.addEventListener('blur', (event) => {
    triggleFocusStyle(expirationContainerId, false)
    showErrMsg(expirationContainerId, event.error?.message)
  }) 
  cvv.addEventListener('blur', (event) => {
    triggleFocusStyle(cvvContainerId, false)
    showErrMsg(cvvContainerId, event.error?.message)
  })

  // element.addEventListener('change', callback) => show error message and check whether value is empty
  let isPanEmpty = true,
    isExpirationEmpty = true,
    isCvvEmpty = true
  pan.addEventListener('change', (event) => {
    isPanEmpty = event.empty
    showErrMsg(panContainerId, event.error?.message)
  })
  expiration.addEventListener('change', (event) => {
    isExpirationEmpty = event.empty
    showErrMsg(expirationContainerId, event.error?.message)
  })
  cvv.addEventListener('change', (event) => {
    isCvvEmpty = event.empty
    showErrMsg(cvvContainerId, event.error?.message)
  })

  // name
  const nameInput = document.getElementById(getElId('name-input')),
    nameContainerId = getElId('name')
  nameInput.addEventListener('focus', () => {
    triggleFocusStyle(nameContainerId)
    showErrMsg(nameContainerId, '')
  })
  nameInput.addEventListener('blur', () => {
    triggleFocusStyle(nameContainerId, false)
  })

  // email
  const  emailInput = document.getElementById(getElId('email-input')),
    emailContainerId = getElId('email')
  emailInput.addEventListener('focus', () => {
    triggleFocusStyle(emailContainerId)
    showErrMsg(emailContainerId, '')
  })
  emailInput.addEventListener('blur', () => {
    triggleFocusStyle(emailContainerId, false)
  })

  // Use liquidoInstance.createToken(element, cardData) to create token
  const btn = document.getElementById(getElId('btn'))
  btn.addEventListener('click', () => {
    const emptyText = 'Please enter'
      name = nameInput.value,
      email = emailInput.value
    if (isPanEmpty) showErrMsg(panContainerId, emptyText)
    if (isExpirationEmpty) showErrMsg(expirationContainerId, emptyText)
    if (isCvvEmpty) showErrMsg(cvvContainerId, emptyText)
    if (!name) showErrMsg(nameContainerId, emptyText)
    if (!email) showErrMsg(emailContainerId, emptyText)
    if (isPanEmpty || isExpirationEmpty || isCvvEmpty || !name || !email) return
    triggleBoxLoading('example1', false)
    liquidoInstance.createToken(pan, {
      name,
      email
    }).then((result) => {
      const msg = `cardId: ${result.data.cardId}`
      console.log(msg)
      alert(msg)
    }).catch((result) => {
      const error = `fail: ${result.error.message}`
      console.log(error)
      alert(error)
    }).finally(() => {
      triggleBoxLoading('example1')
    })
  })
})()
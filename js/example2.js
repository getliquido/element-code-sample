(() => {
  const getElId = getId('example2'),
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

  // elements.create(type, options) => create card element
  const card = elements.create('card', { style }),
    cardContainerId = getElId('card')

  // element.addEventListener('ready', callback) => close loading
  let isCardReady = false,
    closeLaoding = () => {
      if (isCardReady) triggleBoxLaoding('example2')
    }
  card.addEventListener('ready', () => {
    isCardReady = true
    closeLaoding()
  })

  // element.mount(dom | selector) => mount element
  card.mount(document.getElementById(cardContainerId))

  // element.focus() => focus if click its label
  document.getElementById(getElId('label-card')).addEventListener('click', () => {
    card.focus()
  })

  // element.addEventListener('focus', callback) => add focus style
  card.addEventListener('focus', (event) => {
    triggleFocusStyle(cardContainerId)
    showErrMsg(cardContainerId, event.error?.message)
  })

  // element.addEventListener('blur', callback) => remove focus style
  card.addEventListener('blur', (event) => {
    triggleFocusStyle(cardContainerId, false)
    showErrMsg(cardContainerId, event.error?.message)
  })

  // element.addEventListener('change', callback) => show error message and check whether value is empty
  let isCardEmpty = true
  card.addEventListener('change', (event) => {
    isCardEmpty = event.empty
    showErrMsg(cardContainerId, event.error?.message)
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
  const emailInput = document.getElementById(getElId('email-input')),
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
    if (isCardEmpty) showErrMsg(cardContainerId, emptyText)
    if (!name) showErrMsg(nameContainerId, emptyText)
    if (!email) showErrMsg(emailContainerId, emptyText)
    if (isCardEmpty || !name || !email) return
    triggleBoxLaoding('example2', true)
    liquidoInstance.createToken(card, {
      name,
      email
    }).then((result) => {
      console.log(result.data.cardId)
    }).catch((result) => {
      alert(result.error.message)
    }).finally(() => {
      triggleBoxLaoding('example1')
    })
  })
})()
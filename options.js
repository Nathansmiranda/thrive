window.onload = () => {
  var yt_enabled = false
  var insta_enabled = false
  var amazon_enabled = false
  var type = -1

  const yt_toggle = document.getElementById('yt_toggle')
  const insta_toggle = document.getElementById('insta_toggle')
  const amazon_toggle = document.getElementById('amazon_toggle')

  const popupContainer = document.getElementById('popupContainer')
  const closeButton = document.getElementById('closeButton')
  const checkButton = document.getElementById('checkButton')
  const textarea = document.getElementById('textInput')

  chrome.storage.sync.get(['yt_enabled']).then(result => {
    if (
      result['yt_enabled'] == true ||
      typeof result['yt_enabled'] === 'undefined'
    ) {
      yt_enabled = true
      yt_toggle.style.backgroundColor = '#13b373'
      yt_toggle.children[0].style.transform = 'translateX(18px)'
      console.log('init yt enabled')
    }
  })

  chrome.storage.sync.get(['insta_enabled']).then(result => {
    if (
      result['insta_enabled'] == true ||
      typeof result['insta_enabled'] === 'undefined'
    ) {
      insta_enabled = true
      insta_toggle.style.backgroundColor = '#13b373'
      insta_toggle.children[0].style.transform = 'translateX(18px)'
      console.log('init insta enabled')
    }
  })

  chrome.storage.sync.get(['amazon_enabled']).then(result => {
    if (
      result['amazon_enabled'] == true ||
      typeof result['amazon_enabled'] === 'undefined'
    ) {
      amazon_enabled = true
      amazon_toggle.style.backgroundColor = '#13b373'
      amazon_toggle.children[0].style.transform = 'translateX(18px)'
      console.log('init amazon enabled')
    }
  })

  yt_toggle.addEventListener('click', function () {
    if (!yt_enabled) {
      console.log('yt was not enabled, now enabling')

      yt_enabled = true
      chrome.storage.sync.set({ yt_enabled: true })
      chrome.runtime.sendMessage({ action: 'yt_enabled' })
      yt_toggle.style.backgroundColor = '#13b373'
      yt_toggle.children[0].style.transform = 'translateX(18px)'
    } else {
      console.log('yt was enabled, popup')

      popupContainer.style.display = 'block'
      textarea.focus()
      type = 0
      checkButton.addEventListener('click', check)
    }
  })

  insta_toggle.addEventListener('click', function () {
    if (!insta_enabled) {
      console.log('insta was not enabled, now enabling')
      insta_enabled = true
      chrome.storage.sync.set({ insta_enabled: true })
      chrome.runtime.sendMessage({ action: 'insta_enabled' })
      insta_toggle.style.backgroundColor = '#13b373'
      insta_toggle.children[0].style.transform = 'translateX(18px)'
    } else {
      console.log('insta was enabled, popup')

      popupContainer.style.display = 'block'
      textarea.focus()
      type = 1
      checkButton.addEventListener('click', check)
    }
  })

  amazon_toggle.addEventListener('click', function () {
    if (!amazon_enabled) {
      amazon_enabled = true
      chrome.storage.sync.set({ amazon_enabled: true })
      chrome.runtime.sendMessage({ action: 'amazon_enabled' })
      amazon_toggle.style.backgroundColor = '#13b373'
      amazon_toggle.children[0].style.transform = 'translateX(18px)'
    } else {
      popupContainer.style.display = 'block'
      textarea.focus()
      type = 2
      checkButton.addEventListener('click', check)
    }
  })

  closeButton.addEventListener('click', () => {
    popupContainer.style.display = 'none'
    textarea.value = ''
  })

  function check () {
    const predefinedText =
      'I have taken a deep breath and I choose to get feed recommendations'
    const userInput = textarea.value

    if (userInput == predefinedText) {
      {
        popupContainer.style.display = 'none'
        textarea.value = ''
        checkButton.removeEventListener('click', check)
        if (type == 0) {
          console.log('yt disabling')

          chrome.storage.sync.set({ yt_enabled: false })
          yt_enabled = false
          yt_toggle.style.backgroundColor = '#a2a2a2'
          yt_toggle.children[0].style.transform = 'none'

          chrome.runtime.sendMessage({ action: 'yt_disabled' })
        } else if (type == 1) {
          console.log('insta disabling')

          chrome.storage.sync.set({ insta_enabled: false })
          insta_enabled = false
          insta_toggle.style.backgroundColor = '#a2a2a2'
          insta_toggle.children[0].style.transform = 'none'

          chrome.runtime.sendMessage({ action: 'insta_disabled' })
        } else if (type == 2) {
          chrome.storage.sync.set({ amazon_enabled: false })
          amazon_enabled = false
          amazon_toggle.style.backgroundColor = '#a2a2a2'
          amazon_toggle.children[0].style.transform = 'none'

          chrome.runtime.sendMessage({ action: 'amazon_disabled' })
        }
      }
    } else if (popupContainer.style.display != 'none') {
      textarea.value = 'Nope, try again'
      textarea.focus()
    }
  }
}

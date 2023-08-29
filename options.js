window.onload = () => {
  const yt_toggle = document.getElementById('yt_toggle')
  const insta_toggle = document.getElementById('insta_toggle')
  const amazon_toggle = document.getElementById('amazon_toggle')

  chrome.storage.sync.get(['yt_enabled']).then(result => {
    if (
      result['yt_enabled'] == true ||
      typeof result['yt_enabled'] === 'undefined'
    ) {
      yt_toggle.checked = true
    }
  })

  chrome.storage.sync.get(['insta_enabled']).then(result => {
    if (
      result['insta_enabled'] == true ||
      typeof result['insta_enabled'] === 'undefined'
    ) {
      insta_toggle.checked = true
    }
  })

  chrome.storage.sync.get(['amazon_enabled']).then(result => {
    if (
      result['amazon_enabled'] == true ||
      typeof result['amazon_enabled'] === 'undefined'
    ) {
      amazon_toggle.checked = true
    }
  })

  yt_toggle.addEventListener('change', function () {
    if (this.checked) {
      chrome.storage.sync.set({ yt_enabled: true })
    } else {
      chrome.storage.sync.set({ yt_enabled: false })
    }
  })

  insta_toggle.addEventListener('change', function () {
    if (this.checked) {
      chrome.storage.sync.set({ insta_enabled: true })
    } else {
      chrome.storage.sync.set({ insta_enabled: false })
    }
  })

  amazon_toggle.addEventListener('change', function () {
    if (this.checked) {
      chrome.storage.sync.set({ amazon_enabled: true })
    } else {
      chrome.storage.sync.set({ amazon_enabled: false })
    }
  })
}

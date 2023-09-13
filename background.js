function getUrlType (url) {
  const urlPatterns = [
    'https://www.youtube.com/',
    'https://www.youtube.com/watch*',
    'https://www.youtube.com/*',
    'https://m.youtube.com/*',
    'https://www.instagram.com/',
    'https://www.amazon.*/',
    'https://www.amazon.*/ref=nav_logo',
    'https://www.amazon\\..*/s.*',
    'https://www.amazon.*/*'
  ]

  for (let i = 0; i < urlPatterns.length; i++) {
    const regex = new RegExp('^' + urlPatterns[i].replace('*', '.*') + '$')
    if (regex.test(url)) {
      console.log(i)
      return i
    }
  }
  //A different Url
  return -1
}

const contentScripts = [
  'YTHome.js',
  'YTWatch.js',
  'YT.js',
  '',
  '',
  '',
  '',
  '',
  ''
]

const styles = [
  'YoutubeStyles.css',
  'YoutubeStyles.css',
  'YoutubeStyles.css',
  'YoutubeMobile.css',
  'InstaStyles.css',
  'AmazonStyles.css',
  'AmazonStyles.css',
  'AmazonStyles.css',
  'AmazonStyles.css'
]

const specificStyles = [
  'YoutubeHomeStyles.css',
  'YoutubeWatchStyles.css',
  '',
  '',
  '',
  'AmazonHomeStyles.css',
  'AmazonHomeStyles.css',
  'AmazonBrowseStyles.css',
  'AmazonProductStyles.css'
]

async function injectScripts (urlType, tabId) {
  console.log(contentScripts[urlType])
  if (contentScripts[urlType] != '') {
    console.log('scripting')
    chrome.scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      files: [contentScripts[urlType]],
      injectImmediately: true
    })
  }

  await chrome.scripting.insertCSS({
    target: { tabId: tabId },
    files: [styles[urlType]]
  })

  if (specificStyles[urlType] != '') {
    console.log(specificStyles[urlType])

    await chrome.scripting.insertCSS({
      target: { tabId: tabId },
      files: [specificStyles[urlType]]
    })
  }
}

async function removeScripts (urlType, tabId) {
  console.log(contentScripts[urlType])
  if (contentScripts[urlType] != '') {
    console.log('removing scripts')
    /* chrome.scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      files: [contentScripts[urlType]],
      injectImmediately: true
    }) */
  }

  await chrome.scripting.removeCSS({
    target: { tabId: tabId },
    files: [styles[urlType]]
  })

  if (specificStyles[urlType] != '') {
    console.log(specificStyles[urlType])

    await chrome.scripting.removeCSS({
      target: { tabId: tabId },
      files: [specificStyles[urlType]]
    })
  }
}

//On Url Change
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    console.log(changeInfo.url)

    var urlType = getUrlType(changeInfo.url)
    console.log(urlType)

    if (urlType >= 0 && urlType <= 3) {
      chrome.storage.sync.get(['yt_enabled']).then(result => {
        if (
          result['yt_enabled'] == true ||
          typeof result['yt_enabled'] === 'undefined'
        ) {
          injectScripts(urlType, tabId)
        }
      })
    }

    if (urlType == 4) {
      chrome.storage.sync.get(['insta_enabled']).then(result => {
        if (
          result['insta_enabled'] == true ||
          typeof result['insta_enabled'] === 'undefined'
        ) {
          injectScripts(urlType, tabId)
        }
      })
    }

    if (urlType >= 5 && urlType <= 8) {
      chrome.storage.sync.get(['amazon_enabled']).then(result => {
        if (
          result['amazon_enabled'] == true ||
          typeof result['amazon_enabled'] === 'undefined'
        ) {
          injectScripts(urlType, tabId)
        }
      })
    }
  }
})

//On Reload
chrome.webNavigation.onCommitted.addListener(details => {
  if (['reload'].includes(details.transitionType)) {
    console.log(details.url)
    let tabId = details.tabId

    var urlType = getUrlType(details.url)
    console.log(urlType)

    if (urlType >= 0 && urlType <= 3) {
      chrome.storage.sync.get(['yt_enabled']).then(result => {
        if (
          result['yt_enabled'] == true ||
          typeof result['yt_enabled'] === 'undefined'
        ) {
          injectScripts(urlType, tabId)
        }
      })
    }

    if (urlType == 4) {
      chrome.storage.sync.get(['insta_enabled']).then(result => {
        if (
          result['insta_enabled'] == true ||
          typeof result['insta_enabled'] === 'undefined'
        ) {
          injectScripts(urlType, tabId)
        }
      })
    }

    if (urlType >= 5 && urlType <= 8) {
      chrome.storage.sync.get(['amazon_enabled']).then(result => {
        if (
          result['amazon_enabled'] == true ||
          typeof result['amazon_enabled'] === 'undefined'
        ) {
          injectScripts(urlType, tabId)
        }
      })
    }
  }
})

//On enabled or disabled in options
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(function (tab) {
      console.log(tab.url)
      const type = getUrlType(tab.url)

      if (type >= 0 && type <= 3) {
        if (message.action == 'yt_enabled') {
          injectScripts(type, tab.id)
        } else if (message.action == 'yt_disabled') {
          removeScripts(type, tab.id)
        }
      } else if (type == 4) {
        if (message.action == 'insta_enabled') {
          injectScripts(type, tab.id)
        } else if (message.action == 'insta_disabled') {
          removeScripts(type, tab.id)
        }
      } else if (type >= 5) {
        if (message.action == 'amazon_enabled') {
          injectScripts(type, tab.id)
        } else if (message.action == 'amazon_disabled') {
          removeScripts(type, tab.id)
        }
      }
    })
  })
})

var eFlag = false

var observer3 = new MutationObserver(function (mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      if (!eFlag) {
        console.log('exploring')
        const sections = document.getElementById('sections')
        if (sections) {
          const trending = document.querySelector('#endpoint[title="Trending"]')

          if (trending) {
            const explore = trending.parentElement.parentElement.parentElement
            explore.style.display = 'none'
            eFlag = true
          }
        }
      }
      if (eFlag) {
        if (observer3) {
          observer3.disconnect()
          observer3 = null
        }
        break
      }
    }
  }
})

observer3.observe(document, { childList: true, subtree: true })

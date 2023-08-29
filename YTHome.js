var eFlag = false
var iFlag = false

var observer1 = new MutationObserver(function (mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      if (!eFlag) {
        console.log('running')
        const sections = document.getElementById('sections')
        if (sections) {
          const menuButton = document.getElementById('guide-button')
          if (menuButton)
            if (menuButton.getAttribute('data-pressed') == null) {
              console.log('clicking')
              menuButton.click()
              menuButton.setAttribute('data-pressed', 'true')
            }
          const trending = document.querySelector('#endpoint[title="Trending"]')

          if (trending) {
            const explore = trending.parentElement.parentElement.parentElement
            explore.style.display = 'none'
            eFlag = true
          }
        }
      }

      /* if (!iFlag) {
        console.log('searching')
        const searchInput = document.querySelector('#search')
        if (searchInput) {
          searchInput.focus()
          console.log('focused')
          iFlag = true
        }
      } */
      if (eFlag /* && iFlag */) {
        observer1.disconnect()
        observer1 = null
        break
      }
    }
  }
})

observer1.observe(document, { childList: true, subtree: true })

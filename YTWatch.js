var vFlag = false
var eFlag = false

var observer2 = new MutationObserver(function (mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      console.log('Youtube Watch Script')

      if (!vFlag) {
        const moviePlayer = document.getElementById('movie_player')
        if (moviePlayer) {
          const videoContainer = moviePlayer.children[0]
          if (videoContainer) {
            const videoPlayer = videoContainer.children[0]
            if (videoPlayer) {
              // videoPlayer.style.borderRadius = '15px'

              /* videoPlayer.style.maxHeight =
                videoPlayer.offsetHeight
              videoPlayer.style.maxWidth =
                videoPlayer.offsetWidth  */
              /* videoPlayer.style.height = '576px'
              videoPlayer.style.width = '1024px'

              videoPlayer.style.maxHeight = '576px'
              videoPlayer.style.maxWidth = '1024px' */
              

              document.addEventListener('fullscreenchange', handleFullscreen)
              document.addEventListener('mozfullscreenchange', handleFullscreen)
              document.addEventListener(
                'webkitfullscreenchange',
                handleFullscreen
              )
              document.addEventListener('msfullscreenchange', handleFullscreen)

              vFlag = true
            }
          }
        }
      }

      if (!eFlag) {
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

      if (vFlag && eFlag) {
        observer2.disconnect()
        observer2 = null
        break
      }
    }
  }
})

observer2.observe(document, { childList: true, subtree: true })

/* const moviePlayer = document.getElementById('movie_player')
if (moviePlayer) {
  const videoContainer = moviePlayer.children[0]
  if (videoContainer) {
    const videoPlayer = videoContainer.children[0]
    if (videoPlayer) {
      var rect = videoPlayer.getBoundingClientRect()

      var top = rect.top + window.scrollY
      var left = rect.left + window.scrollX

      console.log(top)
    }
  }
} */

var isFullscreen = false

function handleFullscreen () {
  console.log('full screen')
  isFullscreen = !isFullscreen

  const moviePlayer = document.getElementById('movie_player')
  if (moviePlayer) {
    const videoContainer = moviePlayer.children[0]
    if (videoContainer) {
      const videoPlayer = videoContainer.children[0]
      if (videoPlayer) {
        // videoPlayer.classList.toggle('videoExpanded')
        if (isFullscreen) {
          /* let height = 576
          let width = 1024 */
          let height = videoPlayer.offsetHeight
          let width = videoPlayer.offsetWidth

          let top = (864 - height) / 2
          let left = (1536 - width) / 2

          videoPlayer.style.borderRadius = ''

          /* videoPlayer.style.height = '864px'
          videoPlayer.style.width = '1536px'

          videoPlayer.style.maxHeight = '864px'
          videoPlayer.style.maxWidth = '1536px' */

          /* videoPlayer.style.maxHeight = height.toString() + 'px'
          videoPlayer.style.maxWidth = width.toString() + 'px'

          videoContainer.style.marginTop = top.toString() + 'px'
          videoContainer.style.marginLeft = left.toString() + 'px'

          

          animateFullScreen(
            height,
            width,
            videoPlayer,
            top,
            left,
            videoContainer
          ) */
        } else {
          videoPlayer.style.borderRadius = '15px'
        }
      }
    }
  }
}

function animateFullScreen (
  height,
  width,
  videoPlayer,
  top,
  left,
  videoContainer
) {
  setTimeout(() => {
    if (width < 1536) {
      height += 18
      width += 32
      videoPlayer.style.maxHeight = height.toString() + 'px'
      videoPlayer.style.maxWidth = width.toString() + 'px'

      top = Math.max((864 - height) / 2, 0) //avoiding neg values
      left = Math.max((1536 - width) / 2, 0)

      console.log(height, 'height', width, 'width', top, 'top', left, 'left')

      videoContainer.style.marginTop = top.toString() + 'px'
      videoContainer.style.marginLeft = left.toString() + 'px'

      animateFullScreen(height, width, videoPlayer, top, left, videoContainer)
    }
  }, 5)
}


// TODO test support webp

function testWebP(callback) {
	let webP = new Image();
	webP.onload = webP.onerror = function () {
		let sup
		callback(webP.height == 2);
		webP.height == 2 ? sup = true : sup = false
		galleryTransform(sup)
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {

	} else {
		document.querySelector('html').classList.remove('_webp');
		document.querySelector('html').classList.add('_no-webp');
	}
});

// TODO header
// Burger-menu
const burgerMenuWrap = document.querySelector('.header__burger')
const navMenuLink = document.querySelectorAll('.nav-menu__link')
const contentDocument = document.querySelectorAll('.content._container')
const welcomeOverlay = document.querySelector('.welcome__overlay')

const burgerMenu = document.querySelector('.header__burger-menu')
const burgerMenuActive = document.querySelector('.header__burger-menu__active')
const headerNav = document.querySelector('.header-nav')
const sectionTitle = document.querySelector('.section-title')
const sectionSubTittle = document.querySelector('.section-subtittle')
const welcomeLink = document.querySelector('.welcome-link')

function getMenu(t) {
	if (burgerMenuActive.classList[1] !== 'active') {
		showBurgerMenu(t)
	} else {
		closeBurgerMenu(t)
	}
}

function showBurgerMenu(t) {
	setTimeout(() => {
		burgerMenuActive.classList.add('active')
	}, t);
	burgerMenu.classList.add('active')
	headerNav.classList.add('active')
	sectionTitle.classList.add('active')
	sectionSubTittle.classList.add('active')
	welcomeLink.classList.add('active')
	welcomeOverlay.classList.add('active')
	// lockBody.classList.add('_lock')

}
function removeMenu() {
	burgerMenu.classList.remove('active')
	headerNav.classList.remove('active')
	sectionTitle.classList.remove('active')
	sectionSubTittle.classList.remove('active')
	welcomeLink.classList.remove('active')
	burgerMenuActive.classList.remove('active')
	welcomeOverlay.classList.remove('active')
	// lockBody.classList.remove('_lock')
}
function closeBurgerMenu(t) {
	setTimeout(() => {
		removeMenu()
		setTimeout(() => {
			removeMenu()
			setTimeout(() => {
				removeMenu()

			}, t - 500);
		}, t - 500);
	}, t);

	burgerMenuActive.classList.remove('active')
	welcomeOverlay.classList.remove('active')
	lockBody.classList.remove('_lock')
}
for (let link of navMenuLink) {
	link.onclick = function () { closeBurgerMenu(0) }
}
welcomeOverlay.onclick = function () {
	getMenu(1000)
}
contentDocument.onclick = function () {
	getMenu(1000)
}
burgerMenuWrap.onclick = function () {
	getMenu(1000)
}

// TODO Section Welcome

let itemsWelcome = document.querySelectorAll('.welcome-carousel-item')
let sliderItemWelcome = document.querySelectorAll('.welcome-slider__item')
let currentItemWlcome = 0
let isEnabled = true

let countSlideWelcome = document.querySelector('.welcome-slider__counter-left')


sliderItemWelcome.forEach(slide => (slide.addEventListener('click', function () {
	if (isEnabled) {
		if (slide.value > currentItemWlcome) {
			hideItem('to-left')
			changeCurrentItem(slide.value)
			showItem('from-right')
		} else if (slide.value < currentItemWlcome) {
			hideItem('to-right')
			changeCurrentItem(slide.value)
			showItem('from-left')
		}
	}
})))

function changeCurrentItem(n) {
	for (let bullet of sliderItemWelcome) {
		bullet.classList.remove('active')
	}
	currentItemWlcome = (n + itemsWelcome.length) % itemsWelcome.length
	countSlideWelcome.textContent = `0${(currentItemWlcome + 1)}`
	sliderItemWelcome[currentItemWlcome].classList.add('active')
}

function hideItem(direction) {
	isEnabled = false
	itemsWelcome[currentItemWlcome].classList.add(direction)
	itemsWelcome[currentItemWlcome].addEventListener('animationend', function () {
		this.classList.remove('active', direction)
	})
}

function showItem(direction) {
	itemsWelcome[currentItemWlcome].classList.add('next', direction)
	itemsWelcome[currentItemWlcome].addEventListener('animationend', function () {
		this.classList.remove('next', direction)
		this.classList.add('active')
		isEnabled = true
	})
}

function previousItem(n) {
	hideItem('to-right')
	changeCurrentItem(n - 1)
	showItem('from-left')
}
function nextItem(n) {
	hideItem('to-left')
	changeCurrentItem(n + 1)
	showItem('from-right')
}

document.querySelector('.welcome-slider__arrows-left').addEventListener('click', function () {
	if (isEnabled) {
		previousItem(currentItemWlcome)
	}
})

document.querySelector('.welcome-slider__arrows-right').addEventListener('click', function () {
	if (isEnabled) {
		nextItem(currentItemWlcome)
	}
})

const swipedetect = (el) => {
	let surface = el
	let startX = 0
	let startY = 0
	let distX = 0
	let distY = 0

	let startTime = 0
	let elapsedTime = 0

	let threshold = 100
	let restraint = 100
	let allowedTime = 400

	surface.addEventListener('mousedown', function (e) {
		startX = e.pageX
		startY = e.pageY
		startTime = new Date().getTime()
		e.preventDefault()
	})

	surface.addEventListener('mouseup', function (e) {
		distX = e.pageX - startX
		distY = e.pageX - startY
		elapsedTime = new Date().getTime() - startTime
		if (elapsedTime <= allowedTime) {
			if (Math.abs(distX) > threshold && Math.abs(distY) > restraint) {
				if (distX > 0) {
					if (isEnabled) {
						previousItem(currentItemWlcome)
					}
				} else {
					if (isEnabled) {
						nextItem(currentItemWlcome)
					}
				}
			}
		}
		e.preventDefault()
	})
	surface.addEventListener('touchstart', function (e) {
		if (e.target.classList.contains('welcome-slider__arrows')) {
			if (e.target.classList.contains('welcome-slider__arrows-right')) {
				if (isEnabled) {
					previousItem(currentItemWlcome)
				}
			} else if (e.target.classList.contains('welcome-slider__arrows-right')) {
				if (isEnabled) {
					nextItem(currentItemWlcome)
				}
			}
		}
		let touchObj = e.changedTouches[0]
		startX = touchObj.pageX
		startY = touchObj.pageY
		startTime = new Date().getTime()
		e.preventDefault()
	})
	surface.addEventListener('touchmove', function (e) {
		e.preventDefault()
	})

	surface.addEventListener('touchend', function (e) {
		let touchObj = e.changedTouches[0]
		distX = touchObj.pageX - startX
		distY = touchObj.pageX - startY
		elapsedTime = new Date().getTime() - startTime
		if (elapsedTime <= allowedTime) {
			if (Math.abs(distX) > threshold && Math.abs(distY) > restraint) {
				if (distX > 0) {
					if (isEnabled) {
						previousItem(currentItemWlcome)
					}
				} else {
					if (isEnabled) {
						nextItem(currentItemWlcome)
					}
				}
			}
		}
		e.preventDefault()
	})
}
let el = document.querySelector('.welcome-carousel')
swipedetect(el)




// TODO Section Explore




const exploreSwipedetect = (el) => {
	let body = document.querySelector('body')
	let exploreImg2 = document.querySelector('.explore-img2')
	let exploreScroller = document.querySelector('.explore-slider')
	let surface = el
	let startX = 0
	let distX = 0
	let startNumberX = 460
	let endNumberX = 460
	let startLeft = 421
	let endLeft = 421
	surface.addEventListener('mousedown', getMovePucture)
	function getMovePucture(e) {
		startX = e.pageX
		body.addEventListener('mousemove', movePicture)
	}
	function movePicture(e) {
		distX = e.pageX - startX
		if (exploreImg2.clientWidth >= 19 && exploreImg2.clientWidth <= 736) {
			exploreImg2.style.width = `${startNumberX + distX}px`
			exploreScroller.style.left = `${startLeft + distX}px`
			e.preventDefault()
			endNumberX = startNumberX + distX
			endLeft = startLeft + distX
			if (endNumberX < 19) {
				endNumberX = 19
				endLeft = -19
				exploreImg2.style.width = `${endNumberX}px`
				exploreScroller.style.left = `${endLeft}px`
			}
			if (endNumberX > 736) {
				endNumberX = 736
				endLeft = 698
				exploreImg2.style.width = `${endNumberX}px`
				exploreScroller.style.left = `${endLeft}px`
			}
		}
	}
	function stopMovePicture(e) {
		body.removeEventListener('mousemove', movePicture)
		startNumberX = endNumberX
		startLeft = endLeft
	}
	body.addEventListener('mouseup', stopMovePicture)
}
let exploreSlider = document.querySelector('#explore-slider')
exploreSwipedetect(exploreSlider)




// TODO Section Video
// video-player



let videoProgress = document.querySelector('.video-progress');
function showMeVideo(videoSrc) {
	let volumeProgress = document.querySelector('.volume-progress');

	volumeProgress.addEventListener('input', function () {
		const value = this.value;
		this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
		localStorage.setItem('volume-progress', this.style.background)
		localStorage.setItem('volume-value', value)

		video.volume = value / 100
		if (!video.volume && !videoVolume.classList.contains('toggle')) {
			videoVolume.classList.add('toggle')
		} else if (video.volume && videoVolume.classList.contains('toggle')) {
			videoVolume.classList.remove('toggle')
			if (video.muted) video.muted = false
		}
	})



	let player = document.querySelector('.player')
	let video = videoSrc

	let videoPlayFrame = player.querySelector('#video-play-big')
	let videoPlay = player.querySelector('#video-play-mini')
	let videoVolume = player.querySelector('#video-volume')
	let videoFullscreen = player.querySelector('#video-fullscreen')
	let videoPanel = player.querySelector('.video-panel')
	let videoPanelProgress = player.querySelector('.video-panel__progress.-video')
	let volumePanelProgress = player.querySelector('.volume-progress.__audio')
	let videoInfoTop = player.querySelector('.video-info-top')
	let videoLow = player.querySelector('.video-info-left')
	let videoFast = player.querySelector('.video-info-right')
	let shiftFlag = false


	window.onkeydown = function (e) {
		e.preventDefault()
		if (e.keyCode === 32) {
			togglePlay()
		}
		if (e.keyCode === 77) {
			mutedVideo()
		}
		if (e.keyCode === 70) {
			showFullscreenMode()
		}
		if (e.keyCode === 16) {
			shiftFlag = true
		}
		if (e.keyCode === 190 && shiftFlag) {
			if (video.playbackRate !== 2) {
				video.playbackRate += 0.25
				videoInfoTop.textContent = `x${video.playbackRate}`
			}
			videoInfoTop.style.opacity = 1
			videoFast.style.opacity = 1
			setTimeout(() => {
				videoInfoTop.style.opacity = 0
				videoFast.style.opacity = 0
			}, 700);

		} else if (e.keyCode === 188 && shiftFlag) {
			if (video.playbackRate !== 0.25) {
				video.playbackRate -= 0.25
				videoInfoTop.textContent = `x${video.playbackRate}`
			}
			videoInfoTop.style.opacity = 1
			videoLow.style.opacity = 1
			setTimeout(() => {
				videoInfoTop.style.opacity = 0
				videoLow.style.opacity = 0
			}, 700);
		}
	}

	window.addEventListener('keyup', function (e) {
		if (e.keyCode === 16) {
			shiftFlag = false
			console.log(shiftFlag)
		}
	})
	function togglePlay() {
		const method = video.paused ? 'play' : 'pause'
		video[method]()
	}

	function handleRangeUpdate() {
		video.currentTime = this.value / 100 * video.duration
	}
	function handleProgress() {

		let percent = (video.currentTime / video.duration) * 100
		videoProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #c4c4c4 ${percent}%, #c4c4c4 100%)`
		if (percent <= 30) {
			videoProgress.value = percent - 0.5
		} else if (percent > 30 && percent <= 70) {
			videoProgress.value = percent
		} else if (percent > 70 && percent <= 90) {
			videoProgress.value = percent + 0.5
		} else {
			videoProgress.value = percent + 0.8
		}

	}
	function showFullscreenMode() {
		if (document.fullscreenEnabled) {

			videoFullscreen.classList.toggle('toggle')
			videoPanel.classList.toggle('fullscreen')
			videoPanelProgress.classList.toggle('fullscreen')
			volumePanelProgress.classList.toggle('fullscreen')
			video.classList.toggle('fullscreen')

			if (!document.fullscreenElement) {
				player.requestFullscreen()
			} else {
				document.exitFullscreen()
			}
		}

	}
	function mutedVideo() {
		videoVolume.classList.toggle('toggle')
		video.muted = video.muted ? false : true
	}
	function togglePlayOrStop() {
		videoPlayFrame.classList.toggle('toggle')
		videoPlay.classList.toggle('toggle')
		if (video.ended) {
			video.currentTime = 0
		}
	}
	video.addEventListener('click', togglePlay)
	videoPlayFrame.addEventListener('click', togglePlay)
	videoPlay.addEventListener('click', togglePlay)
	video.addEventListener('pause', togglePlayOrStop)
	video.addEventListener('play', togglePlayOrStop)
	videoVolume.addEventListener('click', mutedVideo)
	videoFullscreen.addEventListener('click', showFullscreenMode)

	video.addEventListener('timeupdate', handleProgress)

	function removeMousemoveRanges() {
		videoProgress.removeEventListener('mousemove', handleRangeUpdate)
		videoProgress.addEventListener('change', handleRangeUpdate)
	}
	function addMousemoveRanges() {
		videoProgress.addEventListener('mousemove', handleRangeUpdate)

	}
	videoProgress.addEventListener('mousedown', addMousemoveRanges)
	videoProgress.addEventListener('mouseup', removeMousemoveRanges)

	// Save settings

	if (localStorage.getItem('volume-progress')) {
		volumeProgress.style.background = localStorage.getItem('volume-progress')
		volumeProgress.value = localStorage.getItem('volume-value')
	}
}
let video = document.querySelector('.video-item.active')
showMeVideo(video)







// TODO Video-slider





let itemsVideo = document.querySelectorAll('.iframe-wrap')
let itemsVideoContainer = document.querySelector('.video-slider__videos')

let currentItemVideo = 0
let isEnabledVideo = true
let currentVideoContainer = -1485
itemsVideoContainer.style.left = `${currentVideoContainer}px`
let itemsVideoMain = document.querySelectorAll('.video-item')
let sliderItemVideoMain = document.querySelectorAll('.video-slider__item')
let currentItemVideoMain = 0
let isEnabledVideoMain = true

function normalizeProgressVideoTIme() {
	videoProgress.value = 0
	videoProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${0}%, #c4c4c4 ${0}%, #c4c4c4 100%)`
}
let videosIframe = window.parent.document.querySelectorAll('.video-iframe');

function reload_iframes() {
	for (let ifr of videosIframe) {
		ifr.contentWindow.location.reload(true)
	};
};
videosIframe.forEach(frame => (frame.addEventListener('click', reload_iframes)))
function swipeMainVideo(web) {
	let slide = web
	if (slide.value === 0) {
		video.pause()
		setTimeout(() => {
			video.src = 'assets/videos/video3.mp4'
			video.poster = 'assets/img/video/poster3.webp'
			setTimeout(() => {
				normalizeProgressVideoTIme()
			}, 0);

		}, 100);
	} else if (slide.value === 1) {
		video.pause()
		setTimeout(() => {
			video.src = 'assets/videos/video1.mp4'
			video.poster = 'assets/img/video/poster1.webp'
			setTimeout(() => {
				normalizeProgressVideoTIme()
			}, 0);
		}, 100);
	} else if (slide.value === 2) {
		video.pause()
		setTimeout(() => {
			video.src = 'assets/videos/video2.mp4'
			video.poster = 'assets/img/video/poster2.webp'
			setTimeout(() => {
				normalizeProgressVideoTIme()
			}, 0);
		}, 100);
	} else if (slide.value === 3) {
		video.pause()
		setTimeout(() => {
			video.src = 'assets/videos/video4.mp4'
			video.poster = 'assets/img/video/poster4.webp'
			setTimeout(() => {
				normalizeProgressVideoTIme()
			}, 0);
		}, 100);
	} else if (slide.value === 4) {
		video.pause()
		setTimeout(() => {
			video.src = 'assets/videos/video0.mp4'
			video.poster = 'assets/img/video/poster0.webp'
			setTimeout(() => {
				normalizeProgressVideoTIme()
			}, 0);
		}, 100);
	}
}
sliderItemVideoMain.forEach(slide => (slide.addEventListener('click', function () {
	if (isEnabledVideoMain) {
		if (slide.value === 0) {
			console.log(0)
			itemsVideoContainer.style.transition = 'all 0.2s'
			currentVideoContainer = -1485
			itemsVideoContainer.style.left = `${currentVideoContainer}px`
			video.pause()
			setTimeout(() => {
				video.src = 'assets/videos/video3.mp4'
				video.poster = 'assets/img/video/poster3.webp'
				setTimeout(() => {
					normalizeProgressVideoTIme()
				}, 0);
			}, 100);
		} else if (slide.value === 1) {
			console.log(1)

			itemsVideoContainer.style.transition = 'all 0.2s'
			currentVideoContainer = -1980
			itemsVideoContainer.style.left = `${currentVideoContainer}px`
			video.pause()
			setTimeout(() => {
				video.src = 'assets/videos/video1.mp4'
				video.poster = 'assets/img/video/poster1.webp'
				setTimeout(() => {
					normalizeProgressVideoTIme()
				}, 0);

			}, 100);
		} else if (slide.value === 2) {
			console.log(2)
			itemsVideoContainer.style.transition = 'all 0.2s'
			currentVideoContainer = -2475
			itemsVideoContainer.style.left = `${currentVideoContainer}px`
			video.pause()
			setTimeout(() => {
				video.src = 'assets/videos/video2.mp4'
				video.poster = 'assets/img/video/poster2.webp'
				setTimeout(() => {
					normalizeProgressVideoTIme()
				}, 0);

			}, 100);
		} else if (slide.value === 3) {
			console.log(3)
			itemsVideoContainer.style.transition = 'all 0.2s'
			currentVideoContainer = -2970
			itemsVideoContainer.style.left = `${currentVideoContainer}px`
			video.pause()
			setTimeout(() => {
				video.src = 'assets/videos/video4.mp4'
				video.poster = 'assets/img/video/poster4.webp'
				setTimeout(() => {
					normalizeProgressVideoTIme()
				}, 0);

			}, 100);
		} else if (slide.value === 4) {
			console.log(4)
			itemsVideoContainer.style.transition = 'all 0.2s'
			currentVideoContainer = -3465
			itemsVideoContainer.style.left = `${currentVideoContainer}px`
			video.pause()
			setTimeout(() => {
				video.src = 'assets/videos/video0.mp4'
				video.poster = 'assets/img/video/poster0.webp'
				setTimeout(() => {
					normalizeProgressVideoTIme()
				}, 0);
			}, 100);
		}


		if (slide.value > currentItemVideoMain) {
			console.log(1)

			hideItemVideoMain('to-left')
			changeCurrentItemVideoMain(slide.value)
			showItemVideoMain('from-right')
		} else if (slide.value < currentItemVideoMain) {
			hideItemVideoMain('to-right')
			changeCurrentItemVideoMain(slide.value)
			showItemVideoMain('from-left')
		}
	}
})))

function changeCurrentItemVideoMain(n) {
	for (let bullet of sliderItemVideoMain) {
		bullet.classList.remove('active')
	}
	currentItemVideoMain = (n + sliderItemVideoMain.length) % sliderItemVideoMain.length
	sliderItemVideoMain[currentItemVideoMain].classList.add('active')
}

function hideItemVideoMain(direction) {
	isEnabledVideoMain = false
	sliderItemVideoMain[currentItemVideoMain].classList.add(direction)
	sliderItemVideoMain[currentItemVideoMain].addEventListener('animationend', function () {
		this.classList.remove('active', direction)
	})
}

function showItemVideoMain(direction) {
	sliderItemVideoMain[currentItemVideoMain].classList.add('next', direction)
	sliderItemVideoMain[currentItemVideoMain].addEventListener('animationend', function () {
		this.classList.remove('next', direction)
		this.classList.add('active')
		isEnabledVideoMain = true
	})
}
function previousItemVideoMain(n) {
	hideItemVideoMain('to-right')
	changeCurrentItemVideoMain(n - 1)
	showItemVideoMain('from-left')
	swipeMainVideo(sliderItemVideoMain[currentItemVideoMain])

}
function nextItemVideoMain(n) {
	hideItemVideoMain('to-left')
	changeCurrentItemVideoMain(n + 1)
	showItemVideoMain('from-right')
	swipeMainVideo(sliderItemVideoMain[currentItemVideoMain])

}

document.querySelector('.video-slider__arrow-left').addEventListener('click', function () {
	if (isEnabledVideoMain) {
		if (currentVideoContainer === -990) {
			itemsVideoContainer.style.transition = 'none'
			currentVideoContainer = -3465
			itemsVideoContainer.style.left = `${currentVideoContainer}px`
			setTimeout(() => {
				itemsVideoContainer.style.transition = 'all 0.2s'
				itemsVideoContainer.style.left = `${currentVideoContainer + 495}px`
				currentVideoContainer += 495
			}, 0);
		} else {
			itemsVideoContainer.style.transition = 'all 0.2s'
			itemsVideoContainer.style.left = `${currentVideoContainer + 495}px`
			currentVideoContainer += 495
		}
		if (isEnabledVideoMain) {
			previousItemVideoMain(currentItemVideoMain)
		}
	}
})

document.querySelector('.video-slider__arrow-right').addEventListener('click', function () {
	if (isEnabledVideoMain) {
		if (currentVideoContainer === -3465) {
			itemsVideoContainer.style.transition = 'none'
			currentVideoContainer = -990
			itemsVideoContainer.style.left = `${currentVideoContainer}px`
			setTimeout(() => {
				itemsVideoContainer.style.transition = 'all 0.2s'
				itemsVideoContainer.style.left = `${currentVideoContainer - 495}px`
				currentVideoContainer -= 495
			}, 0);
		} else {
			itemsVideoContainer.style.transition = 'all 0.2s'
			itemsVideoContainer.style.left = `${currentVideoContainer - 495}px`
			currentVideoContainer -= 495
		}
		if (isEnabledVideoMain) {
			nextItemVideoMain(currentItemVideoMain)
		}
	}
})







// TODO Section Gallery









let galleryItems
let galleryTransform = function (sup) {
	const pictureInnerContainer = document.querySelector('.gallery_inner-items');
	let arrPictures
	if (sup === true) {
		arrPictures = [
			"./assets/img/gallery/galery1.webp",
			"./assets/img/gallery/galery2.webp",
			"./assets/img/gallery/galery3.webp",
			"./assets/img/gallery/galery4.webp",
			"./assets/img/gallery/galery5.webp",
			"./assets/img/gallery/galery6.webp",
			"./assets/img/gallery/galery7.webp",
			"./assets/img/gallery/galery8.webp",
			"./assets/img/gallery/galery9.webp",
			"./assets/img/gallery/galery10.webp",
			"./assets/img/gallery/galery11.webp",
			"./assets/img/gallery/galery12.webp",
			"./assets/img/gallery/galery13.webp",
			"./assets/img/gallery/galery14.webp",
			"./assets/img/gallery/galery15.webp"
		]
	} else {
		arrPictures = [
			"./assets/img/gallery/galery1.jpg",
			"./assets/img/gallery/galery2.jpg",
			"./assets/img/gallery/galery3.jpg",
			"./assets/img/gallery/galery4.jpg",
			"./assets/img/gallery/galery5.jpg",
			"./assets/img/gallery/galery6.jpg",
			"./assets/img/gallery/galery7.jpg",
			"./assets/img/gallery/galery8.jpg",
			"./assets/img/gallery/galery9.jpg",
			"./assets/img/gallery/galery10.jpg",
			"./assets/img/gallery/galery11.jpg",
			"./assets/img/gallery/galery12.jpg",
			"./assets/img/gallery/galery13.jpg",
			"./assets/img/gallery/galery14.jpg",
			"./assets/img/gallery/galery15.jpg"
		]
	}

	shuffle(arrPictures)
	function shuffle(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
	}
	(arrPictures), arrPictures.map((t => {
		const galleryItem = document.createElement("div");
		galleryItem.classList.add("gallery-item");
		const galleryImg = document.createElement("img");
		galleryImg.classList.add("gallery-img"), galleryImg.src = t, galleryImg.alt = "Gallery Picture",
			pictureInnerContainer.append(galleryItem), galleryItem.append(galleryImg), galleryImg.onload = function () {
				const imgHeight = this.naturalHeight;
				if (imgHeight >= 570) {
					galleryItem.classList.add("long")
				} else if (
					imgHeight >= 456 && imgHeight < 570) {
					galleryItem.classList.add("medium")
				} else if (imgHeight < 456) {
					galleryItem.classList.add("short")
				}
			}
	}));

	galleryItems = document.querySelectorAll('.gallery-item')
	getScroll()
}

function debounce(omg, wait = 30, immediate = true) {
	var timeout
	return function () {
		var context = this, args = arguments
		var later = function () {
			timeout = null
			if (!immediate) omg.apply(context, args)
		}
		var callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) omg.apply(context, args)
	}
}



function checkGalleryItem() {
	galleryItems.forEach(galleryItem => {

		const itemInAt = (window.pageYOffset + window.innerHeight) - galleryItem.offsetHeight / 2
		const imageBottom = (galleryItem.offsetTop + galleryItem.offsetHeight)
		const isHalfShown = itemInAt > galleryItem.offsetTop
		const isNotScrolledPast = (window.pageYOffset - 3450) < imageBottom
		if (isHalfShown && !isNotScrolledPast) {
			galleryItem.classList.add('active')
		} else {
			galleryItem.classList.remove('active')
		}
		if (window.pageYOffset > 6720) {
			galleryItem.classList.remove('active')
		}
	})
}

function getScroll() { window.addEventListener('scroll', debounce(checkGalleryItem)) }


// TODO Section Tickets



const ticketsBtn = document.querySelector('.tickets-btn')
const boockingTicketsContainer = document.querySelector('.boocking-tickets__container')
const boockingTicketsClose = document.querySelector('.boocking-tickets__close')
const overlay = document.querySelector('.overlay')
const popap = document.querySelector('.boocking-tickets__popap')
const lockBody = document.querySelector('body')

function showBookingTickets() {
	if (boockingTicketsContainer.classList[1] === 'active' && overlay.classList[1] === 'active') {
		boockingTicketsContainer.classList.remove('active')
		overlay.classList.remove('active')
		popap.classList.remove('open')
		lockBody.classList.remove('_lock')
	} else {
		boockingTicketsContainer.classList.add('active')
		overlay.classList.add('active')
		popap.classList.add('open')
		lockBody.classList.add('_lock')
	}
}
ticketsBtn.onclick = function () { showBookingTickets() }
boockingTicketsClose.onclick = function () { showBookingTickets() }
overlay.onclick = function () { showBookingTickets() }


// Calc Tickets



function getTickets() {
	// ?
	const ticketsType = document.querySelectorAll('.tickets-radio__input[name="ticketsType"]')
	const numberMinusBasic = document.querySelector('.number-minus.basic')
	const numberPlusBasic = document.querySelector('.number-plus.basic')
	const numberMinusSenior = document.querySelector('.number-minus.senior')
	const numberPlusSenior = document.querySelector('.number-plus.senior')

	const ticketsSumEvro = document.querySelector('.tickets-evro')
	const seniorTicket = document.getElementById('senior65')
	const basicTicket = document.getElementById('basic18')

	// ?
	let ticketsTypeForm = document.getElementById('formSelect')
	const numberMinusBasicForm = document.querySelector('.number-minus.basic-form')
	const numberPlusBasicForm = document.querySelector('.number-plus.basic-form')
	const numberMinusSeniorForm = document.querySelector('.number-minus.senior-form')
	const numberPlusSeniorForm = document.querySelector('.number-plus.senior-form')

	const ticketsSumEvroForm = document.getElementById('formTotal')
	const seniorTicketForm = document.getElementById('senior65Form')
	const basicTicketForm = document.getElementById('basic18Form')
	const formTime = document.getElementById('formTime')
	const formDate = document.getElementById('formDate')

	let formOverviewTicket = document.querySelector('.form-overview-ticket')
	let formOverviewTime = document.querySelector('.form-overview-time')
	let formOverviewDate = document.querySelector('.form-overview-date')
	let formOverviewBasicCount = document.querySelector('.form-overview-basic-count')
	let formOverviewBasicCalc = document.querySelector('.form-overview-basic-calc-1')
	let formOverviewSeniorCount = document.querySelector('.form-overview-senior-count')
	let formOverviewSeniorCalc = document.querySelector('.form-overview-senior-calc-2')
	let ticketTypeArchivForm = 20
	let saveForm = false
	// ?
	let ticketTypeArchiv = 20
	let save = false


	formTime.addEventListener('change', changeFormTime)
	function changeFormTime(formTime) {
		formOverviewTime.textContent = formTime.target.value
		localStorage.setItem('formOverviewTime', formTime.target.value)
	}

	formDate.addEventListener('change', changeFormDate)

	function changeFormDate(formDate) {
		let yearForm = formDate.target.value.slice(0, 4)
		let monthForm = formDate.target.value.slice(5, 7)
		if (monthForm[0] === '0') {
			monthForm = monthForm[1]
		}
		let dayForm = formDate.target.value.slice(8, 10)
		if (dayForm[0] === '0') {
			dayForm = dayForm[1]
		}
		let dateTime = new Date(yearForm, (monthForm - 1), dayForm);
		const options = {
			month: 'long',
			day: 'numeric',
			weekday: 'long',
		};

		formOverviewDate.textContent = dateTime.toLocaleString("en-US", options)
		localStorage.setItem('formOverviewDate', dateTime.toLocaleString("en-US", options))
	}

	ticketsType.forEach(ticketType => (ticketType.addEventListener('change', setTicketType)))
	numberMinusBasic.addEventListener('click', function () {
		if (basicTicket.value > 0) {
			basicTicketForm.value--
			basicTicket.value--

			localStorage.setItem('basicTickets', basicTicket.value)
		}
		calcTicketsSum(ticketTypeArchiv)
	})

	numberPlusBasic.addEventListener('click', function () {
		if (basicTicket.value < 20) {
			basicTicketForm.value++
			basicTicket.value++
			localStorage.setItem('basicTickets', basicTicket.value)
		}
		calcTicketsSum(ticketTypeArchiv)
	})
	numberMinusSenior.addEventListener('click', function () {
		if (seniorTicket.value > 0) {
			seniorTicketForm.value--
			seniorTicket.value--
			localStorage.setItem('seniorTickets', seniorTicket.value)
		}
		calcTicketsSum(ticketTypeArchiv)
	})

	numberPlusSenior.addEventListener('click', function () {
		if (seniorTicket.value < 20) {
			seniorTicketForm.value++
			seniorTicket.value++
			localStorage.setItem('seniorTickets', seniorTicket.value)
		}
		calcTicketsSum(ticketTypeArchiv)
	})

	function setTicketType(ticketType) {
		ticketTypeArchiv = ticketType.target.value
		calcTicketsSum(ticketTypeArchiv)
		localStorage.setItem('ticketTypeId', ticketType.target.id)
		formOverviewTicket.textContent = ticketType.target.getAttribute('nameforjs')
		for (let o = 0; o < ticketsTypeForm.length; o++) {
			if (ticketsTypeForm.options[o].getAttribute('name') === localStorage.getItem('ticketTypeId')) {
				ticketsTypeForm.options.selectedIndex = o
			}
		}
		localStorage.removeItem('ticketTypeIdForm')
	}








	if (localStorage.getItem('saveForm') || localStorage.getItem('save')) {
		ticketsSumEvroForm.textContent = localStorage.getItem('ticketsSumEvroForm')
		ticketTypeArchivForm = localStorage.getItem('ticketTypeArchivForm')
		basicTicketForm.value = localStorage.getItem('basicTickets')
		seniorTicketForm.value = localStorage.getItem('seniorTickets')
		basicTicketForm.textContent = localStorage.getItem('basicTickets')
		seniorTicketForm.textContent = localStorage.getItem('seniorTickets')

		ticketsSumEvro.textContent = localStorage.getItem('ticketsSumEvroForm')
		ticketTypeArchiv = localStorage.getItem('ticketTypeArchivForm')
		basicTicket.value = localStorage.getItem('basicTickets')
		seniorTicket.value = localStorage.getItem('seniorTickets')
		basicTicket.textContent = localStorage.getItem('basicTickets')
		seniorTicket.textContent = localStorage.getItem('seniorTickets')
		formOverviewBasicCalc.textContent = localStorage.getItem('formOverviewBasicCalc')
		formOverviewSeniorCalc.textContent = localStorage.getItem('formOverviewSeniorCalc')
		formOverviewBasicCount.textContent = localStorage.getItem('basicTickets')
		formOverviewSeniorCount.textContent = localStorage.getItem('seniorTickets')
		localStorage.getItem('formOverviewSeniorCalc')
		if (localStorage.getItem('formOverviewTime')) {
			formOverviewTime.textContent = localStorage.getItem('formOverviewTime')
		}
		if (localStorage.getItem('formOverviewDate')) {
			formOverviewDate.textContent = localStorage.getItem('formOverviewDate')
		}
		if (localStorage.getItem('ticketTypeId')) {
			for (let i of ticketsType) {
				if (i.id === localStorage.getItem('ticketTypeId')) {
					i.checked = true
					formOverviewTicket.textContent = i.getAttribute('nameforjs')
				}
			}
			for (let o = 0; o < ticketsTypeForm.length; o++) {
				if (ticketsTypeForm.options[o].getAttribute('name') === localStorage.getItem('ticketTypeId')) {
					ticketsTypeForm.options.selectedIndex = o
				}
			}
		} else if (localStorage.getItem('ticketTypeIdForm')) {
			for (let i of ticketsType) {
				if (i.value === localStorage.getItem('ticketTypeIdForm')) {
					console.log(i.value)
					i.checked = true
					formOverviewTicket.textContent = i.getAttribute('nameforjs')
				}
			}
			for (let o = 0; o < ticketsTypeForm.length; o++) {
				if (ticketsTypeForm.options[o].value === localStorage.getItem('ticketTypeIdForm')) {
					ticketsTypeForm.options.selectedIndex = o

				}
			}
		}

	} else {
		basicTicketForm.textContent = 1
		seniorTicketForm.textContent = 1
		seniorTicketForm.value = 1
		basicTicketForm.value = 1
		basicTicket.textContent = 1
		seniorTicket.textContent = 1
		seniorTicket.value = 1
		basicTicket.value = 1
		formOverviewBasicCount.textContent = 1
		formOverviewSeniorCount.textContent = 1
	}
	ticketsTypeForm.addEventListener('change', setTicketTypeForm)
	numberMinusBasicForm.addEventListener('click', function () {
		if (basicTicketForm.value > 0) {
			basicTicketForm.value--
			basicTicket.value--
			localStorage.setItem('basicTickets', basicTicket.value)
		}
		calcTicketsSumForm(ticketTypeArchivForm)
	})
	numberPlusBasicForm.addEventListener('click', function () {
		if (basicTicketForm.value < 20) {
			basicTicketForm.value++
			basicTicket.value++
			localStorage.setItem('basicTickets', basicTicket.value)
		}
		calcTicketsSumForm(ticketTypeArchivForm)
	})
	numberMinusSeniorForm.addEventListener('click', function () {
		if (seniorTicketForm.value > 0) {
			seniorTicketForm.value--
			seniorTicket.value--
			localStorage.setItem('seniorTickets', seniorTicket.value)
		}
		calcTicketsSumForm(ticketTypeArchivForm)

	})
	numberPlusSeniorForm.addEventListener('click', function () {
		if (seniorTicketForm.value < 20) {
			seniorTicketForm.value++
			seniorTicket.value++
			localStorage.setItem('seniorTickets', seniorTicket.value)
		}
		calcTicketsSumForm(ticketTypeArchivForm)
	})


	function setTicketTypeForm(ticketsTypeForm) {
		ticketTypeArchivForm = ticketsTypeForm.target.value
		localStorage.setItem('ticketTypeIdForm', ticketsTypeForm.target.value)
		calcTicketsSumForm(ticketTypeArchivForm)
		for (let i of ticketsType) {
			if (i.value === ticketsTypeForm.target.value) {
				i.checked = true
				formOverviewTicket.textContent = i.getAttribute('nameforjs')
			}
		}
		localStorage.removeItem('ticketTypeId')
	}








	function calcTicketsSumForm(ticketTypeArchivForm) {


		sumForm = ticketTypeArchivForm * basicTicketForm.value + ticketTypeArchivForm * (seniorTicketForm.value / 2)
		ticketsSumEvroForm.textContent = sumForm
		ticketsSumEvro.textContent = sumForm
		saveForm = true
		formOverviewBasicCount.textContent = basicTicket.value
		formOverviewBasicCalc.textContent = basicTicket.value * ticketTypeArchivForm
		formOverviewSeniorCount.textContent = seniorTicket.value
		formOverviewSeniorCalc.textContent = (seniorTicket.value * ticketTypeArchivForm) / 2

		localStorage.setItem('formOverviewBasicCalc', formOverviewBasicCalc.textContent)
		localStorage.setItem('formOverviewSeniorCalc', formOverviewSeniorCalc.textContent)
		localStorage.setItem('saveForm', saveForm)
		localStorage.setItem('ticketsSumEvroForm', ticketsSumEvroForm.textContent)
		localStorage.setItem('ticketTypeArchivForm', ticketTypeArchivForm)
		localStorage.setItem('seniorTicketsForm', seniorTicketForm.value)
		localStorage.setItem('seniorTicketsForm', seniorTicketForm.value)
		localStorage.setItem('basicTicketsForm', basicTicketForm.value)
		localStorage.setItem('basicTicketsForm', basicTicketForm.value)

	}







	function calcTicketsSum(ticketTypeArchiv) {
		sum = ticketTypeArchiv * basicTicket.value + ticketTypeArchiv * (seniorTicket.value / 2)
		ticketsSumEvro.textContent = sum
		ticketsSumEvroForm.textContent = sum

		save = true
		formOverviewBasicCount.textContent = basicTicket.value
		formOverviewBasicCalc.textContent = basicTicket.value * ticketTypeArchiv
		formOverviewSeniorCount.textContent = seniorTicket.value
		formOverviewSeniorCalc.textContent = (seniorTicket.value * ticketTypeArchiv) / 2

		localStorage.setItem('formOverviewBasicCalc', formOverviewBasicCalc.textContent)
		localStorage.setItem('formOverviewSeniorCalc', formOverviewSeniorCalc.textContent)
		localStorage.setItem('save', save)
		localStorage.setItem('ticketsSumEvro', ticketsSumEvro.textContent)
		localStorage.setItem('ticketTypeArchiv', ticketTypeArchiv)
		localStorage.setItem('ticketsSumEvroForm', ticketsSumEvroForm.textContent)
		localStorage.setItem('ticketTypeArchivForm', ticketTypeArchivForm)
		localStorage.setItem('seniorTicketsForm', seniorTicketForm.value)
		localStorage.setItem('seniorTicketsForm', seniorTicketForm.value)
		localStorage.setItem('basicTicketsForm', basicTicketForm.value)
		localStorage.setItem('basicTicketsForm', basicTicketForm.value)
	}
}
getTickets()


// Reload-video

// let iframeVideo = document.querySelectorAll('.video-iframe')

// for (let iframe of iframeVideo) {
// 	iframe.setAttribute('loading', 'lazy')
// }

// let buttonPay = document.querySelector('.form-payment-btn')



// buttonPay.addEventListener('mousedown', function (e) {
// 	console.log(e)
// 	let x = e.clientX
// 	let y = e.clientY
// 	let buttonTop = e.target.offsetTop
// 	let buttonLeft = e.target.offsetLeft
// 	let xInside = x - buttonLeft
// 	let yInside = y - buttonTop
// 	let circleEffect = document.createElement('div')
// 	circleEffect.classList.add('ripple')
// 	circleEffect.style.top = yInside + 'px'
// 	circleEffect.style.left = xInside + 'px'
// 	console.log(circleEffect)
// 	buttonPay.appendChild(circleEffect)

//Map
mapboxgl.accessToken = 'pk.eyJ1IjoiY29uc3RhbnRpbmV0dSIsImEiOiJja3VubGZ3ZWwxb2VtMnBydnd5Znp0NnJrIn0.S-omLoAjpdnjVeg6aRXpgg'
let map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/light-v10',
	zoom: 16,
	center: [2.3363, 48.86094],
})
map.addControl(new mapboxgl.NavigationControl())


const marker1 = new mapboxgl.Marker({
	color: "#232323",
	scale: 0.90,
}).setLngLat([2.336361, 48.860895])
	.addTo(map)
const marker2 = new mapboxgl.Marker({
	color: "#757575",
	scale: 0.90,
}).setLngLat([2.33321, 48.86016])
	.addTo(map)
const marker3 = new mapboxgl.Marker({
	color: "#757575",
	scale: 0.90,
}).setLngLat([2.33971, 48.86066])
	.addTo(map)
const marker4 = new mapboxgl.Marker({
	color: "#757575",
	scale: 0.90,
}).setLngLat([2.3329, 48.8619])
	.addTo(map)
const marker5 = new mapboxgl.Marker({
	color: "#757575",
	scale: 0.90,
}).setLngLat([2.33645, 48.86252])
	.addTo(map)
//
console.group('%cCross-check: Museum-DOM, ConstantineTU', 'color: red')
console.log('%cНе выполненные пункты: много пунктов не выполнено', 'color: green')
console.log(
	`Score ??? / 150

	Выполненные пункты:
	 С вашего позволения, прошу вас отложить проверку, если это возможно, я вас приятно удивлю`
)
console.log('	%cИтого ??? баллов из 160', 'color: green')

console.log('%cСпасибо за проверку и удачи в учёбе!', 'color: green')

console.groupEnd()




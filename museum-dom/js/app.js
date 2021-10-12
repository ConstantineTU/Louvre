
// test support webp

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

// Section Welcome

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
// Section Explore




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

// Section Video

let videoProgress = document.querySelector('.video-progress');
let volumeProgress = document.querySelector('.volume-progress');

videoProgress.addEventListener('input', function () {
	const value = this.value;
	this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
	localStorage.setItem('video-progress', this.style.background)
	localStorage.setItem('video-value', value)
})
volumeProgress.addEventListener('input', function () {
	const value = this.value;
	this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
	localStorage.setItem('volume-progress', this.style.background)
	localStorage.setItem('volume-value', value)
})

// Save settings
if (localStorage.getItem('video-progress')) {
	videoProgress.style.background = localStorage.getItem('video-progress')
	videoProgress.value = localStorage.getItem('video-value')
}
if (localStorage.getItem('volume-progress')) {
	volumeProgress.style.background = localStorage.getItem('volume-progress')
	volumeProgress.value = localStorage.getItem('volume-value')
}

// Section Gallery
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
// Button tickets

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
	const ticketsType = document.querySelectorAll('.tickets-radio__input[name="ticketsType"]')
	const numberMinusBasic = document.querySelector('.number-minus.basic')
	const numberPlusBasic = document.querySelector('.number-plus.basic')
	const numberMinusSenior = document.querySelector('.number-minus.senior')
	const numberPlusSenior = document.querySelector('.number-plus.senior')

	const ticketsSumEvro = document.querySelector('.tickets-evro')
	const seniorTicket = document.querySelector('#senior65')
	const basicTicket = document.querySelector('#basic18')
	let ticketTypeArchiv = 20
	let save = false
	if (localStorage.getItem('save')) {
		ticketsSumEvro.textContent = localStorage.getItem('ticketsSumEvro')
		ticketTypeArchiv = localStorage.getItem('ticketTypeArchiv')
		basicTicket.value = localStorage.getItem('basicTickets')
		seniorTicket.value = localStorage.getItem('seniorTickets')
		basicTicket.textContent = localStorage.getItem('basicTickets')
		seniorTicket.textContent = localStorage.getItem('seniorTickets')
		for (let i of ticketsType) {
			if (i.id === localStorage.getItem('ticketTypeId')) {
				i.checked = true
			}
		}
	}
	ticketsType.forEach(ticketType => (ticketType.addEventListener('change', setTicketType)))
	numberMinusBasic.addEventListener('click', function () {
		if (basicTicket.value > 0) basicTicket.value--
		localStorage.setItem('basicTickets', basicTicket.value)
		calcTicketsSum(ticketTypeArchiv)
	})
	numberPlusBasic.addEventListener('click', function () {
		if (basicTicket.value < 20) basicTicket.value++
		localStorage.setItem('basicTickets', basicTicket.value)
		calcTicketsSum(ticketTypeArchiv)
	})
	numberMinusSenior.addEventListener('click', function () {
		if (seniorTicket.value > 0) seniorTicket.value--
		localStorage.setItem('seniorTickets', seniorTicket.value)
		calcTicketsSum(ticketTypeArchiv)
	})
	numberPlusSenior.addEventListener('click', function () {
		if (seniorTicket.value < 20) seniorTicket.value++
		localStorage.setItem('seniorTickets', seniorTicket.value)
		calcTicketsSum(ticketTypeArchiv)
	})

	function setTicketType(ticketType) {
		ticketTypeArchiv = ticketType.target.value
		calcTicketsSum(ticketTypeArchiv)
		localStorage.setItem('ticketTypeId', ticketType.target.id)
	}
	function calcTicketsSum(ticketTypeArchiv) {


		sum = ticketTypeArchiv * basicTicket.value + ticketTypeArchiv * (seniorTicket.value / 2)
		ticketsSumEvro.textContent = sum
		save = true
		localStorage.setItem('save', save)
		localStorage.setItem('ticketsSumEvro', ticketsSumEvro.textContent)
		localStorage.setItem('ticketTypeArchiv', ticketTypeArchiv)



	}
}

getTickets()

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


// })

//
console.group('%cCross-check: Museum-adaptive, ConstantineTU', 'color: red')
console.log('%cНе выполненные пункты: все пункты выполнены', 'color: green')
console.log(
	`Score 150 / 150

	Выполненные пункты:
	 Вёрстка соответствует макету. Ширина экрана 1024px +40
			Блок header +4
			Секция Welcome +4
			Секция Visiting +4
			Секция Explore +4
			Секция Video +4
			Секция Gallery +4
			Секция Tickets +4
			Форма покупки билетов +4
			Секция Contacts +4
			Блок footer +4
	 Вёрстка соответствует макету. Ширина экрана 768px +40
			Блок header +4
			Секция Welcome +4
			Секция Visiting +4
			Секция Explore +4
			Секция Video +4
			Секция Gallery +4
			Секция Tickets +4
			Форма покупки билетов +4
			Секция Contacts +4
			Блок footer +4
	 Вёрстка соответствует макету. Ширина экрана 420px +40
			Блок header +4
			Секция Welcome +4
			Секция Visiting +4
			Секция Explore +4
			Секция Video +4
			Секция Gallery +4
			Секция Tickets +4
	 Форма покупки билетов +4
			Секция Contacts +4
			Блок footer +4
	 Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +6
	 Совмещается адаптивная и респонсивная (резиновая) вёрстка +14 При изменении ширины экрана плавно изменяются размеры:
			слайдера в секции Welcome +2
			слайдера сравнения изображений в секции Explore +2
			кастомного видеоплеера в секции Video +2
			слайдера в секции Video +2
			YouTube-видео в плейлисте в секции Video, маленькие видео выровнены по краям большого +2
			галереи изображений и изображений в ней +2
			карты +2
	 На ширине экрана 1024рх и меньше реализовано адаптивное меню +12
			при нажатии на бургер-иконку меню появляется, плавно выдвигаясь слева, бургер-иконка изменяется на крестик. При нажатии на крестик меню исчезает, плавно возвращаясь назад, иконка крестика превращается в бургер-иконку +2
			ссылки в меню работают, обеспечивая плавную прокрутку по якорям +2
			при клике по ссылке в адаптивном меню, или при клике по любому месту сайта, кроме самого адаптивного меню, меню закрывается +2
			вёрстка меню соответствует макету на всех проверяемых разрешениях +6
			
	 Оптимизация скорости загрузки страницы +8 https://developers.google.com/speed/pagespeed/insights/. Результат проверки скорости сайта для мобильных устройств:
			90 to 100 (green): Good - выполнено полностью +8`
)
console.log('	%cСкорость загрузки прошу проверить несколько раз, так как переодически он показывает странно низкие результаты', 'color: red')
console.log('	%cИтого 160 баллов из 160', 'color: green')

console.log('%cПрошу связаться со мной в дискорд https://discordapp.com/users/414360051101466624, если найдете ошибки', 'color: blue')
console.log('%cСпасибо за проверку и удачи в учёбе!', 'color: green')

console.groupEnd()




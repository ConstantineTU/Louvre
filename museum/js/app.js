

//Section Video
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
let galleryTransform = function () {
	const pictureInnerContainer = document.querySelector('.gallary_inner-items');
	const arrPictures = [
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
	shuffle(arrPictures)
	function shuffle(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
	}
	(arrPictures), arrPictures.map((t => {
		const gallaryItem = document.createElement("div");
		gallaryItem.classList.add("gallary-item");
		const galleryImg = document.createElement("img");
		galleryImg.classList.add("gallary-img"), galleryImg.src = t, galleryImg.alt = "Gallery Picture",
			pictureInnerContainer.append(gallaryItem), gallaryItem.append(galleryImg), galleryImg.onload = function () {
				//console.log(this.height)
				const imgHeight = this.height;
				imgHeight >= 570 ? gallaryItem.classList.add("long") :
					imgHeight >= 456 && imgHeight < 570 ? gallaryItem.classList.add("medium") :
						imgHeight < 456 && gallaryItem.classList.add("short")
			}
	}));
}
galleryTransform()

// Button

const ticketsBtn = document.querySelector('.tickets-btn')
const boockingTicketsContainer = document.querySelector('.boocking-tickets__container')
const boockingTicketsClose = document.querySelector('.boocking-tickets__close')
const overlay = document.querySelector('.overlay')


ticketsBtn.onclick = function () {
	if (boockingTicketsContainer.classList[1] === 'active') {
		boockingTicketsContainer.classList.remove('active')
		overlay.classList.remove('active')
	} else {
		boockingTicketsContainer.classList.add('active')
		overlay.classList.add('active')
	}
}
boockingTicketsClose.onclick = function () {
	boockingTicketsContainer.classList.remove('active')
	overlay.classList.remove('active')
}
overlay.onclick = function () {
	boockingTicketsContainer.classList.remove('active')
	overlay.classList.remove('active')
}




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
console.group('%cCross-check: Museum, ConstantineTU', 'color: red')
console.log(
	`Score 150 / 150

	 Вёрстка валидная + 10
			проверено валидатором https://validator.w3.org/ – "Document checking completed. No errors or warnings to show." +10
	 вёрстка семантическая + 24
			header, main, footer + 2
			семь элементов
			(по количеству секций) + 2
			только один заголовок h1 + 2
			семь заголовков h2(по количеству секций) + 2
			шесть заголовков h3(по количеству карточек) + 2
			два элемента nav(основная и вспомогательная панель навигации) + 2
			три списка ul - li - a(основная и вспомогательная панель навигации, ссылки на соцсети) + 2
			тринадцать кнопок button(четыре из них в секции Video, пять в секции Tickets, по две - стрелки слайдера и плейлиста) + 2
			три тега input type = "radio"(в секции Tickets) + 2
			два тега input type = "number"(в секции Tickets) + 2
			два тега input type = "range"(громкось и прогрес - бар видео) + 2
			для всех элементов img указан обязательный атрибут alt + 2
	 Вёрстка соответствует макету + 45
			блок header + 5
			секция Welcome + 5
			секция Visiting + 5
			секция Explore + 5
			секция Video + 5
			секция Gallery + 5
			секция Tickets + 5
			секция Contacts + 5
			блок footer + 5
	 Форма покупки билетов + 22
			форма плавно выдвигается слева при открытии и плавно возвращается назад при закрытии.В открытом состоянии под формой есть полупрозрачный overlay, который занимает весь экран.Форма и overlay прокручиваются вместе со страницей + 2
			форма открывается при клике по кнопке Buy Now в секции Tickets и закрывается кликом по иконке с крестиком в верхнем правом углу или кликом по overlay + 2
			при вёрстке формы используются следующие элементы: form, input type = "date", input type = "time", input type = "text", input type = "email", input type = "tel", input type = "number", select + 8
			вёрстка формы соответствует макету + 10
	 Требования к css + 18
			добавлен favicon + 2
			для построения сетки используются флексы или гриды + 2
			при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону + 2
			фоновый цвет каждого блока и секции тянется на всю ширину страницы + 2
			иконки добавлены в формате.svg.SVG может быть добавлен любым способом.Обращаем внимание на формат, а не на способ добавления + 2
			расстояние между буквами, там, где это требуется по макету, регулируется css - свойством letter - spacing + 2
			переключаются радиокнопки в блоке Tickets, одновременно может быть выбрана только одна кнопка + 2
			в блоке Contacts правильно указанны ссылки на почту mailto и на телефон tel + 2
			в футере добавлены ссылки на соцсети.Круглая граница вокруг иконок соцсетей выполнена при помощи css + 2
	 Интерактивность, реализуемая через css + 25 из 25
			плавная прокрутка по якорям + 5
			параллакс + 5
			при кликам по кнопке Discover the Louvre и карточкам секции Visiting не открываются полноэкранные панорамы Google
			Street View встроенные в страницы вашего сайта при помощи iframe 5
			изменение стиля интерактивных элементов при наведении и клике + 10
	 Интерактивность, реализуемая через js + 14
			можно передвигать ползунки громкости и прогресс - бар видео, при этом цвет шкалы до и после ползунка отличается и соответствует макету + 2
			кликами по кнопкам + и - в секции Tiskets можно менять количество билетов Basic и Senior от 0 до 20 + 2
			кнопке "Book" в форме покупки билетов добавлен ripple - эффект Демо 0
			при перезагрузке(обновлении) страницы картины в блоке Galery отображаются в рандомном порядке + 10
			Итого 158 баллов из 160`
)
console.groupEnd()




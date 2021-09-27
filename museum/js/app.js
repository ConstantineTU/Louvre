

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





let videoProgress = document.querySelectorAll('.video-progress');

for (let videoProgres of videoProgress) {

	videoProgres.addEventListener('input', function () {
		const value = this.value;
		this.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${value}%, #fff ${value}%, white 100%)`
	})
}





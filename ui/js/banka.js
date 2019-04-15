var modal = document.querySelector(".modal");
var adminModal = document.querySelector(".adminModal");
var trigger = document.querySelector(".clientOpenModel");
var admin = document.querySelector(".adminOpenModel");
var closeButton = document.querySelector(".close-button");
var closeToggle = document.querySelector(".close-toggle");
function toggleModal() {
    modal.classList.toggle("show-modal");
}
function adminToggle(){
	adminModal.classList.toggle("show-modal");
}
function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
    if(event.target===adminModal){
    	adminToggle();
    }
}
trigger.addEventListener("click", toggleModal);
admin.addEventListener("click", adminToggle);
closeButton.addEventListener("click", toggleModal);
closeToggle.addEventListener("click", adminToggle);
window.addEventListener("click", windowOnClick)


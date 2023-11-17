let dropUpMenu = document.getElementById("drop-up-account-menu");
const editProfileButton = document.getElementById('edit-profile-button'),
editProfileSection = document.querySelector('.wrapper'),
cancelButton = document.querySelector('.Btn.cancel');

function toggleDropUpMenu(){
    dropUpMenu.classList.toggle("open-menu");
}

editProfileSection.style.display = "none";

editProfileButton.addEventListener("click", () => {
  editProfileSection.style.display = "block";
});

cancelButton.addEventListener("click", () => {
  editProfileSection.style.display = "none";
});
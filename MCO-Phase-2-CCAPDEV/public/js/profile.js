document.addEventListener("DOMContentLoaded", function () {
  const editProfileButton = document.getElementById('edit-profile-button'),
        editProfileSection = document.querySelector('.wrapper'),
        cancelButton = document.querySelector('.Btn.cancel');

  editProfileSection.style.display = "none";

  console.log(editProfileSection);

  editProfileButton.addEventListener("click", () => {
    editProfileSection.style.display = "block";
  });

  cancelButton.addEventListener("click", () => {
    editProfileSection.style.display = "none";
  });

  // Function to update profile picture, account name, user fullname, and profile description
  function updateAccountInfo() {
    const firstNameInput = document.getElementById('fname').value;
    const lastNameInput = document.getElementById('lname').value;
    const aboutYouInput = document.querySelector('textarea').value;
    const profilePictureInput = document.querySelector('input[type="file"]');
    const accountName = document.getElementById('account-name');
    const userFullName = document.getElementById('user-fullname');
    const profileDescription = document.getElementById('profile-description');
    const profilePicture = document.getElementById('profile-pic-icon');
    const accountPicture = document.getElementById('profile-icon');

    // Update the account name, user fullname, and profile description
    const fullName = `${firstNameInput} ${lastNameInput}`;
    accountName.textContent = fullName;
    userFullName.textContent = fullName;
    profileDescription.textContent = aboutYouInput;

    // Update the profile picture if a file is selected
    if (profilePictureInput.files.length > 0) {
      const selectedFile = profilePictureInput.files[0];
      const objectURL = URL.createObjectURL(selectedFile);
      profilePicture.src = objectURL;
      accountPicture.src = objectURL;
    }

    // Close the edit profile section
    editProfileSection.style.display = "none";
  }

  // Attach the updateAccountInfo function to the form submission
  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    updateAccountInfo();
  });
});
let dropUpMenu = document.getElementById("drop-up-account-menu");

function toggleDropUpMenu() {
  dropUpMenu.classList.toggle("open-menu");
}

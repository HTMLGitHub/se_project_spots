// Import validation
import { enableValidation, settings, disableButton } from "../scripts/validation.js";
import Api from "../utils/Api.js";

// Import css styles
import "./index.css";

// Import images
import headerLogo from "../images/spots-logo.svg";
import avatarImage from "../images/avatar.jpg";
import editLogo from "../images/edit-logo.svg";
import addIcon from "../images/plus.svg";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "437bd0f5-ccc8-40cb-a8c1-ca46545fb57d",
    "Content-Type": "application/json",
  },
});

const modalButtons = document.querySelectorAll(".modal-button");
const closeButtons = document.querySelectorAll(".modal__close-btn");

const editModal = document.querySelector("#edit");
const editAvatarModal = document.querySelector("#edit-avatar");
const newPostModal = document.querySelector("#new-post");
const previewModal = document.querySelector("#preview");
const deleteModal = document.querySelector("#delete");

const cardSubmitButton = document.querySelector("#modal__button-post");
const avatarSubmitButton = document.querySelector("#modal__button-avatar");

const modalImage = previewModal.querySelector(".modal__preview-image");
const modalCaption = previewModal.querySelector(".modal__preview-caption");

const cardTemplate = document.querySelector("#card__template").content;
const cardList = document.querySelector("#cards__list-id");

const profileName = document.querySelector(".profile__name");
const profileVocation = document.querySelector(".profile__vocation");
const profileForm = document.forms["profile-form"];

const nameInput = profileForm.querySelector("#name");
const vocationInput = profileForm.querySelector("#description");

const newPostForm = document.forms["new-post-form"];

const linkInput = newPostForm.querySelector("#link");
const captionInput = newPostForm.querySelector("#caption");

const deletePostForm = deleteModal.querySelector(".modal__delete__form");
const submitAvatarForm = editAvatarModal.querySelector(".modal__avatar__form");

const avatarInput = submitAvatarForm.querySelector("#link");

const cancelButton = deletePostForm.querySelector(".modal__cancel-btn");

// Select the element images and set the src
const logoElement = document.querySelector(".header__logo");
logoElement.src = headerLogo;

const avatarElement = document.querySelector(".profile__image");
avatarElement.src = avatarImage;

const editElement = document.querySelector(".profile__edit-logo");
const editProfileElement = document.querySelector(".profile__avatar__edit-logo");
editElement.src = editLogo;
editProfileElement.src = editLogo;


const addElement = document.querySelector(".profile__new-post-button-logo");
addElement.src = addIcon;

// let variables

let selectedCard;
let selectedCardId;

// Function to handle closing the modal when Esc is pressed
function closeModalOnEsc(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      operatePopup(openModal);
    }
  }
}

// Universal function to open/close modals
function operatePopup(popup, action = "remove") {
  popup.classList[action]("modal_opened");

  if (action === "add") {
    // Add the keydown event listener to close on Esc key
    document.addEventListener("keydown", closeModalOnEsc);
  } else {
    // Remove the keydown event listener when the modal is closed
    document.removeEventListener("keydown", closeModalOnEsc);
  }
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId; 
  operatePopup(deleteModal, "add");
}

function handleDeletion(evt) {
  evt.preventDefault();

  const deltetionButton = evt.submitter;
  deltetionButton.textContent = "Deleting...";

  api.deleteCard(selectedCardId)
  .then(() => {
    selectedCard.remove();
    operatePopup(deleteModal);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    deltetionButton.textContent = "Delete";
  });
}

// Function to create a new card element
function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true).firstElementChild;
  const cardImage = cardElement.querySelector(".card__content-image");
  const cardCaption = cardElement.querySelector(".card__content-caption");
  const cardLikeButton = cardElement.querySelector(".card__content-like");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardCaption.textContent = data.name;

  if (data.isLiked) {
    cardLikeButton.classList.add("card__content-like_liked");
  }

  // Toggle like button state
  cardLikeButton.addEventListener("click", () => {
    const isLiked = cardLikeButton.classList.contains("card__content-like_liked");

    api.handleLikeStatus(data._id, isLiked)
    .then(() => {
      cardLikeButton.classList.toggle("card__content-like_liked");
    })
    .catch((error) => {
      console.error(error);
    });
  });

  // Open image modal when the card image is clicked
  cardImage.addEventListener("click", () => {
    openImageModal(cardImage.src, cardCaption.textContent);
  });

  // Delete the card on delete button click
  cardDeleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id);
  });

  return cardElement;
}

// Function to add card to the list
function addCardToList(element, method = "prepend") {
  const card = createCard(element);
  cardList[method](card);
}

function renderUserProfile({name, about, avatar}) {
  profileName.textContent = name;
  profileVocation.textContent = about;
  avatarElement.src = avatar;
}

function renderCards(cards) {
  cards.forEach((card) => {
    addCardToList(card, "append");
  });
}

// Render initial cards
function getAppData() {
  api
    .getAPIInfo()
    .then(([userProfile, cards]) => {
      renderUserProfile(userProfile);
      renderCards(cards);
    })
    .catch((error) => {
      console.error(error);
    });
}

// Function to open the image modal with specified content
function openImageModal(imgSrc, captionText) {
  modalImage.src = imgSrc;
  modalImage.alt = captionText;
  modalCaption.textContent = captionText;
  operatePopup(previewModal, "add");
}

// Function to fill the profile form with current profile values
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  vocationInput.value = profileVocation.textContent;
}

// Function to handle edit profile form submission
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;

  submitButton.textContent = "Saving...";

  // Get user inputs
  const updatedData ={
    name: nameInput.value,
    about: vocationInput.value,
  }

  // Call API to update user info
  api.editUserInfo(updatedData)
  .then((user) => {
    profileName.textContent = user.name;
    profileVocation.textContent = user.about;

    operatePopup(editModal);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    submitButton.textContent = "Save";
  });  
}

function handleNewAvatarFormSubmit(evt) 
{
  evt.preventDefault();

  const submitButton = evt.submitter;
  submitButton.textContent = "Saving...";

  // Call the API to update user Avatar
  api.editUserAvatar(avatarInput.value)
    .then((user) => {
      avatarElement.src = user.avatar;
      evt.target.reset();
      disableButton(avatarSubmitButton, settings);
      operatePopup(editAvatarModal);
    })
    .catch(console.error)
    .finally(()=>{
      submitButton.textContent = "Save";
    });    
}

// Function to handle new post form submission
function handleNewPostFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  submitButton.textContent = "Saving...";
  
  // Get user inputs
  const newCard = {
    isLiked: false,
    name: captionInput.value,
    link: linkInput.value,
  };

  // Call API to add new card
  api.addPost(newCard)
  .then((card) => {
    addCardToList(card);
    evt.target.reset(); // Clear the form inputs after submission
    operatePopup(newPostModal);
    disableButton(cardSubmitButton, settings);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(()=> {
    submitButton.textContent = "Save";
  }); 
}

// Event listeners for opening modals when buttons are clicked
modalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) {
      operatePopup(modal, "add");
      if (modalId === "edit") fillProfileForm();
    }
  });
});

// Event listeners for closing modals when close buttons are clicked
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    if (modal) operatePopup(modal);
  });
});

// Add event listener to close modal when clicking outside the modal content
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      operatePopup(modal);
    }
  });
});

// Event listeners for form submissions
profileForm.addEventListener("submit", handleEditProfileFormSubmit);
newPostForm.addEventListener("submit", handleNewPostFormSubmit);
submitAvatarForm.addEventListener("submit", handleNewAvatarFormSubmit);
deletePostForm.addEventListener("submit", handleDeletion);
cancelButton.addEventListener("click", () => {
  operatePopup(deleteModal);
});

    

// Initial rendering of cards
getAppData();

enableValidation(settings);

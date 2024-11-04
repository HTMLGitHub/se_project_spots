const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const modalButtons = document.querySelectorAll(".modal-button");
const newPostButton = document.querySelector(".profile__new-post-button");
const closeButtons = document.querySelectorAll(".modal__close-btn");

const editModal = document.querySelector("#edit");
const newPostModal = document.querySelector("#new-post");
const previewModal = document.querySelector("#preview");

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

// Universal function to open modals
function openPopup(popup) {
  popup.classList.add("modal_opened");
}

// Universal function to close modals
function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

// Function to create a new card element
function createCard(item) {
  const cardElement = cardTemplate.cloneNode(true).firstElementChild;
  const cardImage = cardElement.querySelector(".card__content-image");
  const cardCaption = cardElement.querySelector(".card__content-caption");
  const cardLikeButton = cardElement.querySelector(".card__content-like");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardCaption.textContent = item.name;

  // Toggle like button state
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__content-like_liked");
  });

  // Open image modal when the card image is clicked
  cardImage.addEventListener("click", () => {
    openImageModal(cardImage.src, cardCaption.textContent);
  });

  // Delete the card on delete button click
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

// Function to add card to the list
function addCardToList(element, method = "prepend") {
  const card = createCard(element);
  cardList[method](card);
}

// Render initial cards
function renderCards() {
  initialCards.forEach((element) => {
    addCardToList(element, "append");
  });
}

// Function to open the image modal with specified content
function openImageModal(imgSrc, captionText) {
  modalImage.src = imgSrc;
  modalImage.alt = captionText;
  modalCaption.textContent = captionText;
  openPopup(previewModal);
}

// Function to fill the profile form with current profile values
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  vocationInput.value = profileVocation.textContent;
}

// Function to handle edit profile form submission
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileVocation.textContent = vocationInput.value;
  closePopup(editModal);
}

// Function to handle new post form submission
function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: captionInput.value,
    link: linkInput.value,
  };
  addCardToList(newCard);
  evt.target.reset(); // Clear the form inputs after submission
  closePopup(newPostModal);
}

// Event listeners for opening modals when buttons are clicked
modalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) {
      openPopup(modal);
      if (modalId === "edit") fillProfileForm();
    }
  });
});

// Event listeners for closing modals when close buttons are clicked
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    if (modal) closePopup(modal);
  });
});

// Add event listener to close modal when clicking outside the modal content
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closePopup(modal);
    }
  });
});

// Event listeners for form submissions
profileForm.addEventListener("submit", handleEditProfileFormSubmit);
newPostForm.addEventListener("submit", handleNewPostFormSubmit);

// Initial rendering of cards
renderCards();

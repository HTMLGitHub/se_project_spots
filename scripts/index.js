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

const modalContainer = document.querySelector(".modal");

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
const profileTextName = document.querySelector("#name");
const profileTextVocation = document.querySelector("#description");

const newPostForm = document.forms["new-post-form"];

const linkInput = newPostForm.querySelector("#link");
const captionInput = newPostForm.querySelector("#caption");

function createCard(item) {
  const cardElement = document.createElement("div");
  cardElement.appendChild(cardTemplate.cloneNode(true));

  const cardImage = cardElement.querySelector(".card__content-image");
  const cardCaption = cardElement.querySelector(".card__content-caption");
  const cardLikeButton = cardElement.querySelector(".card__content-like");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardCaption.textContent = item.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__content-like_liked");
  });

  cardImage.addEventListener("click", () => {
    openImageModal(cardImage.src, cardCaption.textContent);
  });

  cardDeleteButton.addEventListener("click", () => {
    //Remove the card element
    cardElement.remove();
  });

  return cardElement;
}

function getCardElement(element) {
  const card = createCard(element);
  cardList.appendChild(card);
}

function renderCards() {
  // Render the cards
  initialCards.forEach((element) => {
    getCardElement(element);
  });
}

function openImageModal(imgSrc, captionText) {
  modalImage.src = imgSrc;
  modalImage.alt = captionText;
  modalCaption.textContent = captionText;

  previewModal.classList.add("modal_opened");
}

function showModal(button) {
  const modalId = button.getAttribute("data-modal");
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("modal_opened");

  if (modalId === "edit") editProfileModal();
}

function editProfileModal() {
  profileTextName.value = profileName.textContent;
  profileTextVocation.value = profileVocation.textContent;
}

function newPost() {
  const newCard = {
    name: captionInput.value,
    link: linkInput.value,
  };

  const newCardElement = createCard(newCard);
  cardList.prepend(newCardElement);
}

// Closing function ONLY for 'Submit' buttons
function closeModal() {
  document.querySelectorAll(".modal_opened").forEach(modal => {
    modal.classList.remove("modal_opened");
  });
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileVocation.textContent = vocationInput.value;

  closeModal();
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();

  newPost();

  closeModal();
}

modalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showModal(button);
  });
});

// If user clicks the 'X' in the upper right corner
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
  const modalId = button.getAttribute("data-close");
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("modal_opened");
  });
});

document.addEventListener("click", (evt) => {
  const openModal = document.querySelector(".modal_opened");

  if (openModal && evt.target.classList.contains("modal")) {
    openModal.classList.remove("modal_opened");
  }
});

profileForm.addEventListener("submit", handleEditProfileFormSubmit);

newPostForm.addEventListener("submit", handleNewPostFormSubmit);

renderCards();

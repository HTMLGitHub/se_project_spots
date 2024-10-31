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

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".modal__close-btn");
const cardTemplate = document.querySelector("#card__template").content;
const cardList = document.querySelector("#cards__list-id");
const profileName = document.querySelector(".profile__name");
const profileVocation = document.querySelector(".profile__vocation");

const profileForm = document.forms["profile-form"];

function createCard(item) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__content-image")

  cardImage.src = item.link;
  cardImage.alt = item.name;

  cardElement.querySelector(".card__content-caption").textContent = item.name;

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

function showModal() {
  modalContainer.classList.add("modal_opened");

  document.querySelector("#name").value = profileName.textContent;
  document.querySelector("#description").value = profileVocation.textContent;
}

function closeModal() {
  modalContainer.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = profileForm.querySelector("#name").value;
  const vocationInput = profileForm.querySelector("#description").value;

  document.querySelector(".profile__name").textContent = nameInput;
  document.querySelector(".profile__vocation").textContent = vocationInput;

  closeModal();
}

editButton.addEventListener("click", showModal);
closeButton.addEventListener("click", closeModal);
profileForm.addEventListener("submit", handleProfileFormSubmit);

renderCards();

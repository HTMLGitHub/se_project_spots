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

function getCardElement(element) {
  const cardTemplate = document.querySelector("#card__template").content;
  const cardList = document.querySelector("#cards__list-id");
  const card = cardTemplate.cloneNode(true);
  card.querySelector(".card__content-image").src = element.link;
  card.querySelector(".card__content-image").alt = element.name;
  card.querySelector(".card__content-caption").textContent = element.name;

  cardList.appendChild(card);
}

function getElement() {
  // Render the cards
  initialCards.forEach((element) => {
    getCardElement(element);
  });
}

let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".modal__close-btn");

function showModal() {
  let modalContainer = document.querySelector(".modal");
  modalContainer.classList.add("modal_opened");

  document.querySelector("#name").value = profileName;
  document.querySelector("#description").value = profileVocation;
}

function closeModal() {
  let modalContainer = document.querySelector(".modal");
  modalContainer.classList.remove("modal_opened");
}

let profileName = document.querySelector(".profile__name").textContent;
let profileVocation = document.querySelector(".profile__vocation").textContent;
let profileForm = document.querySelector(".modal__form");

function saveModal(evt) {
  evt.preventDefault();

  let nameInput = profileForm.querySelector("#name").value;
  let vocationInput = profileForm.querySelector("#description").value;

  document.querySelector(".profile__name").textContent = nameInput;
  document.querySelector(".profile__vocation").textContent = vocationInput;

  let modalContainer = document.querySelector(".modal");
  modalContainer.classList.remove("modal_opened");
}

editButton.addEventListener("click", showModal);
closeButton.addEventListener("click", closeModal);
profileForm.addEventListener("submit", saveModal);

getElement();

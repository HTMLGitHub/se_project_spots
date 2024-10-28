const initialCards =
[
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    alt: "Photo by Moritz Feldmann from pexels"
  },

  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    alt: "Photo by Ceiline from pexels"
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    alt: "Photo by Tubanur Dogan from pexels"
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    alt: "Photo by Maurice Laschet from pexels"
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    alt: "Photo by Van Anh Nguyen from pexels"
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    alt: "Photo by Moritz Feldmann from pexels"
  }
];

function createGallary() {
  const cardTemplate = document.querySelector("#card__template").content;
  const cardList = document.querySelector("#cards__list-id");

  // Render the cards
  initialCards.forEach(element => {
    const card = cardTemplate.cloneNode(true);

    card.querySelector(".card__content-image").src = element.link;
    card.querySelector(".card__content-image").alt = element.alt;
    card.querySelector(".card__content-caption").textContent = element.name;

    cardList.appendChild(card);
  })
}

let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".modal__close-btn");
let saveButton = document.querySelector(".modal__submit-btn");

function showModal() {
  let modalContainer = document.querySelector(".modal");
  modalContainer.classList.add("modal_opened");
}

function closeModal () {
  let modalContainer = document.querySelector(".modal");
  modalContainer.classList.remove("modal_opened");
}

function saveModal () {
  let modalContainer = document.querySelector(".modal");
  modalContainer.classList.remove("modal_opened");
}

editButton.addEventListener("click", showModal);
closeButton.addEventListener("click", closeModal)
saveButton.addEventListener("click", saveModal);

createGallary();

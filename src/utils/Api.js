export default class Api {
  #url;
  #headers;

  constructor({ baseUrl, headers }) {
    this.#url = baseUrl;
    this.#headers = headers;
  }

  async #request (endpoint, options={}) {
    const data = await fetch(`${this.#url}${endpoint}`, {
      headers: this.#headers,
      ...options,
    });

    return data.ok? data.json() : Promise.reject(`Error: ${data.status}`);
  }

  getAPIInfo() {
    return Promise.all([this.getUserProfile(), this.getCardsInfo()]);
  }

  getCardsInfo() {
    return this.#request(`/cards`);
  }

  getUserProfile() {
    return this.#request(`/users/me`);
  }

  editUserInfo({name, about}) {
    return this.#request(`/users/me`, {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  editUserAvatar(avatar) {
    return this.#request(`/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({avatar}),
    });
  }

  addPost({isLiked, name, link}) {
    return this.#request(`/cards`, {
      method: "POST",
      body: JSON.stringify({ isLiked, name, link }),
    });
  }

  deleteCard(id) {
    return this.#request(`/cards/${id}`, {
      method: "DELETE",
    });
  }

  handleLikeStatus(id, isLiked) {
    return this.#request(`/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
    });
  }   
}

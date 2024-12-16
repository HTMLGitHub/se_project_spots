export default class Api {
  #url;
  #headers;

  constructor({ baseUrl, headers }) {
    this.#url = baseUrl;
    this.#headers = headers;
  }

  getAPIInfo() {
    return Promise.all([this.getUserProfile(), this.getCardsInfo()]);
  }

  async getCardsInfo() {
    const res = await fetch(`${this.#url}/cards`, {
      headers: this.#headers,
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async getUserProfile() {
    const data = await fetch(`${this.#url}/users/me`, {
      headers: this.#headers,
    });
    if (data.ok) {
      return data.json();
    }
    return await Promise.reject(`Error: ${data.status}`);
  }

  async editUserInfo({name, about}) {
    const data = await fetch(`${this.#url}/users/me`, {
      method: "PATCH",
      headers: this.#headers,

      // Send the data in teh body as a JSON string
      body: JSON.stringify({
        name,
        about,
      }),
    });
    
    if (data.ok) {
      return data.json();
    }

    return await Promise.reject(`Error: ${data.status}`);
  }

  async editUserAvatar(avatar) {
    const image = await fetch(`${this.#url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.#headers,

      // Send the data in teh body as a JSON string
      body: JSON.stringify({
        avatar,
      }),
    });

    if(image.ok) {
      return image.json();
    }

    return await Promise.reject(`Error: ${image.status}`);
  }

  async addPost({isLiked, name, link}) {
    const data = await fetch(`${this.#url}/cards`, {
      method: "POST",
      headers: this.#headers,

      // Send the data in teh body as a JSON string
      body: JSON.stringify({
        isLiked,
        name,
        link,
      }),
    });

    if (data.ok) {
      return data.json();      
    }
    
    return await Promise.reject(`Error: ${data.status}`);
  }

  async deleteCard(id) {

    const data = await fetch(`${this.#url}/cards/${id}`, {
      method: "DELETE",
      headers: this.#headers,
    });

    if (data.ok) {
      return data.json();
    }

    return await Promise.reject(`Error: ${data.status}`);
  }

  async likeCard(id) {
    const data = await fetch(`${this.#url}/cards/${id}/likes`, {
      method: "PUT",
      headers: this.#headers,
    });

    if (data.ok) {
      return data.json();
    }

    return await Promise.reject(`Error: ${data.status}`);
  }

  async dislikeCard(id) {
    const data = await fetch(`${this.#url}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.#headers,
    });

    if (data.ok) {
      return data.json();
    }

    return await Promise.reject(`Error: ${data.status}`);
  }
}

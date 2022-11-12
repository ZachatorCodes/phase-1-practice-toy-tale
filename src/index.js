// ADD TOY BUTTON FUNCTIONALITY
let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// ORIGINAL FETCH
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(data => {
      const dataArray = [...data];
      dataArray.forEach(toy => createElement(toy));
    });
});

// ADDS EVENT LISTENER TO SUBMIT BUTTON
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("input.submit").addEventListener("click", e => {
    e.preventDefault();
    const formData = document.getElementsByClassName("input-text");
    const toyName = formData[0].value;
    const toyURL = formData[1].value;
    fetchPostToy(toyName, toyURL)
  })
});

// POSTS NEW DATA FROM FORM
function fetchPostToy(toyName, toyURL) {
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toyName,
      "image": toyURL,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(data => createElement(data))
}

// CREATE CARD ELEMENT
function createElement(toy) {
  const cardStorage = document.getElementById("toy-collection");
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  const h2 = document.createElement("h2");
  const img = document.createElement("img");
  const p = document.createElement("p");
  const button = document.createElement("button");
  for (const key in toy) {
    if (key === "name") {
      h2.textContent = toy[key];
    }
    else if (key === "image") {
      img.src = toy[key];
      img.classList.add("toy-avatar");
    }
    else if (key === "likes") {
      p.textContent = `${toy[key]} Likes`;
    }
    button.classList.add("like-btn");
    button.id = toy["id"];
    button.textContent = "Like ❤️";
  }
  cardDiv.appendChild(h2);
  cardDiv.appendChild(img);
  cardDiv.appendChild(p);
  cardDiv.appendChild(button);
  cardStorage.appendChild(cardDiv);
}
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

// Adds original data from JSON server after the DOM loads.
document.addEventListener("DOMContentLoaded", () => {
  const cardStorage = document.getElementById("toy-collection");
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(data => {
      for (const obj of data) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        const h2 = document.createElement("h2");
        const img = document.createElement("img");
        const p = document.createElement("p");
        const button = document.createElement("button");
        for (const key in obj) {
          if (key === "name") {
            h2.textContent = obj[key];
          }
          else if (key === "image") {
            img.src = obj[key];
            img.classList.add("toy-avatar");
          }
          else if (key === "likes") {
            p.textContent = `${obj[key]} Likes`;
          }
          button.classList.add("like-btn");
          button.id = obj["id"];
          button.textContent = "Like ❤️";
        }
        cardDiv.appendChild(h2);
        cardDiv.appendChild(img);
        cardDiv.appendChild(p);
        cardDiv.appendChild(button);
        cardStorage.appendChild(cardDiv);
      }
    });
});
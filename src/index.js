let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector('#toy-collection'); 
  const url = 'http://localhost:3000/toys';
  const addToyForm = document.querySelector('.add-toy-form');

  addToyForm.addEventListener('submit', (e) => handleFormSubmit(e))

  function handleFormSubmit(e) {
    e.preventDefault()
    let toy = {
    name: e.target.name.value, 
    image: e.target.image.value,
    likes: 0
    }
    postToy(toy)
 }

  const fetchToys = () => {
    fetch(url)
   .then (resp => resp.json())
   .then (toys => toys.forEach(toy => createToy(toy)))
 }
 fetchToys()

 const postToy = (toy) => {
   fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toy)
  })
    .then (resp => resp.json())
    .then (toy => createToy(toy))
}


function updateLikes(toy){
  toy.likes++
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toy)
  })
  .then (res => res.json())
  .then (updatedToy => {
    let oldToy = document.getElementById(toy.id)
    let div = document.createElement('div')
    div.className = 'card'
    div.id = toy.id
    let btn = document.createElement('button')
    btn.className = 'like-btn'
    btn.innerText = 'Like'
    oldToy.innerHTML = 
    `
    <h2>${updatedToy.name}</h2>
    <img src=${updatedToy.image} class="toy-avatar" />
    <p>${updatedToy.likes}</p>
    `
    div.appendChild(btn)

    btn.addEventListener('click', ()=>updateLikes(toy))
  })
}
 

 const createToy = toy => {
  let div = document.createElement('div')
  div.className = 'card'
  div.id = toy.id
  
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.className = 'toy-avatar'
  img.src = toy.image

  let p = document.createElement('p')
  p.innerText = toy.likes

  let btn = document.createElement('button')
  btn.className = 'like-btn'
  btn.innerText = 'Like'

  toyCollection.appendChild(div)
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(btn)

  btn.addEventListener('click', ()=>updateLikes(toy))

}


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










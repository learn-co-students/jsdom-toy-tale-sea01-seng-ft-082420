let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyDiv = document.querySelector("#toy-collection")
  const newToyForm = document.querySelector(".add-toy-form")
  fetchToys()
  // createToys()
  function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => {
    data.forEach(toy => buildToys(toy))
  })
  }
  function createToys(toy){
    fetch("http://localhost:3000/toys",{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(toy => buildToys(toy))
  }
  function updateLikes(toy, e){
    fetch(`http://localhost:3000/toys/${toy.id}`)
    .then(resp => resp.json())
    .then(refreshedToy => {
    fetch(`http://localhost:3000/toys/${refreshedToy.id}`,{
      method:'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "likes": refreshedToy.likes + 1})
    })
    .then(res => res.json())
    .then(() => {
      // toyDiv.innerHTML = ''
      // fetchToys()
      console.log(e.target.parentElement.children[2])
      e.target.parentElement.children[2].textContent = `${refreshedToy.likes + 1} Likes`
    })
  })
  }
  function buildToys(toy){
    const div = document.createElement('div')
    div.className = "card"
    const h2 = document.createElement('h2')
    h2.textContent = toy.name
    const img = document.createElement('img')
    img.src = toy.image
    img.className = "toy-avatar"
    const p = document.createElement('p')
    p.textContent =`${toy.likes} Likes`
    const btn = document.createElement('button')
    btn.className = "like-btn"
    btn.innerText = "Like"
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(btn)
    toyDiv.appendChild(div)
    btn.addEventListener('click',(e) => updateLikes(toy,e))
  }
  newToyForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    console.log(e.target.name.value)
    const toyParams = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    createToys(toyParams)
    toyFormContainer.style.display = "none";
  })
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
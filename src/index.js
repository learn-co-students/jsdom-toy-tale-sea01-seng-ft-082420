let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  // Variable Assignment
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")
  const toyCollection = document.querySelector('#toy-collection')
  const toyForm = document.querySelector('.add-toy-form')
  const button = document.getElementsByClassName('like-btn')

  // Fetch Variables
  const toyUrl = 'http://localhost:3000/toys'
  const likeConfig = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'likes': 1
    })
  }

  // Call Fetch Functions
  fetchToys(toyUrl)

  // Fetch Functions
  function fetchToys(url) {
    fetch(url)
    .then(resp => resp.json())
    .then(toys => toys.forEach(toy => buildToyCard(toy)))
  }

  function submitToyForm(url, config) {
    fetch(url, config)
    .then(resp => resp.json())
    .then(toy => buildToyCard(toy))
  }

  function likeToy(id) {
    fetch(`http://localhost:3000/toys/${id}`, likeConfig)
  }

  // Stand-Alone Event Listeners
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }
  })

  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = {
      'name': e.target[0].value,
      'image': e.target[1].value,
      'likes': 0
    }

    const formConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    submitToyForm(toyUrl, formConfig)
  })

  // Build Functions
  const buildToyCard = (data) => {
    let div = document.createElement('div')
    let img = document.createElement('img')
    let h2 = document.createElement('h2')
    let p = document.createElement('p')
    let button = document.createElement('button')

    div.className = 'card'
    img.className = 'toy-avatar'
    button.className = 'like-btn'

    img.src = data.image
    h2.innerText = data.name
    p.innerHTML = `${data.likes} likes`
    button.innerText = 'Like <3'

    
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)
    toyCollection.appendChild(div)
  }



})

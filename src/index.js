let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  // const toyContainer = document.querySelector("toy-collection");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys()


})

function likes(toy) {
  let likeNum = ++toy.likes
  fetch('http://localhost:3000/toys/' + toy.id, {
    method: 'PATCH',
    headers : {
      "Content-Type" : "application/json"
      ,
      Accept : "application/json"
    },
    body : JSON.stringify({ "likes": likeNum
    })
  })
  .then(res => res.json())
  .then(like_obj => {
    p = document.getElementById(toy.id + 'x')
    p.innerHTML = ("has " + toy.likes + " likes")
    
  })
}



function fetchToys() {
  fetch(" http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => addToys(toys))
}

function addToys(toys) {
  toys.forEach(toy => {
    let h2 = document.createElement('h2')
    h2.innerHTML = toy.name

    let img = document.createElement("img")
    img.src = toy.image
    img.setAttribute('class', 'toy-avatar')

    let p = document.createElement('p')
    p.innerHTML = ("has " + toy.likes + " likes")
    p.id = toy.id + 'x'

    let likebtn = document.createElement('button')
    likebtn.setAttribute('class', 'like-button')
    likebtn.id = toy.id
    likebtn.innerHTML = "Like <3"
    likebtn.addEventListener("click", (e) => {
      likes(toy)
      // toy.likes = ++toy.likes
      // p.innerHTML = ("has " + toy.likes + " likes")
    })
    let deletebtn = document.createElement("button")
    deletebtn.setAttribute('class', 'like-button')
    deletebtn.innerHTML = "delete"
    deletebtn.addEventListener("click", (e) => {
      deleteToy(toy)
    })

    let div = document.createElement('div')
    div.setAttribute('class', 'card')
    div.append(h2, img, p, likebtn, deletebtn)

    let toyContainer = document.querySelector("#toy-collection")
    toyContainer.append(div)
  });
  }

let toySumbit = document.querySelector(".add-toy-form")
console.log(toySumbit)
toySumbit.addEventListener("submit", function (e){
  // e.preventDefault()
  postToy(e.target)
})

function postToy(toy) {
  fetch('http://localhost:3000/toys', {
    method : "POST",
    headers : {
      "Content-Type" : "application/json",
      Accept : "application/json"
    },
    body: JSON.stringify({
      name : toy.name.value,
      image : toy.image.value,
      likes: 0
    })
  })
  .then (res => res.json())
  .then((toy_obj => {
    let array = []
    array.push(toy_obj)
    addToys(array)
  }))
}

function deleteToy(toy) {
  fetch('http://localhost:3000/toys/' + toy.id, {
    method: "DELETE"
  })
  .then(res => res.json)
  .then(gone_obj => {
    let toyContainer = document.querySelector("#toy-collection")
    toyContainer.innerHTML = ""
    fetchToys()
  })
}
let addToy = false;
let editToys = false;
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
    // h2.contentEditable = "true"

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

    let editbtn = document.createElement('button')
    editbtn.innerHTML = "edit"
    editbtn.addEventListener("click", (e) => {
      let div = document.getElementById(toy.id)
      console.log(div)
      div.innerHTML = 
      `
      <form class="edit-toy-form"   id = "${toy.id}h">
      <h3>Edit</h3>

      <input
        type="text"
        name="name"
        value=""
        placeholder="${toy.name}"
        class="input-text"
      />
      <br />
      <input
        type="text"
        name="image"
        value=""
        placeholder="${toy.image}"
        class="input-text"
      />
      <br />
      <input
        type="submit"
        name="submit"
        value="Submit Edit"
        class="submit"
      />
    </form>
      `
      patchToy(toy)
    })

    let div = document.createElement('div')
    div.id = toy.id
    div.setAttribute('class', 'card')
    div.append(h2, img, p, likebtn, deletebtn, editbtn)

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

function patchToy(toy) {
  let toyEdited = document.getElementById(toy.id + "h")
  toyEdited.addEventListener("submit", function (e){
      fetch('http://localhost:3000/toys/' + toy.id, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            Accept : "application/json" 
        },
        body : JSON.stringify({
          name : e.target.name.value,
          image : e.target.image.value,
          likes: 0
        }) 
      })
      .then(res => res.json())
      .then(json => console.log(json))
  })
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

// function editToy(toy) {
//   fetch('http://localhost:3000/toys/' + toy.id)
// }


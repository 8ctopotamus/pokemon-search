var form = document.querySelector('form')
var nameInput = document.getElementById('pokemon-name')
var resultsEl = document.getElementById('results')

function searchPokemon(event) {
  event.preventDefault()

  // get value out of input
  var pokemonName = nameInput.value.trim().toLowerCase()

  // fetch request to pokeAPI
  fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
    .then(function(response) {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 404) {
        alert(pokemonName + ' not found. Search again.')
        nameInput.value = ""
      }
    })
    .then(function(pokemon) {
      // create elements
      var cardDiv = document.createElement('div')
      var cardBody = document.createElement('div')
      var h2 = document.createElement('h2')
      var img = document.createElement('img')
      var abilitiesList = document.createElement('ul')
      var button = document.createElement('button')

      // modify elements
      cardDiv.classList.add('card')
      cardDiv.classList.add('mb-3')
      cardDiv.classList.add('col-md-4')
      cardBody.classList.add('card-body')
      h2.textContent = pokemon.name
      img.src = pokemon.sprites.front_default
      img.alt = pokemon.name
      img.classList.add('card-img-top')
      button.innerText = "X"
      button.classList.add('btn')
      button.classList.add('btn-danger')
      
      // abilities
      for (var i = 0; i < pokemon.abilities.length; i++) {
        var li = document.createElement('li')
        li.textContent = pokemon.abilities[i].ability.name
        abilitiesList.append(li)
      }
      
      // append to DOM
      cardBody.append(img)
      cardBody.append(h2)
      cardBody.append(abilitiesList)
      cardBody.append(button)
      cardDiv.append(cardBody)
      resultsEl.append(cardDiv)

      // reset input
      nameInput.value = ""
    })
}

form.addEventListener('submit', searchPokemon)
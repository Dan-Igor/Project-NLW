function populateUF(){
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then(res => res.json())
  .then(states => {
    for( const state of states){
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}`
    }
  })
}

populateUF()

function getCities(event){
  const citySelected = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")

  citySelected.innerHTML = ""

  const ufValue = event.target.value

  const indexState = event.target.selectedIndex

  stateInput.value = event.target.options[indexState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;


  fetch(url)
  .then(res => res.json())
  .then(cities => {
    for( const city of cities){
      citySelected.innerHTML += `<option value="${city.nome}">${city.nome}`
    }
  })
  citySelected.disabled = false
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

const Itemgrid = document.querySelectorAll(".items-grid li")

for(item of Itemgrid){
  item.addEventListener("click", handleSelectedItem)
}

let selectedItems = []
const collectedItems = document.querySelector("input[name=items]")

function handleSelectedItem(event){
  const itemLi = event.target

  //Usando o toggle para adicionar e retirar a classe selected
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  //verificar se há itens selecionados
  const alreadySelected = selectedItems.findIndex(item => {
    return item == itemId
  })

  //verificar se está selecionado
  if(alreadySelected >= 0){
    //tirar da seleção
    const filteredItems = selectedItems.filter(item => {
      return item != itemId
    })
    
    selectedItems = filteredItems
  }else{
    selectedItems.push(itemId)
  }

  //ATUALIZAR CAMPO ESCONDIDO
  collectedItems.value = selectedItems
}
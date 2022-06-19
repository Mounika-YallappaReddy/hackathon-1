function createCard(pokemon, ability, move, weight, pokeID) {
    const card = document.querySelector(".container");
    card.innerHTML += `
    <div class=" pokemon_conatiner ">
                <img class="pokemon_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokeID}.png" />
                <div class="pokemon_content">
                    <h1 class="pokemon_name">${pokemon}</h1>
                    <p class="pokemon_abilities"><b>Ability : </b> ${ability}</p>
                    <p class="pokemon_moves"><b>Move : </b>${move}</p>
                    <p class="pokemon_weight"><b>Weight : </b>${weight}</p>
                </div>
    </div>   `
}
function clearcontent() {
    document.querySelector(".container").innerHTML = "";
}
var k = 0;
function fromStart() {
    clearcontent();
    k = 0;
    getCardDeatils(k);
}
function nextPage() {
    clearcontent();
    k++;
    getCardDeatils(k);
    console.log(k);
}

function previousPage() {
    clearcontent();
    if (k <= 0) {
        getCardDeatils(0);
        console.log(0);
    }
    else {
        getCardDeatils(k--);
        console.log(k);
    }
}
async function getCardDeatils(p) {
    if (p >= 5) {
        fromStart();
    }
    var ability_names = "";
    var move_name = "";
    for (let i = 1; i <= 10; i++) {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${(p * 10) + i}/`);
        const pokemon = await data.json();
        for (let j = 0; j < pokemon.abilities.length; j++) {
            ability_names += `${pokemon.abilities[j].ability.name}` + " ";
            move_name += `${pokemon.moves[j].move.name}` + " ";
        }
        var weight = pokemon.weight;
        var pokeID = pokemon.id;
        createCard(pokemon.name, ability_names, move_name, weight, pokeID);
        ability_names = "";
        move_name = "";
    }
}
getCardDeatils();

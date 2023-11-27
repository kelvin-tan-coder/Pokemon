const searchButton = document.querySelector('#search');
const container = document.querySelector('#pokemon-container');
const statsBars = document.querySelector('#stats-bars');

searchButton.addEventListener('click', () => {
    const input = document.querySelector('#query').value.trim();
    
    if (input === '') {
        hidePokemonInfo();
        return;
    }

    fetchPokemon(input)
        .then(displayPokemon)
        .catch(handleError);
});

function fetchPokemon(pokemonName) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Pokemon not found');
            }
            return res.json();
        });
}

function displayPokemon(data) {
    const { sprites, name, id, types, abilities, stats } = data;

    const image = sprites.front_default;
    const type = types.map(a => a.type.name).join(', ');
    const primaryType = types[0].type.name; 
    const abilitiesList = abilities.map(a => a.ability.name).join(', ');

    updateStatBars(stats);

    document.querySelector('#pokemon-name').innerHTML = `Name: ${name}`;
    document.querySelector('#pokemon-id').innerHTML = `ID: ${id}`;
    document.querySelector('#pokemon-picture').src = image;
    document.querySelector('#type').innerHTML = `Type: ${type}`;
    document.querySelector('#abilities').innerHTML = `Abilities: ${abilitiesList}`;
    document.querySelector('#stats-bars').style.display = 'block';

    container.style.display = 'block';

    changeBackgroundColor(primaryType);
}

function updateStatBars(stats) {
    const statNames = ['hp', 'atk', 'def', 'sa', 'sd', 'spd'];
    const mstat = 255;
    const totalStats = stats.reduce((sum, stat) => sum + stat.base_stat, 0);

    statNames.forEach((statName, index) => {
        const statValue = stats[index].base_stat;
        const barElement = document.querySelector(`#${statName}-bar`);
        barElement.style.width = `${statValue / mstat * 100}%`;
    });
}

function handleError(error) {
    console.error(error.message);
    hidePokemonInfo();
}

function hidePokemonInfo() {
    // Resetting UI elements when no Pokemon is found
    document.querySelector('#pokemon-name').innerHTML = '';
    document.querySelector('#pokemon-id').innerHTML = '';
    document.querySelector('#pokemon-picture').src = '';
    document.querySelector('#type').innerHTML = '';
    document.querySelector('#abilities').innerHTML = '';
    document.querySelector('#stats-bars').style.display = 'none';

    container.style.display = 'none';
    statsBars.style.display = 'none';
}

function changeBackgroundColor(type) {
    const body = document.body;
    let bgColor;

    // Set background color based on the Pokémon type
    switch (type) {
        case 'normal':
            bgColor = '#A8A77A'; 
            break;
        case 'fire':
            bgColor = '#EE8130'; 
            break;
        case 'water':
            bgColor = '#6390F0'; 
            break;
        case 'electric':
            bgColor = '#F7D02C'; // Sky Blue
            break;
        case 'grass':
            bgColor = '#7AC74C'; // Pale Green
            break;
        case 'ice':
            bgColor = '#96D9D6'; // Pale Green
            break;
        case 'fighting':
            bgColor = '#C22E28'; // Pale Green
            break;
        case 'poison':
            bgColor = '#A33EA1'; // Pale Green
            break;
        case 'ground':
            bgColor = '#E2BF65'; // Pale Green
            break;
        case 'flying':
            bgColor = '#A98FF3'; // Pale Green
            break;
        case 'psychic':
            bgColor = '#F95587'; // Pale Green
            break;
        case 'bug':
            bgColor = '#A6B91A'; // Pale Green
            break;
        case 'rock':
            bgColor = '#B6A136'; // Pale Green
            break;
        case 'ghost':
            bgColor = '#735797'; // Pale Green
            break;
        case 'dragon':
            bgColor = '#6F35FC'; // Pale Green
            break;
        case 'dark':
            bgColor = '#705746'; 
            break;
        case 'steel':
            bgColor = '#B7B7CE'; 
            break;
        case 'fairy':
            bgColor = '#D685AD'; 
            break;    
        default:
            bgColor = '#f5f5f5'; // Default background color
    }

    body.style.backgroundColor = bgColor;
}

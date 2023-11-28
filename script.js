const searchButton = document.querySelector('#search');
const botwrapper = document.querySelector('#bot-wrapper');
const container = document.querySelector('#pokemon-container');
const statsBars = document.querySelector('#stats-bars');


searchButton.addEventListener('click', () => {
    const input = document.querySelector('#query').value.trim();
    
    if (input === '') {
        document.body.style.backgroundColor = '#f5f5f5';
        hidePokemonInfo();
        return;
    }

    fetchPokemon(input)
            .then((pokemonData) => {
                return Promise.all([pokemonData, fetchPokemonDescription(pokemonData.species.url)]);
            })
            .then(([pokemonData, descriptionData]) => {
                displayPokemon(pokemonData, descriptionData);
            })
            .catch(handleError);
    });

function fetchPokemonDescription(speciesUrl) {
    return fetch(speciesUrl)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Pokemon species data not found');
            }
            return res.json();
        });
}

function fetchPokemon(pokemonName) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Pokemon not found');


            }
            return res.json();

        })
        
}


function displayPokemon(pokemonData, descriptionData) {
    const { sprites, name, id, types, height, weight, abilities, stats } = pokemonData;
    const dreamWorldImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    const defaultImage = sprites.front_default;

    const image = sprites.other.dream_world.front_default ? dreamWorldImage : defaultImage;
    // const image = sprites.front_default;
    const camelCaseName = formatPokemonName(name);
    const formattedId = formatPokemonId(id);
    const type = types.map(a => a.type.name).join(', ');
    const primaryType = types[0].type.name; 
    const abilitiesList = abilities.map(a => a.ability.name).join(', ');
    const flavorText = descriptionData.flavor_text_entries.find(
        (entry) => entry.language.name === 'en'
    ).flavor_text;

    updateStatBars(stats);

    document.querySelector('#pokemon-name').innerHTML = `${camelCaseName}`;
    document.querySelector('#pokemon-id').innerHTML = `#${formattedId}`;
    document.querySelector('#pokemon-picture').src = image;
    document.querySelector('#type-label').innerHTML = `Type:`;
    document.querySelector('#type').innerHTML = `${type}`;
    document.querySelector('#height-label').innerHTML = `height:`;
    document.querySelector('#poke-height').innerHTML = `${height}m`;
    document.querySelector('#weight-label').innerHTML = `weight:`;
    document.querySelector('#poke-weight').innerHTML = `${weight}kg`;
    document.querySelector('#abilities-label').innerHTML = `Abilities:`;
    document.querySelector('#abilities').innerHTML = `${abilitiesList}`;
    document.querySelector('#stats-bars').style.display = 'block';
    document.querySelector('#pokemon-description').innerHTML = flavorText;

    container.style.display = 'block';
    botwrapper.style.display = 'block';
    statsBars.style.display = 'block';

    changeBackgroundColor(primaryType);
}


function formatPokemonName(name) {
    return name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('-');
}

function updateStatBars(stats) {
    const statNames = ['hp', 'atk', 'def', 'sa', 'sd', 'spd'];
    const mstat = 255;

    statNames.forEach((statName, index) => {
        const statValue = stats[index].base_stat;
        const barElement = document.querySelector(`#${statName}-bar`);
        barElement.style.width = `${statValue / mstat * 100}%`;
    });
}

function formatPokemonId(id) {
    const numDigits = id.toString().length;
    const zerosToAdd = 5 - numDigits;
    return '0'.repeat(zerosToAdd) + id;
}

function handleError(error) {
    console.error(error.message);
    hidePokemonInfo();
}

function hidePokemonInfo() {

    document.querySelector('#pokemon-name').innerHTML = '';
    document.querySelector('#pokemon-id').innerHTML = '';
    document.querySelector('#pokemon-picture').src = '';
    document.querySelector('#type').innerHTML = '';
    document.querySelector('#abilities').innerHTML = '';
    document.querySelector('#stats-bars').style.display = 'none';

    botwrapper.style.display = 'none';
    container.style.display = 'none';
    statsBars.style.display = 'none';
}

function changeBackgroundColor(type) {
    const body = document.body;
    let bgColor;

    
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
            bgColor = '#f5f5f5';
    }

    body.style.backgroundColor = bgColor;
}

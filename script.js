const searchButton = document.querySelector('#search')
const container = document.querySelector('#pokemon-container');
const statsBars = document.querySelector('#stats-bars');

searchButton.addEventListener('click', () => {
    const input = document.querySelector('#query').value.trim();
    if (input === '') {
        hidePokemonInfo();
        return;
    }

    fetch('https://pokeapi.co/api/v2/pokemon/' + input)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Pokemon not found');
            }
            return res.json()
        })
        .then((data) => {
            console.log(data);
            const image = data.sprites.front_default
            const name = data.name
            const id = data.id;
            const type = data.types.map(a => a.type.name).join(`, `)
            const abilities = data.abilities.map(a => a.ability.name).join(`, `)
            const hp = data.stats[0].base_stat
            const atk = data.stats[1].base_stat
            const def = data.stats[2].base_stat
            const sa = data.stats[3].base_stat
            const sd = data.stats[4].base_stat
            const spd = data.stats[5].base_stat
            const totalStats = hp + atk + def + sa + sd + spd;
        
            document.querySelector('#hp-bar').style.width = `${(hp / totalStats) * 100 + 20}%`;
            document.querySelector('#atk-bar').style.width = `${(atk / totalStats) * 100 + 20}%`;
            document.querySelector('#def-bar').style.width = `${(def / totalStats) * 100 + 20}%`;
            document.querySelector('#sa-bar').style.width = `${(sa / totalStats) * 100 + 20}%`;
            document.querySelector('#sd-bar').style.width = `${(sd / totalStats) * 100 + 20}%`;
            document.querySelector('#spd-bar').style.width = `${(spd / totalStats) * 100 + 20}%`;

            document.querySelector('#pokemon-name').innerHTML = `Name: ${name}`
            document.querySelector('#pokemon-id').innerHTML = `ID: ${id}`;
            document.querySelector('#pokemon-picture').src = image
            document.querySelector('#type').innerHTML = `Type: ${type}`
            document.querySelector('#abilities').innerHTML = `Abilities: ${abilities}`
            document.querySelector('#hp-stats').innerHTML = `HP: ${hp}`
            document.querySelector('#atk-stats').innerHTML = `Attack: ${atk}`
            document.querySelector('#def-stats').innerHTML = `Defense: ${def}`
            document.querySelector('#sa-stats').innerHTML = `Special Attack: ${sa}`
            document.querySelector('#sd-stats').innerHTML = `Special Defense: ${sd}`
            document.querySelector('#spd-stats').innerHTML = `Speed: ${spd}`
            document.querySelector('#stats-bars').style.display = 'block';
            
            container.style.display = 'block';
        })
        .catch(error => {
            console.error(error.message);
            hidePokemonInfo();
        });
})

function hidePokemonInfo() {
    document.querySelector('#pokemon-name').innerHTML = '';
    document.querySelector('#pokemon-id').innerHTML = '';
    document.querySelector('#pokemon-picture').src = '';
    document.querySelector('#type').innerHTML = '';
    document.querySelector('#abilities').innerHTML = '';
    document.querySelector('#hp-stats').innerHTML = '';
    document.querySelector('#atk-stats').innerHTML = '';
    document.querySelector('#def-stats').innerHTML = '';
    document.querySelector('#sa-stats').innerHTML = '';
    document.querySelector('#sd-stats').innerHTML = '';
    document.querySelector('#spd-stats').innerHTML = '';
    document.querySelector('#stats-bars').style.display = 'none';

    container.style.display = 'none';
    statsBars.style.display = 'none';
}
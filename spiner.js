const loadingSpinner = document.querySelector('#loading-spinner');

searchButton.addEventListener('click', async () => {
    try {
        showLoadingSpinner();
        const input = document.querySelector('#query').value.trim();
        if (input === '') {
            hideLoadingSpinner();
            document.body.style.backgroundColor = '#f5f5f5';
            hidePokemonInfo();
            return;
        }

        const [pokemonData, descriptionData] = await Promise.all([
            fetchPokemon(input),
            fetchPokemonDescription(pokemonData.species.url)
        ]);

        displayPokemon(pokemonData, descriptionData);
    } catch (error) {
        handleError(error);
    } finally {
        hideLoadingSpinner();
    }
});

function showLoadingSpinner() {
    loadingSpinner.style.display = 'block';
}

function hideLoadingSpinner() {
    loadingSpinner.style.display = 'none';
}

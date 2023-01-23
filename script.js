const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const search_btn = document.getElementById('search-btn');
const result = document.getElementById('res-box');
const sound = document.getElementById('sound');

search_btn.addEventListener('click', () => {
    const search = document.getElementById('inp-word').value;
    fetch(`${url}${search}`)
        .then((response => response.json()))
        .then(data => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                <h3>${search}</h3>
                <button onClick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].synonyms}</p>
                <p>${data[0].phonetics[1].text}</p>
            </div>
            <p class="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>
            <p class="word-example">${data[0].meanings[0].definitions[0].example}</p>`;
            console.log(data[0].meanings[0].definitions[0].definition);
            sound.setAttribute('src', `${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't find the word</h3>`;
        })
});

function playSound() {
    sound.play();
}
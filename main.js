// Selected whole form and added event listener to it
const form = document.querySelector('.base-price-form');
form.addEventListener('submit',Calculate);

// lista ol, gdzie są widoczne wyniki działania
let resultList = document.querySelector('.result-list');

// Sprawdzamy czy w pamięci lokalnej istnieje obiekt 'results', jeżeli tak to do zmiennej results przypisujemy obiekt, jeżeli nie to przypisujemy pustą tablicę
let results = JSON.parse(localStorage.getItem('results')) ? JSON.parse(localStorage.getItem('results')) : [] ;

// Wywołanie funkcji tworzącej elementy listy, aby były widoczne po załadowaniu strony
createElements();

// Obliczenia
function Calculate(event) {
    event.preventDefault();

    const capacity = document.querySelector('#capacity').value;
    const price = document.querySelector('#price').value;

    let result = (price / capacity) * 100;
    
    // Szybka walidacja czy pola formularza nie są puste
    let validationErrors = 0;
    if (capacity.trim() === '') {
        validationErrors += 1;
    }   else if (price.trim() === '') {
        validationErrors += 1;
    };
    
    // Jeżeli nie ma błędów związanych z walidacją: 
    if (validationErrors === 0) {
        // Wynik działania idzie do tablicy
        results.push(result);
        // Przerabiamy tablicę z wynikami na obiekt JSON, który umieszczamy w pamięci lokalnej
        localStorage.setItem('results',JSON.stringify(results));
        // Wywołanie funkcji tworzącej elementy
        createElements();
        // Wyczyszczenie pól formularza
        document.querySelector('#capacity').value = '';
        document.querySelector('#price').value = '';
    };
};

function createElements() {

    resultList.innerHTML = '';

    for (let i = 0; i < results.length; i++) {
        let newListItem = document.createElement('li');
        // Wartość w list-itemach to wartość n-tego elementu tablicy z wynikami zaokrąglona do 2 miejsc po przecinku
        let listItemContent = document.createTextNode(parseFloat(results[i]).toFixed(2));
        let listItemClass = document.createAttribute('class');
        listItemClass.value = 'list-item';
        newListItem.setAttribute('class','list-item');

        newListItem.appendChild(listItemContent);
        resultList.appendChild(newListItem);
    };

};
    
document.querySelector('.clear-btn').addEventListener('click',function() {
    localStorage.setItem('results',null);
    resultList.innerHTML = '';
    results = [];
});


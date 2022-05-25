const form = document.querySelector('.base-price-form');
form.addEventListener('submit',Calculate);

const capacity = document.querySelector('#capacity');
const price = document.querySelector('#price');

let resultList = document.querySelector('.result-list');

let results = JSON.parse(localStorage.getItem('results')) ? JSON.parse(localStorage.getItem('results')) : [] ;

let weightsSum = [];

createElements();

function Calculate(event) {
    
    event.preventDefault();

    const capValue = capacity.value;
    const priceValue = price.value;

    
    let errorMsg = document.querySelector('.error-msg');

    let result = 0;

    let validationErrors = 0;

    if (capValue.trim() === '' || capValue <= 0) {
        validationErrors += 1;
        capacity.classList.add('input-error');
    }

    if (priceValue.trim() === '' || priceValue <= 0) {
        validationErrors += 1;
        price.classList.add('input-error');
    };

    if (isNaN(capValue) === true || isNaN(priceValue) === true) {
        validationErrors += 1; 
    };

    if (validationErrors !== 0) {
        errorMsg.innerText = "Highlighted fields can't be blank, can't contain less than 1 character and must include numbers only."
    };
    
    if (validationErrors === 0) {

        result = priceValue / capValue;

        results.push(result);
        localStorage.setItem('results',JSON.stringify(results));
        createElements();
        capacity.value = '';
        price.value = '';

        document.querySelector('.error-msg').innerText = "";

        if (capacity.classList.contains('input-error')) {
            capacity.classList.remove('input-error');
        };
        if (price.classList.contains('input-error')) {
            price.classList.remove('input-error');
        };
    };
};

function createElements() {

    resultList.innerHTML = '';

    for (let i = 0; i < results.length; i++) {

        let newListItem = document.createElement('li');

        let listItemClass = document.createAttribute('class');
        listItemClass.value = 'list-item';
        newListItem.setAttribute('class','list-item');

        newListItem.innerHTML = `${parseFloat(results[i]).toFixed(2)} €`;

        resultList.appendChild(newListItem);

    };

};
    
document.querySelector('#clear-list-btn').addEventListener('click',() => {
    localStorage.setItem('results',null);
    resultList.innerHTML = '';
    results = [];
});

document.querySelector('.weight-sum-form').addEventListener('submit',(e) => {
    e.preventDefault();

    const sumParagraph = document.querySelector('#sum-paragraph');
    const weight = document.querySelector('#weight');

    let sum = 0;

    if (weight.value.trim() === '' || weight.value <= 0){
        weight.classList.add('input-error');
    } else if (isNaN(weight.value) === true) {
        weight.classList.add('input-error');
    }
    else {
        weightsSum.push(weight.value);

        for (let i = 0; i < weightsSum.length; i++) {
            sum += parseFloat(weightsSum[i]);
            sumParagraph.innerText = `Sum of weights: ${sum}`;
            
        };

        if (weight.classList.contains('input-error')) {
            weight.classList.remove('input-error');
        };
    };
    
    weight.value = '';
});

document.querySelector('#clear-sum-btn').addEventListener('click', () => {
    document.querySelector('#sum-paragraph').innerText = '';
    weightsSum = [];
});






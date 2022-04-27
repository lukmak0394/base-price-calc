const form = document.querySelector('.base-price-form');
form.addEventListener('submit',Calculate);

let resultList = document.querySelector('.result-list');

let results = JSON.parse(localStorage.getItem('results')) ? JSON.parse(localStorage.getItem('results')) : [] ;

let weightsSum = [];

createElements();

function Calculate(event) {
    event.preventDefault();

    const capacity = document.querySelector('#capacity').value;
    const price = document.querySelector('#price').value;
    const units = document.querySelector('#units').value;

    let errorMsg = document.querySelector('.error-msg');

    let result = 0;

    let validationErrors = 0;

    if (capacity.trim() === '' || capacity <= 0) {
        validationErrors += 1;
        document.querySelector('#capacity').classList.add('input-error');
    }

    if (price.trim() === '' || price <= 0) {
        validationErrors += 1;
        document.querySelector('#price').classList.add('input-error');
    };

    if (units === '') {
        validationErrors += 1;
    };

    if (isNaN(capacity) === true || isNaN(price) === true) {
        validationErrors += 1; 
    };

    if (validationErrors !== 0) {
        errorMsg.innerText = "Highlighted fields can't be blank, can't contain less than 1 character and must include numbers only."
    };
    
    if (validationErrors === 0) {

        if (units === 'g-ml') {
            result = (price / capacity) * 100;
        };
        if (units === 'kg-l') {
            result = price / capacity;
        };

        results.push(result);
        localStorage.setItem('results',JSON.stringify(results));
        createElements();
        document.querySelector('#capacity').value = '';
        document.querySelector('#price').value = '';

        document.querySelector('.error-msg').innerText = "";

        if (document.querySelector('#capacity').classList.contains('input-error')) {
            document.querySelector('#capacity').classList.remove('input-error');
        };
        if (document.querySelector('#price').classList.contains('input-error')) {
            document.querySelector('#price').classList.remove('input-error');
        };
    };
};

function createElements() {

    resultList.innerHTML = '';

    for (let i = 0; i < results.length; i++) {
        let newListItem = document.createElement('li');
        let listItemContent = document.createTextNode(parseFloat(results[i]).toFixed(2));
        let listItemClass = document.createAttribute('class');
        listItemClass.value = 'list-item';
        newListItem.setAttribute('class','list-item');

        newListItem.appendChild(listItemContent);
        resultList.appendChild(newListItem);

    };

};
    
document.querySelector('#clear-list-btn').addEventListener('click',function() {
    localStorage.setItem('results',null);
    resultList.innerHTML = '';
    results = [];
});

document.querySelector('.weight-sum-form').addEventListener('submit',function(event) {
    event.preventDefault();

    const sumParagraph = document.querySelector('#sum-paragraph');

    let sum = 0;

    if (document.querySelector('#weight').value.trim() === '' || document.querySelector('#weight').value <= 0){
        document.querySelector('#weight').classList.add('input-error');
    } else if (isNaN(document.querySelector('#weight').value) === true) {
        document.querySelector('#weight').classList.add('input-error');
    }
    else {
        weightsSum.push(document.querySelector('#weight').value);

        for (let i = 0; i < weightsSum.length; i++) {
            sum += parseInt(weightsSum[i]);
            sumParagraph.innerText = 'Sum: ' + sum;
        };

        if (document.querySelector('#weight').classList.contains('input-error')) {
            document.querySelector('#weight').classList.remove('input-error');
        };
    };
    
    document.querySelector('#weight').value = '';
});

document.querySelector('#clear-sum-btn').addEventListener('click',function() {
    document.querySelector('#sum-paragraph').innerText = '';
    weightsSum = [];
});






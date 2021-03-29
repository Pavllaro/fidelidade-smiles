const container = document.querySelector('.container');
const items = document.querySelectorAll('.row .item');
const count = document.getElementById('count');
const total = document.getElementById('total');
const milhas = document.getElementById('milhas');
const priceSelect = document.getElementById('prices');
const sendSMSButton = document.getElementById('sendSMSButton');

populateUI();

let ticketPrice = +priceSelect.value;

// Save selected price index and price
function setPriceData(priceIndex, pricePrice) {
    localStorage.setItem('selectedPriceIndex', priceIndex);
    localStorage.setItem('selectedPricePrice', pricePrice);
}

// Update total and count
function updateSelectedCount() {
    const selectedItems = document.querySelectorAll('.row .item.selected');

    const itemsIndex = [...selectedItems].map((item) => [...items].indexOf(item));

    localStorage.setItem('selectedItems', JSON.stringify(itemsIndex));

    const selectedItemsCount = selectedItems.length;

    count.innerText = selectedItemsCount;
    total.innerText = selectedItemsCount * ticketPrice;
    milhas.innerText = total.innerText / 10;

    setPriceData(priceSelect.selectedIndex, priceSelect.value);
}

// Get data from localstorage and populate UI
function populateUI() {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems'));

    if (selectedItems !== null && selectedItems.length > 0) {
        items.forEach((item, index) => {
            if (selectedItems.indexOf(index) > -1) {
                item.classList.add('selected');
            }
        });
    }

    const selectedPriceIndex = localStorage.getItem('selectedPriceIndex');

    if (selectedPriceIndex !== null) {
        priceSelect.selectedIndex = selectedPriceIndex;
    }
}

// Price select event
priceSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setPriceData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Item click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('item')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

sendSMSButton.addEventListener('click', (e) => {
    const text = document.getElementById('text').innerText;
    axios
        .post('http://127.0.0.1:8080/sendSms', { text: text })
        .then(function (response) {
            alert(response.data);
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
});

// Initial count and total set
updateSelectedCount();

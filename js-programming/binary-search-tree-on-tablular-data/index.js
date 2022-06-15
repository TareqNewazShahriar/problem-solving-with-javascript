let DATA_SIZE = 50000;

let dataset = [];
for (let i = 1; i <= DATA_SIZE; i++) {
  dataset.push({
    orderId: i,
    customerName: 'Customer ' + i,
    price: parseInt(Math.random() * 10000),
  });
}


let i = 1;
let tbody = document.createElement('tbody');
for (const item of dataset) {
   let row = tbody.insertRow();
   let cell = row.insertCell();
   cell.textContent = item.orderId;
   cell = row.insertCell();
   cell.textContent = item.customerName;
   cell = row.insertCell();
   cell.textContent = item.product;
   cell = row.insertCell();
   cell.textContent = item.price;

   i++;
}

document.querySelector('table[data-bst]').appendChild(tbody);
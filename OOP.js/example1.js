console.log('Start');

fetch('https://656ca88ee1e03bfd572e9c16.mockapi.io/products')
  .then(response => response.json())
  .then(products => {
    console.log('Inside fetch', data);
  });

console.log('End');
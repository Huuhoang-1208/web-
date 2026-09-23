const productModel = [
    {id : 1, name: "Laptop", price: 1500},
    {id : 2, name: "Phone", price: 800},
    {id : 3, name: "Tai Nghe", price: 100},
]; 

exports.getAll = () => products;

exports.getById = (id) => products.find(product => product.id === id);

exports.add = (product) => {
    products.push(product);
}
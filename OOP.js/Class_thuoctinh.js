class Product {
    // Khai báo các thuộc tính của lớp Product
    id = 0;            // ID của sản phẩm
    name = "";        // Tên sản phẩm
    price = 0;        // Giá sản phẩm

    // Phuong thức khởi tạo (constructor) để tạo đối tượng Product
    constructor(id, name, price) {
        this.id = id;         // Gán giá trị cho thuộc tính id
        this.name = name;     // Gán giá trị cho thuộc tính name
        this.price = price;   // Gán giá trị cho thuộc tính price
    }

    // Phương thức hiển thị thông tin sản phẩm
    displayInfo() {
        console.log(`ID: ${this.id}, Name: ${this.name}, Price: ${this.price}`);
    }
}

// tạo đối tượng mới từ lớp Product
const product1 = new Product(1, "laptop", 1000);
const product2 = new Product(2, "Phone", 500);

// Hiển thị thông tin của các sản phẩm
product1.displayInfo(); // Output: ID: 1, Name: Apple, Price: $1000
product2.displayInfo(); // Output: ID: 2, Name: Banana, Price: $500
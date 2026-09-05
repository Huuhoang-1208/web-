var man = [
    {
        id: 1,
        name: "The Cosmo (Đen) Quần short khaki",
        code: "TC1025011BA",
        price: "250.000",
        image: "public/image/quan ao nam/men1.png"
    },

    {
        id: 2,
        name: "Quần baggy đen sang trọng",
        code: "TC1025011BA",
        price: "398.000",
        image: "public/image/quan ao nam/men2.png"
    },

    {
        id: 3,
        name: "Áo sơ mi nam",
        code: "TC1025011BA",
        price: "300.000",
        image: "public/image/quan ao nam/men3.png"
    },

    {
        id: 4,
        name: "Quần short nam",
        code: "TC1025011BA",
        price: "300.000",
        image: "public/image/quan ao nam/men4.png"
    }
];
var woment = [
    {
        id: 1,
        name: "Váy Fashion",
        code: "TC1025011BA",
        price: "250.000",
        image: "public/image/quan ao nu/women1.png"
    },

    {
        id: 2,
        name: "Áo thun phối váy ngắn",
        code: "TC1025011BA",
        price: "398.000",
        image: "public/image/quan ao nu/women2.png"
    },

    {
        id: 3,
        name: "Áo khoác nữ",
        code: "TC1025011BA",
        price: "300.000",
        image: "public/image/quan ao nu/women3.png"
    },

    {
        id: 4,
        name: "Áo thun nữ",
        code: "TC1025011BA",
        price: "300.000",
        image: "public/image/quan ao nu/women4.png"
    }
];
function listProducts() {

    for (let i = 0; i <= man.length - 1; i++) {

        var demo = '<div class="col-3">';

        demo += '<div class="card" style="width:18rem;">';

        demo += '<img src="' + man[i].image + '" class="card-img-top" style="height:400px;">';

        demo += '<div class="card-body">';

        demo += '<h5 class="card-title">' + man[i].name + '</h5>';

        demo += '<p class="card-text">' + man[i].price + '</p>';

        demo += '<a href="#" class="btn btn-primary" onclick="oder()">Đặt mua</a>';

        demo += '</div>';

        demo += '</div>';

        demo += '</div>';

        console.log(demo);

        document.getElementById("men").innerHTML += demo;
    }

    for (let i = 0; i <= woment.length - 1; i++) {

        var demo = '<div class="col-3">';

        demo += '<div class="card" style="width:18rem;">';

        demo += '<img src="' + woment[i].image + '" class="card-img-top" style="height:400px;">';

        demo += '<div class="card-body">';

        demo += '<h5 class="card-title">' + woment[i].name + '</h5>';

        demo += '<p class="card-text">' + woment[i].price + '</p>';

        demo += '<a href="#" class="btn btn-primary" onclick="oder()">Đặt mua</a>';

        demo += '</div>';

        demo += '</div>';

        demo += '</div>';

        console.log(demo);

        document.getElementById("woment").innerHTML += demo;
    }

}
function oder() {
    alert("thank you your order");
}
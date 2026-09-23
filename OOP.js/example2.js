// hàm tính tổng của 2 số và gọi callback để xử lý kết quả
function sum(a, b, callback) {
    const sum = a + b;
    callback(sum);
}

// Hàm callback hiện thị kết quả tính tổng
function displayResult(result) {
    console.log(`Kết quả tính tổng: ${result}`);
}
    
// gọi hàm tính tổng 
calculateSum(5, 10, displayResult); 
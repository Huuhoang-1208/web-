const API_URL = "https://6aaa43eeff4dd5698b4e43e3.mockapi.io/movies";
class Movie {

    constructor(
        movieId,
        movieName,
        description,
        duration,
        releaseYear,
        rentalPrice,
        imageUrl
    ) {
        this.movieId = movieId;
        this.movieName = movieName;
        this.description = description;
        this.duration = duration;
        this.releaseYear = releaseYear;
        this.rentalPrice = rentalPrice;
        this.imageUrl = imageUrl;

    }
    async addMovie() {
        try {
            const response = await fetch( API_URL,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        movieName: this.movieName,
                        description: this.description,
                        duration: this.duration,
                        releaseYear: this.releaseYear,
                        rentalPrice: this.rentalPrice,
                        imageUrl: this.imageUrl
                    })
                }
            );
            if (!response.ok) {
                throw new Error(
                    "Failed to add movie"
                );
            }
            return await response.json();
        }
        catch (error) {
            console.error(error);
            alert("Không thể thêm phim!");
        }
    }
    async updateMovie() {
        try {
            const response = await fetch(
                `${API_URL}/${this.movieId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        movieName: this.movieName,
                        description: this.description,
                        duration: this.duration,
                        releaseYear: this.releaseYear,
                        rentalPrice: this.rentalPrice,
                        imageUrl: this.imageUrl
                    })
                }
            );
            if (!response.ok) {
                throw new Error("Failed to update movie");
            }
            return await response.json();
        }
        catch (error) {
            console.error(error);
            alert("Không thể cập nhật phim!");
        }
    }
    async deleteMovie() {
        try {
            const response = await fetch(
                `${API_URL}/${this.movieId}`,
                {
                    method: "DELETE"
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete movie");
            }
            return response;
        }
        catch (error) {
            console.error(error);
            alert("Không thể xóa phim!");
        }
    }
}
async function getMovies() {
    try {
        const response =
            await fetch(API_URL);
        if (!response.ok) {
            throw new Error(
                "Failed to get movies"
            );
        }
        const movies =
            await response.json();
        displayMovies(movies);
    }
    catch (error) {
        console.error(error);
        document.getElementById(
            "movieList"
        ).innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    Không thể kết nối.

                    <br>
                    Hãy kiểm tra lại.
                </div>
            </div>
        `;
    }
}
function displayMovies(movies) {
    const movieList =
        document.getElementById(
            "movieList"
        );
    movieList.innerHTML = "";
    if (movies.length === 0) {
        movieList.innerHTML = `
            <div class="col-12 text-center">
                <h4>
                    Không tìm thấy phim
                </h4>
            </div>
        `;
        return;
    }
    movies.forEach(movie => {
        movieList.innerHTML += `
            <div class="col-lg-3 col-md-6 mb-4">
                <div class="movie-card">
                    <!-- IMAGE -->
                    <img
                        src="${movie.imageUrl}"
                        alt="${movie.movieName}"
                        class="movie-image"
                        onerror="
                            this.src =
                            'https://picsum.photos/400/250'
                        "
                    >
                    <!-- CONTENT -->
                    <div class="movie-content">
                        <!-- NAME -->
                        <div class="movie-title">
                            ${movie.movieName}
                        </div>
                        <!-- INFO -->
                        <div class="movie-info">
                            ${movie.duration} phút
                            ${movie.releaseYear}
                        </div>
                        <!-- DESCRIPTION -->
                        <div class="movie-description">
                            ${movie.description}
                        </div>
                        <!-- WATCH -->
                        <button
                            class="watch-button"
                            onclick="
                                watchMovie('${movie.id}')
                            "
                        >
                            Xem Ngay
                        </button>
                        <!-- EDIT + DELETE -->
                        <div class="action-buttons">
                            <button
                                class="edit-button"
                                onclick="
                                    openEditForm('${movie.id}')
                                "
                            >
                                Sửa
                            </button>
                            <button
                                class="delete-button"
                                onclick="
                                    removeMovie('${movie.id}')
                                "
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}
function watchMovie(movieId) {
    alert("Bạn đang xem phim có ID: "+ movieId);
}
function openAddForm() {document.getElementById("formTitle").innerText = "Thêm Phim";
    document.getElementById("movieId").value = "";
    document.getElementById("movieName").value = "";
    document.getElementById("description").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("releaseYear").value = "";
    document.getElementById("rentalPrice").value = "";
    document.getElementById("imageUrl").value = "";
    document.getElementById("movieForm").style.display = "flex";
}
function closeForm() {
    document.getElementById("movieForm").style.display = "none";
}
async function saveMovie() {
    const movieId = document.getElementById("movieId").value;
    const movieName =document.getElementById("movieName").value;
    const description =document.getElementById("description").value;
    const duration =Number(document.getElementById("duration").value);
    const releaseYear =Number(document.getElementById("releaseYear").value);
    const rentalPrice =Number(document.getElementById("rentalPrice").value);
    const imageUrl =document.getElementById("imageUrl").value;
    if (
        movieName === "" ||
        description === "" ||
        duration === 0 ||
        releaseYear === 0
    ) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    const movie = new Movie(
        movieId,
        movieName,
        description,
        duration,
        releaseYear,
        rentalPrice,
        imageUrl
    );

    if (movieId !== "") {
        await movie.updateMovie();
        alert("Cập nhật phim thành công!");
    }
    else {
        await movie.addMovie();
        alert("Thêm phim thành công!");
    }
    closeForm();
    getMovies();
}
async function openEditForm(movieId) {

    try {
        const response =await fetch(`${API_URL}/${movieId}`
            );
        const movie =
            await response.json();
        document.getElementById("formTitle").innerText = "Sửa Phim";
        document.getElementById("movieId").value = movie.id;
        document.getElementById("movieName").value = movie.movieName;
        document.getElementById("description").value = movie.description;
        document.getElementById("duration").value = movie.duration;
        document.getElementById("releaseYear").value = movie.releaseYear;
        document.getElementById("rentalPrice").value = movie.rentalPrice;
        document.getElementById("imageUrl").value = movie.imageUrl;
        document.getElementById("movieForm").style.display = "flex";
    }
    catch (error) {
        console.error(error);
        alert(
            "Không thể lấy thông tin phim!"
        );
    }
}
async function removeMovie(movieId) {
    const confirmDelete =
        confirm(
            "Bạn có chắc muốn xóa phim này không?"
        );
    if (!confirmDelete) {
        return;
    }
    const movie =
        new Movie(
            movieId,
            "",
            "",
            0,
            0,
            0,
            ""
        );
    await movie.deleteMovie();
    alert(
        "Xóa phim thành công!"
    );
    getMovies();
}
document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        async function () {
            const keyword =
                this.value
                    .toLowerCase()
                    .trim();
            try {
                const response =
                    await fetch(API_URL);
                const movies =
                    await response.json();
                const filteredMovies =
                    movies.filter(
                        movie =>
                            movie.movieName
                                .toLowerCase()
                                .includes(keyword)
                    );
                displayMovies(
                    filteredMovies
                );
            }
            catch (error) {
                console.error(error);
            }

        }
    );
document
    .getElementById("movieForm")
    .addEventListener(
        "click",
        function (event) {

            if (
                event.target === this
            ) {

                closeForm();

            }

        }
    );
getMovies();
$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });

    $('#submit_button').on('click', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
    });
});

function getMovies(searchText) {
    console.log(searchText);
    axios.get('http://www.omdbapi.com?s=' + searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';

            $.each(movies, (index, movie) => {
                console.log(movie.Poster);

                if (movie.Poster == 'N/A') {
                    movie.Poster = "/movie_miner/not-found.png"
                }


                output += `

                    <div class="col-md-3">
                        <div class="well text-center">
                        
                            <img src="${movie.Poster}" alt="${movie.Title}">
                            
                            <p>${movie.Title}</p>
                            
                            <a id="button" onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">See Details</a>
                        
                        </div>
                    </div>
                
                `;

            });

            $('#movies').html(output);

        })
        .catch((err) => {
            console.log(err);
        })
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?i=' + movieId)
        .then((response) => {
            console.log(response);

            let movie = response.data;

            if (movie.Poster == 'N/A') {
                movie.Poster = '/movie_miner/not-found.png';
            }



            let output = `

                <div class="row">
                
                    <div class="col-md-4">
                    
                        <img src="${movie.Poster}" class="thumbnail" alt="">
                        
                    </div>
                    
                    <div class="col-md-8">
                        
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>


                        
                        </ul>
                    </div>
                
                </div>
                
                <div class="row">
                    
                    <div class="well">
                        <h3>Plot</h3>
                        ${movie.Plot}
                        <hr>
                        <a href="http://www.imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="/movie_miner/" class="btn btn-default">Go Back To Search</a>
                    </div>
                
                </div>
        
            `;

            $('#movie').html(output);

        })
        .catch((err) => {
            console.log(err);
        })
}
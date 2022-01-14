let moviID;
let movieInfo;
let elenentID;
let movieAll1Ratings = "";
let movieAll1Value = "";
let movieAll2Ratings = "";
let movieAll3Ratings = "";

//evant to hide modal-container
document
  .querySelector(".modal-container")
  .addEventListener("click", function () {
    document.querySelector(".modal-container").style.display = "none";
  });


//evant show close button
document.getElementById("type-text").addEventListener("input", function () {
  document.querySelector(".btn-close").style.display = "block";
});


//evant for clear input field
document.querySelector(".btn-close").addEventListener("click", function () {
  document.getElementById("type-text").value = "";
});


//function function for get short information about the film
const getMuvie = async () => {
    document.querySelector(".movies-block").innerHTML = `<span class="span"></span>`;
  let promt = document.getElementById("type-text").value;
  const response = await fetch(
    `http://www.omdbapi.com/?s=${promt}&apikey=fe6e34e`
  );
  const movie = await response.json();
  let araimovie = movie.Search;
  for (let i = 0; i < araimovie.length; i++) {
    let movieImg = araimovie[i].Poster;
    let movieTitle = araimovie[i].Title;
    let movieYear = araimovie[i].Year;
    let movieType = araimovie[i].Type;
    moviID = araimovie[i].imdbID;
    document.querySelector(".span").insertAdjacentHTML(
      "afterend",
      `<div class="block">
      <h1>${moviID}</h1>
    <img src="${movieImg}" alt="">
    <div class="movie-name">${movieTitle}</div>
    <div class="movie-year">
        <p class="p-1">${movieYear}</p>
        <p class="p-2">${movieType}</p>
    </div>
    <input type="button" value="More details" class="btn-details" name="block">
</div>`
    );
  }
let moviesBlock = document.getElementsByName("block");
  for (let i = 0; i < moviesBlock.length; i++) {
    moviesBlock[i].addEventListener("click", function () {
      if (event) {
        elenentID = moviesBlock[i].parentElement.firstElementChild.textContent;
        getMuvieAllInfo(elenentID);
      }
    });
  }
};



//function for get all information about the film
const getMuvieAllInfo = async (elenentID) => {
  const response = await fetch(
    `http://www.omdbapi.com/?i=${elenentID}&apikey=fe6e34e`
  );
  movieInfo = await response.json();
  let movieAllPoster = movieInfo.Poster;
  let movieAllTitle = movieInfo.Title;
  let movieAllRated = movieInfo.Rated;
  let movieAllGenre = movieInfo.Genre;
  let movieAll2Year = movieInfo.Year;
  let movieAllPlot = movieInfo.Plot;
  let movieAllWriter = movieInfo.Writer;
  let movieAllDirector = movieInfo.Director;
  let movieAllActors = movieInfo.Actors;
  let movieAllBoxOffice = movieInfo.BoxOffice;
  let movieAllAwards = movieInfo.Awards;
  movieAll1Ratings = movieInfo.Ratings[0].Source;
  movieAll1Value = movieInfo.Ratings[0].Value;
  if(movieInfo.Ratings.length > 1){
    movieAll2Ratings = movieInfo.Ratings[1].Source;
    movieAll3Ratings = movieInfo.Ratings[1].Value;
    document.querySelector(
        ".ratings"
      ).innerHTML = `<p class="normal ratings"><span class="bolt">Ratings:<br>
                                </span>${movieAll1Ratings}  ${movieAll1Value}<br>
                                ${movieAll2Ratings}  ${movieAll3Ratings}</p>`;
  }
  
console.log(movieInfo)
  document.querySelector(".model-img").src = movieAllPoster;
  document.querySelector(".model-info-top").textContent = movieAllTitle;
  document.querySelector(
    ".short-info"
  ).innerHTML = `<p class="short-info">${movieAllRated}  ${movieAll2Year}  ${movieAllGenre}</p>`;
  document.querySelector(".info").textContent = movieAllPlot;
  document.querySelector(
    ".written"
  ).innerHTML = `<p class="normal written"><span class="bolt">Written by:</span> ${movieAllWriter}.</p>`;
  document.querySelector(
    ".directed"
  ).innerHTML = `<p class="normal directed"><span class="bolt">Directed by:</span> ${movieAllDirector}.</p>`;
  document.querySelector(
    ".starring"
  ).innerHTML = `<p class="normal starring"><span class="bolt">Starring:</span> ${movieAllActors}.</p>`;
  document.querySelector(
    ".boxOffice"
  ).innerHTML = `<p class="normal boxOffice"><span class="bolt">BoxOffice:</span> ${movieAllBoxOffice}.</p>`;
  document.querySelector(
    ".awards"
  ).innerHTML = `<p class="normal awards"><span class="bolt">Awards:</span> ${movieAllAwards}.</p>`;

  document.querySelector(".modal-container").style.display = "flex";
  document.querySelector(".confirm").style.display = "flex";
};

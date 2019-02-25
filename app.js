var artists = ["Juice WRLD", "Lil Pump", "Offset", "Smokepurpp", "Ariana Grande", "BTS", "Queen", "Post Malone", "Travis Scott", "Nicki Minaj", 
"Cardi B", "J. Cole", "Eminem", "Ella Mai", "Bruno Mars", "21 Savage"];

$(document).ready(function () {
    function renderButtons() {
        $('#artists-view').empty();
        for (var i = 0; i < artists.length; i++) {
            var a = $("<button>");
            a.addClass("artist");
            a.attr("data-name", artists[i]);
            a.text(artists[i]);
            $("#artists-view").append(a);

        }
    }
    function displayArtistInfo() {
        var artist = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            artist + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                $("#gifs-appear-here").empty();
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $('<div class="rounded float-left">');
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating :" + rating);

                    var artistImage = $('<img class="gif">');
                    artistImage.attr("data-state", "still");
                    artistImage.attr("data-still", results[i].images.fixed_height_still.url);
                    artistImage.attr("data-animate", results[i].images.fixed_height.url);
                    artistImage.attr("src", artistImage.attr("data-still"));
                    gifDiv.prepend(p);
                    gifDiv.prepend(artistImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            });
    }

    function toggleGif() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this)
                .attr("src", $(this).attr("data-animate"))
                .attr("data-state", "animate");
        }
        else if (state === "animate") {
            $(this)
                .attr("src", $(this).attr("data-still"))
                .attr("data-state", "still");
        }
    }

    $("#add-artist").on("click", function (event) {
        event.preventDefault();
        var artist = $("#artist-input").val().trim();
        $("#artist-input").val("");
        artists.push(artist);
        console.log(artists);
        renderButtons();
    });

    $(document).on("click", ".artist", displayArtistInfo);
    $(document).on("click", ".gif", toggleGif);
    renderButtons();




    
});

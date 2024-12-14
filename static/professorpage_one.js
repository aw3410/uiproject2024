function advancedsearch() {
    var advancedsearchdiv = $('#advancedsearch')
    
    const isVisible = advancedsearchdiv.is(':visible');

    if (isVisible) {
        advancedsearchdiv.hide(); 
    }
    else {
        advancedsearchdiv.show(); 
    }
}

function coursecollapsible() {
    var courses = $('#listofcourses')
    var toggletext = document.getElementById('coursebutton')

    const isVisible = courses.hasClass('hidden');

    if (isVisible) {
        courses.removeClass('hidden');
        toggletext.innerHTML = 'Courses -'

    } else {
        courses.addClass('hidden');
        toggletext.innerHTML = 'Courses +'
    }
}

function professorcollapsible() {
    var professors = $('#listofprofessors')
    var toggletext = document.getElementById('professorbutton')

    const isVisible = professors.hasClass('hidden');

    if (isVisible) {
        professors.removeClass('hidden');
        toggletext.innerHTML = 'Professors -'

    } else {
        professors.addClass('hidden');
        toggletext.innerHTML = 'Professors +'
    }
}


$(document).ready(function () {
    if (data){
        console.log("hi")
        const prof = data;
        $('#professorName').text(`Professor ${prof.professorName}`);
        $('#averagestar').text(`${prof.overallRating}/5 based on ${prof.ratingVotes} reviews`)

        let fullStars = Math.floor(prof.overallRating); 

        let starsHtml = ''
        for (let i=0; i<fullStars; i++){
            starsHtml += `<span class="fa fa-star"></span>`
        }
        if (prof.overallRating % 1 >= 0.5){
            starsHtml += `<span class="fa fa-star-half-full"></span>`
            if (Number(fullStars) + 0.5 < 4.5){
                starHtml += `<span class="fa fa-star"></span>`;
            }
        }
        console.log(starsHtml)
        $('#stars').append(starsHtml);

        const totalVotes = Math.max(...prof.ratingDistribution.map(d => d.vote)) || 1; // Avoid division by zero
        $('#professorratingtablecontainer').html(`<table id=="professorratingtable" class="courseinformationline">`);

        const ratingTableHtml = prof.ratingDistribution.map(dist =>`
            <tr>
                <td class="stars">${dist.rating} Stars</td>
                <td class="barcontainer">
                <div class="bar" style="width: ${(dist.vote / totalVotes) * 100}%;"></div>
                </td>
                <td class="votecount">${dist.vote} ${dist.vote === 1 ? 'vote' : 'votes'}</td>
            </tr>`
            ).join('');
        $('#professorratingtablecontainer').html(ratingTableHtml);

    }
    $('#filterbutton').click(function () {
        console.log("Filter button clicked!");
        advancedsearch();
    });

    $('#coursebutton').click(function () {
        coursecollapsible();
    });

    $('#professorbutton').click(function () {
        professorcollapsible();
    });

});

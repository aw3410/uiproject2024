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
function search(searchQuery){
    var professors = $('#listofprofessors a')
    var courses = $('#listofcourses a')

    let searchText = $('#searchbox').val().toLowerCase();
    $('#result-box').remove();


    courses.each(function(){
        let courseName = $(this).text().split("Leave a Review")[0].trim();
        let courseLink = $(this).attr('href')
        if (courseName.toLowerCase().includes(searchText)){
            $('#leaveareview').append(`
                <div>
                    <a id="result-box" href="${courseLink}"> ${courseName}</a>
                <div>
            `);
        }
    })
    professors.each(function(){
        let profName = $(this).text().split("Leave a Review")[0].trim();
        let profLink = $(this).attr('href')
        if (profName.toLowerCase().includes(searchText)){
            $('#leaveareview').append(`
                <div>
                    <a id="result-box" href="${profLink}"> ${profName}</a>
                <div>
            `);
        }
    })


}
function redirectToReview() {
    window.location.href = '/reviewform';
}

$(document).ready(function () {

    $('#search').click(function(){
        search();
    })
    $('#searchbox').keypress(function (e) {
        if (e.which === 13) {
            search();
        }
    });
    $('#filterbutton').click(function () {
        advancedsearch();
    });

    $('#coursebutton').click(function () {
        coursecollapsible();
    });

    $('#professorbutton').click(function () {
        professorcollapsible();
    });
    
});

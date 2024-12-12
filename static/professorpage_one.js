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
    console.log("Document ready!");

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


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
function addpiechart(professors) {
    professors.forEach((professor, index) => {
        const piechartID = `piechart-${index}`;

        new Chart(piechartID, {
            type: 'pie',
            data: {
                labels: professor.gradesBreakdown.map(grade => grade.component),
                datasets: [{
                    backgroundColor: professor.gradesBreakdown.map(grade => grade.color),
                    data: professor.gradesBreakdown.map(grade => grade.percentage)
                }]
            },
            options: {
                legend: {
                    display: false,
                }
            }
        });
    })
}

function addbarchart(professors) {

    professors.forEach((professor, index) => {
        const barchartID = `barchart-${index}`;
        new Chart(barchartID, {
            type: "bar",
            data: {
                labels: professor.workload.map(workload => workload.workloadHours),
                datasets: [{
                    label: "Votes",
                    backgroundColor: "orange",
                    data: professor.workload.map(workload => workload.votes)
                }]
            },
            options: {
                legend: {
                    display: false
                },
            }
        });
    })

}
function search(){
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

function ratingscore(rating) {
    if (rating < 2){
        return 'boxeswithworstrating';
    }
    else if (rating < 4 && rating >= 2){
        return 'boxeswithbadrating'
    }
    else if (rating >= 4 && rating <= 6) {
        return 'boxeswithmediumrating';
    } 
    else if (rating > 6 && rating <= 8) {
        return 'boxeswithgoodrating';
    } 
    else if (rating > 8){
        return 'boxeswithbestrating';
    }
}

function difficultyscore(rating){
    if (rating < 2){
        return 'boxeswithbestrating';
    }
    else if (rating < 4 && rating >= 2){
        return 'boxeswithgoodrating'
    }
    else if (rating >= 4 && rating <= 6) {
        return 'boxeswithmediumrating';
    } 
    else if (rating > 6 && rating <= 8) {
        return 'boxeswithbadrating';
    } 
    else if (rating > 8){
        return 'boxeswithworstrating';
    }
}

$(document).ready(function () {
    if (data) {
        const course = data;
        $('#courseTitle').text(`${course.courseCode}: ${course.courseName}`);

        let courseDetailsHtml = `
            <span id="generalcourseinformationcontainer" class="container">
                <div class="boxeswithmediumrating">
                    <p class="boxtext">Industry Relevance</p>
                    <p class="vote">${course.industryRelevanceAverage}/5</p>
                    <p class="boxtext">out of ${course.industryRelevanceTotalVotes} votes</p>
                </div>
                <div id="generalcourseinformation">
                    <p class="boxtext">Level: ${course.level}</p>
                    <p class="boxtext">Requirement: ${course.requirement}</p>
                    <p class="boxtext">Prerequisites: ${course.prerequisites}</p>
                    <p class="boxtext">Semesters Offered: ${course.semestersOffered}</p>
                </div>
            </span>
             <div id="courseinformationcontainer">
                <span id="courseinformationchart">
        `;
        course.professors.forEach((professor, index) => {
            const piechartID = `piechart-${index}`;
            const barchartID = `barchart-${index}`;
            const ratingclass = ratingscore(professor.ratingAverage);
            const difficultyclass = difficultyscore(professor.difficultyAverage);
            const curveclass = professor.curve ? 'boxeswithgoodrating' : 'boxeswithbadrating';


            courseDetailsHtml += `     
                <div class="onecourse">
                    <div class="professorname">Professor: ${professor.professorName}</div>
                    <div class="courseinformation">
                    <span class="courseinformationline">
                        <div class=${ratingclass}>
                            <p class="boxtext">Rating</p>
                            <p class="vote">${professor.ratingAverage || 'N/A'}/10</p>
                            <p class="boxtext">out of ${professor.ratingTotalVotes || 0} votes</p>
                        </div>
                        <div class="${curveclass}">
                            <p class="boxtext">Curve</p>
                            <p class="vote">${professor.curve ? 'Yes' : 'No'}</p>
                        </div>
                        <div class="${difficultyclass}">
                            <p class="boxtext">Difficulty</p>
                            <p class="vote">${professor.difficultyAverage || 'N/A'}/10</p>
                            <p class="boxtext">out of ${professor.difficultyTotalVotes || 0} votes</p>
                        </div>
                    </span>
                    <div class="courseinformationline">
                        <div class="box semester">
                            <p>Semester</p>
                            <p>${professor.semester}</p>
                        </div>
                    </div>
                    <div class="courseinformationline">
                        <div class="box third">
                            <p>Exams/Projects-based: ${professor.examsProjectsBased?.join(', ') || 'N/A'}</p>
                            <p>Attendance: ${professor.attendance || 'N/A'}</p>
                            <p>Recordings: ${professor.recordings ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                    <span class="courseinformationline">
                        <div class="box">
                            <table>
                                <caption>Grading Breakdown</caption>
                                ${professor.gradesBreakdown?.map(grade => `
                                    <tr>
                                        <td class="color-legend ${grade.classcolor}"></td>
                                        <td>${grade.component}:</td>
                                        <td>${grade.percentage}%</td>
                                    </tr>
                                `).join('') || '<tr><td>No grading data available.</td></tr>'}
                            </table>
                        </div>
                        <div class="apiechart">
                            <canvas id="${piechartID}"></canvas>
                        </div>    
                    </span>
                    <span class="courseinformationline">
                        <div class="box">
                            <table>
                                <caption>Course Workload</caption>
                                <tr>
                                    <th>Hours a Week</th>
                                    <th>Votes</th>
                                </tr>
                                ${professor.workload?.map(workload => `
                                    <tr>
                                        <td>${workload.workloadHours}</td>
                                        <td>${workload.votes}</td>
                                    </tr>
                                `).join('') || '<tr><td>No workload data available.</td></tr>'}
                            </table>
                        </div>
                        <div class="barchart">
                        <canvas id="${barchartID}"></canvas>
                    </div>
                </span>
                <div class="additionalcomments courseinformationline">
                    <table>
                        <tr>
                            <th>Additional Comments</th>
                        </tr>
                        ${professor.additionalComments?.map(comment => `
                             <tr>
                                <td>${comment.comment}</td>
                             </tr>
                        `).join('')}
                   
                    </table>
                </div>
                </div>
            `;

            courseDetailsHtml+= `
            </div>
            `

        });
        $('#courseDetails').html(courseDetailsHtml);
        addpiechart(course.professors)
        addbarchart(course.professors)
    }

    else {
        // Display an error message if no data is available
        $('#courseDetails').html('<p>Error: Course data is not available.</p>');
    }

    $('#searchbox').on('focus', function () {
        // If search box is empty when clicked, redirect to the home page
        if (!$(this).val()) {
            window.location.href = '/';
        }
    });

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

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

$(document).ready(function () {
    if (data){
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

        const totalVotes = Math.max(prof.ratingVotes) || 1; // Avoid division by zero
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

        let profDetailsHtml = ` 
            <div id="courseinformationcontainer">
                <span id="courseinformationchart">`

        prof.courses.forEach((course, index) => {
            const piechartID = `piechart-${index}`;
            const barchartID = `barchart-${index}`;

            profDetailsHtml += `     
                <div class="onecourse">
                     <div class="coursename">${course.courseCode}:${course.courseName}</div>
                    <div class="courseinformation">
                    <span class="courseinformationline">
                        <div class="boxeswithbestrating">
                            <p class="boxtext">Rating</p>
                            <p class="vote">${course.ratingAverage || 'N/A'}/10</p>
                            <p class="boxtext">out of ${course.ratingTotalVotes || 0} votes</p>
                        </div>
                        <div class="boxeswithgoodrating">
                            <p class="boxtext">Curve</p>
                            <p class="vote">${course.curve ? 'Yes' : 'No'}</p>
                        </div>
                        <div class="boxeswithbestrating">
                            <p class="boxtext">Difficulty</p>
                            <p class="vote">${course.difficultyAverage || 'N/A'}/10</p>
                            <p class="boxtext">out of ${course.difficultyTotalVotes || 0} votes</p>
                        </div>
                    </span>
                    <div class="courseinformationline">
                        <div class="box">
                            <p>Semester</p>
                            <p>${course.semester}</p>
                        </div>
                    </div>
                    <div class="courseinformationline">
                        <div class="box">
                            <p>Exams/Projects-based: ${course.examsProjectsBased?.join(', ') || 'N/A'}</p>
                            <p>Attendance: ${course.attendance || 'N/A'}</p>
                            <p>Recordings: ${course.recordings ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                    <span class="courseinformationline">
                        <div class="box">
                            <table>
                                <caption>Grading Breakdown</caption>
                                ${course.gradesBreakdown?.map(grade => `
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
                                ${course.workload?.map(workload => `
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
                        ${course.additionalComments?.map(comment => `
                             <tr>
                                <td>${comment.comment}</td>
                             </tr>
                        `).join('')}
                   
                    </table>
                </div>
                </div>
                </div>
            `;
        });

        // courseDetailsHtml+= `
        // </div>
        // `

        $('#profDetails').html(profDetailsHtml);
        addpiechart(prof.courses)
        addbarchart(prof.courses)

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

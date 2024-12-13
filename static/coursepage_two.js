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

$(document).ready(function () {
    if (data){
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
        `;
        course.professors.forEach((professor, index) => {
            const professorId = `professor-${index}`;
            const gradesChartId = `grades-chart-${index}`;
            const workloadChartId = `workload-chart-${index}`;

            courseDetailsHtml += `
            <div id="courseinformationcontainer">
                <span id="courseinformationchart">
                <div class="onecourse">
                    <div class="professorname">Professor: ${professor.professorName}</div>
                    <div class="courseinformation">
                    <span class="courseinformationline">
                        <div class="boxeswithbestrating">
                            <p class="boxtext">Rating</p>
                            <p class="vote">${professor.ratingAverage || 'N/A'}/10</p>
                            <p class="boxtext">out of ${professor.ratingTotalVotes || 0} votes</p>
                        </div>
                        <div class="boxeswithgoodrating">
                            <p class="boxtext">Curve</p>
                            <p class="vote">${professor.curve ? 'Yes' : 'No'}</p>
                        </div>
                        <div class="boxeswithbestrating">
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
                                        <td class="color-legend ${grade.color}"></td>
                                        <td>${grade.component}:</td>
                                        <td>${grade.percentage}%</td>
                                    </tr>
                                `).join('') || '<tr><td>No grading data available.</td></tr>'}
                            </table>
                        </div>
                        <div class="apiechart">
                            <!-- https://dev.to/cscarpitta/build-a-simple-pie-chart-with-html-and-css-32dn -->
                            <canvas id="blaerpiechart"></canvas>

                            <script>
                                var xValues = ["Homework", "Midterm 1", "Midterm 2", "Final", "Attendance"];
                                var yValues = [45, 12, 12, 26, 5];
                                var pieColors = ["yellow", "#EA9999", "#E06666", "#CF2A27", "#93C47D"];

                                new Chart("blaerpiechart", {
                                    type: 'pie',
                                    data: {
                                        labels: xValues,
                                        datasets: [
                                            {
                                                backgroundColor: pieColors,
                                                data: yValues
                                            }
                                        ]
                                    },
                                    options: {
                                        legend: {
                                            display: false,
                                        }
                                    }
                                });
                            </script>
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
                                ${professor.workload?.map((votes, i) => `
                                    <tr>
                                        <td>${["0-3", "3-6", "6-9", "9-12", "12+"][i]}</td>
                                        <td>${votes}</td>
                                    </tr>
                                `).join('') || '<tr><td>No workload data available.</td></tr>'}
                            </table>
                        </div>
                        <div class="barchart">
                        <canvas id="blaerchart"></canvas>
                            <!-- https://www.w3schools.com/ai/ai_chartjs.asp -->
                            <!-- https://www.geeksforgeeks.org/how-to-implement-bar-and-pie-charts-using-chart-js/ -->
                        <script>
                            var xValues = ["0-3 Hours", "3-6 Hours", "6-9 Hours", "9-12 Hours", "12+ Hours"];
                            var yValues = [0, 2, 0, 0, 0];
                            var barColors = "orange";

                            new Chart("blaerchart", {
                                type: "bar",
                                data: {
                                labels: xValues,
                                datasets: [{
                                    label: "Votes",
                                    backgroundColor: barColors,
                                    data: yValues
                                }]
                                },
                            options: {
                            legend: { display: false },
                            }
                            });
                        </script>
                    </div>
                </span>
                <div class="additionalcomments courseinformationline">
                    <table>
                        <tr>
                            <th>Additional Comments</th>
                        </tr>
                    <tr>
                        <td>Loved this professor, he was the best!</td>
                    </tr>
                    </table>
                </div>
                </div>
            `;
            
        });
        $('#courseDetails').html(courseDetailsHtml);
    }

    else {
        // Display an error message if no data is available
        $('#courseDetails').html('<p>Error: Course data is not available.</p>');
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

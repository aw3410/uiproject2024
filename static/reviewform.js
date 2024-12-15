$(document).ready(function (){
    $("#submitbutton").click(function(e){
        e.preventDefault();
       
        const course = $("input[name='courses']").val();
        const courseCode = course.split(':')[0]
        const courseName = course.split(':')[1]
        const professor = $("input[name='professors']").val();
        const semester = $("input[name='semesters']").val();
        const examOrProject = $("#examorprojectdropdown").val();

        const professorRating = $("#professor_rating input[type='radio']:checked").val();
        const industryRelevance = $("#industry_relevance input[type='radio']:checked").val();
        const difficultyRating = $("#difficulty_rating input[type='radio']:checked").val();
        const workload = $("#weeklyworkload input[type='radio']:checked").val();
        const curve = $("#curve input[type='radio']:checked").val();
        const recordings = $("#recordings input[type='radio']:checked").val();
        const attendance = $("#generalcourseinformationtable tr:nth-child(3) input[type='radio']:checked").val();
        const additionalComments = $("#additionalcommentsinput").val();

        
        const payload = {
            courseCode,
            courseName,
            professor,
            semester,
            examOrProject,
            professorRating,
            industryRelevance,
            difficultyRating,
            workload,
            curve,
            recordings,
            attendance,
            additionalComments,
        };
        console.log("Payload: ", payload);
       
        $.ajax({
            url: "/submitreview",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(payload),
            success: function (response) {
                alert(response.message || "Review submitted successfully!");
                window.location.href = "/"; 
            },
            error: function (xhr) {
                alert("Error: " + (xhr.responseJSON?.message || "Submission failed."));
            },
        });
    })
    
});
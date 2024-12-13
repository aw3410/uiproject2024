from flask import Flask,jsonify,abort,render_template, request
import json

app = Flask(__name__)

def load_course_data():
    with open('static/courseinfo.json') as f:
        return json.load(f)

def load_professor_course_data():
    with open('static/professorinfo.json') as f:
        return json.load(f)

def load_courselist_data():
    with open('static/courselist.json') as f:
        return json.load(f)

def load_proflist_data():
    with open('static/proflist.json') as f:
        return json.load(f)

course_data = load_course_data()
professor_course_data = load_professor_course_data()
course_list = load_courselist_data()
prof_list = load_proflist_data()

    
@app.route('/')
def home():
    return render_template('homepage.html')

@app.route('/reviewform')
def inputreview(): 
    return render_template('reviewform.html')

@app.route('/professor')
def professorpage(): 
    return render_template('professorpage_one.html')

@app.route('/courses')
def coursepage(): 
    return render_template('coursepage_two.html')

#For a course page
@app.route('/courses/<coursecode>')
def courseinfo(coursecode):
    course = next((course for course in course_data if course['courseCode'] == coursecode), None)
    
    if course is None:
        abort(404, description="Course not found")
    
    return jsonify(course)

#For a professor page
@app.route('/professors/<profname>')
def profcourseinfo(profname):
    prof = next((prof for prof in professor_course_data if prof['professorName'] == profname), None)
    
    if prof is None:
        abort(404, description="Professor not found")
    
    return jsonify(prof)
#For professors side menu
@app.route('/professors')
def proflist():
    return jsonify(prof_list)

#For courses side menu
@app.route('/courses')
def courselist():
    return jsonify(course_list)

# For filter results: only list the courses/professors. 
# They should act as a hyperlink to GET: courses/<coursecode> or /professors/<profName>
# this will return professors list if professor rating is the filter. In other cases,  it will return courses
# if someone filters for curve=true, it will return courses where atlease one professor has curve=true
@app.route('/filter', methods=['GET'])
def coursesFilter():
    requirement = request.args.get('requirement')
    semester = request.args.get('semester')
    prerequisites = request.args.get('prerequisites')
    exams_projects = request.args.get('examsProjects')
    attendance = request.args.get('attendance')
    curve = request.args.get('curve')
    industry_relevance = request.args.get('industryRelevance')
    professor_rating = request.args.get('professorRating')
    difficulty = request.args.get('difficulty')
    recordings = request.args.get('recordings')

    filtered_courses = course_data
    filtered_prof = professor_course_data

   # returning professor for prof rating
    if professor_rating:
        try:
            professor_rating = float(professor_rating)
            filtered_prof = [prof for prof in filtered_prof if prof['overallRating'] >= professor_rating]
            # Returning only course code, name and link    
            prof_list = [{
            'professorName': prof['professorName']
            } for prof in filtered_prof]

            return jsonify(prof_list)
        except ValueError:
            pass

    # if coursecode:
    #     filtered_courses = [course for course in filtered_courses if course['courseCode'] == coursecode]

    #this is for CS Core and CS Elective
    if requirement:
        filtered_courses = [course for course in filtered_courses if course['requirement'] == requirement]

    if semester:
        filtered_courses = [course for course in filtered_courses if semester in course['semestersOffered']]

    if prerequisites:
        if prerequisites.lower() == 'none': #for courses with no prerequisites, send none
            filtered_courses = [course for course in filtered_courses if not course['prerequisites']]
        else:
            filtered_courses = [course for course in filtered_courses if (course['prerequisites'] or '') == prerequisites]

    #Cite: https://www.w3schools.com/python/ref_func_any.asp
    if exams_projects:
            filtered_courses = [ course for course in filtered_courses if any(exams_projects.lower() 
            in [ep.lower() for ep in professor['examsProjectsBased']] for professor in course['professors'])]

    # append course if filter true for any professor teaching the course
    if attendance:
        filtered_courses = [course for course in filtered_courses if any(professor['attendance']== attendance.lower() for professor in course['professors'])]

    if curve:
        filtered_courses = [course for course in filtered_courses if any(professor['curve'] == (curve.lower() == 'true') for professor in course['professors'])]

    #return courses with >= industry relevance
    if industry_relevance:
        try:
            industry_relevance = float(industry_relevance)
            filtered_courses = [course for course in filtered_courses if course['industryRelevanceAverage'] >= industry_relevance]
        except ValueError:
            pass
    
    # return courses with less difficulty
    if difficulty:
        try:
            difficulty = float(difficulty)
            filtered_courses = [course for course in filtered_courses if any(professor['difficultyAverage'] <= difficulty for professor in course['professors'])]
        except ValueError:
            pass

    if recordings:
        filtered_courses = [
            course for course in filtered_courses if any((professor['recordings'] is not None) == (recordings.lower() == 'true') for professor in course['professors'])
        ]

    if not filtered_courses:
        abort(404, description="No courses found matching the filters")
    
    # Returning only course code, name and link    
    course_list = [{
        "courseCode": course['courseCode'],
        "courseName": course['courseName'],
        "courseURL": f"/courses/{course['courseCode']}"
    } for course in filtered_courses]

    return jsonify(course_list)

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '')
    
    query_lower = query.lower()

    # Search in courses
    matching_courses = [
        course for course in course_list if
        query_lower in course['courseCode'].lower() or
        query_lower in course['courseName'].lower()
    ]

    # Search in professors
    matching_professors = [
        professor for professor in prof_list if
        query_lower in professor['professorName'].lower()
    ]

    results = {
        'courses': matching_courses,
        'professors': matching_professors
    }

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
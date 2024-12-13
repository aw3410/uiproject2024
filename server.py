from flask import Flask,jsonify,abort,render_template
import json

app = Flask(__name__)

def load_course_data():
    with open('static/courseinfo.json') as f:
        return json.load(f)

def load_professor_course_data():
    with open('static/professorinfo.json') as f:
        return json.load(f)

course_data = load_course_data()
professor_course_data = load_professor_course_data()
    
@app.route('/')
def home():
    return render_template('homepage.html')

@app.route('/reviewform')
def inputreview(): 
    return render_template('reviewform.html')

@app.route('/professor')
def professorpage(): 
    return render_template('professorpage_one.html')

@app.route('/course')
def coursepage(): 
    return render_template('coursepage_two.html')

@app.route('/courses/<coursecode>')
def courseinfo(coursecode):
    course = next((course for course in course_data if course['courseCode'] == coursecode), None)
    
    if course is None:
        abort(404, description="Course not found")
    
    return jsonify(course)

@app.route('/professors/<profname>')
def profcourseinfo(profname):
    prof = next((prof for prof in professor_course_data if prof['professorName'] == profname), None)
    
    if prof is None:
        abort(404, description="Professor not found")
    
    return jsonify(prof)


if __name__ == '__main__':
    app.run(debug=True)
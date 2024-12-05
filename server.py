from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('homepage.html')

@app.route('/reviewinput')
def inputreview(): 
    return render_template('coursereview.html')

@app.route('/professorpage')
def professorpage(): 
    return render_template('professorpage_one.html')

@app.route('/coursepage')
def coursepage(): 
    return render_template('coursepage_two.html')

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, render_template

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)
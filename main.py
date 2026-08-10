from flask import Flask, render_template

app = Flask(__name__, template_folder="templates")
app.config['SECRET_KEY'] = 'Secret-key'

@app.route('/')
def about_page():
    return render_template("abut.html")

@app.route('/terms')
def terms_condition():
    return render_template('terms.html')

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
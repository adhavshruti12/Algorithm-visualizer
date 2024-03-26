from flask import Flask, render_template, request, redirect, url_for
from flask_mysqldb import MySQL

app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'harsha1'
app.config['MYSQL_PASSWORD'] = 'YES'
app.config['MYSQL_DB'] = 'user_data'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

# Function to get a database connection
def get_db_connection():
    return mysql.connection

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/stack')
def stack():
    return render_template('stack.html')

@app.route('/queue')
def queue():
    return render_template('queue.html')

@app.route('/forgot')
def forgot():
    return render_template('forgot.html')



@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Get form data
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        
        print("Received a message from {name} ({email}): {message}")

        return render_template('home.html')

    return render_template('contact.html')


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, password))
        user = cursor.fetchone()
        conn.close()

        if user:
            return redirect(url_for('home'))
        else:
            return redirect(url_for('index'))

@app.route('/registration', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        email = request.form['email']
        username = request.form['username']
        password = request.form['password']

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO users (email, username, password) VALUES (%s, %s, %s)', (email, username, password))
        conn.commit()
        conn.close()

        return redirect(url_for('index'))

    return render_template('registration.html')

@app.route('/home')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)

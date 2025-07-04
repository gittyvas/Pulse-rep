from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
from flask_mysqldb import MySQL
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import requests, os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configs
app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST")
app.config['MYSQL_USER'] = os.getenv("MYSQL_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("MYSQL_DB")
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")

mysql = MySQL(app)
jwt = JWTManager(app)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email, password = data['email'], data['password']
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email, password = data['email'], data['password']
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cur.fetchone()
    cur.close()
    if user:
        token = create_access_token(identity=email)
        return jsonify({'access_token': token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/google-login')
def google_login():
    client_id = os.getenv('GOOGLE_CLIENT_ID')
    redirect_uri = os.getenv('GOOGLE_REDIRECT_URI')
    return redirect(
        f'https://accounts.google.com/o/oauth2/v2/auth?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code&scope=email%20profile'
    )

@app.route('/callback')
def callback():
    code = request.args.get('code')
    data = {
        'code': code,
        'client_id': os.getenv("GOOGLE_CLIENT_ID"),
        'client_secret': os.getenv("GOOGLE_CLIENT_SECRET"),
        'redirect_uri': os.getenv("GOOGLE_REDIRECT_URI"),
        'grant_type': 'authorization_code',
    }
    r = requests.post('https://oauth2.googleapis.com/token', data=data)
    access_token = r.json().get('access_token')
    user_info = requests.get('https://www.googleapis.com/oauth2/v1/userinfo', params={'access_token': access_token}).json()
    return jsonify(user_info)

@app.route('/protected')
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'message': f'Welcome {current_user}!'})

if __name__ == '__main__':
    # Listen on every network interface (0.0.0.0) and port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)

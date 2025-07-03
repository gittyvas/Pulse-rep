#!/bin/bash

echo "🚀 Starting Pulse CRM backend setup..."

# Step 1: Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Step 2: Install dependencies
pip install flask flask-cors flask-mysqldb Flask-JWT-Extended requests python-dotenv

# Step 3: Create .env file
cat > .env <<EOF
FLASK_ENV=development
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=Kamikaye0@
MYSQL_DB=pulse_crm
JWT_SECRET_KEY=$(openssl rand -hex 32)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:5000/callback
EOF

echo "✅ .env created with secure JWT key"

# Step 4: Initialize database (you must already have MySQL running and user root)
echo "⚙️ Creating MySQL database 'pulse_crm'..."
mysql -u root -pKamikaye0@ -e "CREATE DATABASE IF NOT EXISTS pulse_crm;"

# Step 5: Create backend app.py
cat > app.py <<EOF
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
    app.run(debug=True)
EOF

# Step 6: Create users table
echo "🗃️ Creating users table..."
mysql -u root -pKamikaye0@ pulse_crm <<EOF
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
EOF

echo "✅ All setup complete. Run the server with:"
echo "source venv/bin/activate && flask run"

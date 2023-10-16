from flask import Flask
from flask import request, jsonify
import psycopg2

app = Flask(__name__)

# Database configuration
conn = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    host="localhost"
)
cur = conn.cursor()

print("Connection success")

# Define routes for CRUD operations
@app.route('/users', methods=['GET'])
def get_all_users():
    cur.execute('SELECT * FROM users')
    items = cur.fetchall()
    return jsonify(items)

@app.route('/user/<string:userName>', methods=['GET'])
def get_user(userName):
    print("Username is", userName)
    cur.execute('SELECT * FROM users WHERE username = %s', (userName,))
    item = cur.fetchone()
    if item:
        return jsonify(item)
    else:
        return "Item not found", 404
    
@app.route('/addUser', methods=['POST'])
def add_user():
    try:
        data = request.json
        print(data)
        cur.execute('INSERT INTO users (username, email, password, displayName) VALUES (%s, %s, %s, %s)', 
                    (data['username'], data['email'], data['password'], data['name']))
        conn.commit()

        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        conn.rollback()  # Rollback the transaction if an error occurs
        return jsonify({"error": str(e)}), 500

@app.route('/user/<string:userName>', methods=['PUT'])
def update_user(userName):
    try:
        data = request.get_json()
        name = data.get('name', None)
        email = data.get('email', None)
        password = data.get('password', None)

        if not name and not email and not password:
            return jsonify({"error": "No data provided for update"}), 400

        # Update data in the PostgreSQL database
        update_query = "UPDATE users SET"
        update_params = []

        if name:
            update_query += " displayName = %s,"
            update_params.append(name)
        if email:
            update_query += " email = %s,"
            update_params.append(email)
        if password:
            update_query += " password = %s,"
            update_params.append(password)

        update_query = update_query.rstrip(',')  # Remove the trailing comma
        update_query += " WHERE username = %s"

        update_params.append(userName)

        cur.execute(update_query, update_params)
        conn.commit()

        return jsonify({"message": "User updated successfully"}), 200
    except Exception as e:
        conn.rollback()  # Rollback the transaction if an error occurs
        return jsonify({"error": str(e)}), 500
    
@app.route('/user/<string:userName>', methods=['DELETE'])
def delete_user(userName):
    try:
        # Check if the user with the given user_id exists
        cur.execute('SELECT username FROM users WHERE username = %s', (userName,))
        existing_user = cur.fetchone()
        if not existing_user:
            return jsonify({"error": "User not found"}), 404

        # Delete the user from the PostgreSQL database
        cur.execute('DELETE FROM users WHERE username = %s', (userName,))
        conn.commit()

        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        conn.rollback()  # Rollback the transaction if an error occurs
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(debug=True)
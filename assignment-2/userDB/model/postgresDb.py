from flask import request, jsonify
import psycopg2
import hashlib

class PostgresDb():
    def __init__(self):
        # Database configuration
        self.conn = psycopg2.connect(
            dbname="postgres",
            user="postgres",
            host="db",
            port="5432",
            password="secret"
        ) 
        self.cur = self.conn.cursor()

        print("Connection success")

    # Define routes for CRUD operations
    def get_all_users(self):
        self.cur.execute('SELECT username, email, displayName, role FROM users')
        items = self.cur.fetchall()
        return jsonify(items)

    def get_user(self, userName):
        print("Username is", userName)
        self.cur.execute('SELECT username, email, displayName, role FROM users WHERE username = %s', (userName,))
        item = self.cur.fetchone()
        if item:
            return jsonify(item)
        else:
            return "Username not found", 404
        
    def add_user(self):
        try:
            data = request.json
            print(data)
            hashed_password = hashlib.shake_256(data['password'].encode()).hexdigest(50)
            self.cur.execute('INSERT INTO users VALUES (%s, %s, %s, %s, %s)', 
                        (data['username'], data['email'], hashed_password, data['name'], data['role']))
            self.conn.commit()

            return jsonify({"message": "User registered successfully"}), 201
        except Exception as e:
            self.conn.rollback()  # Rollback the transaction if an error occurs
            return jsonify({"error": str(e)}), 500

    def login(self):
        print("Login")

        data = request.json
        userName = data['username']
        self.cur.execute('SELECT password FROM users WHERE username = %s', (userName,))
        item = self.cur.fetchone()
        if not item:
            return "Username not found", 404
        
        password_attempt = hashlib.shake_256(data['password'].encode()).hexdigest(50)
        password = item[0]

        if password_attempt == password:
            return "Success", 200
        
        return "Incorrect password", 404
        
    def update_user(self, userName):
        try:
            data = request.get_json()
            name = data.get('name', None)
            email = data.get('email', None)
            password = data.get('password', None)
            role = data.get('role', None)

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
                hashed_password = hashlib.shake_256(password.encode()).hexdigest(50)
                update_params.append(hashed_password)
            if role:
                update_query += " role = %s,"
                update_params.append(role)
                

            update_query = update_query.rstrip(',')  # Remove the trailing comma
            update_query += " WHERE username = %s"

            update_params.append(userName)

            self.cur.execute(update_query, update_params)
            self.conn.commit()

            return jsonify({"message": "User updated successfully"}), 200
        except Exception as e:
            self.conn.rollback()  # Rollback the transaction if an error ocself.curs
            return jsonify({"error": str(e)}), 500
        
    def delete_user(self, userName):
        try:
            # Check if the user with the given user_id exists
            self.cur.execute('SELECT username FROM users WHERE username = %s', (userName,))
            existing_user = self.cur.fetchone()
            if not existing_user:
                return jsonify({"error": "User not found"}), 404

            # Delete the user from the PostgreSQL database
            self.cur.execute('DELETE FROM users WHERE username = %s', (userName,))
            self.conn.commit()

            return jsonify({"message": "User deleted successfully"}), 200
        except Exception as e:
            self.conn.rollback()  # Rollback the transaction if an error ocself.curs
            return jsonify({"error": str(e)}), 500
        

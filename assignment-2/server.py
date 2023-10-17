from model.postgresDb import PostgresDb
from model.tokenManager import TokenManager
from flask import Flask, request, jsonify
from flask_cors import CORS

class Server():
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)

        self.user_db = PostgresDb()
        self.token_manager = TokenManager()

        self.app.add_url_rule('/users', 'get_all_users', self.user_db.get_all_users, methods=['GET'])
        self.app.add_url_rule('/user/<string:userName>', 'get_user', self.user_db.get_user, methods=['GET'])
        self.app.add_url_rule('/addUser', 'add_user', self.user_db.add_user, methods=['POST'])
        self.app.add_url_rule('/user/<string:userName>', 'update_user', self.user_db.update_user, methods=['PUT'])
        self.app.add_url_rule('/user/<string:userName>', 'delete_user', self.user_db.delete_user, methods=['DELETE'])

        self.app.add_url_rule('/login', 'login', self.login, methods=['POST'])
        self.app.add_url_rule('/protected', 'protected', self.token_manager.check_token, methods=['GET'])

    def login(self):
        data = request.get_json()
        username = data['username']
        password = data['password']

        success, role =  self.user_db.is_login_successful(username, password)
        
        if success:
            return self.token_manager.generate_token(username, role)
        
        return jsonify({'message': 'Invalid username or password'}, 401)


    
if __name__ == "__main__":
    server = Server()
    server.app.run(debug=True)
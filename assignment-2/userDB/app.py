from model.postgresDb import PostgresDb
from flask import Flask
from flask_cors import CORS
import time

class Server():
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)

        time.sleep(2)

        self.userDb = PostgresDb()

        self.app.add_url_rule('/users', 'get_all_users', self.userDb.get_all_users, methods=['GET'])
        self.app.add_url_rule('/user/<string:userName>', 'get_user', self.userDb.get_user, methods=['GET'])
        self.app.add_url_rule('/addUser', 'add_user', self.userDb.add_user, methods=['POST'])
        self.app.add_url_rule('/login', 'login', self.userDb.login, methods=['POST'])
        self.app.add_url_rule('/user/<string:userName>', 'update_user', self.userDb.update_user, methods=['PUT'])
        self.app.add_url_rule('/user/<string:userName>', 'delete_user', self.userDb.delete_user, methods=['DELETE'])

        print("App ready")
    
if __name__ == "__main__":
    server = Server()
    server.app.run(host='0.0.0.0', port=5000)
from flask import request, jsonify
import jwt
import datetime
from .settings import JWT_SECRET_KEY

class TokenManager():
    def __init__(self):
        self.secret_key = JWT_SECRET_KEY

    def generate_token(self, username):
        payload = {
            'username': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=120)  # Token expiration time
        }
        token = jwt.encode(payload, self.secret_key, algorithm='HS256')

        return jsonify({'token': token})

    def check_token(self):
        token = request.headers.get('Authorization')
        print("Token:", token)

        try:
            payload = jwt.decode(token, self.secret_key, algorithms=['HS256'])
            return jsonify({'message': f'Hello, {payload["username"]}!'})
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}, 401)
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}, 401)
    
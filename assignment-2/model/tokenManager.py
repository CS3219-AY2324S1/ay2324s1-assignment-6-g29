from flask import request, jsonify
import jwt
import datetime
from .settings import JWT_SECRET_KEY

class TokenManager():
    def __init__(self):
        self.secret_key = JWT_SECRET_KEY

    def generate_token(self, username, role):
        payload = {
            'username': username,
            'role': role,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=120)  # Token expiration time
        }
        token = jwt.encode(payload, self.secret_key, algorithm='HS256')

        return jsonify({'token': token})

    def check_token(self):
        token = request.headers.get('Authorization')
        print("Token:", token)

        try:
            payload = jwt.decode(token, self.secret_key, algorithms=['HS256'])
            if payload["role"] == "Admin":
                return jsonify({'message': 'Access Granted'}, 200)
            else:
                return jsonify({'message': 'Permission Denied'}, 401)
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}, 401)
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}, 401)
    
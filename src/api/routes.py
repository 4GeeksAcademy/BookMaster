"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Book
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "msg": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def handle_signup():
    user = User()

    request_user = request.get_json()

    user.email = request_user["email"]
    user.password = request_user["password"]
    user.is_active = True

    db.session.add(user)
    db.session.commit()

    response_body = {
        "msg": "User successfully signed up"
    }

    return jsonify(response_body), 201

@api.route('/login', methods=['POST'])
def handle_login():
    auth = request.get_json()

    # check if the request is well done and has the correct params
    if not auth or not auth.get('email') or not auth.get('password'):
        response = {
            "msg": "Could not verify email or password. Verify your request"
        }
        return jsonify(response), 401

    # check if the user exists in the DB
    user = User.query.filter_by(email=auth.get("email")).first()
    if not user:
        response = {
            "msg": "User does not exist. Check your credentials again or signup!"
        }
        return jsonify(response), 401
    
    # check if the password is correct
    if user.password == auth.get("password"):
        #create token with jwt
        access_token = create_access_token(identity=auth.get("email"))
        response = {
            "user": user.serialize(),
            "token": access_token
        }
        return response, 201
    else:
        response = {
            "msg": "Incorrect password"
        }
        return response, 403

@api.route('/private', methods=['GET'])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    user_email = get_jwt_identity()
    return jsonify(logged_in_as=user_email), 200

@api.route('/agregarlibro', methods=['POST'])
def bookAdd():
    name=request.json["name"] 
    description = request.json["description"]  
    price = request.json["price"]  
     
    libros = Book(name,description,price)
    db.session.add(libros)
    db.session.commit()
    response_body = {
        "msg": "Libro añadido"
    }
    return jsonify(response_body),200

@api.route('/listalibros',methods =['GET'])
def listBook():
    all_books = Book.query.all()
    # return jsonify(all_books)
    response_body = {
        "msg": "Libro añadido"
    }
    print(all_books)
    return jsonify(response_body),200

@api.route('/detalleslibros/<id>',methods =['GET'])
def bookDetails(id):
    book = Book.query.get(id)
    return jsonify(book)
 
@api.route('/actualizarlibro/<id>',methods = ['PUT'])
def bookUpdate(id):
    book = Book.query.get(id)
 
    name = request.json['name']
    description = request.json["description"]  
    price = request.json["price"]
 
    book.name = name
    book.description = description
    book.price = price

    db.session.commit()
    return jsonify(book)
 
@api.route('/borrarlibro/<id>',methods=['DELETE'])
def bookDelete(id):
    book = Book.query.get(id)
    db.session.delete(book)
    db.session.commit()
    return jsonify(book)
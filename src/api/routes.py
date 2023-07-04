"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
<<<<<<< HEAD

from .models import db, User, Libro, CartItem
from .utils import generate_sitemap, APIException
=======
from flask_jwt_extended import JWTManager
>>>>>>> origin/Develop

api = Blueprint('api', __name__)
api.config = {}

# Configuración de la API
api.config['JWT_SECRET_KEY'] = 'clave-secreta'  # Cambia esto por una clave secreta más segura
jwt = JWTManager(api)

<<<<<<< HEAD
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
=======

>>>>>>> origin/Develop

# Decorador personalizado para verificar el rol de administrador
@api.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = User.query.all()
    serialized_usuarios = [usuario.serialize() for usuario in usuarios]
    return jsonify(serialized_usuarios), 200




@api.route('/signup', methods=['POST'])
def handle_signup():
    user = User()

    request_user = request.get_json()

    user.email = request_user["email"]
    user.password = request_user["password"]
   
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
        # create token with jwt
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

<<<<<<< HEAD
=======
# Ruta protegida que requiere autenticación y permiso de administrador

>>>>>>> origin/Develop

@api.route('/libros', methods=['GET'])
def get_libros():
    libros = Libro.query.all()
    serialized_libros = [libro.serialize() for libro in libros]
    return jsonify(serialized_libros), 200


@api.route('/libros', methods=['POST'])
def create_libro():
    imagen = request.files.get('imagen')
    titulo = request.json.get('titulo')
    autor = request.json.get('autor')
    categoria = request.json.get('categoria')
    detalle = request.json.get('detalle')
    precio = request.json.get('precio')
<<<<<<< HEAD

    libro = Libro(titulo=titulo, autor=autor, categoria=categoria,
                  detalle=detalle, precio=precio)
=======
    stock = request.json.get('stock')
    libro = Libro(imagen=imagen,titulo=titulo, autor=autor, categoria=categoria, detalle=detalle, precio=precio, stock=stock)
>>>>>>> origin/Develop
    db.session.add(libro)
    db.session.commit()

    return jsonify(libro.serialize()), 201


@api.route('/libros/<int:libro_id>', methods=['GET'])
def get_libro(libro_id):
    libro = Libro.query.get(libro_id)
    if libro:
        return jsonify(libro.serialize()), 200
    else:
        return jsonify({'message': 'Libro not found'}), 404


@api.route('/libros/<int:libro_id>', methods=['PUT'])
def update_libro(libro_id):
    libro = Libro.query.get(libro_id)
    if libro:
        libro.titulo = request.json.get('titulo')
        libro.autor = request.json.get('autor')
        libro.categoria = request.json.get('categoria')
        libro.detalle = request.json.get('detalle')
        libro.precio = request.json.get('precio')
        libro.stock = request.json.get('stock')
        db.session.commit()
        return jsonify(libro.serialize()), 200
    else:
        return jsonify({'message': 'Libro not found'}), 404


@api.route('/libros/<int:libro_id>', methods=['DELETE'])
def delete_libro(libro_id):
    libro = Libro.query.get(libro_id)
    if libro:
        db.session.delete(libro)
        db.session.commit()
        return jsonify({'message': 'Libro deleted'}), 200
    else:
        return jsonify({'message': 'Libro not found'}), 404

# carrito de compras


@api.route('/cart', methods=['GET'])
def get_cart():
    cart_items = CartItem.query.all()
    serialized_cart_items = [item.serialize() for item in cart_items]
    return jsonify(serialized_cart_items), 200


@api.route('/cart', methods=['POST'])
def create_cart():
    libro_id = request.json.get('libro_id')
    user_id = request.json.get('user_id')
    quantity = request.json.get('quantity')

    libro = Libro.query.get(libro_id)
    user = User.query.get(user_id)

    if libro and user:
        cart_item = CartItem(libro=libro, user=user, quantity=quantity)
        db.session.add(cart_item)
        db.session.commit()

        return jsonify(cart_item.serialize()), 201
    else:
        return jsonify({'message': 'Libro or User not found'}), 404


@api.route('/cart/<int:cart_item_id>', methods=['PUT'])
def update_cart(cart_item_id):
    cart_item = CartItem.query.get(cart_item_id)
    if cart_item:
        cart_item.quantity = request.json.get('quantity')
        db.session.commit()
        return jsonify(cart_item.serialize()), 200
    else:
        return jsonify({'message': 'Cart item not found'}), 404


@api.route('/cart/<int:cart_item_id>', methods=['DELETE'])
def delete_cart(cart_item_id):
    cart_item = CartItem.query.get(cart_item_id)
    if cart_item:
        db.session.delete(cart_item)
        db.session.commit()
        return jsonify({'message': 'Cart item deleted'}), 200
    else:
        return jsonify({'message': 'Cart item not found'}), 404


@api.errorhandler(APIException)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!

    db.init_app(app)
    with app.app_context():
        db.create_all()

    app.register_blueprint(api)

    return app

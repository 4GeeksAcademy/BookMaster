"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Libro,CartItem
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from .models import db, User, Libro, CartItem, Direccion
from .utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager





app = Flask(__name__)
CORS(app)


# Configuración del JWTManager
app.config['JWT_SECRET_KEY'] = 'clave-secreta'
jwt = JWTManager(app)

# Blueprint
api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    return jsonify({'message': 'Hola'}), 200

# Decorador personalizado para verificar el rol de administrador

@api.route('/usuarios/roles/<int:user_id>', methods=['GET'])
def get_user_roles(user_id):
    user = User.query.get(user_id)
    if user:
        roles = user.role  # Suponiendo que tienes una relación "roles" en tu modelo User
        serialized_roles = [role.serialize() for role in roles]
        return jsonify(serialized_roles), 200
    else:
        return jsonify({'message': 'User not found'}), 404
    
@api.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = User.query.all()
    serialized_usuarios = [usuario.serialize() for usuario in usuarios]
    return jsonify(serialized_usuarios), 200


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"msg": "Could not find user with email"}), 401
  
    access_token = create_access_token(identity=email)
    response_body = {
        "access_token": access_token,
        "user": user.serialize()  # Incluye el objeto de usuario en la respuesta
    }
    return jsonify(response_body), 200

@api.route("/signup", methods=["POST"])
def signup():
    body = request.get_json()

    user = User.query.filter_by(email=body["email"]).first()

    if user is None:
        user = User(email=body["email"], password=body["password"])
        db.session.add(user)
        db.session.commit()
        
        access_token = create_access_token(identity=body["email"])
        
        response_body = {
            "msg": "Usuario creado",
            "access_token": access_token,
            "user": user.serialize()
        }
        
        return jsonify(response_body), 200
    else:
        return jsonify({"msg": "Ya se encuentra un usuario creado con ese correo"}), 409


@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    response_body = {
        "msg": "Usuario Logeado",
        "user": user.serialize()  # Incluye el objeto de usuario en la respuesta
    }

    return jsonify(response_body), 200


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
    stock = request.json.get('stock')

    libro = Libro(imagen=imagen, titulo=titulo, autor=autor,
                  categoria=categoria, detalle=detalle, precio=precio, stock=stock)

    db.session.add(libro)
    db.session.commit()

    return jsonify(libro.serialize()), 201
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
def get_cart_items():
    cart_items = CartItem.query.all()
    serialized_cart_items = [cart_item.serialize() for cart_item in cart_items]
    return jsonify(serialized_cart_items), 200


@api.route('/cart', methods=['POST'])
def create_cart():
    try:
        cart_items = request.get_json()  # Obtener los elementos del carrito del cuerpo de la solicitud

        # Procesar los elementos del carrito y guardarlos en la base de datos
        for item in cart_items:
            libro_id = item.get('libro_id')
            user_id = item.get('user_id')
            quantity = item.get('cantidad')

            libro = Libro.query.get(libro_id)
            user = User.query.get(user_id)

            if libro and user:
                cart_item = CartItem(libro=libro, user=user, quantity=quantity)
                db.session.add(cart_item)

        db.session.commit()
        return jsonify({'message': 'Cart created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error creating cart', 'error': str(e)}), 500


@api.route('/cart/<int:cart_item_id>', methods=['DELETE'])
def delete_cart_item(cart_item_id):
    cart_item = CartItem.query.get(cart_item_id)

    if cart_item:
        db.session.delete(cart_item)
        db.session.commit()

        return jsonify({'message': 'Cart item deleted'}), 200
    else:
        return jsonify({'message': 'Cart item not found'}), 404


@api.route('/cart/<int:cart_item_id>', methods=['PUT'])
def update_cart_item(cart_item_id):
    cart_item = CartItem.query.get(cart_item_id)
    quantity = request.json.get('quantity')

    if cart_item:
        cart_item.quantity = quantity
        db.session.commit()

        return jsonify(cart_item.serialize()), 200
    else:
        return jsonify({'message': 'Cart item not found'}), 404

    
@api.route('/direcciones', methods=['GET'])
def get_direcciones():
    direcciones = Direccion.query.all()
    serialized_direcciones = [direccion.to_dict() for direccion in direcciones]
    return jsonify(serialized_direcciones), 200


@api.route('/direcciones', methods=['POST'])
def create_direccion():
    direccion_data = request.get_json()
    direccion = Direccion(direccion=direccion_data['direccion'],
                          ciudad=direccion_data['ciudad'],
                          pais=direccion_data['pais'])
    db.session.add(direccion)
    db.session.commit()
    return jsonify(direccion.to_dict()), 201


@api.route('/direcciones/<int:direccion_id>', methods=['GET'])
def get_direccion(direccion_id):
    direccion = Direccion.query.get(direccion_id)
    if direccion:
        return jsonify(direccion.to_dict())
    else:
        return jsonify({'error': 'Dirección no encontrada'}), 404


@api.route('/direcciones/<int:direccion_id>', methods=['PUT'])
def update_direccion(direccion_id):
    direccion_data = request.get_json()
    direccion = Direccion.query.get(direccion_id)
    if direccion:
        direccion.direccion = direccion_data['direccion']
        direccion.ciudad = direccion_data['ciudad']
        direccion.pais = direccion_data['pais']
        db.session.commit()
        return jsonify(direccion.to_dict())
    else:
        return jsonify({'error': 'Dirección no encontrada'}), 404


@api.route('/direcciones/<int:direccion_id>', methods=['DELETE'])
def delete_direccion(direccion_id):
    direccion = Direccion.query.get(direccion_id)
    if direccion:
        db.session.delete(direccion)
        db.session.commit()
        return '', 204
    else:
        return jsonify({'error': 'Dirección no encontrada'}), 404


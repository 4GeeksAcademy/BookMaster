from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from api.models import db, User, Libro, CartItem, Direccion
from api.utils import generate_sitemap, APIException

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
        "logged_in_as": user.email  # Incluye el objeto de usuario en la respuesta
    }
    return jsonify(response_body), 200

@api.route('/libros', methods=['GET'])
def get_libros():
    libros = Libro.query.all()
    serialized_libros = [libro.serialize() for libro in libros]
    return jsonify(serialized_libros), 200

@api.route('/libros', methods=['POST'])
def create_libro():
    data = request.get_json()
    libro = Libro(**data)
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
@jwt_required()
def get_cart_items():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if user:
        cart_items = CartItem.query.filter_by(user_id=user.id).all()
        serialized_cart_items = [cart_item.serialize() for cart_item in cart_items]
        return jsonify(serialized_cart_items), 200
    else:
        return jsonify({'message': 'User not found'}), 404

@api.route('/cart', methods=['POST'])
@jwt_required()
def create_cart():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    libro_id = request.json.get('libro_id')
    quantity = request.json.get('quantity')
    libro = Libro.query.get(libro_id)
    if user and libro:
        cart_item = CartItem.query.filter_by(libro_id=libro.id, user_id=user.id).first()
        if cart_item:
            cart_item.quantity += quantity
        else:
            cart_item = CartItem(libro=libro, user=user, quantity=quantity)
            db.session.add(cart_item)
        db.session.commit()
        return jsonify(cart_item.serialize()), 201
    else:
        return jsonify({'message': 'User or libro not found'}), 404

@api.route('/cart/<int:cart_item_id>', methods=['PUT'])
@jwt_required()
def update_cart_item(cart_item_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    cart_item = CartItem.query.get(cart_item_id)
    quantity = request.json.get('quantity')
    if cart_item and user and cart_item.user_id == user.id:
        cart_item.quantity = quantity
        db.session.commit()
        return jsonify(cart_item.serialize()), 200
    else:
        return jsonify({'message': 'Cart item not found or unauthorized'}), 404

@api.route('/cart/<int:cart_item_id>', methods=['DELETE'])
@jwt_required()
def delete_cart_item(cart_item_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    cart_item = CartItem.query.get(cart_item_id)
    if cart_item and user and cart_item.user_id == user.id:
        db.session.delete(cart_item)
        db.session.commit()
        return jsonify({'message': 'Cart item deleted'}), 200
    else:
        return jsonify({'message': 'Cart item not found or unauthorized'}), 404

# direcciones de usuario

@api.route('/direcciones', methods=['POST'])
@jwt_required()
def create_direccion():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    
    if user:
        data = request.get_json()
        calle = data.get('calle')
        pais = data.get('pais')
        ciudad = data.get('ciudad')

        nueva_direccion = Direccion(pais=pais, ciudad=ciudad, calle=calle, user=user)
        db.session.add(nueva_direccion)
        db.session.commit()

        return jsonify(nueva_direccion.to_dict()), 201
    else:
        return jsonify({'error': 'User not found'}), 404

@api.route('/direcciones', methods=['GET'])
@jwt_required()
def get_direcciones():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    
    if user:
        direcciones = Direccion.query.filter_by(user_id=user.id).all()
        serialized_direcciones = [direccion.to_dict() for direccion in direcciones]
        return jsonify(serialized_direcciones), 200
    else:
        return jsonify({'error': 'User not found'}), 404

@api.route('/direcciones/<int:direccion_id>', methods=['GET'])
@jwt_required()
def get_direccion(direccion_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    
    if user:
        direccion = Direccion.query.filter_by(id=direccion_id, user_id=user.id).first()
        if direccion:
            return jsonify(direccion.to_dict()), 200
        else:
            return jsonify({'error': 'Dirección no encontrada o no autorizada'}), 404
    else:
        return jsonify({'error': 'User not found'}), 404

@api.route('/direcciones/<int:direccion_id>', methods=['PUT'])
@jwt_required()
def update_direccion(direccion_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    
    if user:
        direccion = Direccion.query.filter_by(id=direccion_id, user_id=user.id).first()
        if direccion:
            data = request.get_json()
            direccion.calle = data.get('calle', direccion.calle)
            direccion.ciudad = data.get('ciudad', direccion.ciudad)
            direccion.pais = data.get('pais', direccion.pais)
            db.session.commit()
            return jsonify(direccion.to_dict()), 200
        else:
            return jsonify({'error': 'Dirección no encontrada o no autorizada'}), 404
    else:
        return jsonify({'error': 'User not found'}), 404

@api.route('/direcciones/<int:direccion_id>', methods=['DELETE'])
@jwt_required()
def delete_direccion(direccion_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    
    if user:
        direccion = Direccion.query.filter_by(id=direccion_id, user_id=user.id).first()
        if direccion:
            db.session.delete(direccion)
            db.session.commit()
            return '', 204
        else:
            return jsonify({'error': 'Dirección no encontrada o no autorizada'}), 404
    else:
        return jsonify({'error': 'User not found'}), 404

# Registrando el Blueprint
app.register_blueprint(api)

# Iniciando la aplicación Flask
if __name__ == "_main_":
    db.create_all()
    app.run()
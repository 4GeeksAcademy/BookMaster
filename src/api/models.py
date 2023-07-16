from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='usuario')
    cart_items = db.relationship('CartItem', backref='user', cascade="all, delete-orphan")
    direcciones = db.relationship('Direccion', backref='user', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "role": self.role
        }

    def is_admin(self):
        return self.role == 'admin'

class Libro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    imagen = db.Column(db.String(255), nullable=True)
    titulo = db.Column(db.String(100), nullable=False)
    autor = db.Column(db.String(100), nullable=False)
    categoria = db.Column(db.String(100), nullable=False)
    detalle = db.Column(db.Text, nullable=False)
    precio = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    cart_items = db.relationship('CartItem', backref='libro', cascade="all, delete-orphan")

    def __init__(self, titulo, autor, categoria, detalle, precio, stock, imagen):
        self.imagen = imagen
        self.titulo = titulo
        self.autor = autor
        self.categoria = categoria
        self.detalle = detalle
        self.precio = precio
        self.stock = stock

    def serialize(self):
        return {
            "id": self.id,
            "imagen": self.imagen,
            "titulo": self.titulo,
            "autor": self.autor,
            "categoria": self.categoria,
            "detalle": self.detalle,
            "precio": self.precio,
            "stock": self.stock,
        }

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    libro_id = db.Column(db.Integer, db.ForeignKey('libro.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def __init__(self, libro, user, quantity):
        self.libro = libro
        self.user = user
        self.quantity = quantity

    def serialize(self):
        serialized_data = {
            "id": self.id,
            "libro": self.libro.serialize(),
            "user": self.user.serialize(),
            "quantity": self.quantity,
            "stock": self.libro.stock,
            "imagen": self.libro.imagen,
            "libro_id": self.libro.id
        }
        if hasattr(self.libro, 'precio'):
            serialized_data["precio"] = self.libro.precio
        return serialized_data

class Direccion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    calle = db.Column(db.String(255), nullable=False)
    ciudad = db.Column(db.String(100), nullable=False)
    pais = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'direccion': self.calle,
            'ciudad': self.ciudad,
            'pais': self.pais,
            "user": self.user.serialize() if self.user else None
        }

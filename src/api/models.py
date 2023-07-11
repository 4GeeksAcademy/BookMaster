from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    password = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, it's a security breach
        }


class Libro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    imagen = db.Column(db.String(255), nullable=True)
    titulo = db.Column(db.String(100), nullable=False)
    autor = db.Column(db.String(100), nullable=False)
    categoria = db.Column(db.String(100), nullable=False)
    detalle = db.Column(db.Text, nullable=False)
    precio = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)

    def __init__(self, titulo, autor, categoria, detalle, precio, stock, imagen=None):
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
            "precio": self.precio
        }

# Carrito de compras

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    libro_id = db.Column(db.Integer, db.ForeignKey('libro.id'), nullable=False)
    libro = db.relationship('Libro', backref='cart_items')
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref='cart_items')
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
            "imagen": self.libro.imagen
        }
        if hasattr(self.libro, 'precio'):
            serialized_data["precio"] = self.libro.precio
        return serialized_data

class Direccion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    direccion = db.Column(db.String(255), nullable=False)
    ciudad = db.Column(db.String(100), nullable=False)
    codigo_postal = db.Column(db.String(20), nullable=False)
    pais = db.Column(db.String(100), nullable=False)
    tipo = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'direccion': self.direccion,
            'ciudad': self.ciudad,
            'codigo_postal': self.codigo_postal,
            'pais': self.pais,
            'tipo': self.tipo
        }

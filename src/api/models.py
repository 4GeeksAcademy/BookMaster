from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __init__(self, email, password):
        self.email = email
        self.password = password

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }


class Libro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    autor = db.Column(db.String(100), nullable=False)
    categoria = db.Column(db.String(100), nullable=False)
    detalle = db.Column(db.Text, nullable=False)
    precio = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def __init__(self, titulo, autor, categoria, detalle, precio, quantity):
        self.titulo = titulo
        self.autor = autor
        self.categoria = categoria
        self.detalle = detalle
        self.precio = precio
        self.quantity = quantity

    def serialize(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "autor": self.autor,
            "categoria": self.categoria,
            "detalle": self.detalle,
            "precio": self.precio,
            "quantity": self.quantity
        }


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
        return {
            "id": self.id,
            "libro": self.libro.serialize(),
            "user": self.user.serialize(),
            "quantity": self.quantity
        }
    

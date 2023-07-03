from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
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
            "precio": self.precio,
            "stock": self.stock,
            "imagen": self.imagen
        }
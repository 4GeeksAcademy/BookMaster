from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    password = db.Column(db.String(80), nullable=False)
<<<<<<< HEAD
    role = db.Column(db.String(50), nullable=False, default='usuario')  # Utilizando un campo de texto para el rol
=======
>>>>>>> cb6f7fb848a05361ccfd8ea129e02c823847032c

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "role": self.role
            # No serialices la contraseña, es un riesgo de seguridad
        }

<<<<<<< HEAD
    def is_admin(self):
        return self.role == 'admin'
=======
>>>>>>> cb6f7fb848a05361ccfd8ea129e02c823847032c

class Libro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    imagen = db.Column(db.String(255))
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
            
        }

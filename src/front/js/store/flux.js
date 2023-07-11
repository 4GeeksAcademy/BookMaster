const API_URL = "https://stalinnarvaez-silver-space-enigma-qjvgj5x95gxh9wqx-3001.preview.app.github.dev/api";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4ODg2MTY3NywianRpIjoiMDRmZjBiMTAtODMwMy00ZmQzLTg0ZDMtOWE5ZmExZGM5ZWU0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InN0YWxpbkBpYm4uY29tIiwibmJmIjoxNjg4ODYxNjc3LCJleHAiOjE2ODg4NjI1Nzd9.HyEgwtdCjmB24x-k5BYs5euU-Uq8Eur_cKNlGvMHUeU";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      libros: [],
      usuarios: [],
      car: [],
      favorite: []
    },
    actions: {
      añadirCarrito: async (id,titulo, precio, cantidad) => {
        const store = getStore();
        const isItemInCart = store.car.some(item => item.titulo === titulo);

        if (!isItemInCart) {
          const newItem = {
            id: id,
            titulo: titulo,
            precio: precio,
            cantidad: cantidad, 
          };
          const updatedCart = [...store.car, newItem];
          setStore({ car: updatedCart });

          try {
            const response = await fetch(`${API_URL}/cart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                libro_id: newItem.id,
                user_id: 1,
                quantity: newItem.cantidad
              })
            });            

            if (response.ok) {
              // El elemento se agregó correctamente al carrito de compras en la base de datos
            } else {
              console.log("Error al agregar el elemento al carrito de compras en la base de datos");
            }
          } catch (error) {
            console.log(
              "Error al realizar la solicitud POST al agregar el elemento al carrito de compras",
              error
            );
          }
        }
      },

      borrarCarrito: item => {
        const store = getStore();
        const updatedCart = store.car.filter(el => el.titulo !== item.titulo);
        setStore({ car: updatedCart });
      },

      aumentarCantidad: titulo => {
        const store = getStore();
        const updatedCart = store.car.map(item => {
          if (item.titulo === titulo) {
            return {
              ...item,
              cantidad: item.cantidad + 1
            };
          }
          return item;
        });
        setStore({ car: updatedCart });
      },

      disminuirCantidad: titulo => {
        const store = getStore();
        const updatedCart = store.car.map(item => {
          if (item.titulo === titulo && item.cantidad > 1) {
            return {
              ...item,
              cantidad: item.cantidad - 1
            };
          }
          return item;
        });

        setStore({ car: updatedCart });
      },

      añadirFavoritos: item => {
        const store = getStore();
        const isItemInFavorites = store.favorite.some(favoriteItem => favoriteItem.titulo === item.titulo);

        if (!isItemInFavorites) {
          const updatedFavorites = [...store.favorite, item];
          setStore({ favorite: updatedFavorites });
        }
      },

      borrarFavoritos: item => {
        const store = getStore();
        const updatedFavorites = store.favorite.filter(el => el.titulo !== item.titulo);
        setStore({ favorite: updatedFavorites });
      },

      getMessage: async () => {
        try {
          const resp = await fetch(`${API_URL}/hello`);
          const data = await resp.json();
        } catch (error) {
          console.log("Error al cargar el mensaje desde el backend", error);
        }
      },

      getUsuarios: async () => {
        try {
          const response = await fetch(`${API_URL}/usuarios`);
          if (response.ok) {
            const data = await response.json();
            setStore({ usuarios: data });
          }
        } catch (error) {
          console.log("Error al obtener los usuarios", error);
        }
      },

      getLibros: async () => {
        try {
          const response = await fetch(`${API_URL}/libros`);
          if (response.ok) {
            const data = await response.json();
            setStore({ libros: data });
          }
        } catch (error) {
          console.log("Error al obtener los libros", error);
        }
      },

      addLibro: async libro => {
        try {
          const response = await fetch(`${API_URL}/libros`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(libro)
          });
          if (response.ok) {
            const data = await response.json();
            const store = getStore();
            const updatedLibros = [...store.libros, data];
            setStore({ libros: updatedLibros });
          }
        } catch (error) {
          console.log("Error al crear el libro", error);
        }
      },

      editLibro: async (id, libro) => {
        try {
          const response = await fetch(`${API_URL}/libros/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(libro)
          });
          if (response.ok) {
            const data = await response.json();
            const store = getStore();
            const updatedLibros = store.libros.map(item => (item.id === id ? data : item));
            setStore({ libros: updatedLibros });
          }
        } catch (error) {
          console.log("Error al editar el libro", error);
        }
      },

      deleteLibro: async id => {
        try {
          const response = await fetch(`${API_URL}/libros/${id}`, {
            method: "DELETE"
          });
          if (response.ok) {
            const store = getStore();
            const updatedLibros = store.libros.filter(item => item.id !== id);
            setStore({ libros: updatedLibros });
          }
        } catch (error) {
          console.log("Error al eliminar el libro", error);
        }
      },

      getCarrito: async () => {
        try {
          const response = await fetch(`${API_URL}/cart`);
          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            throw new Error("Error al obtener el carrito");
          }
        } catch (error) {
          console.log("Error al obtener elcarrito", error);
          throw new Error("Error al obtener el carrito");
        }
      },
    }
  };
};

export default getState;
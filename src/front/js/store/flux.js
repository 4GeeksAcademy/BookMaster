const API_URL = "https://stalinnarvaez-reimagined-waddle-qjvgj5x9wp7f4jx-3001.preview.app.github.dev/api";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      libros: [],
      usuarios: [],
      car: [],
      favorite: []
    },
    actions: {
      añadirCarrito: async (id, titulo, precio, cantidad) => {
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
              getActions().getCarrito(); // Obtener los datos actualizados del carrito
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
      getCarrito: async () => {
        try {
          const response = await fetch(`${API_URL}/cart`);
          if (response.ok) {
            const data = await response.json();
            console.log("Datos del carrito:", data); // Imprime los datos en la consola

            // Verificar la estructura de los datos del carrito
            data.forEach(item => {
              console.log(item.libro);
            });

            // Actualiza el estado del carrito en el contexto
            setStore({ car: data });

            return data;
          } else {
            throw new Error("Error al obtener el carrito");
          }
        } catch (error) {
          console.log("Error al obtener el carrito", error);
          throw new Error("Error al obtener el carrito");
        }
      },
      eliminarElementoCarrito: async (cartItemId) => {
        try {
          console.log("ID del elemento a eliminar:", cartItemId); // Verificar el ID antes de eliminar

          const response = await fetch(`${API_URL}/cart/${cartItemId}`, {
            method: "DELETE",
          });
          if (response.ok) {
            // Elemento del carrito eliminado correctamente
            const store = getStore();
            const updatedCarrito = store.car.filter(item => item.id !== cartItemId);
            setStore({ car: updatedCarrito });
          } else {
            console.log("Error al eliminar el elemento del carrito");
          }
        } catch (error) {
          console.log("Error al realizar la solicitud DELETE para eliminar el elemento del carrito", error);
        }
      },
      editarCarrito: async (cartItemId, cartItem) => {
        try {
          console.log("ID del carrito a editar:", cartItemId);
          console.log("Valor de quantity:", cartItem.quantity);
          const response = await fetch(`${API_URL}/cart/${cartItemId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ quantity: cartItem.quantity })
          });
          if (response.ok) {
            const data = await response.json();
            const store = getStore();
            const updatedCartItems = store.car.map(item => (item.id === cartItemId ? data : item));
            setStore({ carrito: updatedCartItems });
          } else {
            throw new Error("Error al editar el carrito");
          }
        } catch (error) {
          console.log("Error al editar el carrito", error);
          throw new Error("Error al editar el carrito");
        }
      },
      
      // setCartItemId: (cartItemId) => {
      //   setStore({ cartItemId: cartItemId });
      // },

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
          console.log(data);
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
          } else {
            throw new Error("Error al obtener los usuarios");
          }
        } catch (error) {
          console.log("Error al obtener los usuarios", error);
          throw new Error("Error al obtener los usuarios");
        }
      },
      getLibros: async () => {
        try {
          const response = await fetch(`${API_URL}/libros`);
          if (response.ok) {
            const data = await response.json();
            setStore({ libros: data });
          } else {
            throw new Error("Error al obtener los libros");
          }
        } catch (error) {
          console.log("Error al obtener los libros", error);
          throw new Error("Error al obtener los libros");
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
          } else {
            throw new Error("Error al crear el libro");
          }
        } catch (error) {
          console.log("Error al crear el libro", error);
          throw new Error("Error al crear el libro");
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
          } else {
            throw new Error("Error al editar el libro");
          }
        } catch (error) {
          console.log("Error al editar el libro", error);
          throw new Error("Error al editar el libro");
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
          } else {
            throw new Error("Error al eliminar el libro");
          }
        } catch (error) {
          console.log("Error al eliminar el libro", error);
          throw new Error("Error al eliminar el libro");
        }
      },
    }
  };
};

export default getState;
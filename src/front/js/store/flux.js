const API_URL = "https://stalinnarvaez-silver-space-enigma-qjvgj5x95gxh9wqx-3001.preview.app.github.dev/api";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      libros: [
        {
          titulo: "Libro 1",
          autor: "Autor 1",
          categoria: "Categoría 1",
          detalle: "Detalles del libro 1",
          precio: 9.99,
          stock: 13
        },
        {
          titulo: "Libro 2",
          autor: "Autor 2",
          categoria: "Categoría 2",
          detalle: "Detalles del libro 2",
          precio: 14.99,
          stock: 13
        },
        {
          titulo: "Libro 3",
          autor: "Autor 3",
          categoria: "Categoría 3",
          detalle: "Detalles del libro 3",
          precio: 19.99,
          stock: 13
        }
      ],
      usuarios: [],
      car: [],
      favorite: []
    },
    actions: {
      añadirCarrito: async (titulo, precio, cantidad) => {
        const store = getStore();
        const isItemInCart = store.car.some(item => item.titulo === titulo);
      
        if (!isItemInCart) {
          const newItem = {
            titulo: titulo,
            precio: precio,
            cantidad: cantidad // Actualizar la cantidad con el valor pasado como parámetro
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
                libro_id: newItem.id, // Reemplaza "newItem.id" con la propiedad real del libro en el carrito
                user_id: user_id // Reemplaza "user_id" con el ID real del usuario actual           
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

      getUsuarios: async () => {
        try {
          const response = await fetch(`${API_URL}/usuarios`);
          if (response.ok) {
            const data = await response.json();
            // Actualizar el estado con los usuarios obtenidos
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

      // getCarrito: async () => {
      //   try {
      //     const response = await fetch(`${API_URL}/cart`);
      //     if (response.ok) {
      //       const data = await response.json();
      //       return data;
      //     } else {
      //       throw new Error("Error al obtener el carrito");
      //     }
      //   } catch (error) {
      //     console.log("Error al obtener el carrito", error);
      //     throw new Error("Error al obtener el carrito");
      //   }
      // },
      sendCartData: async (cartData) => {
        try {
          const response = await fetch(`${API_URL}/cart`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cartData),
          });
          if (response.ok) {
            // Manejar la respuesta exitosa del backend si es necesario
            console.log("Cart data sent successfully");
          } else {
            // Manejar el error si la respuesta no es exitosa
            console.log("Error sending cart data to the backend");
          }
        } catch (error) {
          // Manejar el error de la solicitud
          console.log("Error sending cart data to the backend", error);
        }
      },

      // añadirCarrito: async carritoItem => {
      //    try {
      //      const response = await fetch(`${API_URL}/cart`, {
      //        method: "POST",
      //        headers: {
      //          "Content-Type": "application/json"
      //        },
      //        body: JSON.stringify(carritoItem)
      //      });
      //      if (response.ok) {
      //        const data = await response.json();
      //        return data;
      //      } else {
      //        throw new Error("Error al añadir al carrito");
      //      }
      //    } catch (error) {
      //      console.log("Error al añadir al carrito", error);
      //      throw new Error("Error al añadir al carrito");
      //    }
      //  },

      // borrarCarrito: async carritoItemId => {
      //   try {
      //     const response = await fetch(`${API_URL}/cart/${carritoItemId}`, {
      //       method: "DELETE"
      //     });
      //     if (response.ok) {
      //       return true;
      //     } else {
      //       throw new Error("Error al borrar del carrito");
      //     }
      //   } catch (error) {
      //     console.log("Error al borrar del carrito", error);
      //     throw new Error("Error al borrar del carrito");
      //   }
      // },

      // editarCarrito: async (carritoItemId, carritoItem) => {
      //   try {
      //     const response = await fetch(`${API_URL}/cart/${carritoItemId}`, {
      //       method: "PUT",
      //       headers: {
      //         "Content-Type": "application/json"
      //       },
      //       body: JSON.stringify(carritoItem)
      //     });
      //     if (response.ok) {
      //       const data = await response.json();
      //       return data;
      //     } else {
      //       throw new Error("Error al editar el carrito");
      //     }
      //   } catch (error) {
      //     console.log("Error al editar el carrito", error);
      //     throw new Error("Error al editar el carrito");
      //   }
      // }
    }
  };
};
export default getState;
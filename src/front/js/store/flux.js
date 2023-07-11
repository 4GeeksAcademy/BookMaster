
const API_URL = "https://tomasventura17-studious-fiesta-pvv6q4xq95xhrv4w-3001.preview.app.github.dev/api";


const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      libros: [
        {
          imagen:"",
          titulo: "Libro 1",
          autor: "Autor 1",
          categoria: "Categoría 1",
          detalle: "Detalles del libro 1",
          precio: 9.99,
          stock: 13
        },
        {
          imagen:"",
          titulo: "Libro 2",
          autor: "Autor 2",
          categoria: "Categoría 2",
          detalle: "Detalles del libro 2",
          precio: 14.99,
          stock: 13
        },
        {
          imagen:"",
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
      favorite: [],
      direcciones: []
    },
    actions: {
      logout: () => {
        console.log("logout")
        setStore({auth: false})
        localStorage.removeItem("token");
      },
  
      login: (email, password) => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password
          })
        };
      
        return fetch(`${API_URL}/login`, requestOptions)
          .then(response => {
            if (response.status === 200) {
              return response.json(); // Devuelve la respuesta como objeto JSON
            } else {
              throw new Error('Error occurred during login');
            }
          })
          .then(data => {
            if (data.user && data.access_token) {
              const token = data.access_token; // Obtén el token de la respuesta
              return { user: data.user, token: token }; // Retorna el objeto user y el token
            } else {
              throw new Error('User object or token is missing in the response');
            }
          })
          .catch(error => {
            throw new Error(`Error occurred during login: ${error.message}`);
          });
      },
      
  
      signup: (email, password) => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: password
          })
        };
      
        return fetch(`${API_URL}/signup`, requestOptions)
          .then(response => { 
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error('Error occurred during signup');
            }
          })
          .then(data => {
            if (data.access_token) {
              const token = data.access_token; // Obtén el token de la respuesta
              // Realiza las acciones necesarias con el token
              console.log(`Token: ${token}`);
            } else {
              throw new Error('Token is missing in the response');
            }
          })
          .catch(error => {
            throw new Error(`Error occurred during signup: ${error.message}`);
          });
      },
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
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.token}` // Agrega el token al encabezado de la solicitud
              },
              body: JSON.stringify({
                libro_id: newItem.id,
                user_id: store.token, // Utiliza el token como user_id
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
      sendCartData: async () => {
        try {
          const store = getStore();
          const response = await fetch(`${API_URL}/cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(store.car),
          });
      
          if (response.ok) {
            // El carrito se envió correctamente al backend
            console.log("Carrito enviado correctamente al backend");
            // Aquí puedes realizar acciones adicionales después de enviar el carrito, si es necesario
          } else {
            console.log("Error al enviar el carrito al backend");
          }
        } catch (error) {
          console.log("Error al realizar la solicitud POST para enviar el carrito al backend", error);
        }
      },

getDirecciones: async () => {
  try {
    const response = await fetch(`${API_URL}/direcciones`);
    if (response.ok) {
      const data = await response.json();
      setStore({ direcciones: data });
    }
  } catch (error) {
    console.log("Error al obtener las direcciones", error);
  }
},

addDireccion: async direccion => {
  try {
    const response = await fetch(`${API_URL}/direcciones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(direccion)
    });
    if (response.ok) {
      const data = await response.json();
      const store = getStore();
      const updatedDirecciones = [...store.direcciones, data];
      setStore({ direcciones: updatedDirecciones });
    }
  } catch (error) {
    console.log("Error al crear la dirección", error);
  }
},

editDireccion: async (id, direccion) => {
  try {
    const response = await fetch(`${API_URL}/direcciones/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(direccion)
    });
    if (response.ok) {
      const data = await response.json();
      const store = getStore();
      const updatedDirecciones = store.direcciones.map(item => (item.id === id ? data : item));
      setStore({ direcciones: updatedDirecciones });
    }
  } catch (error) {
    console.log("Error al editar la dirección", error);
  }
},

deleteDireccion: async id => {
  try {
    const response = await fetch(`${API_URL}/direcciones/${id}`, {
      method: "DELETE"
    });
    if (response.ok) {
      const store = getStore();
      const updatedDirecciones = store.direcciones.filter(item => item.id !== id);
      setStore({ direcciones: updatedDirecciones });
    }
  } catch (error) {
    console.log("Error al eliminar la dirección", error);
  }
},

      
      calculateTotal: () => {
        const store = getStore();
        const total = store.car.reduce(
          (accumulator, item) => accumulator + item.precio * item.cantidad,
          0
        );
        return `$${total.toFixed(2)}`;
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


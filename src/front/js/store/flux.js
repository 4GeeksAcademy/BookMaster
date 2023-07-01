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
		  },
		  {
			titulo: "Libro 2",
			autor: "Autor 2",
			categoria: "Categoría 2",
			detalle: "Detalles del libro 2",
			precio: 14.99,
		  },
		  {
			titulo: "Libro 3",
			autor: "Autor 3",
			categoria: "Categoría 3",
			detalle: "Detalles del libro 3",
			precio: 19.99,
		  },
		],
		car: [],
		favorite: [],
	  },
	  actions: {
		añadirFavoritos: (item) => {
		  const store = getStore();
		  const isItemInFavorites = store.favorite.includes(item);
  
		  if (!isItemInFavorites) {
			const updatedFavorites = [...store.favorite, item];
			setStore({ favorite: updatedFavorites });
		  }
		},
		añadirCarrito: (titulo, precio) => {
		  const store = getStore();
		  const isItemInCart = store.car.some((item) => item.titulo === titulo);
  
		  if (!isItemInCart) {
			const newItem = {
			  titulo: titulo,
			  precio: precio,
			  cantidad: 1,
			};
			const updatedCart = [...store.car, newItem];
			setStore({ car: updatedCart });
		  }
		},
		aumentarCantidad: (titulo) => {
		  const store = getStore();
		  const updatedCart = store.car.map((item) => {
			if (item.titulo === titulo) {
			  return {
				...item,
				cantidad: item.cantidad + 1,
			  };
			}
			return item;
		  });
		  setStore({ car: updatedCart });
		},
		disminuirCantidad: (titulo) => {
		  const store = getStore();
		  const updatedCart = store.car.map((item) => {
			if (item.titulo === titulo && item.cantidad > 1) {
			  return {
				...item,
				cantidad: item.cantidad - 1,
			  };
			}
			return item;
		  });
		  setStore({ car: updatedCart });
		},
		borrarCarrito: (item) => {
		  const store = getStore();
		  const updatedCart = store.car.filter((el) => el.titulo !== item.titulo);
		  setStore({ car: updatedCart });
		},
		borrarFavoritos: (item) => {
		  const store = getStore();
		  const updatedFavorites = store.favorite.filter((el) => el !== item);
		  setStore({ favorite: updatedFavorites });
		},
		getMessage: async () => {
		  try {
			// Obtener datos desde el backend
			const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
			const data = await resp.json();
			// Hacer algo con los datos obtenidos
		  } catch (error) {
			console.log("Error al cargar el mensaje desde el backend", error);
		  }
		},
		getLibros: async () => {
			try {
			  const response = await fetch('https://tomasventura17-studious-fiesta-pvv6q4xq95xhrv4w-3001.preview.app.github.dev/api/libros');
			  if (response.ok) {
				const data = await response.json();
				setStore({ libros: data });
			  }
			} catch (error) {
			  console.log('Error al obtener los libros', error);
			}
		  },
		addLibro: async (libro) => {
			try {
			  const response = await fetch('https://tomasventura17-studious-fiesta-pvv6q4xq95xhrv4w-3001.preview.app.github.dev/api/libros', {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json',
				},
				body: JSON.stringify(libro),
			  });
			  if (response.ok) {
				const data = await response.json();
				const store = getStore();
				const updatedLibros = [...store.libros, data];
				setStore({ libros: updatedLibros });
			  }
			} catch (error) {
			  console.log('Error al crear el libro', error);
			}
		  },
		
		  editLibro: async (id, libro) => {
			try {
			  const response = await fetch(`https://tomasventura17-studious-fiesta-pvv6q4xq95xhrv4w-3001.preview.app.github.dev/api/libros/${id}`, {
				method: 'PUT',
				headers: {
				  'Content-Type': 'application/json',
				},
				body: JSON.stringify(libro),
			  });
			  if (response.ok) {
				const data = await response.json();
				const store = getStore();
				const updatedLibros = store.libros.map((item) => (item.id === id ? data : item));
				setStore({ libros: updatedLibros });
			  }
			} catch (error) {
			  console.log('Error al editar el libro', error);
			}
		  },
		
		  deleteLibro: async (id) => {
			try {
			  const response = await fetch(`https://tomasventura17-studious-fiesta-pvv6q4xq95xhrv4w-3001.preview.app.github.dev/api/libros/${id}`, {
				method: 'DELETE',
			  });
			  if (response.ok) {
				const store = getStore();
				const updatedLibros = store.libros.filter((item) => item.id !== id);
				setStore({ libros: updatedLibros });
			  }
			} catch (error) {
			  console.log('Error al eliminar el libro', error);
			}
		  },
		
		  // ...
		},
	};
};

export default getState;  

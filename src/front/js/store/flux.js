const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			apiUrl: "https://tomasventura17-studious-fiesta-pvv6q4xq95xhrv4w-3001.preview.app.github.dev/api/",
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
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
		// ...otras funciones
	  },
	};
};

export default getState;

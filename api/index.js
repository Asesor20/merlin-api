export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  const { mensaje } = req.body;

  if (!mensaje) {
    return res.status(400).json({ error: 'Missing mensaje in request body' });
  }

  const respuesta = {
    fecha: new Date().toISOString(),
    remitente: "Desconocido",
    ciudad: mensaje.includes("Lecheria") ? "Lecheria" : "",
    tipo_de_transaccion: mensaje.toLowerCase().includes("venta") ? "Venta" :
                         mensaje.toLowerCase().includes("alquiler") ? "Alquiler" : "",
    tipo_de_inmueble: mensaje.toLowerCase().includes("apartamento") ? "Apartamento" :
                      mensaje.toLowerCase().includes("casa") ? "Casa" : "",
    residencia: mensaje.includes("Las Palmeras") ? "Las Palmeras" : "",
    area: "",
    habitaciones: mensaje.includes("2 habitaciones") ? "2" :
                 mensaje.includes("3 habitaciones") ? "3" : "",
    baños: mensaje.includes("1 baño") ? "1" :
           mensaje.includes("2 baños") ? "2" : "",
    estacionamientos: mensaje.includes("1 puesto") ? "1" :
                      mensaje.includes("2 puestos") ? "2" : "",
    capacidad: "",
  precio: mensaje.match(/\d+/) ? mensaje.match(/\d+/)[0] : "",
    precio_m2: "",
    observaciones: mensaje
  };

  res.status(200).json(respuesta);
}

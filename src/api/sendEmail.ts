import { NextApiRequest, NextApiResponse } from "next";

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { correo, mensaje } = req.body;

  if (!correo || !mensaje) {
    return res.status(400).json({ message: "Correo y mensaje son requeridos" });
  }

  try {
    const formspreeResponse = await fetch("https://formspree.io/f/mrbznwnl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: correo,
        message: mensaje,
      }),
    });

    if (formspreeResponse.ok) {
      return res.status(200).json({ message: "Correo enviado correctamente" });
    } else {
      const errorData = await formspreeResponse.json();
      return res.status(formspreeResponse.status).json({
        message: "Error al enviar el correo",
        error: errorData,
      });
    }
  } catch (error: unknown) {
    return res.status(500).json({
      message: "Error interno al enviar el correo",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export default sendEmail;

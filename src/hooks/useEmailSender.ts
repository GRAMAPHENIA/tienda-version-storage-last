export const useEmailSender = async (email: string, content: string) => {
    const response = await fetch("https://formspree.io/f/mrbznwnl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: email,
        mensaje: content,
      }),
    });
  
    return response.ok;
  };
  
// Bank + contact info reused by emails and UI.
export const BANK = {
  bank: "Banco Bolivariano",
  accountType: "Cuenta de ahorros",
  accountNumber: "1821134449",
  holder: "José Guillermo Suco Gómez",
  idNumber: "0918718834",
};

export const CONTACT = {
  email: "guillermo@g-structure.co",
  whatsappNumber: "+593986875121",
  whatsappLink: "https://wa.me/593986875121",
  whatsappReceiptLink:
    "https://wa.me/593986875121?text=Hola%20Guillermo%2C%20acabo%20de%20solicitar%20una%20reserva%20en%20G-Structure%20y%20env%C3%ADo%20el%20comprobante%20de%20pago%20para%20validaci%C3%B3n.",
};

export function depositLabel(priceUsd: number | null): string {
  if (!priceUsd) return "el 50% del valor del servicio";
  const half = Math.round(priceUsd / 2);
  return `USD ${half} (50% de USD ${priceUsd})`;
}

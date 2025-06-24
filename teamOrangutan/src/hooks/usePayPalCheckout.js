import { useState } from "react";
import { useCart } from "../Auth/user/context/CartProvider";

export function usePayPalCheckout({ userId, onPaymentSuccess }) {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info"); // 'error', 'success'
  const [open, setOpen] = useState(false); // Para controlar el Snackbar
  const { refreshCart } = useCart();

  const initialOptions = {
    "client-id":
      "AZGNQWafSWHum4Z-niWMd6VwYPK9SYVaBRxYIS6k3gUWfH-G0-zvjiX-Of6qi32_Im8fHOZEQe5tGSj-",
    "enable-funding": "venmo",
    "disable-funding": "",
    "buyer-country": "US",
    currency: "USD",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  const createOrder = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/payments/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );

      const orderData = await response.json();
      console.log("orderData");
      console.log(orderData);
      
      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} - ${errorDetail.description}`
          : orderData?.error || "Error desconocido al crear la orden";

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
      setMessage(`No se pudo iniciar el proceso de pago: ${error.message}`);
      setMessageType("error");
      setOpen(true);
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/payments/orders/${data.orderID}/capture`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );

      const orderData = await response.json();
      console.log("orderData");
      console.log(orderData);

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        const transaction = orderData.purchase_units[0].payments.captures[0];
        setMessage("¡Pago exitoso!");
        await refreshCart();
        setMessageType("success");
        setOpen(true);

        if (onPaymentSuccess) {
          onPaymentSuccess(); // Llama la función enviada por el padre
        }

        console.log("Resultado:", orderData);
      }
    } catch (error) {
      console.error("Error en onApprove:", error);
      setMessage(`Hubo un problema al procesar el pago: ${error.message}`);
      setMessageType("error");
      setOpen(true);
    }
  };

  return {
    setMessage,
    setMessageType,
    message,
    messageType,
    open,
    setOpen,
    initialOptions,
    createOrder,
    onApprove,
  };
}

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Box, Snackbar, Alert } from "@mui/material";
import { usePayPalCheckout } from "../../hooks/usePayPalCheckout";

export const Payments = ({onPaymentSuccess}) => {

  const userId = Number(localStorage.getItem('user'))


  const {
    message,
    messageType,
    open,
    setOpen,
    initialOptions,
    createOrder,
    onApprove,
  } = usePayPalCheckout({ userId, onPaymentSuccess });

  
  return (
    <Box sx={{ mt: 10 }}>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>

      <Snackbar
      sx={{mt: 8}}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={messageType} 
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Payments;

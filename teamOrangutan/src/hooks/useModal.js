import { useState } from "react";


const useModal = () => {
  const [open2, setOpen] = useState(false);
  const handleOpen2 = () => setOpen(true);
  const handleClose2 = () => setOpen(false);

  return {open2, handleClose2, handleOpen2};
};

export default useModal;

import { useState, useEffect, useRef } from "react";

const DialogBox = () => {
  const [editObj, setEditObj] = useState({});
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const editList = (params) => () => {
    setOpen(true);
    setScroll(scroll);
    setEditObj(params);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addUser = () => {
    setOpen(true);
    setScroll(scroll);
    setEditObj({});
  };

  return [
    open,
    scroll,
    editObj,
    editList,
    handleClose,
    addUser,
    descriptionElementRef,
  ];
};

export default DialogBox;

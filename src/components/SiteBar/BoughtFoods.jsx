import React, { useState, useEffect } from "react";
import "./SiteBar.css";
import { getFoodsFromLocalStorage } from "../Redux/localStorate";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function BoughtFoods() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const switcher = useSelector((state) => state.Switcher.switcher);

  useEffect(() => {
    dispatch(getFoodsFromLocalStorage());
  }, []);

  const minus = (i) => {
    if (switcher[i].countShop > 1) {
      const newSwitcher = [...switcher];
      newSwitcher[i] = {
        ...newSwitcher[i],
        countShop: newSwitcher[i].countShop - 1,
      };
      localStorage.setItem("FoodsArray", JSON.stringify(newSwitcher));
      dispatch(getFoodsFromLocalStorage());
    setOpen3(true)

    }
  };

  const plus = (i) => {
    if (switcher[i].countShop < 20) {
      const newSwitcher = [...switcher];
      newSwitcher[i] = {
        ...newSwitcher[i],
        countShop: newSwitcher[i].countShop + 1,
      };
      localStorage.setItem("FoodsArray", JSON.stringify(newSwitcher));
      dispatch(getFoodsFromLocalStorage());
      setOpen(true);
    }
    if (switcher[i].countShop === 20) {
        setOpen2(true)
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
  };

  const deletee = (i) => {
    const newSwitcher = [...switcher];
    newSwitcher.splice(i, 1);
    localStorage.setItem("FoodsArray", JSON.stringify(newSwitcher));
    dispatch(getFoodsFromLocalStorage());
    setOpen3(true)
  };

  const notification = (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Отлично добавлено. Хотите ещё один ?
        </Alert>
      </Snackbar>
    </Stack>
  );
  const notificationMinus = (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Извините у нас не осталось больше пиццы !
        </Alert>
      </Snackbar>
    </Stack>
  );
  const notificationDel = (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Ваш заказ удалён !
        </Alert>
      </Snackbar>
    </Stack>
  );
  const AvailableForPayment = (
    <div className="row ">
      {switcher !== "undefined" &&
        switcher.map((iteam, index) => {
          return (
            <div className="col-12 FoodShopList" key={index}>
              <div className="FoodShopList__Header">
                <div className="FoodShopList__Header__img">
                  <div>
                    <img src={iteam.url} alt="logo" />
                  </div>
                  <div className="incBox">
                    <button
                      onClick={() => minus(index)}
                      className="minus minusPlus"
                    >
                      -
                    </button>{" "}
                    <h4>{iteam.countShop}</h4>{" "}
                    <button
                      onClick={() => plus(index)}
                      className="plus minusPlus"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="FoodShopList__Header__text">
                  <h4>{iteam.text}</h4>
                  <p>{iteam.cost}</p>
                  <p>{iteam.cost * iteam.countShop}</p>
                </div>
              </div>
              <div className="offcanss__footer">
                <input type="text" />
                <button onClick={() => deletee(index)}>
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );

  return (
    <div>
      {AvailableForPayment}
      {notification}
      {notificationMinus}
      {notificationDel}
    </div>
  );
}

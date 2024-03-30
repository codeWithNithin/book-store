import { useEffect, useState } from "react";
import { AppContext } from "./appContext";
const AppStore = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
  })

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    //make api call to backend here to save to backend

  }, [cartItems])

  const [cartTotal, setCartTotal] = useState(0);
  //If we add anything to cart , save it to localstorage 

  return (
    <AppContext.Provider value={{ cartItems, setCartItems, cartTotal, setCartTotal }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppStore;
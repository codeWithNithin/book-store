import { useContext } from "react";
import { AppContext } from "../Context/appContext";

const Checkout = () => {

  const appContext = useContext(AppContext)

  const calculateTotal = () => {
    return appContext.cartItems.reduce((total, item) => {
      const price = item?.bookData?.saleInfo?.listPrice?.amount || 200;
      return total + (price * item.quantity)
    }, 0)
  }

  return (
    <div className="relative mx-auto w-full bg-white">
      <div className="grid min-h-screen grid-cols-10">
        <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
          <div className="mx-auto w-full max-w-lg">
            <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">Secure Checkout<span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span></h1>
            <form action="" className="mt-10 flex flex-col space-y-4">
              <div>
                <label for="email" className="text-xs font-semibold text-gray-500">Email</label>
                <input type="email" id="email" name="email" placeholder="john.capler@fang.com" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
              </div>
              <div className="relative"><label for="card-number" className="text-xs font-semibold text-gray-500">Card number</label><input type="text" id="card-number" name="card-number" placeholder="1234-5678-XXXX-XXXX" className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /><img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" className="absolute bottom-3 right-3 max-h-4" /></div>
              <div>
                <p className="text-xs font-semibold text-gray-500">Expiration date</p>
                <div className="mr-6 flex flex-wrap">
                  <div className="my-1">
                    <label for="month" className="sr-only">Select expiration month</label
                    ><select name="month" id="month" className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500">
                      <option value="">Month</option>
                    </select>
                  </div>
                  <div className="my-1 ml-3 mr-6">
                    <label for="year" className="sr-only">Select expiration year</label
                    ><select name="year" id="year" className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500">
                      <option value="">Year</option>
                    </select>
                  </div>
                  <div className="relative my-1"><label for="security-code" className="sr-only">Security code</label><input type="text" id="security-code" name="security-code" placeholder="Security code" className="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /></div>
                </div>
              </div>
              <div><label for="card-name" className="sr-only">Card name</label><input type="text" id="card-name" name="card-name" placeholder="Name on the card" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /></div>
            </form>
            <p className="mt-10 text-center text-sm font-semibold text-gray-500">By placing this order you agree to the <a href="#" className="whitespace-nowrap text-teal-400 underline hover:text-teal-600">Terms and Conditions</a></p>
            <button type="submit" className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">Place Order</button>
          </div>
        </div>
        <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 className="sr-only">Order summary</h2>
          <div>
            <img src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
          </div>
          <div className="relative">
            <ul className="space-y-5">
              {
                appContext.cartItems.map((item) => (
                  <li className="flex justify-between">
                    <div className="inline-flex">
                      <img src={item?.bookData?.volumeInfo?.imageLinks?.thumbnail} alt="" className="max-h-16" />
                      <div className="ml-3">
                        <p className="text-base font-semibold text-white"> {item?.bookData?.volumeInfo?.title} </p>
                        <p className="text-sm font-medium text-white text-opacity-80"> quantity: {item?.quantity} </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-white">Rs.  {item?.bookData?.saleInfo?.listPrice?.amount || 200} </p>
                  </li>
                ))
              }
            </ul>
            <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
            <div className="space-y-2">
              <p className="flex justify-between text-lg font-bold text-white"><span>Total price:</span><span>Rs. {calculateTotal().toFixed(2)}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;
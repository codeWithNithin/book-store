import { useContext, useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Header from './Header';
import { AppContext } from '../Context/appContext';

const BookDetail = () => {
  const params = useParams();
  const [bookData, setBookData] = useState({})
  const contextData = useContext(AppContext)
  console.log('context', contextData)

  const fetchBookDetail = async () => {

    fetch(`https://www.googleapis.com/books/v1/volumes/${params.id}`)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setBookData(result)
      })
  }

  useEffect(() => {
    fetchBookDetail()
  }, [])

  const addToCart = () => {
    contextData.setCartItems([...contextData.cartItems, { bookData, quantity: 1 }])
  }

  const updateCartItemQuantity = (quantity) => {
    const newCartItems = contextData.cartItems.map(item => {
      if (item.bookData.id === bookData.id) {
        return { ...item, quantity }
      }
      return item
    })
    contextData.setCartItems(newCartItems)
  }

  const isInCart = contextData.cartItems.findIndex((item) => item?.bookData.id === bookData.id) !== -1;


  return (
    <>
      <Header />
      <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
        <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
          <img className="w-full" alt="img of a girl posing" src={bookData?.volumeInfo?.imageLinks?.thumbnail} />
        </div>
        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="border-b border-gray-200 pb-6">
            <h1
              className="
      lg:text-2xl
      text-xl
      font-semibold
      lg:leading-6
      leading-7
      text-gray-800
      mt-2
    "
            >
              {bookData?.volumeInfo?.title}
            </h1>
          </div>
          <div>
            <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7" dangerouslySetInnerHTML={{ __html: bookData?.volumeInfo?.description }}></p>
            {
              bookData?.volumeInfo?.authors?.length > 0 && <p className="text-base leading-4 mt-7 text-gray-600"> By: {bookData?.volumeInfo?.authors?.join(',')}</p>
            }
            {
              bookData?.volumeInfo?.categories?.length > 0 && <p className="text-base leading-4 mt-4 text-gray-600">genre: {bookData?.volumeInfo?.categories?.join(',')} </p>
            }

            <p className="text-base leading-4 mt-4 text-gray-600">price: {bookData?.saleInfo?.listPrice?.amount || 200}</p>
          </div>
          <div className='mt-7'>
            {
              !isInCart ? (
                <button
                  className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                  onClick={() => {
                    addToCart()
                  }}
                >Add
                  to cart</button>
              ) : (
                <div className="mt-12">
                  <select
                    onChange={(e) =>
                      updateCartItemQuantity(parseInt(e.target.value))
                    }
                    defaultValue={
                      contextData.cartItems.find((item) => item?.bookData?.id === bookData.id)
                        ?.quantity
                    }
                    className="rounded-md"
                  >
                    {[...Array(10).keys()].map((n) => (
                      <option key={n + 1} value={n + 1}>
                        Qty: {n + 1}
                      </option>
                    ))}
                  </select>
                </div>

              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

// Cart details updating steps
// 1. get cartItems from app context by using useContext
// 2. 

export default BookDetail;
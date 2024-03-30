import { useState, useEffect } from "react"
import BookCard from "./BookCard"
import Shimmer from "./Shimmer"

const apiKey = 'AIzaSyBW6g-YhK3c8Q6TS1KK97hzV1ocH0kVJM4'

const Body = () => {
  const [books, setBooks] = useState([])
  const [searchText, setSearchText] = useState('')
  const fetchBooks = async () => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q='${searchText}'&key=${apiKey}&maxResults=40`)
      .then(response => response.json())
      .then(result => {
        setBooks(result.items)
      })
  }

useEffect(() => {
  fetchBooks()
}, [searchText])

  {
    return books.length === 0 ? (<Shimmer />) : (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex items-center my-2">
            <div className="flex border border-purple-200 rounded">
              <input
                type="text"
                className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Search..."
                name="search"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {books.map((book) => (
              <BookCard key={book?.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    )
  }

}

export default Body;
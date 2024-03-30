import { useNavigate } from 'react-router-dom'
const BookCard = ({ book }) => {
  const navigate = useNavigate()
  return (
    <div className="group relative" onClick={() => navigate(`/books/${book.id}`)}>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={book?.volumeInfo?.imageLinks?.smallThumbnail}
          alt={book?.volumeInfo?.title}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4">
        <div>
          <h3 className="text-sm text-gray-700">
            <span aria-hidden="true" className="absolute inset-0" />
            {book?.volumeInfo?.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500"> <span className="text-gray-900 text-sm">Authors</span>: { book?.volumeInfo?.authors?.length > 0 ? book?.volumeInfo?.authors?.join(',') : 'Arjit Verma, Nithin Kumar'}</p>
        </div>

        <div className="text-sm font-medium text-gray-500"> <span className="text-gray-900 text-sm"> Price</span>: &#8377;{book?.saleInfo?.saleability === 'FOR_SALE' ? book?.saleInfo?.listPrice?.amount : '200'}</div>
        <div className="text-sm font-medium text-gray-500"> <span className="text-gray-900 text-sm">Genre</span>: {book?.volumeInfo?.categories?.length > 0 ? book?.volumeInfo?.categories?.join(',') : 'free book'}</div>

      </div>
    </div>
  )
}

export default BookCard;
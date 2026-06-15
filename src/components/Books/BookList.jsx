import BookCard from './BookCard';

export default function BookList({ books }) {
  return (
    <div className="grid-cards">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

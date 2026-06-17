import BookCard from './BookCard';

export default function BookList({ books, onEditBook }) {
  return (
    <div className="grid-cards">
      {books.map(book => (
        <BookCard key={book.id} book={book} onLongPress={() => onEditBook(book)} />
      ))}
    </div>
  );
}

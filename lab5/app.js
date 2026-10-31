const { useState } = React;

function MovieForm({ onAdd }) {
    const [title, setTitle] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title.trim());
        setTitle('');
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter movie title..."
            />
            <button type="submit">+ Add Movie</button>
        </form>
    );
}

function MovieCard({ movie, onRemove, onUpdate }) {
    const [editingReview, setEditingReview] = useState(false);
    const [draft, setDraft] = useState(movie.review);

    const STARS = [1, 2, 3, 4, 5];

    function saveReview() {
        onUpdate(movie.id, { review: draft });
        setEditingReview(false);
    }

    function cancelEdit() {
        setDraft(movie.review);
        setEditingReview(false);
    }

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="movie-title">{movie.title}</h2>
                <button
                    className="remove-btn"
                    onClick={() => onRemove(movie.id)}
                    title="Remove movie"
                >
                    ✕
                </button>
            </div>

            <div className="stars">
                {STARS.map((s) => (
                    <span
                        key={s}
                        className={`star ${s <= movie.rating ? 'filled' : 'empty'}`}
                        onClick={() => onUpdate(movie.id, { rating: s })}
                        title={`Rate ${s} star${s > 1 ? 's' : ''}`}
                    >
            ⭐
          </span>
                ))}
            </div>

            <p className="rating-text">
                {movie.rating > 0
                    ? '⭐'.repeat(movie.rating) + ` (${movie.rating}/5)`
                    : 'Click a star to rate'}
            </p>

            {editingReview ? (
                <div className="review-edit">
          <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write your review..."
              autoFocus
          />
                    <div className="review-actions">
                        <button onClick={saveReview}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div
                    className="review-display"
                    onClick={() => { setDraft(movie.review); setEditingReview(true); }}
                    title="Click to edit review"
                >
                    {movie.review
                        ? movie.review
                        : <span className="placeholder">Click to add a review...</span>}
                </div>
            )}
        </div>
    );
}

function App() {
    const [movies, setMovies] = useState([
        { id: 1, title: 'Inception',       rating: 5, review: 'Mind-bending masterpiece. Watch it twice.' },
        { id: 2, title: 'Interstellar',    rating: 4, review: 'Visually stunning, emotionally heavy.' },
        { id: 3, title: 'The Dark Knight', rating: 5, review: '' },
    ]);

    function addMovie(title) {
        setMovies((prev) => [
            ...prev,
            { id: Date.now(), title, rating: 0, review: '' },
        ]);
    }

    function removeMovie(id) {
        setMovies((prev) => prev.filter((m) => m.id !== id));
    }

    function updateMovie(id, updates) {
        setMovies((prev) =>
            prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
        );
    }

    return (
        <div className="app">
            <header className="header">
                <h1>🎬 Movie Watch List</h1>
                <p>{movies.length} movie{movies.length !== 1 ? 's' : ''} watched</p>
            </header>

            <MovieForm onAdd={addMovie} />

            <div className="movie-grid">
                {movies.length === 0 ? (
                    <div className="empty-state">
                        <div className="icon">🎥</div>
                        <p>No movies yet — add one above!</p>
                    </div>
                ) : (
                    movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onRemove={removeMovie}
                            onUpdate={updateMovie}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
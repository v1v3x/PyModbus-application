import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}


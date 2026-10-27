import { Link } from "react-router-dom";
export default function NotFound() {
  return <main className="empty-page"><strong>404</strong><h1>Page not found</h1><p>The page you are looking for doesn't exist.</p><Link className="button" to="/">Return home</Link></main>;
}

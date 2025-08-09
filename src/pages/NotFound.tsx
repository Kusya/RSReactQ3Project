import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h1>404 — Page not found!</h1>
      <p>It seems you are following wrong link :)</p>
      <Link to="/">Go To Start Page</Link>
    </div>
  );
}

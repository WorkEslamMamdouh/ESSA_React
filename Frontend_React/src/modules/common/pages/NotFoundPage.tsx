import { Link } from 'react-router-dom';
import { routePaths } from '@/app/router/routePaths';

export const NotFoundPage = () => {
  return (
    <section>
      <h1>404</h1>
      <p>The requested route does not exist yet.</p>
      <Link to={routePaths.home}>Go to Home</Link>
    </section>
  );
};

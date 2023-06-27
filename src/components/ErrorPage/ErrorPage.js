import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

import './syle.css'

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className='error-page'>
      <h1>Opps!</h1>
      <div style={{
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
        {error.status === 404 && (
          <div>
            <h1 className='error-404'>404</h1>
            <h2>Not found page</h2>
          </div>
        )}
        {error.status !== 404 && (
          <>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
          </>
        )}
        <div className='buttons'>
          <Link to="/">
            go home
          </Link>
          <Link to={-1}>
            go back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;

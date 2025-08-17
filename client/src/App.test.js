import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App routing', () => {
  test('renders Home page on default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    // Home page should have a title or unique text, e.g. "Home" or similar
    // Adjust the text below to match your Home page's actual content
    expect(
      screen.getByText(/home|dashboard|login|register/i)
    ).toBeInTheDocument();
  });

  test('renders Dashboard page on /dashboard route', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );
    // Adjust the text below to match your Dashboard page's actual content
    expect(
      screen.getByText(/dashboard/i)
    ).toBeInTheDocument();
  });

  test('renders Login page on /login route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    // Adjust the text below to match your Login page's actual content
    expect(
      screen.getByText(/login/i)
    ).toBeInTheDocument();
  });

  test('renders Register page on /register route', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );
    // Adjust the text below to match your Register page's actual content
    expect(
      screen.getByText(/register/i)
    ).toBeInTheDocument();
  });

  test('renders NotFound page on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/some/unknown/route']}>
        <App />
      </MemoryRouter>
    );
    // Adjust the text below to match your NotFound page's actual content
    expect(
      screen.getByText(/not found|404/i)
    ).toBeInTheDocument();
  });
});

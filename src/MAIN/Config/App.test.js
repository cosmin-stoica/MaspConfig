import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * Test che verifica che il link "learn react" sia presente nel documento.
 * 
 * @test
 */
test('renders learn react link', () => {
  // Renderizza il componente App
  render(<App />);
  
  // Cerca un elemento che contiene il testo "learn react" (case insensitive)
  const linkElement = screen.getByText(/learn react/i);
  
  // Verifica che l'elemento trovato sia presente nel documento
  expect(linkElement).toBeInTheDocument();
});

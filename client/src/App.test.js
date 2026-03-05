import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock Three.js Canvas to avoid WebGL issues in test
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn(),
}));

jest.mock('@react-three/drei', () => ({
  Sphere: ({ children }) => <div>{children}</div>,
  MeshDistortMaterial: () => null,
  Float: ({ children }) => <div>{children}</div>,
  Stars: () => null,
}));

test('renders Living Memory app', () => {
  render(<App />);
  const matches = screen.getAllByText(/Living Memory|Loading/i);
  expect(matches.length).toBeGreaterThan(0);
});

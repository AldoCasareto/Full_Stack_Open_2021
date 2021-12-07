import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('Testing Blog component', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Aldo Casareto',
    url: 'https://www.google.com',
    likes: 10,
    user: {
      name: 'Aldo Casareto',
      username: 'aldocasareto',
    },
  };

  let component;
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog blog={blog} handleView={mockHandler} blogUpdate={mockHandler} />
    );
    component.debug();
  });

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    );
  });

  test('renders author and title, but not likes and url', () => {
    expect(component.container).toHaveTextContent('Aldo Casareto');
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    );
    expect(component.container).not.toHaveTextContent('https://www.google.com');
    expect(component.container).not.toHaveTextContent('10');
  });
  test('clicking the button displays the url and number of likes', () => {
    const button = component.getByText('view');
    fireEvent.click(button);
    expect(component.container).toHaveTextContent('https://www.google.com');
    expect(component.container).toHaveTextContent('10');
  });
  test('like button is clicked twice the component is called twice', () => {
    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);

    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls.length).toBe(2);
  });
});

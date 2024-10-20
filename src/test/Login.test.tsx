import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, screen } from '@testing-library/react';

import { LoginPage } from '@/routes/auth/login.lazy';

describe('Login Component', () => {
  test('renders login component and handles input', () => {
    // Рендеринг компонента
    render(<LoginPage />);

    // Перевірка, що компонент містить поля логіну
    const usernameInput = screen.getByPlaceholderText('m@example.com') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('Your password here') as HTMLInputElement;
    const loginButton = screen.getByText('Login');

    // Симуляція введення даних користувачем
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    // Перевірка значень полів після введення
    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password');

    // Симуляція натискання кнопки логіну
    fireEvent.click(loginButton);
  });
});

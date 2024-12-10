import Cookies from 'js-cookie';

type AsyncFunction<T> = (...args: any[]) => Promise<T>;

export const handle401AndRetry = async <T>( originalFunction: AsyncFunction<T>, ...args: Parameters<AsyncFunction<T>> ): Promise<T> => {
  try {
    const refreshToken = Cookies.get('refreshToken'); 
    const userId = localStorage.getItem('userId')
    if (!refreshToken) {
      throw new Error('Refresh token is missing. Logging out...');
    }

    const refreshResponse = await fetch(`http://localhost:4000/users/refresh-token/${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `${refreshToken}`,
      }
    });

    if (!refreshResponse.ok) {
      throw new Error('Failed to refresh token. Logging out...');
    }

    const { accessToken } = await refreshResponse.json();
    localStorage.setItem('accessToken', accessToken);

    return originalFunction(...args);
  } catch (error) {
    console.error('Error refreshing token:', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    Cookies.remove('refreshToken');
    window.location.href = '/login';
    throw error;
  }
};

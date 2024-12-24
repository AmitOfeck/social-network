export const fetchImageUrl = (photoUrl: string | undefined, baseUrl: string = 'http://localhost:4000/images/'): string | null => {
  if (!photoUrl) {
    return 'https://p7.hiclipart.com/preview/691/765/226/computer-icons-person-anonymous.jpg'; 
  }

  try {
    if (photoUrl.startsWith('https://lh3.googleusercontent.com')) {
      return photoUrl; 
    }

    const imageUrl = `${baseUrl}${photoUrl.split('/').pop()!}`;
    return imageUrl;

  } catch (error) {
    console.error('Error constructing image URL:', error);
    return null;
  }
};

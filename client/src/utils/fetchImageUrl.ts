
export const fetchImageUrl = (photoUrl: string | undefined, baseUrl: string = 'http://localhost:4000/images/'): string | null => {
    if (!photoUrl) {
      return null;
    }
  
    try {
      const imageUrl = `${baseUrl}${photoUrl.split('/').pop()!}`;
      return imageUrl;
    } catch (error) {
      console.error('Error constructing image URL:', error);
      return null;
    }
  };
  
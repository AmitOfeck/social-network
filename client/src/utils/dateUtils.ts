export const formatDate = (date: string): string => {
    const commentDate = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);
  
    if (diffInSeconds < 60) {
      return `Few seconds ago`;
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const diffInDays = Math.floor(diffInSeconds / 86400);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
      const diffInMonths = Math.floor(diffInSeconds / 2592000);
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    }
  };
  
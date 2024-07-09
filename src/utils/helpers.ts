export const hoursAgo = (publishedAt: string) => {
  const publishedDate = new Date(publishedAt);
  const currentDate = new Date();
  const differenceInHours = Math.floor(
    (currentDate.getTime() - publishedDate.getTime()) / (1000 * 60 * 60),
  );

  if (differenceInHours < 24) {
    return `${differenceInHours} hour${differenceInHours === 1 ? '' : 's'} ago`;
  } else {
    const differenceInDays = Math.floor(differenceInHours / 24);
    return `${differenceInDays} day${differenceInDays === 1 ? '' : 's'} ago`;
  }
};

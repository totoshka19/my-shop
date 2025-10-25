export const formatPrice = (price: number | undefined): string => {
  if (price === undefined) return '$0.00';
  return `$${price.toLocaleString('en-US')}`;
}; 
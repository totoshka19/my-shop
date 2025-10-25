const CATEGORIES = [
  { id: 1, name: 'Fish', slug: 'fish' },
  { id: 2, name: 'Coral', slug: 'coral' },
  { id: 3, name: 'Equipment', slug: 'equipment' },
];

const SUBCATEGORIES = [
  { id: 1, name: 'Freshwater Fish', slug: 'freshwater-fish', categoryId: 1 },
  { id: 2, name: 'Saltwater Fish', slug: 'saltwater-fish', categoryId: 1 },
  { id: 3, name: 'Soft Corals', slug: 'soft-corals', categoryId: 2 },
  { id: 4, name: 'Hard Corals', slug: 'hard-corals', categoryId: 2 },
  { id: 5, name: 'Filters', slug: 'filters', categoryId: 3 },
  { id: 6, name: 'Lighting', slug: 'lighting', categoryId: 3 },
];

module.exports = { CATEGORIES, SUBCATEGORIES }; 
import { paramCase } from 'change-case';

export const mockCategories = [
  'Operations',
  'Marketing',
  'Design',
  'Developer',
  'Engineering',
  'Governance',
  'Education',
  'Community',
  'Product',
  'Business Development',
  'Talent/HR',
  'Treasury',
  'Strategy',
  'Partnerships',
  'Legal',
].map((category) => ({
  value: paramCase(category),
  label: category,
}));

import { paramCase } from 'change-case';

export const mockLevels = ['High', 'Normal', 'Low'].map((level) => ({
  value: paramCase(level),
  label: level,
}));

export const mockTypes = [
  'Wireframe',
  'Design',
  'Code',
  'Pull-Request',
  'Proposal',
  'Forum',
  'Social Media',
  'Writing',
  'Brainstorm',
  'Official Partnership',
  'Community Event',
  'Smart Contract',
  'Fundraise',
  'Feedback',
].map((type) => ({
  value: paramCase(type),
  label: type,
}));

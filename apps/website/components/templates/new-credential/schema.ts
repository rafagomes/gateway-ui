import { object, string, SchemaOf, array } from 'yup';

import { Credentials } from '../../../services/graphql/types.generated';

export type NewCredentialSchema = Pick<
  Credentials,
  'name' | 'description' | 'image'
> & {
  category: string;
  wallets: string[];
};

export const schema: SchemaOf<NewCredentialSchema> = object({
  name: string().defined(),
  category: string().defined(),
  description: string().defined(),
  image: string().defined(),
  wallets: array().of(string()).defined(),
});

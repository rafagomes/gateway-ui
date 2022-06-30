import { object, string, SchemaOf, array } from 'yup';

export type PoW = {
  pow_type: string;
  pow_link: string;
  pow_description: string;
};

export type AccomplishmentsTypes = {
  accomplishment_title: string;
  accomplishment_description: string;
  pow: PoW[];
};

export const accomplishmentsSchema: SchemaOf<AccomplishmentsTypes> = object({
  accomplishment_title: string().defined(),
  accomplishment_description: string().defined(),
  pow: array()
    .of(
      object({
        pow_type: string().defined(),
        pow_link: string().defined(),
        pow_description: string().defined(),
      })
    )
    .defined(),
});

import { object, string, SchemaOf, date, bool, array } from 'yup';

export type PoW = {
  title: string;
  description: string;
  link: string;
  type: string;
};

export type CredentialDetailsTypes = {
  role: string;
  commitment_level: string;
  start_date: Date;
  end_date: Date;
  currently_working: boolean;
  responsibilities: string;
  proof_of_work: PoW[];
};

export const credentialDetailsSchema: SchemaOf<CredentialDetailsTypes> = object(
  {
    role: string().defined(),
    commitment_level: string().defined(),
    start_date: date().defined(),
    end_date: date().defined(),
    currently_working: bool().defined(),
    responsibilities: string().defined(),
    proof_of_work: array()
      .of(
        object({
          title: string().defined(),
          description: string().defined(),
          link: string().defined(),
          type: string().defined(),
        })
      )
      .defined(),
  }
);

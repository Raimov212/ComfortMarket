export interface WorkersUser {
  enabled: boolean;
  fullName: string;
  id: number;
  phoneNumber: string;
  premise: Array<string>;
  role: string;
  username: string;
}

export interface PremisesUser {
  address: string;
  id: number;
  name: string;
  owner: string;
  type: string;
}

export type UserTypes = {
  enabled: boolean;
  fullName: string;
  id: number;
  role: string;
  phoneNumber: string;
  premises: PremisesUser[];
  workers: WorkersUser[];
};

export type UserStoreState = {
  userPremises: PremisesUser[];
  userWorkers: WorkersUser[];
};

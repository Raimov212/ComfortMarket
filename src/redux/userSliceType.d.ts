type userDataProps = {
  userId: string;
  fullName: string;
  status: string;
  parentId: string;
};

type userLocationProps = {
  id: string;
  premiseName: string;
  address: string;
};

export type UserState = {
  userData: userDataProps[];
  userLocation: userLocationProps[];
  statusProps: string;
};

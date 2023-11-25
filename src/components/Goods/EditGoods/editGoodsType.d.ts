export interface GoodsCategoryAndWhereIdType {
  [key: string]: string;
  id: string;
  name: string;
}

export type EditGoodsTypeData = {
  userId: string;
  id: string;
  categoryId: string;
  name: string;
  article: string;
  barCode: string;
  whereId: string;
  pictureUrl: string;
};

export type EditGoodsType = {
  setOpenEditGoodsProps: Dispatch<SetStateAction<Boolean>>;
  editGoodsInput: EditGoodsTypeData;
  setEditGoodsInput: Dispatch<SetStateAction<EditGoodsTypeData>>;
  editGoodsForm: (e: { preventDefault: () => void }) => void;
};

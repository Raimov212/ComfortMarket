import { ChangeEvent, Fragment, memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { t } from "i18next";
import api from "../../api";
import { TransferProductType } from "../../types/premiseProductsTypes";
import { DataType } from "../../types/premiseTypes";
import { ProductsDataType } from "../../types/productTypes";

interface Types {
  selectTransfer: ProductsDataType | null | undefined;
  selectProductId: number;
  selectPremiseId: number | undefined;
}

const TransferProduct = memo(
  ({ selectTransfer, selectProductId, selectPremiseId }: Types) => {
    const [premiseData, setPremiseData] = useState<DataType[]>([]);

    const [transferForm, setTransferForm] = useState<TransferProductType>({
      previousId: 0,
      count: "",
      destinationId: 0,
    });

    useEffect(() => {
      const getCategory = async () => {
        await api.get("/premise").then(({ data }) => {
          const newData = data.filter((item: DataType) => {
            if (item.id !== selectPremiseId) return item;
          });
          setPremiseData(newData);
        });
      };

      getCategory();
    }, [selectTransfer]);

    const handleSubmit = async (e: any) => {
      e.preventDefault();

      console.log("transferForm", transferForm);
      console.log("selectPremiseId", selectPremiseId);

      try {
        await api
          .put(`/products/transfer/part/${selectPremiseId}`, {
            previousId: transferForm.previousId,
            count: Number(transferForm.count),
            destinationId: Number(transferForm.destinationId),
          })
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              toast.success(t("Premise yaratildi"), {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          });
      } catch (error) {
        console.log(error);
      }
    };

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
      setTransferForm((prev: any) => ({
        ...prev,
        destinationId: e.target.value,
        previousId: selectProductId,
      }));
    };

    const handleChangeForm = (e: ChangeEvent<HTMLInputElement>): void => {
      const regex = /^[0-9]*$/;

      if (e.target.value === "" || regex.test(e.target.value)) {
        setTransferForm((prev: any) => ({
          ...prev,
          count: e.target.value,
        }));
      }
    };

    return (
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-control w-full max-w-xs" htmlFor="countKey">
              <div className="label">
                <span className="label-text">Mahsulot miqdori</span>
              </div>
              <input
                id="countKey"
                type="text"
                value={transferForm?.count}
                onChange={handleChangeForm}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>

          <div>
            <label
              className="form-control w-full max-w-xs"
              htmlFor="selectType"
            >
              <div className="label">
                <span className="label-text">O'tkazish joyi</span>
              </div>
              <select
                id="selectType"
                value={transferForm?.destinationId}
                onChange={handleChangeSelect}
                className="select select-bordered w-full max-w-xs"
              >
                {premiseData?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} -(
                    {item.products
                      ?.filter((item: ProductsDataType) =>
                        item.barcode === selectTransfer?.barcode
                          ? item.barcode
                          : null
                      )
                      ?.map((product: ProductsDataType, index: number) => (
                        <Fragment key={index}>
                          {product.extra[0].count}
                        </Fragment>
                      ))}
                    )
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit" className="btn mt-6">
            Saqlash
          </button>
        </form>
      </div>
    );
  }
);

export default TransferProduct;

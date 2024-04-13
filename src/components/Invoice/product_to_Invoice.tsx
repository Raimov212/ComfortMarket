import React, { ChangeEvent, FormEvent, memo } from "react";
import { InvoiceProductType } from "../../types/invoice";

interface TypesProductToInvoice {
  type: "TO_INVOICE" | "FROM_INVOICE";
  selectProductToInvoice: InvoiceProductType;
  setSelectProductToInvoice: React.Dispatch<
    React.SetStateAction<InvoiceProductType>
  >;
  setProductCartInvoice: React.Dispatch<
    React.SetStateAction<InvoiceProductType[]>
  >;
}

const ProductToInvoice = memo(
  ({
    type,
    selectProductToInvoice,
    setSelectProductToInvoice,
    setProductCartInvoice,
  }: TypesProductToInvoice) => {
    const handleChangeForm = (e: ChangeEvent<HTMLInputElement>): void => {
      const regex = /^[0-9]*$/;

      if (e.target.value === "" || regex.test(e.target.value)) {
        setSelectProductToInvoice((prev) => ({
          ...prev,
          [e.target.name]: Number(e.target.value),
        }));
      }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setProductCartInvoice((prev) => [...prev, selectProductToInvoice]);
      setSelectProductToInvoice((prev) => ({
        ...prev,
        barcode: "",
        name: "",
        count: 0,
        finalPrice: 0,
        initialPrice: 0,
      }));
      const modal = document.getElementById("create_to_invoice_modal");
      if ((modal as any).showModal) (modal as any).close();
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-control w-full max-w-xs" htmlFor="countKey">
              <div className="label">
                <span className="label-text">Miqdori</span>
              </div>
              <input
                id="countKey"
                type="text"
                value={selectProductToInvoice.count}
                onChange={handleChangeForm}
                name="count"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          {type === "TO_INVOICE" ? (
            <div>
              <label
                className="form-control w-full max-w-xs"
                htmlFor="initialPriceKey"
              >
                <div className="label">
                  <span className="label-text">Boshlang'ich narxi</span>
                </div>
                <input
                  id="initialPriceKey"
                  type="text"
                  value={selectProductToInvoice.initialPrice}
                  onChange={handleChangeForm}
                  name="initialPrice"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
          ) : (
            <div>
              <label
                className="form-control w-full max-w-xs "
                htmlFor="initialPriceKey"
              >
                <div className="label flex flex-col items-start">
                  <span className="label-text">Boshlang'ich narxi</span>
                  <p>{selectProductToInvoice.initialPrice} so'm</p>
                </div>
              </label>
            </div>
          )}

          <div>
            <label
              className="form-control w-full max-w-xs"
              htmlFor="finalPriceKey"
            >
              <div className="label">
                <span className="label-text">Sotuv qiymati</span>
              </div>
              <input
                id="finalPriceKey"
                type="text"
                value={selectProductToInvoice.finalPrice}
                onChange={handleChangeForm}
                name="finalPrice"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>

          <button type="submit" className="btn mt-6">
            Submit
          </button>
        </form>
      </div>
    );
  }
);

export default ProductToInvoice;

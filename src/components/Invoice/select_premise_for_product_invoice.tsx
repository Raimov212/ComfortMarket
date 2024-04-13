import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CreateInvoiceType, InvoiceProductType } from "../../types/invoice";
import api from "../../api";
import { DataType } from "../../types/premiseTypes";
import { toast } from "react-toastify";

const SelectPremiseForProductInvoice = memo(
  ({
    type,
    storagePremiseID,
    productCartInvoice,
    setProductCartInvoice,
  }: // fetchProduct,
  {
    type: "TO_INVOICE" | "FROM_INVOICE";
    storagePremiseID?: string;
    productCartInvoice: InvoiceProductType[];
    setProductCartInvoice: Dispatch<SetStateAction<InvoiceProductType[]>>;
    fetchProduct: () => Promise<void>;
  }) => {
    const [dataPremise, setDataPremise] = useState<DataType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [invoiceCreateForm, setInvoiceCreateForm] =
      useState<CreateInvoiceType>({
        premiseId: type == "TO_INVOICE" ? null : null,
        description: "",
        action: type === "TO_INVOICE" ? "IMPORT" : "EXPORT",
        previousId: type == "FROM_INVOICE" ? Number(storagePremiseID) : null,
        products: [],
      });

    if (type === "TO_INVOICE") {
      useEffect(() => {
        const getPremiseData = async () => {
          await api.get("/premise").then(({ data }) => {
            const premiseInt = data?.find(
              (item: DataType) => item.type === "SHOP"
            );
            setInvoiceCreateForm((prev) => ({
              ...prev,
              premiseId: premiseInt.id,
            }));
            setDataPremise(data);
          });
        };

        getPremiseData();
      }, [productCartInvoice.length > 0]);
    }

    const handleChangePremise = (e: ChangeEvent<HTMLSelectElement>) => {
      setInvoiceCreateForm({
        ...invoiceCreateForm,
        premiseId: Number(e.target.value),
      });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setLoading(true);

      const newData = productCartInvoice?.map((item) => {
        delete item.name;

        return item;
      });
      const newInvoice = { ...invoiceCreateForm, products: newData };

      console.log("newInvoice", newInvoice);

      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
      try {
        await api.post("/invoice", newInvoice).then((res) => {
          if (res.status === 200) {
            setLoading(false);
            setProductCartInvoice([]);
            toast.success("Invoice yaratildi!", {
              position: "top-right",
              className: "foo-bar",
            });

            const modal = document.getElementById(
              "create_premise_for_product_invoice"
            );
            if ((modal as any).showModal) (modal as any).close();
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          {type === "TO_INVOICE" && (
            <label className="form-control w-full max-w-xs" htmlFor="nameKey">
              <div className="label">
                <span className="label-text">Do'kon nomi</span>
              </div>
              <select
                id="nameKey"
                onChange={handleChangePremise}
                value={invoiceCreateForm.premiseId?.toString()}
                className="select select-bordered w-full "
              >
                {dataPremise?.map((premise) => {
                  if (premise.type === "SHOP") {
                    return (
                      <option value={premise.id} key={premise.id}>
                        {premise.name}
                      </option>
                    );
                  }
                })}
              </select>
            </label>
          )}

          <label className="form-control w-full max-w-xs " htmlFor="textKey">
            <div className="label">
              <span className="label-text">Tavsifi</span>
            </div>
            <textarea
              id="textKey"
              value={invoiceCreateForm.description}
              onChange={(e) =>
                setInvoiceCreateForm({
                  ...invoiceCreateForm,
                  description: e.target.value,
                })
              }
              name="name"
              className="input input-bordered min-h-[150px] w-full max-w-xs"
            />
          </label>
        </div>

        <button disabled={loading} type="submit" className="btn mt-6">
          Saqlash
        </button>
      </form>
    );
  }
);

export default SelectPremiseForProductInvoice;

import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { t } from "i18next";
import api from "../../api";
import {
  PremiseProducts,
  PremiseProductsCategoryDataTypes,
} from "../../types/premiseProductsTypes";

interface Types {
  id: number | null | undefined;
  premiseProducts: PremiseProducts;
  setPremiseProducts: Dispatch<SetStateAction<PremiseProducts>>;
}

const CreatePremiseProduct = memo(
  ({ id, setPremiseProducts, premiseProducts }: Types) => {
    const [categoryData, setCategoryData] = useState<
      PremiseProductsCategoryDataTypes[]
    >([]);

    useEffect(() => {
      const getCategory = async () => {
        api.get("/category").then(({ data }) => {
          setCategoryData(data);
          setPremiseProducts((prev) => ({ ...prev, categoryId: data[0]?.id }));
        });
      };

      getCategory();
    }, []);

    const handleSubmit = (e: any) => {
      e.preventDefault();

      toast.success("ok", {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (premiseProducts.name === "") {
        return toast.error(t("Nomi kiritilsin"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (premiseProducts.barcode === "") {
        return toast.error(t("Barcode kiritilsin"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (premiseProducts.categoryId === null) {
        return toast.error(t("Categoriyasi kiritilsin"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (premiseProducts.count === null) {
        return toast.error(t("Miqdori kiritilsin"), {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      console.log("premiseProducts", premiseProducts);

      try {
        api
          .post(`/premise/${id}/add-product`, premiseProducts)
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              setPremiseProducts({
                name: "",
                barcode: "",
                categoryId: 0,
                count: null,
                price: null,
              });
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
      setPremiseProducts({
        ...premiseProducts,
        categoryId: Number(e.target.value),
      });
    };

    const handleChangeForm = (e: ChangeEvent<HTMLInputElement>): void => {
      setPremiseProducts((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };

    return (
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-control w-full max-w-xs" htmlFor="nameKey">
              <div className="label">
                <span className="label-text">Mahsulot nomi</span>
              </div>
              <input
                id="nameKey"
                type="text"
                value={premiseProducts.name}
                onChange={handleChangeForm}
                name="name"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs" htmlFor="barcode">
              <div className="label">
                <span className="label-text">Mahsulot Barcode</span>
              </div>
              <input
                id="barcode"
                type="text"
                value={premiseProducts.barcode}
                onChange={handleChangeForm}
                name="barcode"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs" htmlFor="count">
              <div className="label">
                <span className="label-text">Mahsulot miqdori</span>
              </div>
              <input
                id="count"
                type="text"
                value={
                  premiseProducts.count == null ? "" : premiseProducts.count
                }
                onChange={handleChangeForm}
                name="count"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs" htmlFor="price">
              <div className="label">
                <span className="label-text">Mahsulot narxi</span>
              </div>
              <input
                id="price"
                type="text"
                value={
                  premiseProducts.price == null ? "" : premiseProducts.price
                }
                onChange={handleChangeForm}
                name="price"
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
                <span className="label-text">Turi</span>
              </div>
              <select
                id="selectType"
                value={premiseProducts.categoryId}
                onChange={handleChangeSelect}
                className="select select-bordered w-full max-w-xs"
              >
                {categoryData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
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

export default CreatePremiseProduct;

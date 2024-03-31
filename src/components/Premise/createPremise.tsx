import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import { CreatePremiseType, DataType } from "../../types/premiseTypes";
import { toast } from "react-toastify";
import { t } from "i18next";
import { PremiseTypes } from "../../pages/Management";
import api from "../../api";

interface Types {
  formData: CreatePremiseType;
  setFormData: Dispatch<SetStateAction<CreatePremiseType>>;
  PremiseType: PremiseTypes;
  selectPremise: DataType | undefined;
  setSuccessPremise: Dispatch<SetStateAction<boolean>>;
}

const CreatePremise = ({
  setFormData,
  formData,
  PremiseType,
  selectPremise,
  setSuccessPremise,
}: Types) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData.name === "") {
      return toast.error(t("Nomi kiritilsin"), {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (formData.address === "") {
      return toast.error(t("Manzil kiritilsin"), {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    if (selectPremise) {
      try {
        api.put(`/premise/${selectPremise.id}`, formData).then((response) => {
          console.log(response);
          if (response.status === 200) {
            setSuccessPremise(true);
            setFormData({
              name: "",
              address: "",
              type: "SHOP",
            });
            toast.success(t("Premise yaratildi"), {
              position: toast.POSITION.TOP_RIGHT,
            });

            const modal = document.getElementById("my_modal_4");
            if ((modal as any).showModal) (modal as any).close();
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        api.post("/premise", formData).then((response) => {
          if (response.status === 200) {
            setSuccessPremise(true);
            setFormData({
              name: "",
              address: "",
              type: "SHOP",
            });
            toast.success(t("Premise yaratildi"), {
              position: toast.POSITION.TOP_RIGHT,
            });

            const modal = document.getElementById("my_modal_4");
            if ((modal as any).showModal) (modal as any).close();
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const updatePremise = () => {
      if (selectPremise) {
        setFormData((prev: any) => ({
          ...prev,
          address: selectPremise.address,
          name: selectPremise.name,
          type: selectPremise.type,
        }));
      }
    };

    updatePremise();
  }, [selectPremise]);

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, type: e.target.value });
  };

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData((prev) => ({
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
              <span className="label-text">Do'kon nomi</span>
            </div>
            <input
              id="nameKey"
              type="text"
              value={formData.name}
              onChange={handleChangeForm}
              name="name"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs" htmlFor="address">
            <div className="label">
              <span className="label-text">Do'kon Manzili</span>
            </div>
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={handleChangeForm}
              name="address"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs" htmlFor="selectType">
            <div className="label">
              <span className="label-text">Turi</span>
              <span className="label-text-alt">Do'kon yoki Ombor</span>
            </div>
            <select
              id="selectType"
              value={formData.type}
              onChange={handleChangeSelect}
              className="select select-bordered w-full max-w-xs"
            >
              {Object.keys(PremiseType).map((key) => (
                <option key={key} value={key}>
                  {PremiseType[key].name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="btn mt-6">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePremise;

import { Dispatch, FormEvent, SetStateAction } from "react";

interface Types {
  createCategory: string;
  setCreateCategory: Dispatch<SetStateAction<string>>;
  handleSubmitCategory: (e: FormEvent<HTMLFormElement>) => void;
}

const CreateCategory = ({
  createCategory,
  setCreateCategory,
  handleSubmitCategory,
}: Types) => {
  return (
    <div className="p-4">
      <form onSubmit={handleSubmitCategory}>
        <label className="form-control w-full max-w-xs" htmlFor="nameKey">
          <div className="label">
            <span className="label-text">Categoriya Nomi</span>
          </div>
          <input
            id="nameKey"
            type="text"
            value={createCategory}
            onChange={(e) => setCreateCategory(e.target.value)}
            name="name"
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        <button type="submit" className="btn mt-6">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;

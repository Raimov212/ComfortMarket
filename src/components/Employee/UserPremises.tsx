import React from "react";
import { useSelector } from "react-redux";
import { PremisesUser } from "../../types/userTypes";
import { RootState } from "../../redux/store";

const UserPremises: React.FC = () => {
  const premises: any = useSelector(
    (state: RootState) => state.rootReducer.user.userPremises
  );

  return (
    <div>
      <div className="border-b-2 border-one w-full  text-2xl text-one">
        Do'konlar ro'yhati
      </div>
      <table className="table ">
        <thead>
          <tr className="bg-base-200">
            <th>No</th>
            <th>Ismi</th>
            <th>Joyi</th>
            <th>Manzili</th>
            <th>Turi</th>
          </tr>
        </thead>
        <tbody>
          {premises.length > 0 ? (
            premises.map((premise: PremisesUser, index: string) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{premise.owner}</td>
                <td>{premise.name}</td>
                <td>{premise.address}</td>
                <td>{premise.type}</td>
              </tr>
            ))
          ) : (
            <div>Malumot yo'q</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserPremises;

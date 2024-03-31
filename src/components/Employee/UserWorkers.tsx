import React from "react";
import { useSelector } from "react-redux";
import { WorkersUser } from "../../types/userTypes";
import { RootState } from "../../redux/store";

const UserWorkers: React.FC = () => {
  const workers: any = useSelector(
    (state: RootState) => state.rootReducer.user.userWorkers
  );

  return (
    <div>
      <div className="border-b-2 border-one w-full  text-2xl text-one">
        Ishchilar ro'yhati
      </div>
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200">
            <th>No</th>
            <th>Username</th>
            <th>Ismi</th>
            <th>Telefon raqami</th>
            <th>Statusi</th>
            <th>Lavozimi</th>
            <th>Do'konlar ro'yhati</th>
          </tr>
        </thead>
        <tbody>
          {workers.length > 0 ? (
            workers?.map((worker: WorkersUser, index: string) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{worker.username}</td>
                <td>{worker.fullName}</td>
                <td>{worker.phoneNumber}</td>
                <td>{worker.enabled}</td>
                <td>{worker.role}</td>
                <td>
                  {worker.premise?.map((item, i) => (
                    <React.Fragment key={i}>{item}</React.Fragment>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td>Malumot yo'q</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserWorkers;

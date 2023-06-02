import React from "react";

const EmployeeItem: React.FC = () => {
  return (
    <div>
      <table>
        <tr className="border-b-2 border-one w-[98%] mt-2 text-one">
          <th>ID</th>
          <th>Name</th>
          <th>Date Created</th>
          <th>Action</th>
        </tr>
        <tr className="border-b-2 border-one w-[98%] mt-2 text-one">
          <td>1</td>
          <td>Wahyu Fatur Rizki</td>
          <td>21-04-2019</td>
          <td>Action</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Wahyu Fatur Rizki</td>
          <td>21-04-2019</td>
          <td>Action</td>
        </tr>
      </table>
    </div>
  );
};

export default EmployeeItem;

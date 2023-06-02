interface Props {
  data: any;
}

const GoodsItem = ({ data }: Props): JSX.Element => {
  console.log("goodsItem", data);

  // const columns = data[0] && Object.keys(data[0]);
  // console.log("columns", columns);

  return (
    <table className="w-[98%] mb-2" border={2}>
      <tr>
        <th>No</th>
        <th>Category</th>
        <th>Name</th>
        <th>Count</th>
        <th>Amount</th>
        <th>Article</th>
        <th>Barcode</th>
        <th>WhereId</th>
        <th>Picture</th>
        <th>Action</th>
      </tr>
      {data?.map((item: any, index: number) => (
        <>
          <tbody>
            <tr>
              <td key={item.id}>{index + 1}</td>
              <td>{item.category}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>{item.amount}</td>
              <td>{item.article}</td>
              <td>{item.barCode}</td>
              <td>{item.whereId}</td>
              <td>{item.pictureUrl}</td>
              <td>
                <div className="flex gap-2 items-center justify-center">
                  <p className="border-r-2 border-one pr-2  text-yellow-400 cursor-pointer">
                    edit
                  </p>
                  <p className="text-red-600 cursor-pointer">delete</p>
                </div>
              </td>
            </tr>
          </tbody>
        </>
      ))}
    </table>
  );
};

export default GoodsItem;

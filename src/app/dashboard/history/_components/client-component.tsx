"use client";
import React, { useCallback, useMemo, useState } from "react";
import { createColumns, History } from "../columns";
import { DataTable } from "../data-table";

const ClientComponent: React.FC<{ dbUser: any }> = ({ dbUser }) => {
  const [data, setData] = useState(dbUser.history);

  const handleDelete = useCallback((id: string) => {
    setData((prevData: any) =>
      prevData.filter((item: History) => item.id !== id)
    );
  }, []);

  const columns = useMemo(() => createColumns({ onDelete: handleDelete }), []);

  return (
    // <div>
    //   {dbUser && dbUser?.history.length > 0
    //     ? dbUser.history.map((history) => (
    //         <div key={history.id}>{history.title}</div>
    //       ))
    //     : "No History"}
    // </div>
    <div className="mx-5 py-2">
      <div className="mt-5 py-6 px-4 bg-white rounded">
        <h2>Output History</h2>
      </div>
      <div className="mt-5 py-6 px-4 bg-white rounded">
        {dbUser?.history && (
          <DataTable<History, any> columns={columns} data={data} />
        )}
      </div>
    </div>
  );
};

export default ClientComponent;

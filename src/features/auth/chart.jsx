import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

//example data
const data = [
  {
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    score: 0,
  },
  {
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    score: 0,
  },
];

const LeaderBoard = () => {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "name.firstName", //access nested data with dot notation
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "name.lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "score",
        header: "Score",
        size: 200,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default LeaderBoard;

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableEmpty,
  TableHeader,
  TableLoading,
  TableRow,
} from "./table";

export const TableRoot = Object.assign(Table, {
  Header: TableHeader,
  Column: TableColumn,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  Empty: TableEmpty,
  Loading: TableLoading,
});

export {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableEmpty,
  TableHeader,
  TableLoading,
  TableRow,
};

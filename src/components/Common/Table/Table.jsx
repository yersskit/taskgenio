import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DateTime, Settings } from "luxon";
import SortIcon from "../icons/SortIcon";
import DescendentIcon from "../icons/DescendentIcon";
import AscendentIcon from "../icons/AscendentIcon";
import TablePagination from "./TablePagination";

const Table = ({ data, hidden, customCells, controls, name }) => {
  const { t, i18n } = useTranslation();
  const [currentLang] = i18n.language.split("-");
  const columnHelper = createColumnHelper();

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  Settings.defaultLocale = currentLang;

  const columns =
    data.length > 0
      ? Object.keys(data[0])
          .filter((k) => !hidden.includes(k))
          .map((key) =>
            columnHelper.accessor(key, {
              cell: (info) => info.getValue(),
              header: () => {
                let convertedCase = key.replace(/([A-Z])/g, " $1");
                convertedCase =
                  convertedCase.charAt(0).toUpperCase() +
                  convertedCase.slice(1);
                return convertedCase;
              },
            })
          )
      : [];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <>
      {data && data.length > 0 ? (
        <div>
          <table className="table w-full text-sm">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    let translatedHeader = i18n.exists(
                      `tables.common.${header.column.id}`
                    )
                      ? t(`tables.common.${header.column.id}`)
                      : t(`tables.${name}.${header.column.id}`);

                    return (
                      <th
                        className={`normal-case text-sm ${
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }`}
                        onClick={() => {
                          if (header.column.getCanSort()) {
                            header.column.toggleSorting();
                          }
                        }}
                        key={header.id}
                      >
                        <div className="flex w-full h-full items-center justify-start gap-2">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                <p>{translatedHeader}</p>,
                                header.getContext()
                              )}
                          {header.column.getCanSort() &&
                            {
                              asc: <AscendentIcon />,
                              desc: <DescendentIcon />,
                              false: <SortIcon />,
                            }[header.column.getIsSorted()]}
                        </div>
                      </th>
                    );
                  })}
                  {controls && (
                    <th className="w-auto normal-case text-sm">
                      {t("tables.common.actions")}
                    </th>
                  )}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    let formattedValue = cell.getValue();

                    if (cell.column.id === "$createdAt") {
                      formattedValue = DateTime.fromISO(
                        cell.getValue()
                      ).toFormat("DDD");
                    } else if (cell.column.id === "status") {
                      formattedValue = t(`status.${cell.getValue()}`);
                    }

                    return (
                      <td key={cell.id}>
                        {flexRender(
                          customCells
                            ? customCells
                                .find(
                                  (customCell) =>
                                    customCell.column === cell.column.id
                                )
                                ?.component(cell.row.original) ?? formattedValue
                            : formattedValue,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                  {controls && (
                    <td className="w-auto">{controls(row.original)}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <TablePagination
            table={table}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
      ) : (
        <p className="text-gray-500">{t("errors.no_data_found")}</p>
      )}
    </>
  );
};

export default Table;

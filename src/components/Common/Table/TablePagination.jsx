import React from 'react';
import FirstPageIcon from '../Icons/FirstPageIcon';
import LastPageIcon from '../Icons/LastPageIcon';
import NextPageIcon from '../Icons/NextPageIcon';
import PreviousPageIcon from '../Icons/PreviousPageIcon';
import { useTranslation } from 'react-i18next';
import DebouncedInput from '../../Inputs/DebouncedInput';
import SimpleInput from '../../Inputs/SimpleInput';

const TablePagination = ({ table, globalFilter, setGlobalFilter }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-4 justify-between p-2 text-sm bg-base-200 rounded-b-lg flex-wrap">
      <DebouncedInput
        name="search"
        value={globalFilter ?? ''}
        onChange={(value) => setGlobalFilter(value)}
        debounce={500}
        size={'xs'}
        type={'text'}
      />
      <div className="flex items-center gap-4">
        <div className="flex justify-start items-center gap-1">
          <button
            className="btn btn-xs btn-square bg-secondary border-none text-secondary-content disabled:bg-opacity-30 hover:bg-secondary-focus disabled:hover:bg-secondary"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            <FirstPageIcon />
          </button>
          <button
            className="btn btn-xs btn-square bg-secondary border-none text-secondary-content disabled:bg-opacity-30 hover:bg-secondary-focus disabled:hover:bg-secondary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <PreviousPageIcon />
          </button>
          <button
            className="btn btn-xs btn-square bg-secondary border-none text-secondary-content disabled:bg-opacity-30 hover:bg-secondary-focus disabled:hover:bg-secondary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <NextPageIcon />
          </button>
          <button
            className="btn btn-xs btn-square bg-secondary border-none text-secondary-content disabled:bg-opacity-30 hover:bg-secondary-focus disabled:hover:bg-secondary"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            <LastPageIcon />
          </button>
        </div>
        <span className="flex items-center gap-1">
          <div>{t('labels.page')}</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} {t('labels.of')} {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          {t('labels.go_to_page')}
          <SimpleInput
            name="goToPage"
            type="number"
            min={1}
            max={table.getPageCount()}
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            size={'xs'}
          />
        </span>
      </div>
      <span className="flex items-center justify-start gap-1">
        {t('labels.showing')}{' '}
        <select
          className="select select-bordered select-xs w-16 text-right"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}>
          {[5, 10, 15, 20, 30].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>{' '}
        {t('labels.of')} {table.options.data.length} {t('labels.records')}
      </span>
    </div>
  );
};

export default TablePagination;

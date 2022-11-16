import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { Pagination } from '@mui/material';

import { useTranslation } from 'react-i18next';

import { useReports } from '../../../../../api/hooks/useReports/useReports';

import {
  PAGINATION_VARIANTS_NUMBERS,
  REQUEST_STATUS,
  START_BOUNDARY_COUNT,
  START_ITEM_PAGE,
  START_PAGE,
  START_SUBLING_COUNT
} from '../../../../../constants/app.constants';

import DropDown from '../../../../../shared/components/DropDown/DropDown';

import ProgressSpinner from '../../../../../shared/components/ProgressSpinner/ProgressSpinner';

import { calculatePagesCount } from '../../../../helpers/helpers';

import { DropDownItem } from '../../../../../shared/components/DropDown/drop-down.types';

import { ReportsProps } from './reports-types';

import classes from './reports.module.css';

function Reports({ renderTable }: ReportsProps) {
  const { t } = useTranslation();
  const {
    getReports,
    status,
    reports: { total, items = [] }
  } = useReports();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(START_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(START_ITEM_PAGE);

  const getReportsCallback = useCallback(() => {
    getReports(page - START_PAGE, rowsPerPage);
  }, [getReports, page, rowsPerPage]);

  useEffect(() => {
    setCount(calculatePagesCount(total, rowsPerPage));
  }, [rowsPerPage, total]);

  useEffect(() => {
    getReportsCallback();
  }, [getReportsCallback, page, rowsPerPage]);

  if (status === REQUEST_STATUS.LOADING) {
    return <ProgressSpinner isShow />;
  }

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (item: DropDownItem) => {
    setRowsPerPage(item.value);
    setPage(START_PAGE);
  };

  return (
    <div className={classes.container}>
      <div className={classes.block__title}>
        <h2 className={classes.title}>{t('reports_title')}</h2>
      </div>
      <div className={classes.line} />
      <div className={classes.dropdown__block}>
        <div className={classes.dropdown__title}>{t('items_per_page')}</div>
        <DropDown
          value={rowsPerPage}
          onListItemClick={handleChangeRowsPerPage}
          items={PAGINATION_VARIANTS_NUMBERS}
        />
      </div>
      {renderTable(items)}
      <div className={classes.pagination__block}>
        <Pagination
          count={count}
          size="large"
          page={page}
          onChange={handleChangePage}
          color="secondary"
          hidePrevButton
          hideNextButton
          siblingCount={START_SUBLING_COUNT}
          boundaryCount={START_BOUNDARY_COUNT}
        />
      </div>
    </div>
  );
}

export default Reports;

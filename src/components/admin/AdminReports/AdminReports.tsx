import { useCallback } from 'react';

import { Report } from './admin-reports.types';
import Reports from './components/Reports/Reports';
import ReportsTable from './components/ReportsTable/ReportsTable';

function AdminReports() {
  const renderTableCallback = useCallback((items: Report[]) => {
    return <ReportsTable items={items} />;
  }, []);
  return <Reports renderTable={renderTableCallback} />;
}

export default AdminReports;

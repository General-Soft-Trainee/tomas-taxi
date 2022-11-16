import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import Hint from '../../../../../../../shared/components/Hint/Hint';

import DriverCar from '../../../../../../client/ClientOrdersHistory/components/OrdersHistoryTable/components/DriverCar/DriverCar';

import AdminBlock from '../../../../../AdminActions/components/AdminBlock/AdminBlock';
import AdminUnblock from '../../../../../AdminActions/components/AdminUnblock/AdminUnblock';

import { AdminUsersTableProps } from '../../../../admin-users.types';

import classes from './drivers-table.module.css';

function DriversTable({ items, getUsers }: AdminUsersTableProps) {
  const { t } = useTranslation();
  return (
    <Table sx={{ minWidth: '1100px', marginTop: '60px' }}>
      <TableHead>
        <TableRow>
          <TableCell>{t('table.first_name')}</TableCell>
          <TableCell>{t('table.last_name')}</TableCell>
          <TableCell>{t('table.email')}</TableCell>
          <TableCell>{t('table.car')}</TableCell>
          <TableCell>{t('table.action')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className={classes.block__hint}>
                {item.blocked ? (
                  <Hint
                    content={
                      item.blockedUntil
                        ? `${t('hint.user_blocked_until')} ${moment(item.blockedUntil).format(
                            'DD.MM.YYYY LTS'
                          )}`
                        : t('hint.user_blocked_permanently')
                    }
                  >
                    <img src="/img/lock_icon.svg" alt="lock_icon" />
                  </Hint>
                ) : null}
              </div>
              {item.firstName}
            </TableCell>
            <TableCell>{item.lastName}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>
              <DriverCar car={item.car} />
            </TableCell>
            <TableCell>
              {item.blocked ? (
                <AdminUnblock getUsers={getUsers} userInfo={item} />
              ) : (
                <AdminBlock
                  getUsers={getUsers}
                  userInfo={item}
                  title={t('blocked_users_title.block_driver')}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DriversTable;

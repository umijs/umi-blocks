import { Button, Divider, Dropdown, Form, Icon, Menu } from 'antd';
import React, { useState, useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import UmiUIFlag from '@umijs/ui-flag';
import { FormComponentProps } from 'antd/es/form';
import { TableListItem, TableListParams } from './typing.d';

export async function queryRule(params?: TableListParams) {
  console.log(params);
  return { data: [], success: true };
}

const TableList: React.FC<FormComponentProps> = () => {
  const [sorter, setSorter] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Rule name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'desc',
    },
    {
      title: 'Number of service calls',
      dataIndex: 'callNo',
      sorter: true,
      align: 'right',
      renderText: (val: string) => `${val} 万`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueEnum: {
        0: { text: 'Shut down', status: 'Default' },
        1: { text: 'Running', status: 'Processing' },
        2: { text: 'Online', status: 'Success' },
        3: { text: 'Abnormal', status: 'Error' },
      },
    },
    {
      title: 'Last scheduled time',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: 'Operating',
      dataIndex: 'option',
      valueType: 'option',
      render: () => (
        <>
          <a>Configuration</a>
          <Divider type="vertical" />
          <a href="">Subscribe to alerts</a>
        </>
      ),
    },
  ];

  return (
    <ProTable<TableListItem>
      headerTitle="Enquiry form"
      actionRef={actionRef}
      rowKey="key"
      onChange={(_, _filter, _sorter) => {
        setSorter(`${_sorter.field}_${_sorter.order}`);
      }}
      params={{
        sorter,
      }}
      toolBarRender={(action, { selectedRows }) => [
        <>
          <UmiUIFlag />
        </>,
        <Button icon="plus" type="primary">
          New
        </Button>,
        selectedRows && selectedRows.length > 0 && (
          <Dropdown
            overlay={
              <Menu
                onClick={async e => {
                  if (e.key === 'remove') {
                    console.log('remove');
                    action.reload();
                  }
                }}
                selectedKeys={[]}
              >
                <Menu.Item key="remove">Batch deletion</Menu.Item>
                <Menu.Item key="approval">Batch approval</Menu.Item>
              </Menu>
            }
          >
            <Button>
              Bulk operation <Icon type="down" />
            </Button>
          </Dropdown>
        ),
      ]}
      tableAlertRender={(selectedRowKeys, selectedRows) => (
        <div>
          Selected <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> item&nbsp;&nbsp;
          <span>
            Total number of service calls{selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
          </span>
        </div>
      )}
      request={params => queryRule(params)}
      columns={columns}
    />
  );
};

export default Form.create<FormComponentProps>()(TableList);

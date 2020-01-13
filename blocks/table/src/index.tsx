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
      title: '规则名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      align: 'right',
      renderText: (val: string) => `${val} 万`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '关闭', status: 'Default' },
        1: { text: '运行中', status: 'Processing' },
        2: { text: '已上线', status: 'Success' },
        3: { text: '异常', status: 'Error' },
      },
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: () => (
        <>
          <a>配置</a>
          <Divider type="vertical" />
          <a href="">订阅警报</a>
        </>
      ),
    },
  ];

  return (
    <ProTable<TableListItem>
      headerTitle="查询表格"
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
          新建
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
                <Menu.Item key="remove">批量删除</Menu.Item>
                <Menu.Item key="approval">批量审批</Menu.Item>
              </Menu>
            }
          >
            <Button>
              批量操作 <Icon type="down" />
            </Button>
          </Dropdown>
        ),
      ]}
      tableAlertRender={(selectedRowKeys, selectedRows) => (
        <div>
          已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
          <span>
            服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
          </span>
        </div>
      )}
      request={params => queryRule(params)}
      columns={columns}
    />
  );
};

export default Form.create<FormComponentProps>()(TableList);

import React, { useState } from '@alipay/bigfish/react';
import { Table, Button, message, Card, Form, DatePicker } from '@alipay/bigfish/antd';
import { useAntdTable, useAsync } from '@umijs/hooks';
import TechUIForm from '@alipay/techui-form';
import { request, usePageState, utils } from '@ali/tarzan-lib';
import Edit from './component/Edit'; // 详情页的数据

const initialPageState = {
  currentStep: 0, // 分布中，当前的步骤
  stepFormData: [],  // 分布中，当前步骤的数据集合
  visible: false,
  // 是否展示详情、编辑、新增
  operateType: 'ADD',
  // 显示类型
  record: null,
  // 当前编辑的记录模型
  statusMap: {
    // '': '请选择',
    0: '草稿',
    10: '审核中',
    20: '审核成功',
    30: '审核失败',
  }, // 状态枚举
  deplpyUnit: ['部署单元1', '部署单元2', '部署单元3'],
  strategy: ['策略1', '策略2', '策略3'],
};

const StepForm = () => {
  // 每次设置initPageState，都会重新初始化一个新的，页面不刷新情况下均可以直接使用 ----
  const [pageState, setPageState] = usePageState(initialPageState);
  const [inputValue, setInputValue] = useState(); // 搜索框
  // 获取列表数据 ----

  const fetchList = ({ current, pageSize, ...rest }) => {
    const data = {
      current,
      pageSize,
      ...inputValue,
    };
    return request('/tarzan/api/planList', {
      method: 'post',
      data,
    }).then(res => ({
      total: res.total,
      data: res.list,
    }));
  };

  const { table, refresh, search } = useAntdTable(
    fetchList,
    [inputValue], // form参数作为依赖项，发生变化时，调用getTableData
    {
      defaultPageSize: 10,
      id: 'tableId',
    },
  );

  const handleDelete = record => {
    request(`/tarzan/api/planList/${record.id}`, {
      method: 'delete',
    }).then(res => {
      message.success('账号删除成功');
      refresh();
    });
  };

  const handleClose = isReload => {
    setPageState({
      visible: false,
    });

    if (isReload) {
      refresh();
    }
  };

  const renderForm = () => {
    const combineFields = [
      {
        type: 'input',
        id: 'createName',
        label: '创建人',
      },
      {
        type: 'input',
        id: 'approveId',
        label: '审批ID',
      },
      {
        type: 'input',
        id: 'name',
        label: '名称',
      },
      {
        type: 'select',
        label: '状态',
        id: 'status',
        options: utils.formateDataToSelect(pageState.statusMap),
      },
      {
        type: 'rangePicker',
        label: '创建时间',
        id: 'email',
      },
      {
        type: 'searchGroup',
        id: 'button',
        labelPlaceholder: true,
        okText: '搜索',
        cancelText: '重置',
      },
    ];
    return (
      <TechUIForm
        className="form-search"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        fields={combineFields}
        onValueSubmit={values => setInputValue(values)}
      />
    );
  };

  const renderTable = () => {
    const accountColumns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 80,
      },
      {
        title: '方案名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '审批号',
        dataIndex: 'approveId',
        key: 'approveId',
        width: 200,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 150,
        sorter: true,
      },
      {
        title: '操作员',
        key: 'operator',
        dataIndex: 'operator',
        width: 100,
      },
      {
        title: '修改时间',
        dataIndex: 'operatorTime',
        key: 'operatorTime',
        width: 150,
      },
      {
        key: 'operation',
        title: '操作',
        width: 120,
        render: (_, record) => (
          <span>
            <a
              style={{
                marginRight: '10px',
              }}
              onClick={() =>
                setPageState({
                  visible: true,
                  operateType: 'DETAIL',
                  record,
                })
              }
            >
              查看
            </a>
            <a
              style={{
                marginRight: '10px',
              }}
              onClick={() =>
                setPageState({
                  visible: true,
                  operateType: 'EDIT',
                  record,
                })
              }
            >
              编辑
            </a>
            <a onClick={() => handleDelete(record)}>删除</a>
          </span>
        ),
      },
    ];
    return <Table className="table-page" rowKey="id" columns={accountColumns} {...table} />;
  };

  const { visible } = pageState;
  return (
    <div>
      <h3 className="hTop">分布表单</h3>
      <Card>{renderForm()}</Card>
      <Card>
        <div className="table-top-buttons">
          <Button
            type="primary"
            onClick={() =>
              setPageState({
                visible: true,
                operateType: 'ADD',
                record: undefined,
              })
            }
          >
            新建方案
          </Button>
        </div>
        {renderTable()}

        {visible && <Edit handleClose={handleClose} />}
      </Card>
    </div>
  );
};

export default StepForm;

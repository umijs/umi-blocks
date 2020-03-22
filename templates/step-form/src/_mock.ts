const postPlanList = (req, res) => {
  const { current = 1, pageSize = 15 } = req.body;
  const list = [];
  const start = (current - 1) * 10;
  const end = start + pageSize;
  for (let i = start; i < end; i += 1) {
    list.push({
      id: i + 1,
      name: `方案${Math.floor(Math.random() * 100)}`,
      status: ['草稿', '审核中', '审核失败', '审核成功'][Math.floor(Math.random() * 3)],
      approveId: Math.floor(Math.random() * 10000000),
      operator: 'Serati',
      operatorTime: '2019-03-23',
      startDate: 1568703900947,
      endDate: 1568703910947,
      // desc: '描述信息',
    });
  }
  setTimeout(() => {
    res.send({
      list,
      total: 100,
      current,
      pageSize,
    });
  }, delayTime);
};

const getPlanDetail = (req, res) => {
  setTimeout(() => {
    res.send({
      id: 2,
      status: '20',
      startDate: 1568703900947,
      endDate: 1568703910947,
      name: `方案名称${req.body.id}`,
      desc: '方案描述',
      deplpyUnit: '部署单元2'
    });
  }, delayTime);
};

const mockConfig = {
  'post /tarzan/api/planList': postPlanList,
  'post /tarzan/api/planDetail': getPlanDetail,
};

export default mockConfig;

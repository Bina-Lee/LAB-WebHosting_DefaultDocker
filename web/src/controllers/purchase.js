const purchaseDAO = require('../dao/purchase');

// 구매 요청 페이지 렌더링
exports.getPurchasePage = (req, res) => {
  const { teamId } = req.session; // 세션에서 팀 ID 가져오기
  res.render('purchase_request', { teamId, error: null });
};

// 구매 요청 처리
exports.postPurchaseRequest = async (req, res) => {
  const { itemName, link, itemPrice, quantity, option, purpose } = req.body;
  const teamId = req.session.teamId; // 세션에서 teamId 가져옴
  const adminId = 100000000; // 고정된 adminId
  const status = 'PENDING';
  const updateDateTime = new Date();
  const totalCost = itemPrice * quantity;

  try {
    // 팀의 가장 최근 remainBudget 조회
    let remainBudget = await purchaseDAO.getLatestRemainBudget(teamId);

    if (remainBudget === null) {
      // 첫 기록인 경우 프로젝트 예산에서 차감
      const projectBudget = await purchaseDAO.getProjectBudget(teamId);
      remainBudget = projectBudget - totalCost;
    } else {
      // 기존 기록이 있을 경우 remainBudget에서 차감
      remainBudget -= totalCost;
    }

    if (remainBudget < 0) {
      return res.render('purchase_request', {
        teamId,
        error: '예산이 부족합니다.',
      });
    }

    // RequestRecord 테이블에 새로운 기록 추가
    await purchaseDAO.insertRequestRecord({
      remainBudget,
      status,
      updateDateTime,
      teamId,
      adminId,
    });

    // RequestPurchase 테이블에 구매 요청 정보 추가
    await purchaseDAO.insertRequestPurchase({
      itemName,
      link,
      itemPrice,
      quantity,
      option,
      purpose,
      teamId,
    });

    res.redirect('/student/main'); // 성공 시 메인 페이지로 리디렉트
  } catch (err) {
    console.error(err);
    res.render('purchase_request', { teamId, error: '구매 요청 중 오류가 발생했습니다.' });
  }
};

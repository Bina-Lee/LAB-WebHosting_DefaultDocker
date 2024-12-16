const pool = require('../config/database');

// 팀의 가장 최근 remainBudget 조회
exports.getLatestRemainBudget = async (teamId) => {
  const query = `
    SELECT remainBudget 
    FROM PurchaseRecord 
    WHERE teamId = ? 
    ORDER BY updateDateTime DESC 
    LIMIT 1
  `;
  const [rows] = await pool.query(query, [teamId]);
  return rows.length > 0 ? rows[0].remainBudget : null;
};

// 프로젝트의 초기 예산 가져오기
exports.getProjectBudget = async (teamId) => {
  const query = `
    SELECT p.budget 
    FROM Project p
    JOIN Team t ON p.projectId = t.projectId
    WHERE t.teamId = ?
  `;
  const [rows] = await pool.query(query, [teamId]);
  return rows[0].budget;
};

// RequestRecord에 새로운 예산 기록 추가
exports.insertRequestRecord = async ({ remainBudget, status, updateDateTime, teamId, adminId }) => {
  const query = `
    INSERT INTO PurchaseRecord 
    (remainBudget, status, updateDateTime, teamId, adminId)
    VALUES (?, ?, ?, ?, ?)
  `;
  await pool.query(query, [remainBudget, status, updateDateTime, teamId, adminId]);
};

// RequestPurchase 테이블에 구매 요청 삽입
exports.insertRequestPurchase = async ({ itemName, link, itemPrice, quantity, option, purpose, teamId }) => {
  const query = `
    INSERT INTO RequestPurchase 
    (itemName, link, itemPrice, quantity, option, purpose, teamId)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  await pool.query(query, [itemName, link, itemPrice, quantity, option, purpose, teamId]);
};

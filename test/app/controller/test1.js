async function delete_bill(args) {
  let pre_amt = null;
  let pre_type = null;
  const res = await bill_select_by_bill_id(args)

  let pre_amt = res.data[0].amt;
  let pre_type = res.data[0].type;

  // 删除账单
  await bill_delete(args)

  if (pre_type == 1) {
    //删除帐单后更新账户（删除支出）
    await account_update_after_bill_delete_consume({ ...args, pre_amt })
    //删除支出账单后更新预算表的已用金额
    await classify_budget_update_after_bill_delete({ ...args, pre_amt })
  } else {
    await account_update_after_bill_delete_income({ ...args, pre_amt })
  }
}
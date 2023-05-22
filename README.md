# 💰 Governance Mining
The script for verify the result of governance mining (using nodejs)

## 统计信息

### Season 1

1. 共有 8 个提案交付投票，总共有 18 个议题需要投票，一个节点能投票共 32 张。
2. 依据 [元规则 7.1.2.c](https://forum.seedao.xyz/thread/39871)，本季治理挖矿积分总数为第一季总发放积分数 12,387,397
SCR 的百分之五：619,369
3. 本季总投票数为 935 票，总共有 36 个节点投票，单个节点投票数在 5~32 票间，详细请见 `Votes_season1_2023-2-11.csv`。
4. 每票平均奖励积分为：662 SCR，100% 参与投票者可得 21184 积分。

## 合约操作

### 如何取得每季总积分数？

可透过 Etherscan 上的 Contract > Read as Proxy > totalSupplyAt 查询累积到该季积分总发放数，参数 snapshotid 为季数（ex: 第一季=1），得到的数值除以 18 个零 (÷1000000000000000000)即为积分数额。

透过两季之差，即可得到该季发放的积分总数。
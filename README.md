# 💰 Governance Mining
The script for verify the result of governance mining (using nodejs)

## 安装

```bash
npm install
cp .env.example .env
```

并将 `.env` 中的 `FOLDER_SEASON` 填入当季目录名称 (Ex: season3)

## 用法

1. 建立当季目录, 例如 `season3` (Ex: 第四季节点大会, 要统计当季第三季治理挖矿)
2. 将该季的节点大会投票(工作评估, 竞选投票, 门槛, 预算, 以及其他提案), 以及该季的P3提案的投票明细, 放入目录中
    - 透过 [Metaforo](https://forum.seedao.xyz/) 投票右上角 Export 下载
3. 执行 `npm run start`, 会看见目录下有 `Votes_seasonX_.....csv` 即为统计总票数
4. 根据积分总额，计算每票治理挖矿激励后，乘以票数即可得所有人的治理挖矿积分激励，并更新在本 `README.md` 中

## 统计信息

### Season 1

1. 共有 8 个提案交付投票，总共有 18 个议题需要投票，一个节点能投票共 32 张。
2. 依据 [元规则 7.1.2.c](https://forum.seedao.xyz/thread/39871)，本季治理挖矿积分总数为第一季总发放积分数 12,387,397
SCR 的百分之五：619,369
3. 本季总投票数为 935 票，总共有 36 个节点投票，单个节点投票数在 5~32 票间，详细请见 `Votes_season1_2023-2-11.csv`。
4. 每票平均奖励积分为：662 SCR，100% 参与投票者可得 21184 积分。

### Season 2

1. 在本季包含三层提案，总共有 19 个提案交付节点投票，总共有 46 个议题需要投票，一个节点能投票有 46 张。
2. 依据 [元规则 7.1.2.c](https://forum.seedao.xyz/thread/39871)，本季治理挖矿积分总数为第二季总发放积分数 2370034.2
SCR 的百分之五：118501.71
3. 本季总投票数为 1635 票，总共有 53 个节点投票，单个节点投票数在 1~46 票间，详细请见 `Votes_season2_2023-5-22.csv`。
4. 每票平均奖励积分为：118501.71 / 1635 = 72.4781 SCR，100% 参与 46 个投票的节点，可得 3333 积分（无条件舍去到整数位）。

## 合约操作

### 如何取得每季总积分数？

可透过 Etherscan 上的 Contract > Read as Proxy > totalSupplyAt 查询累积到该季积分总发放数，参数 snapshotid 为季数（ex: 第一季=1），得到的数值除以 18 个零 (÷1000000000000000000)即为积分数额。

透过两季之差，即可得到该季发放的积分总数。
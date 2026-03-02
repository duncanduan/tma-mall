export interface User {
  _id?: string;
  walletAddress: string;
  walletBalance: number;
  loginRecords: LoginRecord[];
  withdrawRecords: WithdrawRecord[];
  taskList: Task[];
  activeUpgrades: Upgrade[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Upgrade {
  id: string;
  name: string;
  powerBoost: number;
  duration: number;
  startTime: number;
  endTime: number;
}

export interface LoginRecord {
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface WithdrawRecord {
  amount: number;
  address: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  transactionHash?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  status: 'pending' | 'completed' | 'claimed';
  completedAt?: Date;
}

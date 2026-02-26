export interface User {
  _id?: string;
  walletAddress: string;
  walletBalance: number;
  loginRecords: LoginRecord[];
  withdrawRecords: WithdrawRecord[];
  taskList: Task[];
  createdAt: Date;
  updatedAt: Date;
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

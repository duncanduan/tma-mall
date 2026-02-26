import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Task } from '@/types/user';

export async function GET(request: NextRequest) {
  try {
    const walletAddress = request.nextUrl.searchParams.get('walletAddress');
    
    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('tma-mall');
    const user = await db.collection('users').findOne({ walletAddress });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user.taskList || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, task } = body;

    if (!walletAddress || !task) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('tma-mall');
    
    const newTask: Task = {
      id: task.id || Date.now().toString(),
      title: task.title,
      description: task.description,
      reward: task.reward,
      status: 'pending',
    };

    const result = await db.collection('users').updateOne(
      { walletAddress },
      {
        $push: { taskList: newTask },
        $set: { updatedAt: new Date() }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Task added successfully',
      task: newTask 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add task' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, taskId, status } = body;

    if (!walletAddress || !taskId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('tma-mall');
    
    const updateData: any = {
      'taskList.$.status': status,
      updatedAt: new Date()
    };

    if (status === 'completed') {
      updateData['taskList.$.completedAt'] = new Date();
    }

    const result = await db.collection('users').updateOne(
      { 
        walletAddress,
        'taskList.id': taskId 
      },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User or task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

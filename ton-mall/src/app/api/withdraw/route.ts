import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { WithdrawRecord } from '@/types/user';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, amount, address } = body;

    if (!walletAddress || !amount || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('tma-mall');
    
    const withdrawRecord: WithdrawRecord = {
      amount: parseFloat(amount),
      address,
      status: 'pending',
      timestamp: new Date(),
    };

    const result = await db.collection('users').updateOne(
      { walletAddress },
      {
        $push: { withdrawRecords: withdrawRecord as any },
        $set: { updatedAt: new Date() }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Withdraw record created successfully',
      withdrawRecord 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create withdraw record' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, recordId, status, transactionHash } = body;

    if (!walletAddress || !recordId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('tma-mall');
    
    const updateData: any = {
      'withdrawRecords.$.status': status,
      'withdrawRecords.$.transactionHash': transactionHash,
      updatedAt: new Date()
    };

    const result = await db.collection('users').updateOne(
      { 
        walletAddress,
        'withdrawRecords._id': recordId 
      },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User or record not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Withdraw record updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update withdraw record' }, { status: 500 });
  }
}

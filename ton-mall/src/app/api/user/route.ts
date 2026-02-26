import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { User, LoginRecord } from '@/types/user';

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

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress } = body;

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('tma-mall');
    
    const existingUser = await db.collection('users').findOne({ walletAddress });
    
    if (existingUser) {
      const loginRecord: LoginRecord = {
        timestamp: new Date(),
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      };

      await db.collection('users').updateOne(
        { walletAddress },
        {
          $push: { loginRecords: loginRecord },
          $set: { updatedAt: new Date() }
        }
      );

      return NextResponse.json({ message: 'User already exists, login record added', user: existingUser });
    }

    const newUser: User = {
      walletAddress,
      walletBalance: 0,
      loginRecords: [{
        timestamp: new Date(),
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      }],
      withdrawRecords: [],
      taskList: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('users').insertOne(newUser);
    
    return NextResponse.json({ 
      message: 'User created successfully', 
      user: { ...newUser, _id: result.insertedId } 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

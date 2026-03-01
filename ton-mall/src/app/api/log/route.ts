import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, level, context } = await request.json();
    
    // 记录日志到Vercel控制台
    console.log(`[${level}] ${message}`, context || '');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing log request:', error);
    return NextResponse.json({ success: false, error: 'Failed to process log' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Create Notification data and Save them into Database
async function createNotification() {
  try {
    // 1. Check for new user registration
    const lastHour = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
    const newUsers = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: lastHour
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (newUsers.length > 0) {
      await prisma.notification.create({
        data: {
          title: 'New User Registration',
          message: `${newUsers.length} new user${newUsers.length > 1 ? 's' : ''} registered in the last hour`,
          type: 'global'
        }
      });
    }

    // 2. Check price changes
    const prices = await prisma.neoxaPriceHistory.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100
    });

    if (prices.length > 0) {
      const currentPrice = prices[0].price;
      const previousPrice = prices[1]?.price;
      const allPrices = prices.map((p: { price: any; }) => p.price);
      const maxPrice = Math.max(...allPrices);
      const minPrice = Math.min(...allPrices);

      // Check for max price
      if (currentPrice === maxPrice) {
        await prisma.notification.create({
          data: {
            title: 'New Maximum Price',
            message: `Coin has reached a new maximum price of ${currentPrice}`,
            type: 'global',
            isMaxPrice: true
          }
        });
      }

      // Check for min price
      if (currentPrice === minPrice) {
        await prisma.notification.create({
          data: {
            title: 'New Minimum Price',
            message: `Coin has reached a new minimum price of ${currentPrice}`,
            type: 'global',
            isMinPrice: true
          }
        });
      }

      // Check for significant price change (10%)
      if (previousPrice) {
        const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;
        if (Math.abs(priceChange) >= 10) {
          await prisma.notification.create({
            data: {
              title: 'Significant Price Change',
              message: `Price has changed by ${priceChange.toFixed(2)}%`,
              type: 'global',
              priceChange
            }
          });
        }
      }
    }
  } catch (error) {
    console.error('Error creating notifications:', error);
  }
}

export async function GET() {
  try {
    await createNotification();
    
    // Fetch notifications
    const notifications = await prisma.notification.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 3
    });

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}





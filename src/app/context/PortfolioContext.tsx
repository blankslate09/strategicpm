"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface PortfolioData {
  ownerName: string;
  totalRevenue: number;
  avgNightlyRate: number;
  occupancy: number;
  avgListingRevenue: number;
  bookingNumbers: { date: string; bookings: number }[];
}

interface PortfolioContextType {
  portfolioData: PortfolioData;
  updatePortfolioData: (data: Partial<PortfolioData>) => void;
}

const defaultPortfolioData: PortfolioData = {
  ownerName: '',
  totalRevenue: 45570,
  avgNightlyRate: 433,
  occupancy: 84,
  avgListingRevenue: 10911,
  bookingNumbers: [
    { date: '2023-07-01', bookings: 5 },
    { date: '2023-07-02', bookings: 3 },
    { date: '2023-07-03', bookings: 7 },
    { date: '2023-07-04', bookings: 10 },
    { date: '2023-07-05', bookings: 4 },
  ],
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData)

  const updatePortfolioData = (newData: Partial<PortfolioData>) => {
    setPortfolioData(prevData => ({ ...prevData, ...newData }))
  }

  return (
    <PortfolioContext.Provider value={{ portfolioData, updatePortfolioData }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
} 
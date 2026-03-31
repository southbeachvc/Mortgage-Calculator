"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { DollarSign, Percent, CalendarDays } from "lucide-react"

/**
 * Calculates savings from extra repayments.
 * @param currentBalance - The current outstanding loan balance.
 * @param annualRate - The annual interest rate as a percentage.
 * @param remainingTermYears - The remaining loan term in years.
 * @param extraRepaymentMonthly - The additional amount paid monthly.
 * @returns An object containing total interest saved and months saved.
 */
const calculateSavings = (
  currentBalance: number,
  annualRate: number,
  remainingTermYears: number,
  extraRepaymentMonthly: number,
): { totalInterestSaved: number; monthsSaved: number } => {
  if (currentBalance <= 0 || annualRate < 0 || remainingTermYears <= 0) {
    return { totalInterestSaved: 0, monthsSaved: 0 }
  }

  const monthlyRate = annualRate / 100 / 12
  const totalMonths = remainingTermYears * 12

  // Calculate original monthly repayment
  let originalMonthlyRepayment: number
  if (monthlyRate === 0) {
    originalMonthlyRepayment = currentBalance / totalMonths
  } else {
    originalMonthlyRepayment =
      (currentBalance * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  }

  // Calculate new monthly repayment with extra amount
  const newMonthlyRepayment = originalMonthlyRepayment + extraRepaymentMonthly

  if (newMonthlyRepayment <= 0) {
    return { totalInterestSaved: 0, monthsSaved: 0 }
  }

  let balance = currentBalance
  let totalInterestOriginal = 0
  let totalInterestNew = 0
  let monthsNew = 0

  // Simulate original loan
  let tempBalanceOriginal = currentBalance
  for (let i = 0; i < totalMonths; i++) {
    const interestPayment = tempBalanceOriginal * monthlyRate
    totalInterestOriginal += interestPayment
    tempBalanceOriginal -= originalMonthlyRepayment - interestPayment
    if (tempBalanceOriginal <= 0) {
      totalInterestOriginal += tempBalanceOriginal * monthlyRate // Adjust for final interest
      break
    }
  }

  // Simulate new loan with extra repayments
  while (balance > 0 && monthsNew < totalMonths * 2) {
    // Cap to prevent infinite loop
    const interestPayment = balance * monthlyRate
    totalInterestNew += interestPayment
    balance -= newMonthlyRepayment - interestPayment
    monthsNew++
  }

  const totalInterestSaved = totalInterestOriginal - totalInterestNew
  const monthsSaved = totalMonths - monthsNew

  return {
    totalInterestSaved: Math.max(0, totalInterestSaved), // Ensure non-negative
    monthsSaved: Math.max(0, monthsSaved), // Ensure non-negative
  }
}

export default function SavingsCalculatorPage() {
  const [currentBalance, setCurrentBalance] = useState(500000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [remainingTermYears, setRemainingTermYears] = useState(25)
  const [extraRepaymentMonthly, setExtraRepaymentMonthly] = useState(100)

  const [savingsResult, setSavingsResult] = useState({
    totalInterestSaved: 0,
    monthsSaved: 0,
  })

  useEffect(() => {
    const result = calculateSavings(currentBalance, interestRate, remainingTermYears, extraRepaymentMonthly)
    setSavingsResult(result)
  }, [currentBalance, interestRate, remainingTermYears, extraRepaymentMonthly])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      {/* Top Banner Ad Placeholder */}
      <div className="w-full max-w-3xl mb-8 bg-[#1e3a5f] rounded-lg p-4 md:p-6">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Sponsored</p>
        <h3 className="text-white text-lg md:text-xl font-semibold mb-1">YOUR AD HERE</h3>
        <p className="text-gray-300 text-sm">Contact us to advertise your product or service at threefourqnquiry@gmail.com</p>
      </div>

      <Card className="w-full max-w-3xl shadow-xl rounded-lg overflow-hidden border-t-4 border-primary-purple-600">
        <CardHeader className="bg-primary-purple-600 p-6">
          <CardTitle className="text-3xl font-bold text-white">Savings Calculator</CardTitle>
          <p className="text-primary-purple-100 text-sm mt-1">See how much you can save by making extra repayments.</p>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          {/* Current Loan Balance */}
          <div className="space-y-3">
            <Label htmlFor="current-balance" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-purple-600" /> Current Loan Balance
            </Label>
            <Input
              id="current-balance"
              type="number"
              value={currentBalance}
              onChange={(e) => setCurrentBalance(Number(e.target.value))}
              className="w-full text-lg p-3 border-primary-purple-300 focus:border-primary-purple-500 focus:ring-primary-purple-500"
              min={10000}
              step={10000}
            />
            <Slider
              value={[currentBalance]}
              onValueChange={(val) => setCurrentBalance(val[0])}
              max={1000000}
              min={50000}
              step={10000}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground text-right font-medium">
              Current: {formatCurrency(currentBalance)}
            </p>
          </div>

          {/* Interest Rate */}
          <div className="space-y-3">
            <Label htmlFor="interest-rate" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <Percent className="w-5 h-5 text-primary-purple-600" /> Interest Rate (%)
            </Label>
            <Input
              id="interest-rate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full text-lg p-3 border-primary-purple-300 focus:border-primary-purple-500 focus:ring-primary-purple-500"
              min={0.1}
              max={15}
              step={0.1}
            />
            <Slider
              value={[interestRate]}
              onValueChange={(val) => setInterestRate(val[0])}
              max={10}
              min={1}
              step={0.1}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground text-right font-medium">Current: {interestRate.toFixed(2)}%</p>
          </div>

          {/* Remaining Loan Term */}
          <div className="space-y-3">
            <Label htmlFor="remaining-term" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary-purple-600" /> Remaining Loan Term (Years)
            </Label>
            <Input
              id="remaining-term"
              type="number"
              value={remainingTermYears}
              onChange={(e) => setRemainingTermYears(Number(e.target.value))}
              className="w-full text-lg p-3 border-primary-purple-300 focus:border-primary-purple-500 focus:ring-primary-purple-500"
              min={1}
              max={30}
              step={1}
            />
            <Slider
              value={[remainingTermYears]}
              onValueChange={(val) => setRemainingTermYears(val[0])}
              max={30}
              min={1}
              step={1}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground text-right font-medium">Current: {remainingTermYears} years</p>
          </div>

          {/* Extra Repayment Monthly */}
          <div className="space-y-3">
            <Label htmlFor="extra-repayment" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-purple-600" /> Extra Repayment (Monthly)
            </Label>
            <Input
              id="extra-repayment"
              type="number"
              value={extraRepaymentMonthly}
              onChange={(e) => setExtraRepaymentMonthly(Number(e.target.value))}
              className="w-full text-lg p-3 border-primary-purple-300 focus:border-primary-purple-500 focus:ring-primary-purple-500"
              min={0}
              step={50}
            />
            <Slider
              value={[extraRepaymentMonthly]}
              onValueChange={(val) => setExtraRepaymentMonthly(val[0])}
              max={1000}
              min={0}
              step={50}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground text-right font-medium">
              Current: {formatCurrency(extraRepaymentMonthly)}
            </p>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="space-y-1 bg-light-purple-100 p-4 rounded-md text-center">
              <p className="text-sm text-primary-purple-700 font-medium">Total Interest Saved</p>
              <p className="text-3xl font-bold text-primary-purple-800">
                {formatCurrency(savingsResult.totalInterestSaved)}
              </p>
            </div>
            <div className="space-y-1 bg-light-purple-100 p-4 rounded-md text-center">
              <p className="text-sm text-primary-purple-700 font-medium">Loan Term Reduced By</p>
              <p className="text-3xl font-bold text-primary-purple-800">
                {Math.floor(savingsResult.monthsSaved / 12)} yrs {Math.round(savingsResult.monthsSaved % 12)} mos
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Banner Ad Placeholder */}
      <div className="w-full max-w-3xl mt-8 bg-[#1e3a5f] rounded-lg p-4 md:p-6">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Sponsored</p>
        <h3 className="text-white text-lg md:text-xl font-semibold mb-1">YOUR AD HERE</h3>
        <p className="text-gray-300 text-sm">Contact us to advertise your product or service at threefourqnquiry@gmail.com</p>
      </div>
    </div>
  )
}

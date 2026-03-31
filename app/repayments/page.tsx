"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DollarSign, Percent, CalendarDays, Repeat } from "lucide-react"

/**
 * Calculates mortgage repayment details. (Copied from previous version, adapted for Unloan style)
 */
const calculateMortgage = (
  principal: number,
  annualRate: number,
  termYears: number,
  frequency: "monthly" | "fortnightly" | "weekly",
): { estimatedRepayment: number; totalInterest: number; totalRepayments: number } => {
  if (principal <= 0 || annualRate < 0 || termYears <= 0) {
    return { estimatedRepayment: 0, totalInterest: 0, totalRepayments: 0 }
  }

  let periodicRate: number
  let numberOfPayments: number

  switch (frequency) {
    case "monthly":
      periodicRate = annualRate / 100 / 12
      numberOfPayments = termYears * 12
      break
    case "fortnightly":
      periodicRate = annualRate / 100 / 26
      numberOfPayments = termYears * 26
      break
    case "weekly":
      periodicRate = annualRate / 100 / 52
      numberOfPayments = termYears * 52
      break
    default:
      periodicRate = annualRate / 100 / 12
      numberOfPayments = termYears * 12
  }

  let estimatedRepayment: number

  if (periodicRate === 0) {
    estimatedRepayment = principal / numberOfPayments
  } else {
    estimatedRepayment =
      (principal * (periodicRate * Math.pow(1 + periodicRate, numberOfPayments))) /
      (Math.pow(1 + periodicRate, numberOfPayments) - 1)
  }

  const totalRepayments = estimatedRepayment * numberOfPayments
  const totalInterest = totalRepayments - principal

  return {
    estimatedRepayment: isNaN(estimatedRepayment) ? 0 : estimatedRepayment,
    totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
    totalRepayments: isNaN(totalRepayments) ? 0 : totalRepayments,
  }
}

export default function RepaymentsCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(500000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [loanTermYears, setLoanTermYears] = useState(30)
  const [repaymentFrequency, setRepaymentFrequency] = useState<"monthly" | "fortnightly" | "weekly">("monthly")

  const [currentCalculation, setCurrentCalculation] = useState({
    loanAmount: 500000,
    interestRate: 6.5,
    loanTermYears: 30,
    repaymentFrequency: "monthly",
    estimatedRepayment: 0,
    totalInterest: 0,
    totalRepayments: 0,
  })

  useEffect(() => {
    const { estimatedRepayment, totalInterest, totalRepayments } = calculateMortgage(
      loanAmount,
      interestRate,
      loanTermYears,
      repaymentFrequency,
    )
    setCurrentCalculation({
      loanAmount,
      interestRate,
      loanTermYears,
      repaymentFrequency,
      estimatedRepayment,
      totalInterest,
      totalRepayments,
    })
  }, [loanAmount, interestRate, loanTermYears, repaymentFrequency])

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
          <CardTitle className="text-3xl font-bold text-white">Repayments Calculator</CardTitle>
          <p className="text-primary-purple-100 text-sm mt-1">Estimate your home loan repayments.</p>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          {/* Loan Amount Input */}
          <div className="space-y-3">
            <Label htmlFor="loan-amount" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-purple-600" /> Loan Amount
            </Label>
            <Input
              id="loan-amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full text-lg p-3 border-primary-purple-300 focus:border-primary-purple-500 focus:ring-primary-purple-500"
              min={10000}
              step={10000}
            />
            <Slider
              value={[loanAmount]}
              onValueChange={(val) => setLoanAmount(val[0])}
              max={1500000}
              min={50000}
              step={10000}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground text-right font-medium">
              Current: {formatCurrency(loanAmount)}
            </p>
          </div>

          {/* Interest Rate Input */}
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
              max={20}
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

          {/* Loan Term Input */}
          <div className="space-y-3">
            <Label htmlFor="loan-term" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary-purple-600" /> Loan Term (Years)
            </Label>
            <Input
              id="loan-term"
              type="number"
              value={loanTermYears}
              onChange={(e) => setLoanTermYears(Number(e.target.value))}
              className="w-full text-lg p-3 border-primary-purple-300 focus:border-primary-purple-500 focus:ring-primary-purple-500"
              min={1}
              max={50}
              step={1}
            />
            <Slider
              value={[loanTermYears]}
              onValueChange={(val) => setLoanTermYears(val[0])}
              max={40}
              min={5}
              step={1}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground text-right font-medium">Current: {loanTermYears} years</p>
          </div>

          {/* Repayment Frequency Select */}
          <div className="space-y-3">
            <Label
              htmlFor="repayment-frequency"
              className="text-lg font-semibold text-gray-700 flex items-center gap-2"
            >
              <Repeat className="w-5 h-5 text-primary-purple-600" /> Repayment Frequency
            </Label>
            <ToggleGroup
              type="single"
              value={repaymentFrequency}
              onValueChange={(value: "monthly" | "fortnightly" | "weekly") => {
                if (value) setRepaymentFrequency(value)
              }}
              className="grid grid-cols-3 gap-2 w-full"
            >
              <ToggleGroupItem
                value="monthly"
                aria-label="Monthly"
                className="flex-1 text-base py-3 data-[state=on]:bg-primary-purple-600 data-[state=on]:text-white data-[state=on]:border-primary-purple-600"
              >
                Monthly
              </ToggleGroupItem>
              <ToggleGroupItem
                value="fortnightly"
                aria-label="Fortnightly"
                className="flex-1 text-base py-3 data-[state=on]:bg-primary-purple-600 data-[state=on]:text-white data-[state=on]:border-primary-purple-600"
              >
                Fortnightly
              </ToggleGroupItem>
              <ToggleGroupItem
                value="weekly"
                aria-label="Weekly"
                className="flex-1 text-base py-3 data-[state=on]:bg-primary-purple-600 data-[state=on]:text-white data-[state=on]:border-primary-purple-600"
              >
                Weekly
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="space-y-1 bg-light-purple-100 p-4 rounded-md text-center">
              <p className="text-sm text-primary-purple-700 font-medium">Estimated Repayment</p>
              <p className="text-3xl font-bold text-primary-purple-800">
                {formatCurrency(currentCalculation.estimatedRepayment)}
              </p>
            </div>
            <div className="space-y-1 bg-light-purple-100 p-4 rounded-md text-center">
              <p className="text-sm text-primary-purple-700 font-medium">Total Interest</p>
              <p className="text-3xl font-bold text-primary-purple-800">
                {formatCurrency(currentCalculation.totalInterest)}
              </p>
            </div>
            <div className="space-y-1 bg-light-purple-100 p-4 rounded-md text-center">
              <p className="text-sm text-primary-purple-700 font-medium">Total Repayments</p>
              <p className="text-3xl font-bold text-primary-purple-800">
                {formatCurrency(currentCalculation.totalRepayments)}
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

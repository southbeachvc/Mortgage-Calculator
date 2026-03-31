"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { DollarSign, Users, Wallet } from "lucide-react"

export default function BorrowingPowerCalculatorPage() {
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
          <CardTitle className="text-3xl font-bold text-white">Borrowing Power Calculator</CardTitle>
          <p className="text-primary-purple-100 text-sm mt-1">Estimate how much you might be able to borrow.</p>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="space-y-3">
            <Label htmlFor="income" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-purple-600" /> Annual Income (before tax)
            </Label>
            <Input
              id="income"
              type="number"
              placeholder="e.g., 80000"
              className="w-full text-lg p-3 border-primary-purple-300 focus:border-primary-purple-500 focus:ring-primary-purple-500"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="expenses" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary-purple-600" /> Monthly Living Expenses
            </Label>
            <Input
              id="expenses"
              type="number"
              placeholder="e.g., 2000"
              className="w-full text-lg p-3 border-primary-purple-300 focus:border-primary-purple-500 focus:ring-primary-purple-500"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="dependents" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-purple-600" /> Number of Dependents
            </Label>
            <Input
              id="dependents"
              type="number"
              placeholder="e.g., 0"
              className="w-full text-lg p-3 border-primary-purple-300 focus:border-primary-purple-500 focus:ring-primary-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 pt-4">
            <div className="space-y-1 bg-light-purple-100 p-4 rounded-md text-center">
              <p className="text-sm text-primary-purple-700 font-medium">Estimated Borrowing Power</p>
              <p className="text-3xl font-bold text-primary-purple-800">
                {"$0.00"} {/* Placeholder */}
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

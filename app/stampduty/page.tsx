"use client"

import { Slider } from "@/components/ui/slider"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DollarSign, MapPin } from "lucide-react"
import { useState } from "react"

export default function StampDutyCalculatorPage() {
  const [propertyValue, setPropertyValue] = useState(700000)
  const [state, setState] = useState("NSW")
  const [isFirstHomeBuyer, setIsFirstHomeBuyer] = useState(false)
  const [isOwnerOccupier, setIsOwnerOccupier] = useState(true)

  const calculateStampDuty = () => {
    // This is a highly simplified example. Real stamp duty is complex and varies by state,
    // property value brackets, first home buyer grants, and other concessions.
    // This function provides a basic placeholder calculation.
    let duty = 0

    if (propertyValue <= 0) return 0

    switch (state) {
      case "NSW":
        if (propertyValue <= 30000) duty = propertyValue * 0.014
        else if (propertyValue <= 80000) duty = 420 + (propertyValue - 30000) * 0.016
        else if (propertyValue <= 300000) duty = 1220 + (propertyValue - 80000) * 0.035
        else if (propertyValue <= 1000000) duty = 8820 + (propertyValue - 300000) * 0.045
        else duty = 40320 + (propertyValue - 1000000) * 0.055

        // Very basic first home buyer concession example (not accurate for all NSW rules)
        if (isFirstHomeBuyer && isOwnerOccupier && propertyValue <= 800000) {
          if (propertyValue <= 650000)
            duty = 0 // Full exemption
          else if (propertyValue <= 800000) duty = (propertyValue - 650000) * 0.045 // Partial concession
        }
        break
      case "VIC":
        // Placeholder for VIC logic
        duty = propertyValue * 0.05 // Simplified flat rate
        if (isFirstHomeBuyer && isOwnerOccupier && propertyValue <= 750000) {
          if (propertyValue <= 600000) duty = 0
          else duty *= 0.5 // 50% concession
        }
        break
      case "QLD":
        // Placeholder for QLD logic
        duty = propertyValue * 0.035 // Simplified flat rate
        if (isFirstHomeBuyer && isOwnerOccupier && propertyValue <= 500000) {
          duty = 0
        }
        break
      default:
        duty = propertyValue * 0.04 // Generic fallback
    }
    return duty
  }

  const estimatedStampDuty = calculateStampDuty()

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
          <CardTitle className="text-3xl font-bold text-white">Stamp Duty Calculator</CardTitle>
          <p className="text-primary-purple-100 text-sm mt-1">Estimate the stamp duty on your property purchase.</p>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          {/* Property Value */}
          <div className="space-y-3">
            <Label htmlFor="property-value" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-purple-600" /> Property Value
            </Label>
            <Input
              id="property-value"
              type="number"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full text-lg p-3 border-primary-purple-300 focus:border-primary-purple-500 focus:ring-primary-purple-500"
              min={100000}
              step={10000}
            />
            <Slider
              value={[propertyValue]}
              onValueChange={(val) => setPropertyValue(val[0])}
              max={2000000}
              min={100000}
              step={10000}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground text-right font-medium">
              Current: {formatCurrency(propertyValue)}
            </p>
          </div>

          {/* State/Territory */}
          <div className="space-y-3">
            <Label htmlFor="state" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-purple-600" /> State/Territory
            </Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger
                id="state"
                className="w-full text-lg p-3 border-primary-purple-300 focus:border-primary-purple-500 focus:ring-primary-purple-500"
              >
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NSW">New South Wales</SelectItem>
                <SelectItem value="VIC">Victoria</SelectItem>
                <SelectItem value="QLD">Queensland</SelectItem>
                <SelectItem value="SA">South Australia</SelectItem>
                <SelectItem value="WA">Western Australia</SelectItem>
                <SelectItem value="TAS">Tasmania</SelectItem>
                <SelectItem value="ACT">ACT</SelectItem>
                <SelectItem value="NT">Northern Territory</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Checkboxes */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="first-home-buyer"
              checked={isFirstHomeBuyer}
              onCheckedChange={(checked) => setIsFirstHomeBuyer(Boolean(checked))}
            />
            <Label htmlFor="first-home-buyer" className="text-base font-medium text-gray-700">
              First Home Buyer
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="owner-occupier"
              checked={isOwnerOccupier}
              onCheckedChange={(checked) => setIsOwnerOccupier(Boolean(checked))}
            />
            <Label htmlFor="owner-occupier" className="text-base font-medium text-gray-700">
              Owner Occupier
            </Label>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 gap-6 pt-4">
            <div className="space-y-1 bg-light-purple-100 p-4 rounded-md text-center">
              <p className="text-sm text-primary-purple-700 font-medium">Estimated Stamp Duty</p>
              <p className="text-3xl font-bold text-primary-purple-800">{formatCurrency(estimatedStampDuty)}</p>
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

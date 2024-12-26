import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-white text-center">Choose Your Plan</h1>
      <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
        Select the perfect plan to optimize your short-term rental strategy and maximize your earnings.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">Free</CardTitle>
            <CardDescription className="text-gray-300">For individuals just getting started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-4xl font-bold text-white">$0<span className="text-xl font-normal">/month</span></p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Basic property analytics
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Limited report generation
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Single property management
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Get Started</Button>
          </CardFooter>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 border-orange-500 border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">Plus</CardTitle>
            <CardDescription className="text-gray-300">For growing businesses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-4xl font-bold text-white">$29<span className="text-xl font-normal">/month</span></p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Advanced analytics and reporting
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Unlimited report generation
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Up to 10 property management
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Revenue projections
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Upgrade to Plus</Button>
          </CardFooter>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">Pro</CardTitle>
            <CardDescription className="text-gray-300">For large-scale operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-4xl font-bold text-white">$99<span className="text-xl font-normal">/month</span></p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                All Plus features
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Unlimited property management
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                RevHouse advanced revenue management
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                CRM tools for guest management
              </li>
              <li className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Priority support
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Upgrade to Pro</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}


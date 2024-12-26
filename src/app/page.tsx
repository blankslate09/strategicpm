import Link from 'next/link'
import { ArrowRight, BarChart2, PieChart, TrendingUp, Zap, Users, Repeat } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
          Hit Your Growth Goals in Stride
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto">
          STRategy is your all-in-one platform for optimizing, growing, and retaining your short-term rental business.
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
            <Link href="/pricing">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>
      </section>

      <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <Zap className="h-10 w-10 text-orange-400 mb-2" />
            <CardTitle className="text-xl font-semibold text-white">Optimize</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-300">
              Maximize your rental income with our cutting-edge tools and strategies.
            </CardDescription>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>• RevHouse.ai - AI-powered revenue management</li>
              <li>• Partners - Collaborate with industry experts</li>
              <li>• Lessons - Learn from top performers</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <TrendingUp className="h-10 w-10 text-orange-400 mb-2" />
            <CardTitle className="text-xl font-semibold text-white">Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-300">
              Expand your portfolio and reach new heights in the short-term rental market.
            </CardDescription>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>• Management - Streamline your operations</li>
              <li>• Projections - Data-driven forecasting</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <Repeat className="h-10 w-10 text-orange-400 mb-2" />
            <CardTitle className="text-xl font-semibold text-white">Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-300">
              Keep your guests coming back and your property owners happy.
            </CardDescription>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>• Reports - Comprehensive analytics</li>
              <li>• CRM - Manage guest relationships</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Ready to Optimize Your Short-Term Rental Business?
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Join STRategy today and unlock the full potential of your properties.
        </p>
        <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
          <Link href="/signup" className="inline-flex items-center">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </div>
  )
}


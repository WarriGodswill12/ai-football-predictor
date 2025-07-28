import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Trophy, TrendingUp, Shield, Zap, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            🚀 AI-Powered Predictions
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            AI Football Predictor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Leverage advanced machine learning algorithms to predict football
            match outcomes with unprecedented accuracy.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Link href="/auth/register">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-2 hover:border-emerald-200 transition-colors">
            <CardHeader>
              <Brain className="w-12 h-12 text-emerald-600 mb-4" />
              <CardTitle>AI-Powered Analysis</CardTitle>
              <CardDescription>
                Advanced machine learning models analyze player stats, team
                performance, and historical data.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-200 transition-colors">
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Real-time Insights</CardTitle>
              <CardDescription>
                Get live updates and predictions as they happen, with confidence
                ratings for every match.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-purple-200 transition-colors">
            <CardHeader>
              <Trophy className="w-12 h-12 text-purple-600 mb-4" />
              <CardTitle>Track Performance</CardTitle>
              <CardDescription>
                Monitor your prediction accuracy, ROI, and compete with friends
                on the leaderboard.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600">87%</div>
              <div className="text-gray-600 dark:text-gray-300">
                Prediction Accuracy
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">50K+</div>
              <div className="text-gray-600 dark:text-gray-300">
                Active Users
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">25+</div>
              <div className="text-gray-600 dark:text-gray-300">
                Leagues Covered
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600">$2M+</div>
              <div className="text-gray-600 dark:text-gray-300">
                Virtual Winnings
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Start Winning?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Join thousands of users who are already making smarter predictions
            with AI.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
          >
            <Link href="/auth/register">Start Free Trial</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

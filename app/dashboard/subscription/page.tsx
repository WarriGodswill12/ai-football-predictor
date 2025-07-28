import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Crown,
  Check,
  X,
  Zap,
  Star,
  Shield,
  TrendingUp,
  Users,
  Brain,
  BarChart3,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    current: true,
    features: [
      { name: "5 predictions per day", included: true },
      { name: "Basic analytics", included: true },
      { name: "Standard accuracy", included: true },
      { name: "Community leaderboard", included: true },
      { name: "Email support", included: true },
      { name: "Advanced predictions", included: false },
      { name: "Unlimited predictions", included: false },
      { name: "Priority alerts", included: false },
      { name: "Advanced analytics", included: false },
      { name: "API access", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For serious predictors",
    popular: true,
    features: [
      { name: "Unlimited predictions", included: true },
      { name: "Advanced AI models", included: true },
      { name: "Priority alerts", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Live match insights", included: true },
      { name: "Export reports", included: true },
      { name: "Priority support", included: true },
      { name: "Custom notifications", included: true },
      { name: "API access", included: false },
      { name: "White-label solution", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description: "For professional bettors",
    features: [
      { name: "Everything in Pro", included: true },
      { name: "API access", included: true },
      { name: "Custom AI training", included: true },
      { name: "White-label solution", included: true },
      { name: "Dedicated support", included: true },
      { name: "Custom integrations", included: true },
      { name: "Advanced risk analysis", included: true },
      { name: "Portfolio management", included: true },
      { name: "Multi-user accounts", included: true },
      { name: "Custom reporting", included: true },
    ],
  },
];

const currentUsage = {
  predictionsUsed: 3,
  predictionsLimit: 5,
  analyticsViews: 15,
  analyticsLimit: 20,
  alertsReceived: 8,
  alertsLimit: 10,
};

export default function SubscriptionPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Subscription Plans</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Choose the perfect plan to enhance your football prediction experience
          with advanced AI insights
        </p>
      </div>

      {/* Current Plan Status */}
      <Card className="border-emerald-200 bg-emerald-50 dark:bg-emerald-950">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Crown className="mr-2 h-5 w-5 text-emerald-600" />
            Current Plan: Free
          </CardTitle>
          <CardDescription>
            You're currently on the Free plan. Upgrade to unlock more features!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {currentUsage.predictionsUsed}/{currentUsage.predictionsLimit}
              </div>
              <div className="text-sm text-gray-600">Predictions Used</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {currentUsage.analyticsViews}/{currentUsage.analyticsLimit}
              </div>
              <div className="text-sm text-gray-600">Analytics Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {currentUsage.alertsReceived}/{currentUsage.alertsLimit}
              </div>
              <div className="text-sm text-gray-600">Alerts Received</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${
              plan.popular ? "ring-2 ring-emerald-500 shadow-lg scale-105" : ""
            } ${plan.current ? "border-emerald-500" : ""}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-emerald-600 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="space-y-2">
                <div className="text-4xl font-bold">
                  {plan.price}
                  <span className="text-lg font-normal text-gray-500">
                    /{plan.period}
                  </span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included
                          ? "text-gray-900 dark:text-gray-100"
                          : "text-gray-500"
                      }`}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              <Button
                className={`w-full ${
                  plan.current
                    ? "bg-gray-600 hover:bg-gray-700 cursor-not-allowed"
                    : plan.popular
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={plan.current}
              >
                {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Comparison</CardTitle>
          <CardDescription>
            Detailed breakdown of what's included in each plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold">AI Predictions</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div>Free: 5 per day</div>
                <div>Pro: Unlimited</div>
                <div>Enterprise: Unlimited + Custom AI</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Analytics</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div>Free: Basic reports</div>
                <div>Pro: Advanced analytics</div>
                <div>Enterprise: Custom reporting</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold">Alerts</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div>Free: Basic alerts</div>
                <div>Pro: Priority alerts</div>
                <div>Enterprise: Custom alerts</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">Support</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div>Free: Email support</div>
                <div>Pro: Priority support</div>
                <div>Enterprise: Dedicated support</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Can I change my plan anytime?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Yes, you can upgrade or downgrade your plan at any time. Changes
              take effect immediately.
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">
              Is there a free trial for paid plans?
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              We offer a 7-day free trial for both Pro and Enterprise plans. No
              credit card required.
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">
              What payment methods do you accept?
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              We accept all major credit cards, PayPal, and bank transfers for
              Enterprise customers.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

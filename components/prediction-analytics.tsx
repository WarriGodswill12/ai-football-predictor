"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  Target,
  Brain,
  Activity,
  Zap,
  Award,
  AlertTriangle,
} from "lucide-react";

interface PredictionAnalyticsProps {
  matches: any[];
}

export function PredictionAnalytics({ matches }: PredictionAnalyticsProps) {
  // Calculate analytics
  const totalMatches = matches.length;
  const highConfidence = matches.filter(
    (m) => m.aiPrediction.confidence > 75
  ).length;
  const mediumConfidence = matches.filter(
    (m) => m.aiPrediction.confidence >= 60 && m.aiPrediction.confidence <= 75
  ).length;
  const lowConfidence = matches.filter(
    (m) => m.aiPrediction.confidence < 60
  ).length;

  const upsetAlerts = matches.filter((m) => m.upsetAlert).length;
  const valueOpportunities = matches.filter(
    (m) => m.valueRating && m.valueRating >= 4
  ).length;

  const avgConfidence = Math.round(
    matches.reduce((acc, m) => acc + m.aiPrediction.confidence, 0) /
      matches.length
  );

  const outcomeDistribution = {
    home: matches.filter((m) => m.aiPrediction.outcome === "Home Win").length,
    draw: matches.filter((m) => m.aiPrediction.outcome === "Draw").length,
    away: matches.filter((m) => m.aiPrediction.outcome === "Away Win").length,
  };

  const leagueBreakdown = matches.reduce((acc, match) => {
    acc[match.league] = (acc[match.league] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (totalMatches === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-gray-500">
          <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No predictions available for the selected filters</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Confidence Distribution */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-purple-600" />
            Confidence Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                High Confidence (75%+)
              </span>
              <Badge
                variant="secondary"
                className="bg-emerald-50 text-emerald-700"
              >
                {highConfidence} matches
              </Badge>
            </div>
            <Progress
              value={
                totalMatches > 0 ? (highConfidence / totalMatches) * 100 : 0
              }
              className="h-3"
              style={{ "--progress-background": "rgb(34 197 94)" } as any}
            />

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                Medium Confidence (60-75%)
              </span>
              <Badge
                variant="secondary"
                className="bg-yellow-50 text-yellow-700"
              >
                {mediumConfidence} matches
              </Badge>
            </div>
            <Progress
              value={
                totalMatches > 0 ? (mediumConfidence / totalMatches) * 100 : 0
              }
              className="h-3"
              style={{ "--progress-background": "rgb(234 179 8)" } as any}
            />

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                Lower Confidence (&lt;60%)
              </span>
              <Badge variant="secondary" className="bg-red-50 text-red-700">
                {lowConfidence} matches
              </Badge>
            </div>
            <Progress
              value={
                totalMatches > 0 ? (lowConfidence / totalMatches) * 100 : 0
              }
              className="h-3"
              style={{ "--progress-background": "rgb(239 68 68)" } as any}
            />
          </div>

          <div className="pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {avgConfidence}%
              </div>
              <div className="text-sm text-gray-600">Average Confidence</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Value Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-emerald-600">
                  {valueOpportunities}
                </div>
                <p className="text-xs text-gray-600">
                  High value bets (4+ rating)
                </p>
              </div>
              <Award className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Upset Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-amber-600">
                  {upsetAlerts}
                </div>
                <p className="text-xs text-gray-600">Potential surprises</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Best Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.max(...matches.map((m) => m.aiPrediction.confidence))}%
                </div>
                <p className="text-xs text-gray-600">Highest prediction</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Outcome Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
            Predicted Outcomes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Home Wins</span>
              <Badge className="bg-emerald-500 text-white">
                {outcomeDistribution.home}
              </Badge>
            </div>
            <Progress
              value={
                totalMatches > 0
                  ? (outcomeDistribution.home / totalMatches) * 100
                  : 0
              }
              className="h-2"
            />

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Draws</span>
              <Badge className="bg-gray-500 text-white">
                {outcomeDistribution.draw}
              </Badge>
            </div>
            <Progress
              value={
                totalMatches > 0
                  ? (outcomeDistribution.draw / totalMatches) * 100
                  : 0
              }
              className="h-2"
            />

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Away Wins</span>
              <Badge className="bg-blue-500 text-white">
                {outcomeDistribution.away}
              </Badge>
            </div>
            <Progress
              value={
                totalMatches > 0
                  ? (outcomeDistribution.away / totalMatches) * 100
                  : 0
              }
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* League Distribution */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5 text-green-600" />
            League Coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(leagueBreakdown).map(([league, count]) => (
              <div
                key={league}
                className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="font-semibold text-lg">{count as number}</div>
                <div className="text-sm text-gray-600">{league}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

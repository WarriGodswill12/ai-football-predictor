"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Download,
  Filter,
  Calendar,
  Target,
  DollarSign,
} from "lucide-react";

const roiData = [
  { month: "Jan", roi: 12.5 },
  { month: "Feb", roi: 8.2 },
  { month: "Mar", roi: 15.7 },
  { month: "Apr", roi: 22.1 },
  { month: "May", roi: 18.9 },
  { month: "Jun", roi: 25.3 },
  { month: "Jul", roi: 15.8 },
];

const leagueAccuracy = [
  { league: "Premier League", accuracy: 72.5, bets: 45 },
  { league: "La Liga", accuracy: 68.9, bets: 38 },
  { league: "Bundesliga", accuracy: 75.2, bets: 32 },
  { league: "Serie A", accuracy: 65.7, bets: 28 },
  { league: "Champions League", accuracy: 80.1, bets: 15 },
];

const betHistory = [
  {
    id: 1,
    date: "2025-07-20",
    match: "Chelsea vs Tottenham",
    prediction: "Home Win",
    odds: 2.2,
    stake: 100,
    result: "Won",
    profit: 120,
  },
  {
    id: 2,
    date: "2025-07-19",
    match: "PSG vs Lyon",
    prediction: "Away Win",
    odds: 1.85,
    stake: 50,
    result: "Lost",
    profit: -50,
  },
  {
    id: 3,
    date: "2025-07-18",
    match: "Bayern vs Dortmund",
    prediction: "Over 2.5",
    odds: 1.95,
    stake: 75,
    result: "Won",
    profit: 71.25,
  },
];

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track your performance and analyze betting patterns
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">+15.8%</div>
            <p className="text-xs text-gray-500">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hit Rate</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">68.5%</div>
            <p className="text-xs text-gray-500">Above 65% target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">$2,850</div>
            <p className="text-xs text-gray-500">+$420 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Stake</CardTitle>
            <BarChart3 className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">$85</div>
            <p className="text-xs text-gray-500">Per bet placed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ROI Over Time Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              ROI Over Time
            </CardTitle>
            <CardDescription>Monthly return on investment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {roiData.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 flex-1"
                >
                  <div
                    className="bg-emerald-500 rounded-t w-full transition-all hover:bg-emerald-600"
                    style={{
                      height: `${(data.roi / 30) * 100}%`,
                      minHeight: "20px",
                    }}
                  />
                  <div className="text-xs font-medium">{data.month}</div>
                  <div className="text-xs text-gray-500">{data.roi}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* League Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Accuracy by League
            </CardTitle>
            <CardDescription>
              Success rate across different competitions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {leagueAccuracy.map((league, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{league.league}</span>
                  <span className="text-sm text-gray-500">
                    {league.bets} bets
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all"
                      style={{ width: `${league.accuracy}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {league.accuracy}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Bet History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Bet History</CardTitle>
              <CardDescription>
                Detailed record of all your predictions
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="30">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Match</TableHead>
                <TableHead>Prediction</TableHead>
                <TableHead>Odds</TableHead>
                <TableHead>Stake</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>P&L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {betHistory.map((bet) => (
                <TableRow key={bet.id}>
                  <TableCell className="font-medium">
                    {new Date(bet.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{bet.match}</TableCell>
                  <TableCell>{bet.prediction}</TableCell>
                  <TableCell>{bet.odds}</TableCell>
                  <TableCell>${bet.stake}</TableCell>
                  <TableCell>
                    <Badge
                      variant={bet.result === "Won" ? "default" : "destructive"}
                      className="flex items-center w-fit"
                    >
                      {bet.result === "Won" ? (
                        <TrendingUp className="mr-1 h-3 w-3" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3" />
                      )}
                      {bet.result}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${
                        bet.profit > 0 ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {bet.profit > 0 ? "+" : ""}${bet.profit}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

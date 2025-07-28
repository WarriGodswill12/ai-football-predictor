"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TrendingUp,
  TrendingDown,
  Trophy,
  Target,
  Zap,
  AlertTriangle,
  Clock,
  DollarSign,
} from "lucide-react";
import mockData from "./football-data.json";
import { BetSlip } from "@/components/bet-slip";
import { MatchDetails } from "@/components/match-details";

export default function Page() {
  const { upcomingMatches, userStats, wallet } = mockData;
  const [betSlipSelections, setBetSlipSelections] = useState<any[]>([]);
  const [showBetSlip, setShowBetSlip] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [showMatchDetails, setShowMatchDetails] = useState(false);

  const addToBetSlip = (selection: any) => {
    setBetSlipSelections((prev) => {
      // Check if already in bet slip
      const exists = prev.find(
        (item) =>
          item.matchId === selection.matchId &&
          item.market === selection.market &&
          item.selection === selection.selection
      );

      if (exists) {
        return prev; // Don't add duplicates
      }

      return [...prev, selection];
    });
    setShowBetSlip(true);
  };

  const updateSelections = (selections: any[]) => {
    setBetSlipSelections(selections);
  };

  const showMatchDetailsModal = (match: any) => {
    setSelectedMatch(match);
    setShowMatchDetails(true);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome back! Here's your prediction overview.
          </p>
        </div>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setShowBetSlip(true)}
        >
          <Zap className="mr-2 h-4 w-4" />
          Quick Bet
          {betSlipSelections.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {betSlipSelections.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              +{userStats.roi}%
            </div>
            <p className="text-xs text-gray-500">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {userStats.winRate}%
            </div>
            <p className="text-xs text-gray-500">+5.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Streak</CardTitle>
            <Trophy className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {userStats.activeStreak}
            </div>
            <p className="text-xs text-gray-500">Consecutive wins</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Wallet Balance
            </CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              ${wallet.balance.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">Available for betting</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Matches */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Upcoming Matches
              </CardTitle>
              <CardDescription>
                AI predictions for today's matches
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingMatches.map((match) => (
                <div
                  key={match.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="font-semibold">{match.homeTeam}</div>
                        <div className="text-xs text-gray-500">vs</div>
                        <div className="font-semibold">{match.awayTeam}</div>
                      </div>
                      <Badge variant="outline">{match.league}</Badge>
                      {match.upsetAlert && (
                        <Badge
                          variant="destructive"
                          className="flex items-center"
                        >
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Upset Alert
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        {new Date(match.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>

                  {/* AI Prediction */}
                  <div className="bg-emerald-50 dark:bg-emerald-950 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-emerald-800 dark:text-emerald-200">
                        AI Prediction: {match.aiPrediction.outcome}
                      </span>
                      <span className="text-sm font-medium text-emerald-600">
                        {match.aiPrediction.confidence}% Confidence
                      </span>
                    </div>
                    <Progress
                      value={match.aiPrediction.confidence}
                      className="mb-2 h-2"
                    />
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">
                      {match.aiPrediction.rationale}
                    </p>
                  </div>

                  {/* Odds Comparison */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-medium">Home</div>
                      <div className="text-gray-600">
                        Book: {match.bookmakerOdds.home}
                      </div>
                      <div
                        className={`font-medium ${
                          match.aiOdds.home < match.bookmakerOdds.home
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        AI: {match.aiOdds.home}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Draw</div>
                      <div className="text-gray-600">
                        Book: {match.bookmakerOdds.draw}
                      </div>
                      <div
                        className={`font-medium ${
                          match.aiOdds.draw < match.bookmakerOdds.draw
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        AI: {match.aiOdds.draw}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Away</div>
                      <div className="text-gray-600">
                        Book: {match.bookmakerOdds.away}
                      </div>
                      <div
                        className={`font-medium ${
                          match.aiOdds.away < match.bookmakerOdds.away
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        AI: {match.aiOdds.away}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => showMatchDetailsModal(match)}
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => {
                        // Add default home win selection to bet slip
                        addToBetSlip({
                          id: `${match.id}-home-win`,
                          matchId: match.id,
                          match: `${match.homeTeam} vs ${match.awayTeam}`,
                          market: "Match Result",
                          selection: match.homeTeam,
                          odds: match.bookmakerOdds.home,
                          stake: 0,
                        });
                      }}
                    >
                      Quick Bet
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                onClick={() => setShowBetSlip(true)}
              >
                <Zap className="mr-2 h-4 w-4" />
                Place Quick Bet
                {betSlipSelections.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {betSlipSelections.length}
                  </Badge>
                )}
              </Button>
              <Button variant="outline" className="w-full">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full">
                <DollarSign className="mr-2 h-4 w-4" />
                Top Up Wallet
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {wallet.recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex items-center space-x-3">
                    {transaction.type === "win" ? (
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <div>
                      <div className="text-sm font-medium">
                        {transaction.match}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${transaction.stake} @ {transaction.odds}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      transaction.profit > 0
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.profit > 0 ? "+" : ""}${transaction.profit}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bet Slip Modal */}
      <BetSlip
        isOpen={showBetSlip}
        onClose={() => setShowBetSlip(false)}
        selections={betSlipSelections}
        onUpdateSelections={updateSelections}
      />

      {/* Match Details Modal */}
      <MatchDetails
        isOpen={showMatchDetails}
        onClose={() => setShowMatchDetails(false)}
        match={selectedMatch}
        onAddToBetSlip={addToBetSlip}
      />
    </div>
  );
}

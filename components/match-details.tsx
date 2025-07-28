"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Brain,
  TrendingUp,
  BarChart3,
  History,
  Target,
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Activity,
  Zap,
  Plus,
} from "lucide-react";

interface MatchDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  match: any;
  onAddToBetSlip?: (selection: any) => void;
}

export function MatchDetails({
  isOpen,
  onClose,
  match,
  onAddToBetSlip,
}: MatchDetailsProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);

  if (!match) return null;

  // Mock additional data that would come from API
  const matchDetails = {
    venue: "Etihad Stadium",
    attendance: "54,000",
    referee: "Michael Oliver",
    weather: "Clear, 18°C",
    predictions: {
      scoreline: "2-1",
      goals: {
        home: 2.1,
        away: 1.3,
      },
      possession: {
        home: 58,
        away: 42,
      },
      shots: {
        home: 14,
        away: 9,
      },
    },
    headToHead: {
      total: 10,
      homeWins: 6,
      draws: 2,
      awayWins: 2,
      lastMeeting: {
        date: "2024-03-15",
        score: "3-1",
        winner: "home",
      },
    },
    form: {
      home: ["W", "W", "D", "W", "L"],
      away: ["L", "W", "W", "D", "W"],
    },
    keyStats: {
      home: {
        goalsFor: 2.3,
        goalsAgainst: 1.1,
        cleanSheets: 7,
        form: "WWDWL",
      },
      away: {
        goalsFor: 1.8,
        goalsAgainst: 1.4,
        cleanSheets: 5,
        form: "LWWDW",
      },
    },
    bookmakerOdds: [
      { bookmaker: "Bet365", home: 1.65, draw: 3.8, away: 5.2 },
      { bookmaker: "William Hill", home: 1.68, draw: 3.7, away: 5.0 },
      { bookmaker: "Betfair", home: 1.7, draw: 3.9, away: 4.8 },
      { bookmaker: "Paddy Power", home: 1.67, draw: 3.8, away: 5.1 },
    ],
  };

  const addToBetSlip = (outcome: "home" | "draw" | "away") => {
    const selection = {
      id: `${match.id}-${outcome}-${Date.now()}`,
      matchId: match.id,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      league: match.league,
      selection: outcome,
      odds: match.bookmakerOdds[outcome],
      stake: 10,
    };

    onAddToBetSlip?.(selection);
    setSelectedOutcome(outcome);
    setTimeout(() => setSelectedOutcome(null), 2000);
  };

  const getFormColor = (result: string) => {
    switch (result) {
      case "W":
        return "bg-green-500";
      case "D":
        return "bg-yellow-500";
      case "L":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold">
                {match.homeTeam} vs {match.awayTeam}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                <Badge variant="outline">{match.league}</Badge>
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(match.date).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(match.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Comprehensive match analysis and betting opportunities
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="predictions">AI Analysis</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="h2h">Head-to-Head</TabsTrigger>
            <TabsTrigger value="odds">Odds</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Bet Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-emerald-600" />
                  Quick Bet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={selectedOutcome === "home" ? "default" : "outline"}
                    className="flex-col h-20"
                    onClick={() => addToBetSlip("home")}
                  >
                    <div className="font-medium">{match.homeTeam}</div>
                    <div className="text-sm">{match.bookmakerOdds.home}</div>
                    {selectedOutcome === "home" && (
                      <div className="text-xs text-green-600">Added!</div>
                    )}
                  </Button>
                  <Button
                    variant={selectedOutcome === "draw" ? "default" : "outline"}
                    className="flex-col h-20"
                    onClick={() => addToBetSlip("draw")}
                  >
                    <div className="font-medium">Draw</div>
                    <div className="text-sm">{match.bookmakerOdds.draw}</div>
                    {selectedOutcome === "draw" && (
                      <div className="text-xs text-green-600">Added!</div>
                    )}
                  </Button>
                  <Button
                    variant={selectedOutcome === "away" ? "default" : "outline"}
                    className="flex-col h-20"
                    onClick={() => addToBetSlip("away")}
                  >
                    <div className="font-medium">{match.awayTeam}</div>
                    <div className="text-sm">{match.bookmakerOdds.away}</div>
                    {selectedOutcome === "away" && (
                      <div className="text-xs text-green-600">Added!</div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Match Info */}
            <Card>
              <CardHeader>
                <CardTitle>Match Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Venue: {matchDetails.venue}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">
                      Expected Attendance: {matchDetails.attendance}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">
                      Referee: {matchDetails.referee}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">
                      Weather: {matchDetails.weather}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Prediction Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-emerald-600" />
                  AI Prediction Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-emerald-50 dark:bg-emerald-950 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-emerald-800 dark:text-emerald-200">
                      Predicted Outcome: {match.aiPrediction.outcome}
                    </span>
                    <span className="text-sm font-medium text-emerald-600">
                      {match.aiPrediction.confidence}% Confidence
                    </span>
                  </div>
                  <Progress
                    value={match.aiPrediction.confidence}
                    className="mb-2 h-2"
                  />
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    {match.aiPrediction.rationale}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            {/* Predicted Scoreline */}
            <Card>
              <CardHeader>
                <CardTitle>Predicted Scoreline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">
                    {matchDetails.predictions.scoreline}
                  </div>
                  <div className="text-sm text-gray-500">Most Likely Score</div>
                </div>
              </CardContent>
            </Card>

            {/* Expected Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Expected Goals (xG)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>{match.homeTeam}</span>
                    <span className="font-mono font-bold">
                      {matchDetails.predictions.goals.home}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{match.awayTeam}</span>
                    <span className="font-mono font-bold">
                      {matchDetails.predictions.goals.away}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prediction Charts */}
            <Card>
              <CardHeader>
                <CardTitle>Match Predictions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Possession</span>
                    <span>
                      {matchDetails.predictions.possession.home}% -{" "}
                      {matchDetails.predictions.possession.away}%
                    </span>
                  </div>
                  <div className="flex rounded-full overflow-hidden h-3">
                    <div
                      className="bg-blue-500"
                      style={{
                        width: `${matchDetails.predictions.possession.home}%`,
                      }}
                    ></div>
                    <div
                      className="bg-red-500"
                      style={{
                        width: `${matchDetails.predictions.possession.away}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Expected Shots</span>
                    <span>
                      {matchDetails.predictions.shots.home} -{" "}
                      {matchDetails.predictions.shots.away}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1 bg-blue-100 rounded-full">
                      <div
                        className="bg-blue-500 h-3 rounded-full"
                        style={{
                          width: `${
                            (matchDetails.predictions.shots.home /
                              (matchDetails.predictions.shots.home +
                                matchDetails.predictions.shots.away)) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex-1 bg-red-100 rounded-full">
                      <div
                        className="bg-red-500 h-3 rounded-full"
                        style={{
                          width: `${
                            (matchDetails.predictions.shots.away /
                              (matchDetails.predictions.shots.home +
                                matchDetails.predictions.shots.away)) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            {/* Team Form */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Form (Last 5 Games)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{match.homeTeam}</span>
                    <div className="flex space-x-1">
                      {matchDetails.form.home.map((result, index) => (
                        <div
                          key={index}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-bold ${getFormColor(
                            result
                          )}`}
                        >
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{match.awayTeam}</span>
                    <div className="flex space-x-1">
                      {matchDetails.form.away.map((result, index) => (
                        <div
                          key={index}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-bold ${getFormColor(
                            result
                          )}`}
                        >
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Season Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">{match.homeTeam}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Goals For (avg):</span>
                        <span className="font-medium">
                          {matchDetails.keyStats.home.goalsFor}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Goals Against (avg):</span>
                        <span className="font-medium">
                          {matchDetails.keyStats.home.goalsAgainst}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Clean Sheets:</span>
                        <span className="font-medium">
                          {matchDetails.keyStats.home.cleanSheets}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">{match.awayTeam}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Goals For (avg):</span>
                        <span className="font-medium">
                          {matchDetails.keyStats.away.goalsFor}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Goals Against (avg):</span>
                        <span className="font-medium">
                          {matchDetails.keyStats.away.goalsAgainst}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Clean Sheets:</span>
                        <span className="font-medium">
                          {matchDetails.keyStats.away.cleanSheets}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="h2h" className="space-y-6">
            {/* Head to Head Record */}
            <Card>
              <CardHeader>
                <CardTitle>Head-to-Head Record</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-blue-600">
                      {matchDetails.headToHead.homeWins}
                    </div>
                    <div className="text-sm text-gray-500">
                      {match.homeTeam} Wins
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-gray-600">
                      {matchDetails.headToHead.draws}
                    </div>
                    <div className="text-sm text-gray-500">Draws</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-red-600">
                      {matchDetails.headToHead.awayWins}
                    </div>
                    <div className="text-sm text-gray-500">
                      {match.awayTeam} Wins
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="mt-4">
                  <h5 className="font-medium mb-2">Last Meeting</h5>
                  <div className="text-sm text-gray-600">
                    {matchDetails.headToHead.lastMeeting.date} - Score:{" "}
                    {matchDetails.headToHead.lastMeeting.score}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="odds" className="space-y-6">
            {/* Odds Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Bookmaker Odds Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Bookmaker</th>
                        <th className="text-center py-2">{match.homeTeam}</th>
                        <th className="text-center py-2">Draw</th>
                        <th className="text-center py-2">{match.awayTeam}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matchDetails.bookmakerOdds.map((book, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-2 font-medium">{book.bookmaker}</td>
                          <td className="text-center py-2">
                            <Badge variant="outline">{book.home}</Badge>
                          </td>
                          <td className="text-center py-2">
                            <Badge variant="outline">{book.draw}</Badge>
                          </td>
                          <td className="text-center py-2">
                            <Badge variant="outline">{book.away}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* AI vs Market Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>AI vs Market Odds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>{match.homeTeam} Win</span>
                    <div className="flex space-x-4">
                      <div>
                        <span className="text-xs text-gray-500">Market:</span>
                        <Badge variant="outline" className="ml-1">
                          {match.bookmakerOdds.home}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">AI:</span>
                        <Badge
                          variant={
                            match.aiOdds.home < match.bookmakerOdds.home
                              ? "default"
                              : "secondary"
                          }
                          className="ml-1"
                        >
                          {match.aiOdds.home}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Draw</span>
                    <div className="flex space-x-4">
                      <div>
                        <span className="text-xs text-gray-500">Market:</span>
                        <Badge variant="outline" className="ml-1">
                          {match.bookmakerOdds.draw}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">AI:</span>
                        <Badge
                          variant={
                            match.aiOdds.draw < match.bookmakerOdds.draw
                              ? "default"
                              : "secondary"
                          }
                          className="ml-1"
                        >
                          {match.aiOdds.draw}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{match.awayTeam} Win</span>
                    <div className="flex space-x-4">
                      <div>
                        <span className="text-xs text-gray-500">Market:</span>
                        <Badge variant="outline" className="ml-1">
                          {match.bookmakerOdds.away}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">AI:</span>
                        <Badge
                          variant={
                            match.aiOdds.away < match.bookmakerOdds.away
                              ? "default"
                              : "secondary"
                          }
                          className="ml-1"
                        >
                          {match.aiOdds.away}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

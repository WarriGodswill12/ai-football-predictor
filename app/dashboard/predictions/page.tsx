"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Clock,
  Calendar,
  Target,
  Eye,
  Star,
  Zap,
} from "lucide-react";
import mockData from "../football-data.json";
import { BetSlip } from "@/components/bet-slip";
import { MatchDetails } from "@/components/match-details";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const todayMatches = mockData.upcomingMatches;

const tomorrowMatches = [
  {
    id: 4,
    homeTeam: "Juventus",
    awayTeam: "AC Milan",
    league: "Serie A",
    date: "2025-07-23T18:00:00Z",
    aiPrediction: {
      outcome: "Home Win",
      confidence: 64,
      rationale:
        "Juventus strong at home with 75% win rate. Milan struggling away from home.",
    },
    bookmakerOdds: {
      home: 1.95,
      draw: 3.2,
      away: 4.1,
    },
    aiOdds: {
      home: 1.75,
      draw: 3.5,
      away: 4.8,
    },
    upsetAlert: false,
    valueRating: 3.2,
  },
  {
    id: 5,
    homeTeam: "Liverpool",
    awayTeam: "Manchester United",
    league: "Premier League",
    date: "2025-07-23T16:30:00Z",
    aiPrediction: {
      outcome: "Away Win",
      confidence: 58,
      rationale:
        "United's recent form impressive. Liverpool dealing with injuries to key players.",
    },
    bookmakerOdds: {
      home: 2.1,
      draw: 3.4,
      away: 3.6,
    },
    aiOdds: {
      home: 2.8,
      draw: 3.1,
      away: 2.9,
    },
    upsetAlert: true,
    valueRating: 4.1,
  },
];

const weekendMatches = [
  {
    id: 6,
    homeTeam: "PSG",
    awayTeam: "Marseille",
    league: "Ligue 1",
    date: "2025-07-26T20:00:00Z",
    aiPrediction: {
      outcome: "Home Win",
      confidence: 85,
      rationale:
        "PSG dominant at home with superior squad depth. Historical advantage in Le Classique.",
    },
    bookmakerOdds: {
      home: 1.4,
      draw: 4.5,
      away: 7.2,
    },
    aiOdds: {
      home: 1.25,
      draw: 5.1,
      away: 9.5,
    },
    upsetAlert: false,
    valueRating: 2.8,
  },
  {
    id: 7,
    homeTeam: "Atletico Madrid",
    awayTeam: "Sevilla",
    league: "La Liga",
    date: "2025-07-27T21:00:00Z",
    aiPrediction: {
      outcome: "Draw",
      confidence: 71,
      rationale:
        "Both teams defensively solid. Historical record suggests low-scoring draw.",
    },
    bookmakerOdds: {
      home: 2.3,
      draw: 3.1,
      away: 3.4,
    },
    aiOdds: {
      home: 2.6,
      draw: 2.7,
      away: 3.8,
    },
    upsetAlert: false,
    valueRating: 4.5,
  },
];

function MatchCard({
  match,
  showActions = true,
  onAddToBetSlip,
  onShowDetails,
}: {
  match: any;
  showActions?: boolean;
  onAddToBetSlip?: (selection: any) => void;
  onShowDetails?: (match: any) => void;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="font-semibold">{match.homeTeam}</div>
              <div className="text-xs text-gray-500">vs</div>
              <div className="font-semibold">{match.awayTeam}</div>
            </div>
            <Badge variant="outline">{match.league}</Badge>
            {match.upsetAlert && (
              <Badge variant="destructive" className="flex items-center">
                <AlertTriangle className="mr-1 h-3 w-3" />
                Upset Alert
              </Badge>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">
              {new Date(match.date).toLocaleDateString()}
            </div>
            <div className="text-sm font-medium">
              {new Date(match.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>

        {/* AI Prediction */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-emerald-800 dark:text-emerald-200 flex items-center">
              <Brain className="mr-2 h-4 w-4" />
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
        <div className="grid grid-cols-3 gap-2 text-xs mb-3">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="font-medium">Home Win</div>
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
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
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
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="font-medium">Away Win</div>
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

        {showActions && (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={() => onShowDetails && onShowDetails(match)}
            >
              <Eye className="mr-1 h-3 w-3" />
              Details
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              onClick={() => {
                if (onAddToBetSlip) {
                  onAddToBetSlip({
                    id: `${match.id}-home-win`,
                    matchId: match.id,
                    homeTeam: match.homeTeam,
                    awayTeam: match.awayTeam,
                    league: match.league,
                    selection: "home",
                    odds: match.bookmakerOdds.home,
                    stake: 0,
                    selectionName: match.homeTeam,
                  });
                }
              }}
            >
              <Zap className="mr-1 h-3 w-3" />
              Quick Bet
            </Button>
            <Button size="sm" variant="outline">
              <Star className="h-3 w-3" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function PredictionsPage() {
  const [betSlipSelections, setBetSlipSelections] = useState<any[]>([]);
  const [showBetSlip, setShowBetSlip] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [showMatchDetails, setShowMatchDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [sortBy, setSortBy] = useState("confidence");

  const addToBetSlip = (selection: any) => {
    setBetSlipSelections((prev) => {
      const exists = prev.find(
        (item) =>
          item.matchId === selection.matchId &&
          item.selection === selection.selection
      );

      if (exists) {
        return prev;
      }

      return [...prev, selection];
    });
    setShowBetSlip(true);
  };

  const removeBetSlipSelection = (id: string) => {
    setBetSlipSelections((prev) => prev.filter((item) => item.id !== id));
  };

  const clearBetSlip = () => {
    setBetSlipSelections([]);
  };

  const showMatchDetailsModal = (match: any) => {
    setSelectedMatch(match);
    setShowMatchDetails(true);
  };

  const updateSelections = (selections: any[]) => {
    setBetSlipSelections(selections);
  };

  const filterMatches = (matches: any[]) => {
    return matches
      .filter((match) => {
        const matchesSearch =
          searchTerm === "" ||
          match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
          match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
          match.league.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesLeague =
          selectedLeague === "all" ||
          match.league.toLowerCase().includes(selectedLeague.toLowerCase());

        return matchesSearch && matchesLeague;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "confidence":
            return b.aiPrediction.confidence - a.aiPrediction.confidence;
          case "time":
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          case "value":
            return (b.valueRating || 0) - (a.valueRating || 0);
          default:
            return 0;
        }
      });
  };

  const allMatches = [...todayMatches, ...tomorrowMatches, ...weekendMatches];
  const highConfidenceMatches = allMatches.filter(
    (m) => m.aiPrediction.confidence > 70
  );
  const upsetAlerts = allMatches.filter((m) => m.upsetAlert);
  const avgConfidence = Math.round(
    allMatches.reduce((acc, m) => acc + m.aiPrediction.confidence, 0) /
      allMatches.length
  );

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Predictions</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Advanced machine learning predictions for upcoming matches
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedLeague} onValueChange={setSelectedLeague}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leagues</SelectItem>
              <SelectItem value="premier">Premier League</SelectItem>
              <SelectItem value="laliga">La Liga</SelectItem>
              <SelectItem value="bundesliga">Bundesliga</SelectItem>
              <SelectItem value="seriea">Serie A</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="confidence">By Confidence</SelectItem>
              <SelectItem value="time">By Time</SelectItem>
              <SelectItem value="value">By Value</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Prediction Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Predictions
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {todayMatches.length}
            </div>
            <p className="text-xs text-gray-500">Matches analyzed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              High Confidence
            </CardTitle>
            <Target className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {highConfidenceMatches.length}
            </div>
            <p className="text-xs text-gray-500">Above 70% confidence</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upset Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {upsetAlerts.length}
            </div>
            <p className="text-xs text-gray-500">Potential upsets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Confidence
            </CardTitle>
            <Brain className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {avgConfidence}%
            </div>
            <p className="text-xs text-gray-500">Across all predictions</p>
          </CardContent>
        </Card>
      </div>

      {/* Predictions by Day */}
      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Today
          </TabsTrigger>
          <TabsTrigger value="tomorrow" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Tomorrow
          </TabsTrigger>
          <TabsTrigger value="weekend" className="flex items-center">
            <Star className="mr-2 h-4 w-4" />
            Weekend
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Today's Matches</h2>
              <Badge variant="secondary">
                {todayMatches.length} predictions
              </Badge>
            </div>
            <div className="space-y-4">
              {todayMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onAddToBetSlip={addToBetSlip}
                  onShowDetails={showMatchDetailsModal}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tomorrow">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Tomorrow's Matches</h2>
              <Badge variant="secondary">
                {tomorrowMatches.length} predictions
              </Badge>
            </div>
            <div className="space-y-4">
              {tomorrowMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onAddToBetSlip={addToBetSlip}
                  onShowDetails={showMatchDetailsModal}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weekend">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Weekend Highlights</h2>
              <Badge variant="secondary">
                {weekendMatches.length} predictions
              </Badge>
            </div>
            <div className="space-y-4">
              {weekendMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onAddToBetSlip={addToBetSlip}
                  onShowDetails={showMatchDetailsModal}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

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

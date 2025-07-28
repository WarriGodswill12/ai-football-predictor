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
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Clock,
  MapPin,
  Users,
  Target,
  TrendingUp,
  AlertTriangle,
  Star,
  Calendar,
  Zap,
  Eye,
  BarChart3,
} from "lucide-react";

// Mock match data
const matchData = {
  id: 1,
  homeTeam: "Manchester City",
  awayTeam: "Arsenal",
  league: "Premier League",
  venue: "Etihad Stadium",
  date: "2025-07-21T15:00:00Z",
  attendance: "53,400",
  referee: "Michael Oliver",
  homeTeamLogo: "/teams/city.png",
  awayTeamLogo: "/teams/arsenal.png",
  aiPrediction: {
    outcome: "Home Win",
    confidence: 78,
    rationale:
      "Manchester City's exceptional home form (85% win rate) combined with Arsenal's defensive injuries creates a strong advantage for the hosts.",
    keyFactors: [
      "City's home record: 17W-2D-1L this season",
      "Arsenal missing Saliba and Gabriel (injuries)",
      "Historical advantage: City won 3 of last 5 meetings",
      "Current form: City 5W-0D-0L vs Arsenal 3W-1D-1L",
    ],
  },
  odds: {
    bookmaker: {
      home: 1.65,
      draw: 3.8,
      away: 5.2,
    },
    ai: {
      home: 1.55,
      draw: 4.1,
      away: 6.5,
    },
  },
  headToHead: [
    { date: "2024-03-31", result: "City 4-1 Arsenal", venue: "Home" },
    { date: "2024-10-08", result: "Arsenal 1-0 City", venue: "Away" },
    { date: "2023-04-26", result: "City 4-1 Arsenal", venue: "Home" },
    { date: "2023-02-15", result: "Arsenal 3-1 City", venue: "Away" },
    { date: "2022-08-31", result: "City 3-1 Arsenal", venue: "Home" },
  ],
  teamStats: {
    city: {
      position: 1,
      points: 73,
      goalsFor: 78,
      goalsAgainst: 23,
      form: ["W", "W", "W", "W", "W"],
      homeRecord: "17-2-1",
      keyPlayers: ["Haaland", "De Bruyne", "Rodri"],
    },
    arsenal: {
      position: 2,
      points: 71,
      goalsFor: 71,
      goalsAgainst: 28,
      form: ["W", "W", "L", "W", "W"],
      awayRecord: "12-5-3",
      keyPlayers: ["Saka", "Ødegaard", "Rice"],
    },
  },
};

export default function MatchDetailPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Match Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Badge variant="outline">{matchData.league}</Badge>
              <Badge variant="secondary">
                <Clock className="mr-1 h-3 w-3" />
                {new Date(matchData.date).toLocaleDateString()}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Star className="mr-1 h-3 w-3" />
                Favorite
              </Button>
              <Button size="sm" variant="outline">
                <Eye className="mr-1 h-3 w-3" />
                Watch Live
              </Button>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-8 mb-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center mb-2">
                  <span className="text-xl font-bold">MC</span>
                </div>
                <h2 className="text-xl font-bold">{matchData.homeTeam}</h2>
                <div className="text-sm text-gray-500">Home</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold mb-2">VS</div>
                <div className="text-lg">
                  {new Date(matchData.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-2">
                  <span className="text-xl font-bold">ARS</span>
                </div>
                <h2 className="text-xl font-bold">{matchData.awayTeam}</h2>
                <div className="text-sm text-gray-500">Away</div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {matchData.venue}
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                {matchData.attendance}
              </div>
              <div>Referee: {matchData.referee}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* AI Prediction */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5 text-emerald-600" />
                AI Prediction Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Prediction */}
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">
                    Predicted Outcome: {matchData.aiPrediction.outcome}
                  </h3>
                  <Badge className="bg-emerald-600">
                    {matchData.aiPrediction.confidence}% Confidence
                  </Badge>
                </div>
                <Progress
                  value={matchData.aiPrediction.confidence}
                  className="mb-3"
                />
                <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-4">
                  {matchData.aiPrediction.rationale}
                </p>
              </div>

              {/* Key Factors */}
              <div>
                <h4 className="font-semibold mb-3">Key Factors Analyzed:</h4>
                <div className="space-y-2">
                  {matchData.aiPrediction.keyFactors.map((factor, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Odds Comparison */}
              <div>
                <h4 className="font-semibold mb-3">Odds Comparison:</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Outcome</TableHead>
                      <TableHead>Bookmaker</TableHead>
                      <TableHead>AI Model</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Home Win</TableCell>
                      <TableCell>{matchData.odds.bookmaker.home}</TableCell>
                      <TableCell className="font-medium">
                        {matchData.odds.ai.home}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            matchData.odds.ai.home <
                            matchData.odds.bookmaker.home
                              ? "default"
                              : "secondary"
                          }
                        >
                          {matchData.odds.ai.home <
                          matchData.odds.bookmaker.home
                            ? "Value"
                            : "No Value"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Draw</TableCell>
                      <TableCell>{matchData.odds.bookmaker.draw}</TableCell>
                      <TableCell className="font-medium">
                        {matchData.odds.ai.draw}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            matchData.odds.ai.draw <
                            matchData.odds.bookmaker.draw
                              ? "default"
                              : "secondary"
                          }
                        >
                          {matchData.odds.ai.draw <
                          matchData.odds.bookmaker.draw
                            ? "Value"
                            : "No Value"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Away Win</TableCell>
                      <TableCell>{matchData.odds.bookmaker.away}</TableCell>
                      <TableCell className="font-medium">
                        {matchData.odds.ai.away}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            matchData.odds.ai.away <
                            matchData.odds.bookmaker.away
                              ? "default"
                              : "secondary"
                          }
                        >
                          {matchData.odds.ai.away <
                          matchData.odds.bookmaker.away
                            ? "Value"
                            : "No Value"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Head to Head */}
          <Card>
            <CardHeader>
              <CardTitle>Head-to-Head Record</CardTitle>
              <CardDescription>
                Last 5 meetings between these teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {matchData.headToHead.map((match, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-gray-500">
                        {new Date(match.date).toLocaleDateString()}
                      </div>
                      <Badge variant="outline">{match.venue}</Badge>
                    </div>
                    <div className="font-medium">{match.result}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Bet */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Quick Bet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="flex-col h-16">
                  <div className="font-medium">Home</div>
                  <div className="text-xs">{matchData.odds.bookmaker.home}</div>
                </Button>
                <Button variant="outline" className="flex-col h-16">
                  <div className="font-medium">Draw</div>
                  <div className="text-xs">{matchData.odds.bookmaker.draw}</div>
                </Button>
                <Button variant="outline" className="flex-col h-16">
                  <div className="font-medium">Away</div>
                  <div className="text-xs">{matchData.odds.bookmaker.away}</div>
                </Button>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Add to Bet Slip
              </Button>
            </CardContent>
          </Card>

          {/* Team Form */}
          <Card>
            <CardHeader>
              <CardTitle>Current Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{matchData.homeTeam}</span>
                  <span className="text-sm text-gray-500">
                    #{matchData.teamStats.city.position} -{" "}
                    {matchData.teamStats.city.points} pts
                  </span>
                </div>
                <div className="flex space-x-1 mb-2">
                  {matchData.teamStats.city.form.map((result, index) => (
                    <div
                      key={index}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        result === "W"
                          ? "bg-emerald-500 text-white"
                          : result === "D"
                          ? "bg-amber-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  Home: {matchData.teamStats.city.homeRecord}
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{matchData.awayTeam}</span>
                  <span className="text-sm text-gray-500">
                    #{matchData.teamStats.arsenal.position} -{" "}
                    {matchData.teamStats.arsenal.points} pts
                  </span>
                </div>
                <div className="flex space-x-1 mb-2">
                  {matchData.teamStats.arsenal.form.map((result, index) => (
                    <div
                      key={index}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        result === "W"
                          ? "bg-emerald-500 text-white"
                          : result === "D"
                          ? "bg-amber-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  Away: {matchData.teamStats.arsenal.awayRecord}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Players */}
          <Card>
            <CardHeader>
              <CardTitle>Key Players to Watch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">{matchData.homeTeam}</h4>
                <div className="space-y-1">
                  {matchData.teamStats.city.keyPlayers.map((player, index) => (
                    <div
                      key={index}
                      className="text-sm flex items-center justify-between"
                    >
                      <span>{player}</span>
                      <Star className="h-3 w-3 text-amber-500" />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">{matchData.awayTeam}</h4>
                <div className="space-y-1">
                  {matchData.teamStats.arsenal.keyPlayers.map(
                    (player, index) => (
                      <div
                        key={index}
                        className="text-sm flex items-center justify-between"
                      >
                        <span>{player}</span>
                        <Star className="h-3 w-3 text-amber-500" />
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

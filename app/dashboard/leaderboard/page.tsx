import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Target,
  Users,
  Crown,
  Flame,
} from "lucide-react";
import mockData from "@/lib/mock-data.json";

const extendedLeaderboard = [
  {
    rank: 1,
    username: "PredictorPro",
    roi: 28.5,
    winRate: 72.1,
    totalBets: 89,
    profit: 4250,
    streak: 12,
    avatar: "/avatars/user1.jpg",
  },
  {
    rank: 2,
    username: "AIFootballGuru",
    roi: 24.3,
    winRate: 69.8,
    totalBets: 156,
    profit: 3890,
    streak: 8,
    avatar: "/avatars/user2.jpg",
  },
  {
    rank: 3,
    username: "BettingWizard",
    roi: 21.7,
    winRate: 67.4,
    totalBets: 203,
    profit: 3420,
    streak: 5,
    avatar: "/avatars/user3.jpg",
  },
  {
    rank: 4,
    username: "ThePunter",
    roi: 19.8,
    winRate: 65.2,
    totalBets: 134,
    profit: 2960,
    streak: 3,
    avatar: "/avatars/user4.jpg",
  },
  {
    rank: 5,
    username: "StatsKing",
    roi: 18.9,
    winRate: 64.7,
    totalBets: 178,
    profit: 2850,
    streak: 7,
    avatar: "/avatars/user5.jpg",
  },
  {
    rank: 6,
    username: "YouTheUser",
    roi: 15.8,
    winRate: 68.5,
    totalBets: 145,
    profit: 2850,
    streak: 7,
    avatar: "/avatars/shadcn.jpg",
    isCurrentUser: true,
  },
];

const friendsLeaderboard = [
  {
    rank: 1,
    username: "YouTheUser",
    roi: 15.8,
    winRate: 68.5,
    totalBets: 145,
    profit: 2850,
    streak: 7,
    avatar: "/avatars/shadcn.jpg",
    isCurrentUser: true,
  },
  {
    rank: 2,
    username: "BuddyBetter",
    roi: 12.4,
    winRate: 61.3,
    totalBets: 98,
    profit: 1890,
    streak: 4,
    avatar: "/avatars/friend1.jpg",
  },
  {
    rank: 3,
    username: "MatchMate",
    roi: 8.7,
    winRate: 58.9,
    totalBets: 112,
    profit: 1240,
    streak: 2,
    avatar: "/avatars/friend2.jpg",
  },
];

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Crown className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Trophy className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Medal className="h-5 w-5 text-amber-600" />;
    default:
      return <Award className="h-5 w-5 text-gray-500" />;
  }
}

function LeaderboardTable({ data }: { data: typeof extendedLeaderboard }) {
  return (
    <div className="space-y-4">
      {data.map((user) => (
        <Card
          key={user.rank}
          className={`transition-all hover:shadow-md ${
            user.isCurrentUser
              ? "ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-950"
              : ""
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {getRankIcon(user.rank)}
                  <span className="text-2xl font-bold text-gray-400">
                    #{user.rank}
                  </span>
                </div>

                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback>
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{user.username}</h3>
                    {user.isCurrentUser && (
                      <Badge variant="secondary">You</Badge>
                    )}
                    {user.streak >= 5 && (
                      <Badge
                        variant="destructive"
                        className="flex items-center"
                      >
                        <Flame className="mr-1 h-3 w-3" />
                        {user.streak}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {user.totalBets} total bets
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-lg font-bold text-emerald-600">
                    +{user.roi}%
                  </div>
                  <div className="text-xs text-gray-500">ROI</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">
                    {user.winRate}%
                  </div>
                  <div className="text-xs text-gray-500">Win Rate</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600">
                    ${user.profit}
                  </div>
                  <div className="text-xs text-gray-500">Profit</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            See how you rank against other predictors
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="roi">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="roi">Sort by ROI</SelectItem>
              <SelectItem value="winRate">Sort by Win Rate</SelectItem>
              <SelectItem value="profit">Sort by Profit</SelectItem>
              <SelectItem value="bets">Sort by Total Bets</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Top 3 Podium */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {extendedLeaderboard.slice(0, 3).map((user, index) => (
              <Card
                key={user.rank}
                className={`text-center ${
                  index === 0
                    ? "ring-2 ring-yellow-500"
                    : index === 1
                    ? "ring-2 ring-gray-400"
                    : "ring-2 ring-amber-600"
                }`}
              >
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    {getRankIcon(user.rank)}
                  </div>
                  <Avatar className="h-16 w-16 mx-auto">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback>
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{user.username}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold text-emerald-600">
                    +{user.roi}%
                  </div>
                  <div className="text-sm text-gray-500">ROI</div>
                  <div className="flex justify-center space-x-4 text-sm">
                    <div>
                      <div className="font-medium">{user.winRate}%</div>
                      <div className="text-gray-500">Win Rate</div>
                    </div>
                    <div>
                      <div className="font-medium">${user.profit}</div>
                      <div className="text-gray-500">Profit</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Tabs */}
      <Tabs defaultValue="global" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="global" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Global Leaderboard
          </TabsTrigger>
          <TabsTrigger value="friends" className="flex items-center">
            <Trophy className="mr-2 h-4 w-4" />
            Friends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global">
          <Card>
            <CardHeader>
              <CardTitle>Global Rankings</CardTitle>
              <CardDescription>
                Top predictors from around the world
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LeaderboardTable data={extendedLeaderboard} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friends">
          <Card>
            <CardHeader>
              <CardTitle>Friends Leaderboard</CardTitle>
              <CardDescription>How you rank among your friends</CardDescription>
            </CardHeader>
            <CardContent>
              <LeaderboardTable data={friendsLeaderboard} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

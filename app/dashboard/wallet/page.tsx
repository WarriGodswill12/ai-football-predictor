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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Wallet as WalletIcon,
} from "lucide-react";
import mockData from "@/lib/mock-data.json";

export default function WalletPage() {
  const { wallet } = mockData;

  const allTransactions = [
    ...wallet.recentTransactions,
    {
      id: 3,
      type: "deposit",
      match: "Account Top-up",
      stake: 500,
      odds: 1.0,
      result: "Completed",
      profit: 500,
      date: "2025-07-18T10:30:00Z",
    },
    {
      id: 4,
      type: "win",
      match: "Bayern vs Dortmund",
      stake: 75,
      odds: 2.1,
      result: "Won",
      profit: 82.5,
      date: "2025-07-17T19:30:00Z",
    },
    {
      id: 5,
      type: "loss",
      match: "Madrid vs Atletico",
      stake: 100,
      odds: 1.95,
      result: "Lost",
      profit: -100,
      date: "2025-07-16T21:00:00Z",
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Wallet</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your virtual currency and betting funds
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="mr-2 h-4 w-4" />
          Top Up
        </Button>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Balance
            </CardTitle>
            <WalletIcon className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              ${wallet.balance.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">Ready for betting</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Deposited
            </CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$8,500</div>
            <p className="text-xs text-gray-500">Lifetime deposits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Winnings
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">$6,850</div>
            <p className="text-xs text-gray-500">From successful bets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">+$1,420</div>
            <p className="text-xs text-gray-500">All-time P&L</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Transaction History */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                Your recent deposits, bets, and winnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="flex items-center">
                        {transaction.type === "win" && (
                          <TrendingUp className="h-4 w-4 text-emerald-600 mr-2" />
                        )}
                        {transaction.type === "loss" && (
                          <TrendingDown className="h-4 w-4 text-red-600 mr-2" />
                        )}
                        {transaction.type === "deposit" && (
                          <ArrowDownLeft className="h-4 w-4 text-blue-600 mr-2" />
                        )}
                        <span className="capitalize">{transaction.type}</span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{transaction.match}</div>
                          {transaction.type !== "deposit" && (
                            <div className="text-sm text-gray-500">
                              ${transaction.stake} @ {transaction.odds}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-medium ${
                            transaction.profit > 0
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.profit > 0 ? "+" : ""}$
                          {Math.abs(transaction.profit)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.result === "Won" ||
                            transaction.result === "Completed"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {transaction.result}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Bet Slip */}
        <div className="space-y-6">
          {/* Quick Top-up */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Quick Top-up
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full">
                  $100
                </Button>
                <Button variant="outline" className="w-full">
                  $250
                </Button>
                <Button variant="outline" className="w-full">
                  $500
                </Button>
                <Button variant="outline" className="w-full">
                  $1000
                </Button>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Custom Amount
              </Button>
            </CardContent>
          </Card>

          {/* Active Bet Slip */}
          <Card>
            <CardHeader>
              <CardTitle>Active Bet Slip</CardTitle>
              <CardDescription>Ready to place</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-3">
                <div className="font-medium text-sm">Man City vs Arsenal</div>
                <div className="text-xs text-gray-500">Home Win @ 1.65</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm">Stake:</span>
                  <span className="font-medium">$100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Potential Return:</span>
                  <span className="font-medium text-emerald-600">$165</span>
                </div>
              </div>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                Place Bet
              </Button>

              <Button variant="outline" className="w-full">
                Clear Slip
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, TrendingUp, AlertTriangle, Zap } from "lucide-react";
import { toast } from "sonner";
import mockData from "@/lib/mock-data.json";

interface QuickBetModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMatch?: any;
}

export function QuickBetModal({
  isOpen,
  onClose,
  selectedMatch,
}: QuickBetModalProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<string>("");
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [selectedMatchId, setSelectedMatchId] = useState<string>("");

  const { upcomingMatches, wallet } = mockData;

  // Use selected match or first available match
  const currentMatch =
    selectedMatch ||
    upcomingMatches.find((m) => m.id.toString() === selectedMatchId) ||
    upcomingMatches[0];

  const getOddsForOutcome = (outcome: string) => {
    if (!currentMatch) return 0;
    switch (outcome) {
      case "home":
        return currentMatch.bookmakerOdds.home;
      case "draw":
        return currentMatch.bookmakerOdds.draw;
      case "away":
        return currentMatch.bookmakerOdds.away;
      default:
        return 0;
    }
  };

  const calculatePotentialReturn = () => {
    if (!stakeAmount || !selectedOutcome) return 0;
    const stake = parseFloat(stakeAmount);
    const odds = getOddsForOutcome(selectedOutcome);
    return stake * odds;
  };

  const calculateProfit = () => {
    if (!stakeAmount || !selectedOutcome) return 0;
    const stake = parseFloat(stakeAmount);
    return calculatePotentialReturn() - stake;
  };

  const handlePlaceBet = () => {
    if (!selectedOutcome || !stakeAmount || !currentMatch) {
      toast.error("Please select an outcome and enter stake amount");
      return;
    }

    const stake = parseFloat(stakeAmount);
    if (stake <= 0) {
      toast.error("Please enter a valid stake amount");
      return;
    }

    if (stake > wallet.balance) {
      toast.error("Insufficient balance");
      return;
    }

    // Mock bet placement
    toast.success(
      `Bet placed! ${currentMatch.homeTeam} vs ${
        currentMatch.awayTeam
      } - ${selectedOutcome.toUpperCase()} $${stake} @ ${getOddsForOutcome(
        selectedOutcome
      )}`
    );

    // Reset form
    setSelectedOutcome("");
    setStakeAmount("");
    setSelectedMatchId("");
    onClose();
  };

  const presetAmounts = [10, 25, 50, 100];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[70vw] sm:max-w-none p-0">
        <ScrollArea className="h-full">
          <div className="p-6">
            <SheetHeader>
              <SheetTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-emerald-600" />
                Quick Bet
              </SheetTitle>
              <SheetDescription>
                Place a quick bet on upcoming matches
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 mt-6">
              {/* Match Selection */}
              {!selectedMatch && (
                <div className="space-y-2">
                  <Label>Select Match</Label>
                  <Select
                    value={selectedMatchId}
                    onValueChange={setSelectedMatchId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a match" />
                    </SelectTrigger>
                    <SelectContent>
                      {upcomingMatches.map((match) => (
                        <SelectItem key={match.id} value={match.id.toString()}>
                          {match.homeTeam} vs {match.awayTeam} - {match.league}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {currentMatch && (
                <>
                  {/* Match Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {currentMatch.homeTeam} vs {currentMatch.awayTeam}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{currentMatch.league}</Badge>
                        <Badge variant="secondary">
                          {new Date(currentMatch.date).toLocaleDateString()}{" "}
                          {new Date(currentMatch.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Badge>
                        {currentMatch.upsetAlert && (
                          <Badge
                            variant="destructive"
                            className="flex items-center"
                          >
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Upset Alert
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* AI Prediction */}
                      <div className="bg-emerald-50 dark:bg-emerald-950 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-emerald-800 dark:text-emerald-200">
                            AI Prediction: {currentMatch.aiPrediction.outcome}
                          </span>
                          <span className="text-sm font-medium text-emerald-600">
                            {currentMatch.aiPrediction.confidence}% Confidence
                          </span>
                        </div>
                      </div>

                      {/* Outcome Selection */}
                      <div className="space-y-3">
                        <Label>Select Outcome</Label>
                        <div className="grid grid-cols-3 gap-3">
                          <Button
                            variant={
                              selectedOutcome === "home" ? "default" : "outline"
                            }
                            className="flex-col h-16"
                            onClick={() => setSelectedOutcome("home")}
                          >
                            <div className="font-medium">
                              {currentMatch.homeTeam}
                            </div>
                            <div className="text-xs">
                              {currentMatch.bookmakerOdds.home}
                            </div>
                          </Button>
                          <Button
                            variant={
                              selectedOutcome === "draw" ? "default" : "outline"
                            }
                            className="flex-col h-16"
                            onClick={() => setSelectedOutcome("draw")}
                          >
                            <div className="font-medium">Draw</div>
                            <div className="text-xs">
                              {currentMatch.bookmakerOdds.draw}
                            </div>
                          </Button>
                          <Button
                            variant={
                              selectedOutcome === "away" ? "default" : "outline"
                            }
                            className="flex-col h-16"
                            onClick={() => setSelectedOutcome("away")}
                          >
                            <div className="font-medium">
                              {currentMatch.awayTeam}
                            </div>
                            <div className="text-xs">
                              {currentMatch.bookmakerOdds.away}
                            </div>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stake Selection */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Stake Amount</Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          className="flex-1"
                        />
                        <div className="text-sm text-gray-500 flex items-center">
                          Balance: ${wallet.balance.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {presetAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          onClick={() => setStakeAmount(amount.toString())}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Bet Summary */}
                  {selectedOutcome && stakeAmount && (
                    <Card className="bg-gray-50 dark:bg-gray-900">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <Calculator className="mr-2 h-5 w-5" />
                          Bet Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span>Selection:</span>
                          <span className="font-medium">
                            {selectedOutcome === "home"
                              ? currentMatch.homeTeam
                              : selectedOutcome === "away"
                              ? currentMatch.awayTeam
                              : "Draw"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Odds:</span>
                          <span className="font-medium">
                            {getOddsForOutcome(selectedOutcome)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Stake:</span>
                          <span className="font-medium">${stakeAmount}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span>Potential Return:</span>
                          <span className="font-medium text-emerald-600">
                            ${calculatePotentialReturn().toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Potential Profit:</span>
                          <span className="font-medium text-emerald-600">
                            ${calculateProfit().toFixed(2)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handlePlaceBet}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      disabled={!selectedOutcome || !stakeAmount}
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Place Bet
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

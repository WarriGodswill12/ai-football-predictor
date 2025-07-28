"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Trash2,
  Plus,
  Minus,
  Calculator,
  TrendingUp,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import mockData from "@/lib/mock-data.json";

interface BetSlipSelection {
  id: string;
  matchId: number;
  homeTeam: string;
  awayTeam: string;
  league: string;
  selection: "home" | "draw" | "away";
  odds: number;
  stake: number;
}

interface BetSlipProps {
  isOpen: boolean;
  onClose: () => void;
  selections: BetSlipSelection[];
  onUpdateSelections: (selections: BetSlipSelection[]) => void;
}

export function BetSlip({
  isOpen,
  onClose,
  selections,
  onUpdateSelections,
}: BetSlipProps) {
  const [betType, setBetType] = useState<"single" | "accumulator">("single");
  const [globalStake, setGlobalStake] = useState<number>(10);
  const { wallet } = mockData;

  const updateStake = (selectionId: string, stake: number) => {
    const updated = selections.map((sel) =>
      sel.id === selectionId ? { ...sel, stake } : sel
    );
    onUpdateSelections(updated);
  };

  const removeSelection = (selectionId: string) => {
    const updated = selections.filter((sel) => sel.id !== selectionId);
    onUpdateSelections(updated);
  };

  const calculateSingleReturns = (selection: BetSlipSelection) => {
    return selection.stake * selection.odds;
  };

  const calculateAccumulatorOdds = () => {
    return selections.reduce((acc, sel) => acc * sel.odds, 1);
  };

  const calculateAccumulatorReturn = () => {
    return globalStake * calculateAccumulatorOdds();
  };

  const getTotalStake = () => {
    if (betType === "single") {
      return selections.reduce((acc, sel) => acc + sel.stake, 0);
    }
    return globalStake;
  };

  const getTotalPotentialReturn = () => {
    if (betType === "single") {
      return selections.reduce(
        (acc, sel) => acc + calculateSingleReturns(sel),
        0
      );
    }
    return calculateAccumulatorReturn();
  };

  const placeBet = () => {
    const totalStake = getTotalStake();

    if (selections.length === 0) {
      toast.error("Add selections to your bet slip");
      return;
    }

    if (totalStake > wallet.balance) {
      toast.error("Insufficient balance");
      return;
    }

    if (betType === "single") {
      selections.forEach((selection) => {
        if (selection.stake <= 0) {
          toast.error(
            `Please enter a valid stake for ${selection.homeTeam} vs ${selection.awayTeam}`
          );
          return;
        }
      });
    } else {
      if (globalStake <= 0) {
        toast.error("Please enter a valid stake amount");
        return;
      }
    }

    // Mock bet placement
    toast.success(
      `${
        betType === "single" ? "Single bets" : "Accumulator bet"
      } placed successfully! Total stake: $${totalStake.toFixed(2)}`
    );
    onUpdateSelections([]);
    onClose();
  };

  const getSelectionLabel = (selection: BetSlipSelection) => {
    switch (selection.selection) {
      case "home":
        return selection.homeTeam;
      case "away":
        return selection.awayTeam;
      case "draw":
        return "Draw";
      default:
        return "";
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Bet Slip</span>
            <Badge variant="secondary">{selections.length} selections</Badge>
          </SheetTitle>
          <SheetDescription>
            Build your bet slip and place your bets
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Bet Type Selector */}
          <Tabs
            value={betType}
            onValueChange={(value) =>
              setBetType(value as "single" | "accumulator")
            }
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">Single Bets</TabsTrigger>
              <TabsTrigger value="accumulator" disabled={selections.length < 2}>
                Accumulator {selections.length < 2 && "(2+ selections)"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="space-y-4">
              {selections.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-500">No selections added yet</p>
                    <p className="text-sm text-gray-400">
                      Add predictions to build your bet slip
                    </p>
                  </CardContent>
                </Card>
              ) : (
                selections.map((selection) => (
                  <Card key={selection.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-sm">
                            {selection.homeTeam} vs {selection.awayTeam}
                          </CardTitle>
                          <p className="text-xs text-gray-500">
                            {selection.league}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSelection(selection.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {getSelectionLabel(selection)}
                        </span>
                        <Badge variant="outline">{selection.odds}</Badge>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`stake-${selection.id}`}>Stake</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id={`stake-${selection.id}`}
                            type="number"
                            value={selection.stake}
                            onChange={(e) =>
                              updateStake(
                                selection.id,
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="flex-1"
                            min="0"
                            step="0.01"
                          />
                          <span className="text-sm text-gray-500">USD</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Potential Return:</span>
                        <span className="font-medium text-emerald-600">
                          ${calculateSingleReturns(selection).toFixed(2)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="accumulator" className="space-y-4">
              {selections.length < 2 ? (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-500">
                      Add 2 or more selections for accumulator
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Accumulator Selections */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Accumulator Selections
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selections.map((selection, index) => (
                        <div key={selection.id}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">
                                {selection.homeTeam} vs {selection.awayTeam}
                              </p>
                              <p className="text-xs text-gray-500">
                                {getSelectionLabel(selection)} @{" "}
                                {selection.odds}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSelection(selection.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          {index < selections.length - 1 && (
                            <Separator className="mt-2" />
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Accumulator Stake */}
                  <Card>
                    <CardContent className="pt-6 space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="accumulator-stake">Total Stake</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="accumulator-stake"
                            type="number"
                            value={globalStake}
                            onChange={(e) =>
                              setGlobalStake(parseFloat(e.target.value) || 0)
                            }
                            className="flex-1"
                            min="0"
                            step="0.01"
                          />
                          <span className="text-sm text-gray-500">USD</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Combined Odds:</span>
                          <span className="font-medium">
                            {calculateAccumulatorOdds().toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Potential Return:</span>
                          <span className="font-medium text-emerald-600">
                            ${calculateAccumulatorReturn().toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>
          </Tabs>

          {/* Summary */}
          {selections.length > 0 && (
            <Card className="bg-gray-50 dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  Bet Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Stake:</span>
                  <span className="font-medium">
                    ${getTotalStake().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Potential Return:</span>
                  <span className="font-medium text-emerald-600">
                    ${getTotalPotentialReturn().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Potential Profit:</span>
                  <span className="font-medium text-emerald-600">
                    ${(getTotalPotentialReturn() - getTotalStake()).toFixed(2)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span>Available Balance:</span>
                  <span>${wallet.balance.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={placeBet}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              disabled={
                selections.length === 0 || getTotalStake() > wallet.balance
              }
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Place Bet
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

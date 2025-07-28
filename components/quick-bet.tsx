"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { MatchDetails } from "./match-details";

interface QuickBetProps {
  match?: any;
  size?: "sm" | "default" | "lg";
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link";
  className?: string;
  onAddToBetSlip?: (selection: any) => void;
}

export function QuickBet({
  match,
  size = "sm",
  variant = "default",
  className,
  onAddToBetSlip,
}: QuickBetProps) {
  const [showMatchDetails, setShowMatchDetails] = useState(false);

  const handleClick = () => {
    if (match) {
      // If we have a specific match, show match details
      setShowMatchDetails(true);
    } else {
      // If no match specified, could show a general betting interface
      setShowMatchDetails(true);
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        size={size}
        variant={variant}
        className={`bg-emerald-600 hover:bg-emerald-700 ${className || ""}`}
      >
        <Zap className="mr-1 h-3 w-3" />
        Quick Bet
      </Button>

      <MatchDetails
        isOpen={showMatchDetails}
        onClose={() => setShowMatchDetails(false)}
        match={match}
        onAddToBetSlip={onAddToBetSlip}
      />
    </>
  );
}

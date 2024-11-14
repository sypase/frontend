"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-6 h-6 ", className)}
    >
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
};

const CheckFilled = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6 ", className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

type LoadingState = {
  text: string;
};

const LoaderCore = ({
  loadingStates,
  value = 0,
}: {
  loadingStates: LoadingState[];
  value?: number;
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 w-full"> {/* Centering items horizontally */}
      {loadingStates.map((loadingState, index) => {
        return (
          <motion.div
            key={index}
            className="flex items-center justify-center flex-shrink-0"
            initial={{ opacity: 1 }} // Keep opacity at 1 for all items
            animate={{ opacity: 1 }} // Keep opacity at 1 for all items
            transition={{ duration: 0.5 }}
          >
            <div>
              {index > value && <CheckIcon className="text-gray-400" />}
              {index <= value && (
                <CheckFilled
                  className={cn(
                    "text-lime-400",
                    value === index && "text-lime-500 opacity-100"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-gray-400",
                value >= index && "text-lime-500 opacity-100"
              )}
            >
              {loadingState.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export const HorizontalStepLoader = ({
  loadingStates,
  loading,
  duration = 100,
  loop = true,
}: {
  loadingStates: LoadingState[];
  loading?: boolean;
  duration?: number;
  loop?: boolean;
}) => {
  const [currentState, setCurrentState] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      setCompleted(false); // Reset completed state if loading is false
      return;
    }

    if (completed) return; // Don't proceed if already completed

    const timeout = setTimeout(() => {
      setCurrentState((prevState) => {
        const nextState =
          prevState === loadingStates.length - 1 ? prevState : prevState + 1;

        if (nextState === loadingStates.length - 1) {
          setCompleted(true); // Mark as completed when last step is reached
        }

        return nextState;
      });
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentState, loading, loop, loadingStates.length, duration, completed]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center w-full max-w-full"
        >
          <div className="relative w-full max-w-full overflow-hidden">
            <LoaderCore value={currentState} loadingStates={loadingStates} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

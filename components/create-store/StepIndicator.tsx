import { CheckCircle } from "lucide-react";

interface StepIndicatorProps {
  step: number;
  totalSteps?: number;
}

const StepIndicator = ({ step, totalSteps = 4 }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-8 sm:mb-12 px-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNumber) => (
        <div key={stepNumber} className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition text-sm sm:text-base ${
              stepNumber < step
                ? "bg-green-500 border-green-500 text-white"
                : stepNumber === step
                ? "border-primary bg-white text-primary"
                : "border-gray-300 text-gray-400"
            }`}
          >
            {stepNumber < step ? (
              <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
            ) : (
              stepNumber
            )}
          </div>

          {stepNumber < totalSteps && (
            <div
              className={`w-12 sm:w-16 md:w-24 h-1 ${
                stepNumber < step ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;

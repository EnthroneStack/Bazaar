import { CheckCircle } from "lucide-react";

interface StepIndicatorProps {
  step: number;
  totalSteps?: number;
}

const StepIndicator = ({ step, totalSteps = 4 }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-12">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNumber) => (
        <div key={stepNumber} className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition ${
              stepNumber < step
                ? "bg-green-500 border-green-500 text-white"
                : stepNumber === step
                ? "border-primary bg-white text-primary"
                : "border-gray-300 text-gray-400"
            }`}
          >
            {stepNumber < step ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              stepNumber
            )}
          </div>

          {stepNumber < totalSteps && (
            <div
              className={`w-24 h-1 ${
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

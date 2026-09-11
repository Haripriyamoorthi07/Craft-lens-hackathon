import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
}

const WORKFLOW_STEPS = [
  { id: 3, label: 'Upload & Describe' },
  { id: 4, label: 'AI Analysis'       },
  { id: 5, label: 'Listing'           },
  { id: 6, label: 'Fair Price'        },
  { id: 7, label: 'Buyer Q&A'         },
  { id: 8, label: 'Sell Coach'        },
  { id: 9, label: 'Final Listing'     },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, onSelectStep }) => {
  /* Only show within the workflow (steps 3-9) */
  if (currentStep < 3) return null;

  const workflowIndex = WORKFLOW_STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div
      className="sticky top-16 z-30"
      style={{
        background: 'var(--cl-white)',
        borderBottom: '1px solid var(--cl-border)',
        boxShadow: '0 1px 4px rgba(28,28,30,0.04)',
      }}
    >
      <div className="cl-container">
        <div className="flex items-center gap-0 overflow-x-auto py-3 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
          {WORKFLOW_STEPS.map((step, idx) => {
            const isDone    = currentStep > step.id;
            const isActive  = currentStep === step.id;
            const isReachable = step.id <= currentStep;

            return (
              <React.Fragment key={step.id}>
                {/* Step pill */}
                <button
                  onClick={() => isReachable ? onSelectStep(step.id) : undefined}
                  disabled={!isReachable}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition whitespace-nowrap text-xs font-semibold shrink-0"
                  style={{
                    background: isActive ? 'var(--cl-terra-bg)' : 'transparent',
                    color: isActive
                      ? 'var(--cl-terra)'
                      : isDone
                      ? 'var(--cl-success)'
                      : 'var(--cl-gray-light)',
                    cursor: isReachable ? 'pointer' : 'default',
                  }}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <Circle
                      className="w-3.5 h-3.5 shrink-0"
                      fill={isActive ? 'var(--cl-terra)' : 'none'}
                      stroke={isActive ? 'var(--cl-terra)' : 'currentColor'}
                    />
                  )}
                  <span>{step.label}</span>
                </button>

                {/* Connector */}
                {idx < WORKFLOW_STEPS.length - 1 && (
                  <div
                    className="shrink-0 mx-1"
                    style={{
                      width: 20,
                      height: 1,
                      background: idx < workflowIndex ? 'var(--cl-success)' : 'var(--cl-border)',
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

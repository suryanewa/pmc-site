#!/bin/bash
set -e

TIMESTAMP=$(date +%Y-%m-%d-%H%M%S)
EVIDENCE_DIR=".sisyphus/evidence"
LOG_FILE="$EVIDENCE_DIR/task-1-baseline-run-$TIMESTAMP.log"

mkdir -p "$EVIDENCE_DIR"

echo "========================================" | tee -a "$LOG_FILE"
echo "Performance Baseline Measurement" | tee -a "$LOG_FILE"
echo "Started: $(date)" | tee -a "$LOG_FILE"
echo "========================================" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"

check_dev_server() {
  if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "ERROR: Dev server not running on http://localhost:3000" | tee -a "$LOG_FILE"
    echo "Please start the dev server with: npm run dev" | tee -a "$LOG_FILE"
    exit 1
  fi
  echo "✓ Dev server is running" | tee -a "$LOG_FILE"
}

run_playwright_scenarios() {
  echo "" | tee -a "$LOG_FILE"
  echo "Running Playwright baseline scenarios..." | tee -a "$LOG_FILE"
  npx playwright test e2e/performance-baseline.spec.ts --project=chromium 2>&1 | tee -a "$LOG_FILE"
  echo "✓ Playwright scenarios complete" | tee -a "$LOG_FILE"
}

run_lighthouse_audit() {
  echo "" | tee -a "$LOG_FILE"
  echo "Running Lighthouse mobile audit..." | tee -a "$LOG_FILE"
  npx tsx scripts/lighthouse-audit.ts 2>&1 | tee -a "$LOG_FILE"
  echo "✓ Lighthouse audit complete" | tee -a "$LOG_FILE"
}

generate_summary() {
  echo "" | tee -a "$LOG_FILE"
  echo "========================================" | tee -a "$LOG_FILE"
  echo "Baseline Capture Summary" | tee -a "$LOG_FILE"
  echo "========================================" | tee -a "$LOG_FILE"
  echo "" | tee -a "$LOG_FILE"
  echo "Evidence files saved to: $EVIDENCE_DIR" | tee -a "$LOG_FILE"
  echo "" | tee -a "$LOG_FILE"
  echo "Generated files:" | tee -a "$LOG_FILE"
  ls -lh "$EVIDENCE_DIR"/task-1-* 2>/dev/null | tail -20 | tee -a "$LOG_FILE"
  echo "" | tee -a "$LOG_FILE"
  echo "Completed: $(date)" | tee -a "$LOG_FILE"
  echo "" | tee -a "$LOG_FILE"
  echo "To re-run this baseline:" | tee -a "$LOG_FILE"
  echo "  npm run perf:baseline" | tee -a "$LOG_FILE"
  echo "" | tee -a "$LOG_FILE"
}

check_dev_server
run_playwright_scenarios
run_lighthouse_audit
generate_summary

echo "✓ All baseline measurements complete!"
echo "See log: $LOG_FILE"

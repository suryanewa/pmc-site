#!/bin/bash

PAGES=("/" "/people/e-board" "/people/leads" "/events/speakers" "/programs/product-team" "/events/case-comp")
WIDTHS=(375 768 1440)

for page in "${PAGES[@]}"; do
  slug=$(echo "$page" | sed 's/\//-/g' | sed 's/^-//' | sed 's/-$//')
  [ "$slug" = "" ] && slug="home"
  
  for width in "${WIDTHS[@]}"; do
    echo "Capturing $slug at ${width}px..."
  done
done

echo "Total screenshots to capture: $((${#PAGES[@]} * ${#WIDTHS[@]}))"

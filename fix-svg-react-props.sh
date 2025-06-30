#!/bin/bash

TARGET_FILE="src/components/Home.jsx"

# Ensure file exists
if [ ! -f "$TARGET_FILE" ]; then
  echo "❌ $TARGET_FILE not found!"
  exit 1
fi

echo "🛠️ Fixing React attribute casing in $TARGET_FILE..."

# Perform replacements
sed -i 's/text-anchor/textAnchor/g' "$TARGET_FILE"
sed -i 's/font-size/fontSize/g' "$TARGET_FILE"
sed -i 's/font-family/fontFamily/g' "$TARGET_FILE"
sed -i 's/font-weight/fontWeight/g' "$TARGET_FILE"

echo "✅ Fixed all invalid SVG/React DOM props in $TARGET_FILE!"

#!/bin/bash
# Download images from kailas-yogalife.com for za-nas and blog posts
# Run from project root: ./scripts/download-images.sh

set -e
BASE="https://kailas-yogalife.com/wp-content/uploads"
DEST="public/images"

mkdir -p "$DEST"

download() {
  local url="$1"
  local filename="$2"
  if [ -z "$filename" ]; then
    filename=$(basename "$url" | sed 's/?.*//')
  fi
  echo "Downloading: $filename"
  curl -sL -o "$DEST/$filename" "$url" || echo "  FAILED: $url"
}

# Za-nas / About page
download "$BASE/2023/09/Header-Image4.png" "about-header.png"
download "$BASE/2023/07/20220605_182836-2-scaled.jpg" "gallery-20220605.jpg"
download "$BASE/2023/07/DSC09196-3.jpeg" "gallery-DSC09196.jpeg"
download "$BASE/2023/07/20220129_082634-scaled.jpg" "gallery-20220129.jpg"

# Existing app images (from original site)
download "$BASE/2023/06/20220520_201852-scaled.jpg" "20220520_201852-scaled.jpg"
download "$BASE/2023/06/348380709_1268910913994703_7611136873201903571_n-768x615.jpg" "348380709_1268910913994703_7611136873201903571_n-768x615.jpg"
download "$BASE/2024/06/20231029_1025372-2048x1197.jpg" "20231029_1025372-2048x1197.jpg"
download "$BASE/2023/07/HALL-2-1024x768.png" "HALL-2.png"
download "$BASE/2023/06/20220521_202838-2-768x958.jpg" "20220521_202838-2-768x958.jpg"

# Blog post featured images
download "$BASE/2024/11/Januari-25-Happy-mind2-704x396.png" "blog-shtastliv-um-2.png"
download "$BASE/2026/01/Програма-есен25-576x1024.png" "blog-aktualen-grafik.png"
download "$BASE/2024/07/Практики-1024x576.png" "blog-yoga-v-delnika.png"
download "$BASE/2024/07/Гяна-йога2-1920-x-1080-px-1024x576.png" "blog-gyana-yoga.png"
download "$BASE/2024/07/БХАКТИ-ЙОГА-2-1024x576.png" "blog-bhakti-yoga.png"
download "$BASE/2024/07/Карма-йога3-1920-x-1080-px-1024x576.png" "blog-karma-yoga.png"
download "$BASE/2024/06/йога-нидра-1024x576.png" "blog-yoga-nidra.png"
download "$BASE/2024/07/Първи-стъпки-в-йога-1024x576.png" "blog-purvi-stapki-yoga.png"
download "$BASE/2023/09/YogaForEveryone-2-576x1024.png" "blog-yoga-za-vichki.png"
download "$BASE/2024/07/Практики-1-705x368.png" "blog-kriya-yoga.png"
download "$BASE/2023/11/Raja-yoga2-1024x624.png" "blog-raja-yoga.png"
download "$BASE/2023/08/Beige-and-Brown-Illustrative-Yoga-Infographic-410x1024.png" "blog-hatha-yoga.png"
download "$BASE/2024/06/ФОН-ПРЕЛИВАЩ.png" "blog-bahiranga-yoga.png"

echo "Done! Images saved to $DEST"

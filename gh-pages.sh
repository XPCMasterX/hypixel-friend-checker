echo "Removing existing website"
rm -rf docs
mkdir -p docs
cp -r public/* docs/
echo "Copied all files"
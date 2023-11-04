# cracker

* to build chrome extension

cd ~/perci/cracker
mkdir -p target/chrome-extension
cp ../../common/* .
cp ../../chrome-extension/* .
cd target/chrome-extension
find . | zip -@ cracker-chrome.zip

* to build firefox extension

cd ~/perci/cracker
mkdir -p target/firefox-extension
cp ../../common/* .
cp ../../firefox-extension/* .
cd target/firefox-extension
find . | zip -@ cracker-firefox.zip

####

after checkout

-- npm install

to build - into dist

-- grunt


nvm use 16

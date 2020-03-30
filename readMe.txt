-----------------installation--------------------
*python and npm should be installed

npm install --save vcd-parser
pip install nbwavedrom
pip install ipython
pip install Naked


-----------------Description--------------------
-parseWave.js: Nodejs file that takes the test file (.vcd or .txt),
and returns a json string of the wave format that is understood
by wavedrom (save in a txt file "parsed_json.txt").

viewWave.py: Python script that reads "parsed_json.txt" and
plots the wave signals in the browser.

There are 5 test files included in the directory (ie: vcd_test.txt).
There is a screenshot of the simulation for each test
-----------------How to run--------------------
1- open terminal
2- type:
python viewWave.py <the vcd file path> 
example:
python viewWave.py vcd_test.txt
 

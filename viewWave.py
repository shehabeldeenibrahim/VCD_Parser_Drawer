import nbwavedrom
import webbrowser
from Naked.toolshed.shell import execute_js
import os
import sys

path = sys.argv[1]
if os.path.exists(path):
    # path = "vcd_test1.txt"
    success = execute_js('parseWave.js', path)
    if(success):
        f = open('parsed_json.txt','r')
        parsed = f.read()
        f.close()
        html = nbwavedrom.draw(parsed)
        f = open('helloworld.html','w')
        f.write(html.data)
        f.close()

        webbrowser.open_new_tab('helloworld.html')
        print("")
    else:
        print("error is js file")
else:
    print("no such file or directory")
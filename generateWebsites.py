"""
This file takes an html template and a text file and generates multiple html-files filled with content from the text file

Format of text file: Make blocks of 5 entries each. Each entry must be on one line. A block looks like:

Question
Answer 1
Answer 2
Answer 3
0

where the last line is the index (starting from 0) of the correct answer.
Whitespace between all lines is striped away - it does not matter.
"""

htmlTemplateFileName = "123Template.html"
questionsFileName = "fragen.txt"
htmlTemplateEndFileName = "endeTemplate.html"


templateKeywords = ["PREVIOUSPAGE", "NEXTPAGE", "QUESTION", "ANSWER1", "ANSWER2", "ANSWER3", "CORRECTANSWER"]

#parse the questions into a list
with open(questionsFileName) as f:
    qdata = f.read()

qlist = []
for entry in qdata.split("\n"):
    if entry.strip() == '':
        continue
    else:
        qlist.append(entry)

if len(qlist)%5 != 0:
    raise ValueError("The blocklenght of some question is not 5.")
    
    
#parse the template and split it
with open(htmlTemplateFileName) as f:
    tdata = f.read()


parts = []
for k in templateKeywords:    
    if len(tdata.split(k)) != 2:
        raise ValueError("Spit at keyword ", k, " does not have 2 parts! Aborting.")

    parts.append(tdata.split(k)[0])
    tdata = tdata.split(k)[1]

parts.append(tdata)

## main loop generating the individual files 
for i in range(0,int(len(qlist)/5)):
    filename = "frage-"+str(i+1).zfill(3)+".html"
    filenamep = "frage-"+str(i).zfill(3)+".html"
    if i==0:   
        filenamep = "start.html"
    filenamen = "frage-"+str(i+2).zfill(3)+".html"
    if i==int(len(qlist)/5)-1:
        filenamen = "ende.html"
    content = parts[0] + filenamep + parts[1] + filenamen    
    
    for p in range(2,len(parts)-1):
        content += parts[p] + qlist[5*i+p-2] 
    content += parts[len(parts)-1]

    
    with open(filename, "w") as f:
        f.write(content)
    

## generate the last page
#read the template
with open(htmlTemplateEndFileName) as f:
    tdata = f.read()

#write the last page    
i = int(len(qlist)/5)
filename = "ende.html"
filenamep = "frage-"+str(i).zfill(3)+".html"
content = tdata.split("PREVIOUSPAGE")[0] + filenamep + tdata.split("PREVIOUSPAGE")[1] 
with open(filename, "w") as f:
    f.write(content)




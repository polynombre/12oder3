# 12oder3
html template and script to fill it for "1,2 oder 3"  
A (shorter) English description is at the end.


# Was ist das hier?
Eine Template um Webseiten zu generieren, mit denen man "1, 2 oder 3" spielen kann. "1,2 oder 3" ist eine Fernsehshow für und mit Kindern. Es gibt 3 Teams aus Kindern und zentrales Element ist Spiel:  
Es wird eine Frage gezeigt und dazu drei Antwortmöglichkeiten. Dann können sich die Teams kurz beraten. Danach läuft ein Countdown ab und die drei Felder auf dem Fußboden blinken und die Kinder springen zwischen den Feldern hin und her. Bei Ablauf der Zeit muss jedes Kind auf einem Feld stehen und jedes Kind auf dem richtigen Feld holt einen Punkt für sein Team.

# Warnung:
Das großflächige Blinken kann bei manchen Menschen epileptische Anfälle auslösen! Bitte fragen Sie die Anwesenden vorher ob jemand betroffen ist!


# Features:
* Steuerung über Tastatur oder Maus möglich
* Verstellbare Größe
* Einstellbare Zeit


# Funktionsweise:
1) Fragen, Antwortmöglichkeiten und Nummer der richtigen Antwort in `fragen.txt` schreiben und speichern. Jedes Element auf eine Zeile (wie im Beispiel).

2) Wenn python3  verfügbar ist, dann auf der Kommandozeile ausführen:
`python3 generateWebsites.py`

Alternativ unter Windows:
`generateWebsites.exe`
(die .exe ist automatisch generiert mit `pyinstaller -F generateWebsites.py`)


Dies fügt die Zeilen aus `fragen.txt` wie sie sind in die Platzhalter in `123Template.html` ein und erzeugt für jede Frage eine eigene Webseite.

3) `start.html` in einem Browser öffnen (Chrome oder Firefox)
4) Bei Bedarf vor dem Spiel im Menü oben links (auf der Seite der ersten Frage - nicht auf der Startseite) die Größe und die Zeit einstellen.
5) Pfeile oben links und rechts führen zur nächsten oder vorherigen Folie. Klicken auf "Zeit" startet den Countdown. Tastatursteuerung siehen unten.


# Steuerung per Tastatur:
* Enter = Zeit starten
* Pfeil nach links/rechts = vorherige/nächste Folie.
* b = vergrößern ("bigger")
* s = verkleinern ("smaller")




# short English description
* Programm to generate websites from a template to play the game "1 2 oder 3"
* fill `fragen.txt` with questions, 3 answer options and number of correct answer as in example
* run  `python3 generateWebsites.py` or `generateWebsites.exe` to generate websites
* open `start.html` in a browser, use elements (incl. menu) or keyboard to navigate and start counter

Keyboard: Enter = Start timer, Left/Right = previous/next, b/s = bigger/smaller


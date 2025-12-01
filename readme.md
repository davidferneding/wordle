# Wordle - Programmier-Challenge
Bei dieser Programmier-Challenge sollst du eine bestehende Web-Anwendung anpassen, um die fehlenden Funktionen zum Spiel hinzuzufügen. Dabei arbeitest du mit verschiedenen Programmiersprachen und lernst, existierenden Code zu verstehen und zu erweitern.

## Einrichtung
### Python-Umgebung einrichten
Die Anwendung funktioniert bereits grundlegend ohne weitere Anpassungen. Um das "Backend", also das Programm mit der Spiellogik, starten zu können, musst du allerdings noch einige Schritte befolgen:

1. Virtuelle Umgebung erstellen
    * Die virtuelle Umgebung enthält die Python-Abhängigkeiten für das Backend
    * Führe folgenden Befehl in der Konsole aus, um eine virtuelle Umgebung ("venv") namens "venv" zu erstellen
```bash
python3 -m venv venv
```

2. In virtuelle Umgebung wechseln
    * Die virtuelle Umgebung muss aktiviert werden, um darin arbeiten zu können. Führe dafür folgenden Befehl aus:

**Windows**:
```powershell
venv\bin\Activate.ps1
```

Bei eingeschränkten Windows-Systemen kann es beim Aktivieren zu einem Fehler kommen. Führe in dem Fall diesen Befehl aus und versuche es danach nochmal:
```powershell
Set-ExecutionPolicy Unrestricted -Scope Process
```

**Linux/Mac**:
```bash
source venv/bin/activate
```


3. `fastapi` installieren
    * Das Backend benutzt die Bibliothek `fastapi`, um die Funktionen für die Oberfläche ("Frontend") erreichbar zu machen. Diese Bibliothek muss in der virtuellen Umgebung installiert werden:
```bash
pip install "fastapi[standard]"
```

### Projekt starten
Nachdem alle Abhängigkeiten installiert wurden, kannst du das Projekt starten.

Um das Backend zu starten, musst du in der Konsole folgenden Befehl ausführen:
```bash
fastapi dev api.py
```

Anschließend solltest du die API-Dokumentation im Browser unter [127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) aufrufen können.

Um das Frontend aufzurufen, musst du nur die `index.html`-Datei im Browser öffnen.


## Projektaufbau
Das Projekt besteht aus vier Dateien, die zusammen eine vollständige (kleine) Web-Anwendung bilden:

1. `api.py` - Das Backend
    * Das Backend liefert die Logik für die Anwendung - oder in diesem Fall das Spiel. Das Backend startet und speichert die Spiele und stellt Funktionen ("Endpunkte") bereit, um Wörter zu tippen und Spielstände abzufragen
2. `index.html` - Das Grundgerüst
    * HTML wird in der Webentwicklung benutzt, um die Inhalte für die Anwendung zu definieren. Hier ist der Aufbau der Website beschrieben. Zusätzlich werden hier alle weiteren Inhalte für die Anwendung dazugeladen. Die HTML-Datei bildet damit den Einstiegspunkt für die Website
3. `style.css` - Das Design
    * CSS wird benutzt, um die Anordnung und das Aussehen der in der HTML-Datei beschriebenen Elemente anzupassen. Hier werden z.B. Farben und Positionen beschrieben
4. `script.js` - Die Anzeigelogik
    * Mit JavaScript (`js`) werden die Aktionen programmiert, die der Browser auf der Website ausführen soll. Hierüber wird z.B. mit dem Backend kommuniziert und der Spieler oder die Spielerin durch das Spiel geführt


## Aufgaben
Sobald das Spiel erfolgreich gestartet werden konnte, kannst du anfangen, es zu erweitern. Um die fehlenden Funktionen zu ergänzen, gibt es vier Aufgaben. Vielleicht fallen dir beim Bearbeiten der Aufgaben aber auch noch weitere Sachen auf, die du gerne anpassen möchtest.

1. Server erweitern: Beim Spielstart soll ein zufälliges 6-stelliges Wort ausgewählt werden
    * Aktuell startet der Server das Spiel immer mit demselben Wort. Um das Spiel aber wirklich spielbar zu machen, sollte bei jedem Spielstart ein anderes Wort ausgewählt werden
    * Erweitere den Server, um beim Spielstart ein zufälliges Wort aus einer Liste von Wörtern auszuwählen
2. Design anpassen: Richtige Buchstaben sollen einen grünen Rahmen bekommen
    * Aktuell kennzeichnet das Spiel nur Buchstaben, die nicht im Wort enthalten sind, und Buchstaben, die an der falschen Stelle im Wort sind. Buchstaben, die an der richtigen Stelle sind, werden nicht gekennzeichnet
    * Suche in der Frontend-Logik (`script.js`) nach dem Attribut, das bei einem richtig geratenen Buchstaben gesetzt wird. Passe anschließend die Datei `style.css` so an, dass dieses Attribut behandelt und passend markiert wird
3. Oberfläche erweitern: Zeige eine Nachricht an, wenn das Spiel gewonnen oder verloren wurde
    * In der `guess`-Funktion in `script.js` sind zwei `todo`-Kommentare an der Stelle, an der das Spiel beendet wird. Hier kannst du am Ende des Spiels eine Nachricht anzeigen
    * Wie die Nachricht aussieht ist dir überlassen. Du kannst ein `alert` senden, einen vorbereiteten Text anzeigen, eine Animation starten oder eine ganz andere andere Möglichkeit suchen
4. Client erweitern: "Spiel laden"-Funktion hinzufügen
    * Das Spiel funktioniert jetzt schon: du kannst ein Spiel starten, spielen, die Ergebnisse sehen und das Spiel kann enden. Im Client gibt es aber noch einen Button, der aktuell keine Funktion hat: "Spiel laden"
    * Wenn der Button geklickt wird, wird die Funktion `loadGame` aufgerufen. Hier befindet sich aktuell noch ein `todo`-Kommentar
    * Im Backend gibt es die Endpunkte `/game/{id}/guesses` und `/game/{id}/results`, die den Spielstand für ein Spiel zurückgeben
    * Um die "Spiel laden"-Funktion zu implementieren, musst du die Endpunkte ansprechen und den Spielstand auf das Spielfeld übertragen. Das wird *etwas* anspruchsvoller als die bisherigen Aufgaben - in der `script.js`-Datei findest du aber alles was du dafür brauchst, diese Aufgabe wirst du also sicherlich auch schaffen

Bug Tracking System - Frontend

Descriere:
Aplicație web ce implementeaza un sistem de gestionare a bugurilor, destinat echipelor de dezvoltare software. 
Scopul său principal este de a facilita comunicarea dintre membrii echipei printr-o interfață construită folosind React și DaisyUI.
Aplicația urmărește arhitectura Single Page Application (SPA)

Tehnologii utilizate:
React - pentru dezvoltarea interfeței utilizator
DaisyUI - pentru stilizarea componentelor și îmbunătățirea aspectului vizual
React Router - pentru navigarea între pagini
Fetch API / Axios - pentru comunicarea cu backend-ul

Funcționalități principale:

Gestionarea proiectelor
Un membru de proiect (MP) poate înregistra un proiect software pentru a fi monitorizat.Se poate specifica repository-ul proiectului și echipa de dezvoltare.
MP poate vizualiza toate bugurile asociate proiectelor din care face parte si isi poate asigna rezolvarea unui singur bug la un moment dat.

Înregistrarea bugurilor
Un utilizator care nu este membru într-un proiect poate solicita să fie tester (TST).
Un TST poate adăuga buguri înregistrând oferind informatii legate de severitatea bugului, link catre un repo al bug ului si o descriere.

Gestionarea bugurilor
După rezolvarea unui bug, MP poate adăuga un status al rezolvării și un link către commit-ul aferent. MP poate actualiza starea unui bug.



